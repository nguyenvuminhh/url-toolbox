from fastapi import FastAPI
import joblib
from pydantic import BaseModel
import numpy as np
from preprocess import preprocess

app = FastAPI()

model = joblib.load('model.pkl')

class InputData(BaseModel):
    url: str

class PredictionResponse(BaseModel):
    phisingProb: float
    label: int

@app.post('/predict')
async def predict(data: InputData):
    data_array = preprocess(data.url)
    print(data_array)
    prediction = model.predict(data_array)
    probabilities = model.predict_proba(data_array)
    print(probabilities)
    return PredictionResponse(phisingProb=float(probabilities[0][0]), label=int(prediction[0])) 
    #return prediction #{'prediction': int(prediction[0])}