from fastapi import FastAPI
import pandas as pd
from pydantic import BaseModel,Field
import joblib
from fastapi.middleware.cors import CORSMiddleware


COLUMNS = ['latitude', 'longitude', 'price', 'minimum_nights', 'number_of_reviews', 'reviews_per_month', 'calculated_host_listings_count', 'availability_365', 'neighbourhood_group', 'neighbourhood']

model = joblib.load("Model_Pipline.pkl")

app   =FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Features(BaseModel):
    latitude: float = Field(...,ge=-90, le=90, description="Latitude must be between -90 and 90")
    longitude: float = Field(...,ge=-180, le=180, description="Longitude must be between -180 and 180")
    price: float = Field(...,gt=0, description="Price must be greater than 0")
    minimum_nights: int = Field(...,ge=1,le=365, description="Minimum nights must be at least 1")
    number_of_reviews: int = Field(...,ge=0, description="Number of reviews must be non-negative")
    reviews_per_month: float = Field(...,ge=0, description="Reviews per month must be non-negative")
    calculated_host_listings_count: int = Field(...,ge=0, description="Calculated host listings count must be non-negative")
    availability_365: int = Field(...,ge=0,le=365, description="Availability 365 must be between 0 and 365")
    neighbourhood_group: str = Field(..., description="Neighbourhood group must be one of 'Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'")
    neighbourhood: str = Field(..., description="Neighbourhood must be a valid string")

















@app.get("/")
def home():
    return {"message": "Hello, World!"}

@app.post("/predict")
def predict(features:Features):
    row = pd.DataFrame([features.dict()], columns=COLUMNS)
    prediction = model.predict(row)
    probability = model.predict_proba(row)
    return {"prediction": prediction[0], "probability": probability.tolist()}