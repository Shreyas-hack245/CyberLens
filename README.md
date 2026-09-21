# CyberLens — AI Security Investigation Platform

CyberLens is a SOC-style security investigation platform for analyzing PCAP files, security logs, and source-code findings with an AI-assisted investigation workflow.

## Core modules
- SOC dashboard
- PCAP analysis with Scapy
- Log analysis
- Security finding normalization
- AI investigation assistant
- Incident timeline
- IOC extraction
- MITRE ATT&CK mapping
- Report generation
- Case management

## Architecture

Frontend (React) -> FastAPI -> Analysis engines -> PostgreSQL
                                      -> AI service
                                      -> Report service

## Quick start

### Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The starter backend exposes `/api/health` and a safe demo PCAP-analysis endpoint structure.

## Safety
Only analyze systems, files, and network captures you are authorized to investigate. CyberLens is an investigation/defensive analysis platform, not an exploitation tool.
