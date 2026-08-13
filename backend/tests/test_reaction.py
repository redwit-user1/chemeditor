"""Reaction parsing tests for the stoichiometry feature."""

from app.chem.reaction import parse_reaction


def test_esterification_reaction_smiles():
    result = parse_reaction("CC(=O)O.OCC>>CC(=O)OCC.O")
    assert result.ok
    assert [s.mol_formula for s in result.reactants] == ["C2H4O2", "C2H6O"]
    assert [s.mol_formula for s in result.products] == ["C4H8O2", "H2O"]
    acetic = result.reactants[0]
    assert abs(acetic.mol_weight - 60.05) < 0.01


def test_single_reactant_product():
    result = parse_reaction("c1ccccc1Br>>c1ccccc1O")
    assert result.ok
    assert len(result.reactants) == 1
    assert len(result.products) == 1
    assert result.products[0].mol_formula == "C6H6O"


def test_empty_input():
    result = parse_reaction("   ")
    assert result.ok is False
    assert result.error


def test_garbage_input_is_graceful():
    result = parse_reaction("not a reaction")
    assert result.ok is False
    assert result.error is not None


def test_weights_are_rdkit_values():
    # Reactant MW must match the standalone property engine.
    result = parse_reaction("CC(=O)Oc1ccccc1C(=O)O>>Oc1ccccc1C(=O)O.CC(=O)O")
    assert result.ok
    aspirin = result.reactants[0]
    assert aspirin.mol_formula == "C9H8O4"
    assert abs(aspirin.mol_weight - 180.16) < 0.01


# --- 화살표 위 시약(agent) ---------------------------------------------------
# 재단 지적: "화살표 위쪽 시약은 구조 인식이 되지 않습니다."
# 아마이드 커플링에서 HATU·TEA·용매는 화살표 위에 얹는다 — 반응물도 생성물도
# 아니지만 노트에는 반드시 남아야 하는 종이다.

_COUPLING = (
    "OC(=O)c1ccc(OCc2ccccc2)cc1.NCCc1c[nH]c2ccccc12"
    ">CN(C)C(On1nnc2cccnc21)=[N+](C)C.CCN(CC)CC.ClCCl"  # HATU · TEA · DCM
    ">O=C(NCCc1c[nH]c2ccccc12)c1ccc(OCc2ccccc2)cc1"
)


def test_above_arrow_reagents_are_parsed_as_agents():
    result = parse_reaction(_COUPLING)
    assert result.ok
    assert [s.mol_formula for s in result.agents] == ["C10H15N6O+", "C6H15N", "CH2Cl2"]
    assert all(s.role == "agent" for s in result.agents)
    # 반응물·생성물은 agent 를 읽기 시작해도 그대로다.
    assert len(result.reactants) == 2
    assert len(result.products) == 1


def test_agent_weights_are_rdkit_values():
    result = parse_reaction(_COUPLING)
    tea = next(s for s in result.agents if s.mol_formula == "C6H15N")
    assert abs(tea.mol_weight - 101.19) < 0.01


def test_reaction_without_agents_has_empty_agent_list():
    result = parse_reaction("CC(=O)O.OCC>>CC(=O)OCC.O")
    assert result.ok
    assert result.agents == []


def test_input_format_is_reported():
    # RXN 블록(V2000/V3000)에는 agent 를 담는 자리가 없다 — RDKit 왕복만 해도
    # 사라진다. 어느 포맷으로 들어왔는지 알아야 "왜 안 잡혔는지"를 말할 수 있다.
    assert parse_reaction(_COUPLING).input_format == "smiles"

    from rdkit.Chem import rdChemReactions

    rxn = rdChemReactions.ReactionFromSmarts(_COUPLING, useSmiles=True)
    block = rdChemReactions.ReactionToRxnBlock(rxn)
    from_block = parse_reaction(block)
    assert from_block.ok
    assert from_block.input_format == "rxnblock"
    # 이 포맷의 한계를 조용히 넘기지 않는다 — 빈 목록이 아니라 사실을 남긴다.
    assert from_block.agents == []
    assert from_block.agents_unsupported_in_format is True


# --- 시약 등록부의 구조가 그 이름의 물질인가 -------------------------------
# 재단이 이름을 짚어 요청한 시약(HATU)이 등록부에서 다른 물질이면, 불러오기
# 기능이 동작하는 것이 오히려 더 나쁘다 — 틀린 구조가 조용히 노트에 들어간다.

def test_named_coupling_reagents_have_their_own_structures():
    import sys, pathlib
    sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
    from app.reagents.inventory import REAGENTS

    by_name = {r.name: r for r in REAGENTS}
    # HATU = triazolo[4,5-b]pyridinium (아자벤조트리아졸) — 고리에 질소가 하나 더 있다.
    assert by_name["HATU"].mol_formula == "C10H15N6O+"
    # HBTU = 벤조트리아졸. 둘은 한 글자 차이로 다른 물질이고 MW 도 다르다.
    assert by_name["HBTU"].mol_formula == "C11H16N5O+"
    assert by_name["Triethylamine"].mol_formula == "C6H15N"
