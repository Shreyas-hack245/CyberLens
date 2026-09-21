# API plan

GET `/api/health` — service health

GET `/api/dashboard` — SOC summary

POST `/api/analyze/pcap` — upload an authorized PCAP for defensive analysis

Planned:
- POST `/api/cases`
- GET `/api/cases/{id}`
- POST `/api/cases/{id}/evidence`
- POST `/api/cases/{id}/ask`
- GET `/api/cases/{id}/timeline`
- GET `/api/cases/{id}/report`
