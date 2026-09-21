from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import tempfile

from .services.pcap_analyzer import analyze_pcap

app = FastAPI(title="CyberLens API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "cyberlens-api"}

@app.get("/api/dashboard")
def dashboard():
    return {
        "open_incidents": 7,
        "critical_alerts": 3,
        "suspicious_iocs": 24,
        "cases_today": 12,
    }

@app.post("/api/analyze/pcap")
async def pcap_endpoint(file: UploadFile = File(...)):
    suffix = Path(file.filename or "capture.pcap").suffix or ".pcap"
    data = await file.read()

    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(data)
        tmp_path = tmp.name

    try:
        return analyze_pcap(tmp_path)
    finally:
        Path(tmp_path).unlink(missing_ok=True)
