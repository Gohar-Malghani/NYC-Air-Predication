from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict
import joblib
import pandas as pd

MODEL_PATH = "Model_Pipline.pkl"

COLUMNS = [
    "latitude",
    "longitude",
    "price",
    "minimum_nights",
    "number_of_reviews",
    "reviews_per_month",
    "calculated_host_listings_count",
    "availability_365",
    "neighbourhood_group",
    "neighbourhood",
]

model = joblib.load(MODEL_PATH)

app = FastAPI(
    title="NYC Airbnb Listing Predictor",
    description=(
        "A lightweight FastAPI service and frontend for predicting the likely class of "
        "a New York City short-term rental listing using an ML pipeline."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Features(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    latitude: float = Field(..., ge=-90, le=90, description="Latitude must be between -90 and 90")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude must be between -180 and 180")
    price: float = Field(..., gt=0, description="Price must be greater than 0")
    minimum_nights: int = Field(..., ge=1, le=365, description="Minimum nights must be between 1 and 365")
    number_of_reviews: int = Field(..., ge=0, description="Number of reviews must be non-negative")
    reviews_per_month: float = Field(..., ge=0, description="Reviews per month must be non-negative")
    calculated_host_listings_count: int = Field(..., ge=0, description="Host listing count must be non-negative")
    availability_365: int = Field(..., ge=0, le=365, description="Availability must be between 0 and 365")
    neighbourhood_group: str = Field(..., description="One of: Bronx, Brooklyn, Manhattan, Queens, Staten Island")
    neighbourhood: str = Field(..., min_length=1, description="Neighbourhood name")


class PredictionResponse(BaseModel):
    prediction: int | str
    probability: list[list[float]]


@app.get("/")
def home():
    return {
        "message": "NYC Airbnb Listing Predictor API is running.",
        "docs": "/docs",
        "predict": "/predict",
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict(features: Features):
    payload = features.model_dump()
    row = pd.DataFrame([payload], columns=COLUMNS)

    prediction = model.predict(row)
    probability = model.predict_proba(row)

    return {
        "prediction": prediction[0],
        "probability": probability.tolist(),
    }
