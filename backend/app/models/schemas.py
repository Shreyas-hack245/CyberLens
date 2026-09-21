from pydantic import BaseModel
from typing import List, Optional

class IOC(BaseModel):
    value: str
    type: str
    confidence: Optional[float] = None

class Finding(BaseModel):
    title: str
    severity: str
    description: str
    evidence: List[str] = []
