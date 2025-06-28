# ML Models Directory

This directory contains the machine learning models for AQI prediction.

## File Structure

```
ml_models/
├── README.md                    # This file
├── aqi_prediction_model.pkl     # Trained Random Forest model for AQI prediction
├── feature_scaler.pkl          # StandardScaler for feature normalization
├── train_model.py              # Script to train your custom model
└── model_evaluation.py         # Script to evaluate model performance
```

## How to Replace with Your Models

### 1. Replace the Model Files

Replace these files with your trained models:

- `aqi_prediction_model.pkl` - Your trained AQI prediction model
- `feature_scaler.pkl` - Your feature scaler/preprocessor

### 2. Model Requirements

Your model should:
- Accept 7 features: [hour, day_of_week, month, temperature, humidity, wind_speed, pressure]
- Output AQI predictions (20-300 range)
- Be saved using pickle format

### 3. Feature Format

Input features expected by the model:
```python
features = [
    hour,           # 0-23
    day_of_week,    # 0-6 (Monday=0)
    month,          # 0-11 (January=0)
    temperature,    # Celsius
    humidity,       # Percentage (0-100)
    wind_speed,     # km/h
    pressure        # mb
]
```

### 4. Integration Steps

1. **Save your model:**
   ```python
   import pickle
   
   # Save your trained model
   with open('ml_models/aqi_prediction_model.pkl', 'wb') as f:
       pickle.dump(your_model, f)
   
   # Save your scaler
   with open('ml_models/feature_scaler.pkl', 'wb') as f:
       pickle.dump(your_scaler, f)
   ```

2. **Test the integration:**
   ```bash
   python app.py
   ```

3. **Verify API endpoint:**
   ```
   GET http://localhost:5000/api/ml-predict/Delhi
   ```

### 5. Expected Output Format

Your model predictions will be displayed in the frontend graph showing:
- 168 hours (7 days) of predictions
- Hourly AQI values
- Quality categories
- Timestamps

### 6. Model Performance

The frontend expects:
- Realistic AQI values (20-300)
- Smooth transitions between hours
- City-specific patterns
- Quality categorization

## Sample Training Script

Create `train_model.py` to train your model:

```python
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pickle

# Load your training data
# data = pd.read_csv('your_training_data.csv')

# Train your model
# model = RandomForestRegressor(n_estimators=100)
# scaler = StandardScaler()

# Save models
# with open('aqi_prediction_model.pkl', 'wb') as f:
#     pickle.dump(model, f)
# with open('feature_scaler.pkl', 'wb') as f:
#     pickle.dump(scaler, f)
```

## Troubleshooting

1. **Model not loading:** Check file paths and pickle compatibility
2. **Prediction errors:** Verify feature format and scaling
3. **Performance issues:** Ensure model size is reasonable for web deployment

## API Integration

The model is automatically integrated with:
- `/api/ml-predict/<city_name>` endpoint
- Frontend graph visualization
- Real-time prediction updates
- 168-hour forecast display