# Embed Mode — Goono ELN "ChemModal" iframe contract

The chemeditor SPA can run **standalone** (its normal PoC mode) or **embedded**
inside Goono ELN (Spring Boot) as an `<iframe>`. Goono uses the embed as the
ChemDraw fallback path — the "ChemModal" (Epic #23 / E4 #27 in
`redwit-dev/Goono-ELN`). This document is the integration contract for the
Goono side.

The only feature the embed exposes is the one this PoC exists to prove: **paste
or draw a structure → molecular formula / weight / exact mass appear**, computed
by RDKit. The parent window receives those numbers over `postMessage`.

## Activating embed mode

Load the SPA with the `embed` query flag:

```
https://chemeditor.example/?embed=1&parentOrigin=https://eln.goono.io
```

| Query param    | Values                     | Meaning                                                                 |
|----------------|----------------------------|-------------------------------------------------------------------------|
| `embed`        | `1` / `true` / `yes`       | Turn on embed mode. Any other value (or absent) = standalone.           |
| `parentOrigin` | an origin, e.g. `https://eln.goono.io` | Restricts postMessage `targetOrigin` **and** the accepted source origin of incoming messages. |

In embed mode the Search / Stoichiometry / Reagents chrome is hidden; the
Ketcher editor and the property bar remain. Standalone mode is completely
unaffected (the flag defaults to off).

### `parentOrigin` — production requirement

- **Development**: if `parentOrigin` is omitted it defaults to `'*'`. Outgoing
  messages go to any origin and incoming messages are accepted from any origin.
  This is convenient for local testing **only**.
- **Production**: Goono MUST pass the real ELN origin (e.g.
  `parentOrigin=https://eln.goono.io`). With a concrete origin set, the iframe
  posts exclusively to that origin and **ignores** `message` events whose
  `event.origin` does not match — preventing a malicious page from injecting
  structures or scraping the property stream.

## Message contract

All messages are objects with a `type` string namespaced `chemeditor:` and an
optional `payload`. Unrecognized or malformed messages are ignored.

### iframe → parent

#### `chemeditor:ready` — posted once on mount

```json
{ "type": "chemeditor:ready" }
```

Signals the SPA has mounted and its `message` listener is installed. Goono
should wait for this before sending `chemeditor:set-structure` (messages sent
earlier may be missed).

#### `chemeditor:properties` — posted on every successful property update

```json
{
  "type": "chemeditor:properties",
  "payload": {
    "molfile": "<MDL molfile V2000>",
    "formula": "C9H8O4",
    "molWt": 180.16,
    "exactMolWt": 180.0423
  }
}
```

Emitted whenever RDKit successfully recomputes properties for the current
canvas (debounced ~150 ms after the last edit). `molfile` is the structure of
record — Goono should persist that, not re-derive it. Identical consecutive
payloads are de-duplicated (not re-sent). Parse failures / empty canvas do **not**
emit this message.

### parent → iframe

#### `chemeditor:set-structure` — load a structure into the editor

```json
{
  "type": "chemeditor:set-structure",
  "payload": { "structure": "CC(=O)Oc1ccccc1C(=O)O" }
}
```

`structure` may be a molblock (MOL/SDF V2000/V3000) or SMILES — Ketcher
auto-detects. An empty string clears the canvas. After the structure loads, the
property recompute fires automatically and a `chemeditor:properties` message
follows.

## Minimal Goono-side example

```html
<iframe id="chem" src="https://chemeditor.example/?embed=1&parentOrigin=https://eln.goono.io"></iframe>
<script>
  const CHEM_ORIGIN = 'https://chemeditor.example';
  const frame = document.getElementById('chem');

  window.addEventListener('message', (e) => {
    if (e.origin !== CHEM_ORIGIN) return;            // pin the child origin
    const msg = e.data;
    if (msg?.type === 'chemeditor:ready') {
      frame.contentWindow.postMessage(
        { type: 'chemeditor:set-structure', payload: { structure: 'CC(=O)Oc1ccccc1C(=O)O' } },
        CHEM_ORIGIN,                                  // pin the target origin
      );
    } else if (msg?.type === 'chemeditor:properties') {
      const { molfile, formula, molWt, exactMolWt } = msg.payload;
      // persist / display in the ELN form…
    }
  });
</script>
```

> Origin pinning is bidirectional: Goono pins the child origin
> (`chemeditor.example`) when sending and when filtering incoming messages; the
> iframe pins the Goono origin via `?parentOrigin=`. Both sides must set a
> concrete origin in production.

## Notes / limitations

- The Goono→chemeditor→Goono round trip is browser-side `postMessage` only; no
  Goono backend proxy is involved in this contract. The RDKit numbers come from
  the chemeditor FastAPI service the SPA already calls (see `frontend/src/lib/api.ts`).
- CORS for that FastAPI service is configured separately via
  `CHEM_ALLOWED_ORIGINS` (see `backend/app/main.py`) — unrelated to the
  `postMessage` origin pinning here.
- Pure contract logic (query parsing, message (de)serialization, origin check)
  lives in `frontend/src/lib/embed.ts` and is unit-tested in `embed.test.ts`;
  the React wiring is in `frontend/src/hooks/useEmbedBridge.ts`.
