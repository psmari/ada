from sqlalchemy import Column, Integer, String, Text

from servicos.banco_de_dados import Base

class Turma(Base):
    __tablename__ = "turmas"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False)
    cod_turma = Column(String(50), unique=True, index=True, nullable=False)
    materia = Column(String(255), nullable=True)
    dna = Column(Text(), nullable=True)