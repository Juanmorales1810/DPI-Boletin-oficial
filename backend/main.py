from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.db import init_db
from routers.routerBoletin import routerBO

app = FastAPI()

origins=[
    "http://localhost",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(routerBO)

