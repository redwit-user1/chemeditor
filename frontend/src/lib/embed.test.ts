import { describe, expect, it } from 'vitest';
import {
  MSG_PROPERTIES,
  MSG_READY,
  MSG_SET_STRUCTURE,
  buildPropertiesMessage,
  buildReadyMessage,
  isOriginTrusted,
  parseSetStructure,
  readEmbedConfig,
} from './embed';

describe('readEmbedConfig', () => {
  it('is off by default', () => {
    expect(readEmbedConfig('')).toEqual({ embed: false, parentOrigin: '*' });
  });

  it('activates on embed=1', () => {
    expect(readEmbedConfig('?embed=1').embed).toBe(true);
  });

  it('accepts embed=true / yes', () => {
    expect(readEmbedConfig('?embed=true').embed).toBe(true);
    expect(readEmbedConfig('?embed=yes').embed).toBe(true);
  });

  it('treats other values as off', () => {
    expect(readEmbedConfig('?embed=0').embed).toBe(false);
    expect(readEmbedConfig('?embed=nope').embed).toBe(false);
  });

  it('reads parentOrigin and defaults to * when absent', () => {
    expect(readEmbedConfig('?embed=1&parentOrigin=https://eln.goono.io').parentOrigin).toBe(
      'https://eln.goono.io',
    );
    expect(readEmbedConfig('?embed=1').parentOrigin).toBe('*');
  });
});

describe('isOriginTrusted', () => {
  it('trusts everything when parentOrigin is *', () => {
    expect(isOriginTrusted('https://anything.example', '*')).toBe(true);
  });

  it('requires an exact match otherwise', () => {
    expect(isOriginTrusted('https://eln.goono.io', 'https://eln.goono.io')).toBe(true);
    expect(isOriginTrusted('https://evil.example', 'https://eln.goono.io')).toBe(false);
  });
});

describe('parseSetStructure', () => {
  it('extracts the structure from a valid message', () => {
    const data = { type: MSG_SET_STRUCTURE, payload: { structure: 'c1ccccc1' } };
    expect(parseSetStructure(data)).toBe('c1ccccc1');
  });

  it('rejects the wrong message type', () => {
    expect(parseSetStructure({ type: 'other', payload: { structure: 'C' } })).toBeNull();
  });

  it('rejects a missing / non-string structure', () => {
    expect(parseSetStructure({ type: MSG_SET_STRUCTURE, payload: {} })).toBeNull();
    expect(
      parseSetStructure({ type: MSG_SET_STRUCTURE, payload: { structure: 42 } }),
    ).toBeNull();
  });

  it('tolerates garbage input', () => {
    expect(parseSetStructure(null)).toBeNull();
    expect(parseSetStructure('string')).toBeNull();
    expect(parseSetStructure(undefined)).toBeNull();
    expect(parseSetStructure({ type: MSG_SET_STRUCTURE })).toBeNull();
  });
});

describe('message builders', () => {
  it('builds a ready message', () => {
    expect(buildReadyMessage()).toEqual({ type: MSG_READY });
  });

  it('builds a properties message carrying the molfile and numbers', () => {
    const msg = buildPropertiesMessage({
      molfile: 'MOLBLOCK',
      formula: 'C6H6',
      molWt: 78.11,
      exactMolWt: 78.0468,
    });
    expect(msg).toEqual({
      type: MSG_PROPERTIES,
      payload: { molfile: 'MOLBLOCK', formula: 'C6H6', molWt: 78.11, exactMolWt: 78.0468 },
    });
  });
});
