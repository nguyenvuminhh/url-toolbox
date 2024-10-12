from fastapi import FastAPI
import joblib
from pydantic import BaseModel
import numpy as np
from preprocess import preprocess
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],  
    allow_methods=["*"],  
    allow_headers=["*"],  
)

model = joblib.load('model.pkl')

class InputData(BaseModel):
    url: str

class PredictionResponse(BaseModel):
    phisingProb: float
    label: int

@app.get('/ping')
async def pong():
    return "pong"

@app.post('/predict')
async def predict(data: InputData):
    data_array = preprocess(data.url)
    if data_array[0] == False:
        return PredictionResponse(phisingProb=1, label=1)
    prediction = model.predict(data_array[1])
    probabilities = model.predict_proba(data_array[1])
    return PredictionResponse(phisingProb=float(probabilities[0][1]), label=int(prediction[0])) 

if __name__ == "__main__":
    import uvicorn
    uvicorn.run('main:app', host="127.0.0.1", port=8000, reload=True)