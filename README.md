# NYC Air Predication

A polished, end-to-end NYC short-term rental listing prediction app that combines a trained machine-learning model with a clean web interface. This project lets users input listing details such as borough, neighbourhood, nightly price, and host information, then returns a prediction and probability breakdown from a local FastAPI service.

## Overview

The application is structured as:
- A FastAPI backend (`main.py`) that serves the trained ML model
- A frontend dashboard (`index.html`, `script.js`, `style.css`) for entering listing data and viewing prediction results
- A serialized model file (`Model_Pipline.pkl`) that contains the trained prediction pipeline

This project is designed to demonstrate a practical ML deployment workflow using Python, scikit-learn, FastAPI, and a lightweight browser-based UI.

## Features

- NYC listing prediction from structured listing attributes
- Borough and neighbourhood-aware input form
- Real-time prediction request to a local API
- Probability breakdown for each predicted category
- Health check endpoint for quick API validation
- Modern, dark-themed user interface for a more professional presentation

## Tech Stack

- Python
- FastAPI
- Pandas
- scikit-learn
- Joblib
- HTML / CSS / JavaScript

## Project Structure

```text
NYC-Air-Predication/
├── main.py                  # FastAPI application and prediction endpoint
├── Model_Pipline.pkl       # Serialized trained ML pipeline
├── index.html              # Frontend UI layout
├── script.js               # Frontend logic and API calls
├── style.css               # Styling and dashboard theme
├── requirements.txt        # Python dependencies
├── README.md               # Project documentation
├── .gitignore              # Common generated files
└── __pycache__/            # Python cache files (ignored in Git)
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Gohar-Malghani/NYC-Air-Predication.git
cd NYC-Air-Predication
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
source .venv/bin/activate    # macOS / Linux
# .venv\Scripts\activate    # Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## Running the API

Start the FastAPI server from the project root:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The app will then be available at:
- API docs: http://127.0.0.1:8000/docs
- Health check: http://127.0.0.1:8000/health
- Prediction endpoint: http://127.0.0.1:8000/predict

## Running the Frontend

Open `index.html` in a browser, or serve it locally if desired:

```bash
python -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080
```

The frontend is preconfigured to call the local API at:

```text
http://127.0.0.1:8000
```

## API Request Example

Send a POST request to `/predict` with JSON like this:

```json
{
  "latitude": 40.7128,
  "longitude": -73.9352,
  "price": 180,
  "minimum_nights": 2,
  "number_of_reviews": 24,
  "reviews_per_month": 1.75,
  "calculated_host_listings_count": 1,
  "availability_365": 200,
  "neighbourhood_group": "Brooklyn",
  "neighbourhood": "Williamsburg"
}
```

Example response:

```json
{
  "prediction": 1,
  "probability": [[0.12, 0.26, 0.62]]
}
```

## Model Behavior

The model expects specific listing features related to NYC rental characteristics. These include:
- geographic location
- price
- minimum stay requirement
- review count and frequency
- host listing count
- annual availability
- borough and neighbourhood information

The model then returns a predicted class and the confidence score for each category.

## Development Notes

- The backend is intentionally lightweight and easy to extend.
- The frontend is static and designed to work with a local FastAPI backend.
- Future improvements could include a real database, richer features, input validation, and deployment to cloud hosting.

## License

This project is provided for educational and portfolio purposes. Add a license file if you want to distribute it publicly under a specific open-source license.

## Author

Gohar Malghani

## Status

This repository is ready for local development and demonstration. It has been cleaned up and documented for a more professional presentation.
