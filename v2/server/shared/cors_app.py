from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def CorsApp(environment):
    app = FastAPI()

    origins = [
        'https://isitmybirth.day',
        'https://isitmybirth.day/',
        'https://www.isitmybirth.day',  
        'https://www.isitmybirth.day/',  
    ]

    if environment == 'dev':
        origins.append('http://localhost:8080')
        
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
        allow_headers=['*'],
    )
    
    return app
