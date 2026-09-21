def build_investigation_prompt(case_context: dict, question: str) -> str:
    return f'''You are an authorized SOC investigation assistant.
Use only the supplied evidence. Clearly separate observed facts,
inferences, and unknowns. Do not invent indicators.

CASE:
{case_context}

ANALYST QUESTION:
{question}

Return:
1. Evidence
2. Interpretation
3. Confidence
4. Recommended defensive next steps
5. Missing evidence
'''
