from pydantic import BaseModel

class DnaResponse(BaseModel):
    dna_turma: str
