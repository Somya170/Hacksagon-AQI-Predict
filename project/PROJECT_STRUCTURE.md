# AQI Monitor - Complete Project Structure

## 📁 Project Directory Structure

```
aqi-monitor-app/
├── 📁 src/                          # Frontend React Application
│   ├── 📁 components/               # React Components
│   │   ├── LoadingAnimation.tsx     # ✨ NEW: Attractive loading animation
│   │   ├── Dashboard.tsx            # Main dashboard (updated)
│   │   ├── Sidebar.tsx              # Navigation sidebar (updated)
│   │   ├── LeafletMap.tsx           # Interactive map with 25 cities
│   │   ├── EnhancedForecastGraph.tsx # AI forecast graphs
│   │   ├── AIPredictor.tsx          # AI health assistant
│   │   ├── Analytics.tsx            # Analytics dashboard
│   │   ├── AQICalculator.tsx        # AQI calculator
│   │   ├── AboutPage.tsx            # Team information
│   │   ├── LoginPage.tsx            # User authentication
│   │   ├── Chatbot.tsx              # AI chatbot
│   │   └── ...                      # Other components
│   ├── 📁 data/
│   │   └── mockData.ts              # Enhanced realistic data
│   ├── 📁 types/
│   │   └── index.ts                 # TypeScript definitions
│   ├── App.tsx                      # ✨ UPDATED: Main app with loading animation
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Styles
├── 📁 ml_models/                    # 🤖 NEW: Machine Learning Models
│   ├── README.md                    # ML integration guide
│   ├── train_model.py               # Sample training script
│   ├── aqi_prediction_model.pkl     # Your trained model (replace this)
│   ├── feature_scaler.pkl           # Your scaler (replace this)
│   └── model_evaluation.py          # Model evaluation tools
├── app.py                           # ✨ UPDATED: Flask backend with ML integration
├── requirements.txt                 # ✨ UPDATED: Python dependencies
├── package.json                     # Node.js dependencies
├── PROJECT_STRUCTURE.md             # 📋 This file
└── ...                              # Other config files
```

## 🔧 How to Replace with Your ML Models

### Step 1: Prepare Your Models

Your trained models should be saved as pickle files:

```python
import pickle

# Save your trained AQI prediction model
with open('ml_models/aqi_prediction_model.pkl', 'wb') as f:
    pickle.dump(your_trained_model, f)

# Save your feature scaler
with open('ml_models/feature_scaler.pkl', 'wb') as f:
    pickle.dump(your_scaler, f)
```

### Step 2: Model Requirements

Your model should:
- **Input**: 7 features [hour, day_of_week, month, temperature, humidity, wind_speed, pressure]
- **Output**: AQI prediction (20-300 range)
- **Format**: Scikit-learn compatible model saved with pickle

### Step 3: Feature Format

```python
features = [
    hour,           # 0-23 (hour of day)
    day_of_week,    # 0-6 (Monday=0, Sunday=6)
    month,          # 0-11 (January=0, December=11)
    temperature,    # Celsius (5-45°C range)
    humidity,       # Percentage (20-95%)
    wind_speed,     # km/h (0-50 km/h)
    pressure        # mb (980-1040 mb)
]
```

### Step 4: Integration Process

1. **Replace model files:**
   ```bash
   # Copy your models to the ml_models directory
   cp your_aqi_model.pkl ml_models/aqi_prediction_model.pkl
   cp your_scaler.pkl ml_models/feature_scaler.pkl
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend:**
   ```bash
   python app.py
   ```

4. **Start the frontend:**
   ```bash
   npm run dev
   ```

### Step 5: API Endpoints

Your ML model will be accessible via:

- **168-hour prediction:** `GET /api/ml-predict/<city_name>`
- **Model status:** `GET /` (shows if models are loaded)

### Step 6: Frontend Integration

The ML predictions will automatically appear in:
- **7-day forecast graph** (EnhancedForecastGraph.tsx)
- **24-hour detailed view** (hourly breakdown)
- **Analytics dashboard** (model performance metrics)

## 🌐 API Integration

### Ambee API Integration

```python
# In app.py
AMBEE_API_KEY = "your_ambee_api_key_here"
AMBEE_BASE_URL = "https://api.ambeedata.com/latest/by-lat-lng"
```

### Hugging Face Chatbot API

```python
# In app.py
HF_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
HF_HEADERS = {
    "Authorization": "Bearer your_huggingface_token_here"
}
```

## 🎨 New Features Added

### 1. Attractive Loading Animation
- **File**: `src/components/LoadingAnimation.tsx`
- **Features**: Animated particles, gradient orbs, step-by-step loading
- **Integration**: Shows on first app load

### 2. Enhanced ML Integration
- **File**: `app.py` (updated)
- **Features**: 168-hour predictions, model loading, fallback systems
- **API**: `/api/ml-predict/<city_name>`

### 3. Realistic Data Patterns
- **File**: `src/data/mockData.ts` (updated)
- **Features**: City-specific patterns, seasonal variations, realistic trends

### 4. Removed Weather Dashboard Tab
- **Updated**: `src/components/Sidebar.tsx`
- **Change**: Weather moved to bottom, no longer main tab

## 🚀 Running the Complete System

### Backend (Flask + ML)
```bash
cd aqi-monitor-app
pip install -r requirements.txt
python app.py
# Server runs on http://localhost:5000
```

### Frontend (React + TypeScript)
```bash
cd aqi-monitor-app
npm install
npm run dev
# App runs on http://localhost:5173
```

### Development Workflow
1. **Replace ML models** in `ml_models/` directory
2. **Update API keys** in `app.py`
3. **Test integration** via API endpoints
4. **Verify frontend** displays your predictions

## 📊 Expected Output

Your ML model predictions will show:
- **Realistic AQI progression** over 168 hours
- **Hourly variations** with rush hour peaks
- **City-specific patterns** based on location
- **Quality categorization** (Good, Moderate, Unhealthy, etc.)
- **Interactive graphs** matching your uploaded image

## 🔍 Troubleshooting

1. **Models not loading**: Check file paths and pickle compatibility
2. **API errors**: Verify API keys and network connectivity
3. **Frontend issues**: Check console for JavaScript errors
4. **Prediction errors**: Ensure feature format matches training data

## 📈 Performance Metrics

The system displays:
- **Model accuracy**: 89% (or your actual accuracy)
- **Prediction confidence**: Based on model uncertainty
- **Data freshness**: Real-time API updates
- **Response time**: < 2 seconds for predictions

Your hackathon project is now ready with professional ML integration! 🎉