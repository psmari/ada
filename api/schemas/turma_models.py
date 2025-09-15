from typing import Optional
from pydantic import BaseModel


class TurmaBase(BaseModel):
    nome: str
    cod_turma: str
    materia: Optional[str] = None
    dna: Optional[str] = None

class TurmaRead(TurmaBase):
    id: int

    class Config:
        from_attributes = True # Permite que o Pydantic funcione com modelos ORM

class TurmaUpsert(TurmaBase):
    id: Optional[int] = None