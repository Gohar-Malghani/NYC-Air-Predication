# NYC Air Predication

A small full-stack project for predicting the likely class of a New York City Airbnb listing using a machine learning model. The repo includes:

- a FastAPI backend that serves predictions
- a browser-based UI for entering listing features
- a trained scikit-learn pipeline saved as `Model_Pipline.pkl`
- borough-aware neighbourhood suggestions for NYC listings

## Overview

This project predicts a listing category based on features such as:

- latitude and longitude
- price
- minimum nights
- review count and review rate
- host listing count
- annual availability
- borough and neighbourhood

The backend exposes a `/predict` endpoint and returns a predicted class along with per-class probabilities.

## Tech stack

- Python
- FastAPI
- scikit-learn
- pandas
- joblib
- HTML / CSS / JavaScript

## Project structure

```text
.
├── README.md
├── Model_Pipline.pkl
├── main.py
├── index.html
├── style.css
├── script.js
├── requirements.txt
├── __pycache__/
└── .gitignore
```

## Features

- Predict Airbnb listing class from structured listing attributes
- Interactive front-end form with sample values
- API health check and status indicator
- Live probability bars in the UI
- FastAPI Swagger docs at `/docs`

## Getting started

### 1) Clone the repository

```bash
git clone https://github.com/Gohar-Malghani/NYC-Air-Predication.git
cd NYC-Air-Predication
```

### 2) Create a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
```

### 3) Install dependencies

```bash
pip install -r requirements.txt
```

### 4) Run the API server

```bash
uvicorn main:app --reload
```

The app will run at:

- API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Using the web app

Open `index.html` in a browser, or serve the frontend from a simple local static server if preferred.

The page includes:

- a borough selector
- a neighbourhood field with NYC suggestions
- numeric listing inputs
- a "Use sample data" button
- prediction results with confidence and class probabilities

Make sure the API base URL in the page matches your running backend URL (default is usually `http://localhost:8000`).

## Example API request

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 40.71455,
    "longitude": -73.95765,
    "price": 145,
    "minimum_nights": 2,
    "number_of_reviews": 38,
    "reviews_per_month": 1.85,
    "calculated_host_listings_count": 1,
    "availability_365": 210,
    "neighbourhood_group": "Brooklyn",
    "neighbourhood": "Williamsburg"
  }'
```

## Example response

```json
{
  "prediction": 2,
  "probability": [[0.12, 0.23, 0.58, 0.07]]
}
```

The `prediction` value is the model's predicted class index, and `probability` contains the model's confidence for each class.

## Notes

- The saved model file is expected to be in the repository root as `Model_Pipline.pkl`.
- The frontend and API are designed for local demonstration and experimentation.
- This project is useful for learning how to combine a trained ML model with a FastAPI backend and a lightweight web interface.

## License

This project does not currently declare a license. If you intend to share or reuse it publicly, add an appropriate open-source license before distribution.
