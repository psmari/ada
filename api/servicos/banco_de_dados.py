import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

DB_USER = os.getenv("DATABASE_USER")
DB_PASSWORD = os.getenv("DATABASE_PASSWORD")
DB_HOST = os.getenv("DATABASE_HOST", "localhost")
DB_PORT = os.getenv("DATABASE_PORT", 3306)
DB_NAME = os.getenv("DATABASE_NAME")

if not all([DB_USER, DB_PASSWORD, DB_NAME]):
    raise ValueError("Variáveis de ambiente essenciais do banco de dados não foram definidas.")

DATABASE_URL = f"mysql+aiomysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_async_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db():
    """
    Esta função é uma dependência do FastAPI que gerencia o ciclo de vida da sessão.
    Ela garante que a sessão com o banco de dados seja sempre fechada após a requisição.
    """
    async with SessionLocal() as session:
        yield session