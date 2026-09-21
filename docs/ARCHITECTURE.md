# CyberLens Architecture

## Data flow

1. Analyst creates a case.
2. Evidence is uploaded.
3. Specialized analyzers extract structured observations.
4. Findings are normalized into a common schema.
5. IOC extraction and MITRE mapping enrich the evidence.
6. AI receives only the case context and analyst question.
7. AI response is stored with evidence references.
8. Analyst validates findings.
9. Report service generates the case report.

## Planned production modules

- `analyzers/pcap`
- `analyzers/logs`
- `analyzers/code`
- `enrichment/ioc`
- `enrichment/mitre`
- `ai/rag`
- `reports`
- `cases`
- `auth`
- `audit`

AI should never be the sole source of truth for an incident decision.
