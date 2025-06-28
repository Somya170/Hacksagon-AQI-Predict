# -*- coding: utf-8 -*-
"""
Prophet AQI Prediction Model
Adapted from your Google Colab notebook for Flask integration
"""

import pandas as pd
from prophet import Prophet
import numpy as np
import os
from datetime import datetime, timedelta
import pickle

class ProphetAQIModel:
    def __init__(self, data_file_path=None):
        """
        Initialize Prophet AQI Model
        
        Args:
            data_file_path: Path to the Master Datasheet AQI.xlsx file
        """
        self.model = None
        self.data = None
        self.data_file_path = data_file_path or "ml_models/Master_Datasheet_AQI.xlsx"
        
    def load_data(self):
        """Load the Master Datasheet AQI data"""
        try:
            if os.path.exists(self.data_file_path):
                print(f"📊 Loading data from {self.data_file_path}")
                self.data = pd.read_excel(self.data_file_path)
                
                # Convert datetime column
                self.data['datetimeLocal'] = pd.to_datetime(self.data['datetimeLocal'])
                
                # Ensure AQI is numeric
                self.data['AQI'] = pd.to_numeric(self.data['AQI'], errors='coerce')
                self.data = self.data.dropna(subset=['AQI'])  # Drop rows with missing AQI
                
                print(f"✅ Data loaded successfully: {len(self.data)} records")
                print(f"📍 Cities available: {self.data['location_name'].unique()}")
                return True
            else:
                print(f"⚠️ Data file not found: {self.data_file_path}")
                return False
        except Exception as e:
            print(f"❌ Error loading data: {e}")
            return False
    
    def train_model_for_city(self, city_name):
        """
        Train Prophet model for a specific city
        
        Args:
            city_name: Name of the city to train model for
            
        Returns:
            Trained Prophet model or None if failed
        """
        try:
            if self.data is None:
                print("❌ No data loaded. Call load_data() first.")
                return None
            
            # Filter city-specific data
            city_df = self.data[self.data['location_name'].str.lower() == city_name.lower()].copy()
            
            if city_df.empty:
                print(f"❌ No data found for {city_name}")
                available_cities = self.data['location_name'].unique()[:10]  # Show first 10
                print(f"Available cities: {', '.join(available_cities)}")
                return None
            
            print(f"🔄 Training Prophet model for {city_name} with {len(city_df)} data points")
            
            # Prepare data for Prophet
            prophet_df = city_df[['datetimeLocal', 'AQI']].rename(columns={
                'datetimeLocal': 'ds',
                'AQI': 'y'
            })
            
            # Sort by date
            prophet_df = prophet_df.sort_values('ds').reset_index(drop=True)
            
            # Initialize and fit Prophet model
            model = Prophet(
                daily_seasonality=True,
                weekly_seasonality=True,
                yearly_seasonality=True,
                seasonality_mode='multiplicative',
                changepoint_prior_scale=0.05
            )
            
            model.fit(prophet_df)
            
            print(f"✅ Prophet model trained successfully for {city_name}")
            return model
            
        except Exception as e:
            print(f"❌ Error training model for {city_name}: {e}")
            return None
    
    def predict_aqi_for_city(self, city_name, start_datetime, hours_ahead=168):
        """
        Predict AQI for a city using Prophet model
        
        Args:
            city_name: Name of the city
            start_datetime: Starting datetime for prediction
            hours_ahead: Number of hours to predict (default 168 = 7 days)
            
        Returns:
            List of predictions with datetime and AQI values
        """
        try:
            # Train model for the city
            model = self.train_model_for_city(city_name)
            if model is None:
                return None
            
            # Create future dataframe (168 hours from input date)
            start_time = pd.to_datetime(start_datetime)
            future_dates = pd.date_range(start=start_time, periods=hours_ahead, freq='H')
            future_df = pd.DataFrame({'ds': future_dates})
            
            # Make predictions
            print(f"🔮 Generating {hours_ahead}-hour forecast for {city_name}")
            forecast = model.predict(future_df)
            
            # Extract predictions and ensure realistic bounds
            predictions = []
            for i, row in forecast.iterrows():
                predicted_aqi = max(20, min(300, row['yhat']))  # Bound between 20-300
                
                # Determine quality category
                if predicted_aqi <= 50:
                    quality = 'Good'
                elif predicted_aqi <= 100:
                    quality = 'Moderate'
                elif predicted_aqi <= 150:
                    quality = 'Unhealthy for Sensitive Groups'
                elif predicted_aqi <= 200:
                    quality = 'Unhealthy'
                elif predicted_aqi <= 300:
                    quality = 'Very Unhealthy'
                else:
                    quality = 'Hazardous'
                
                predictions.append({
                    'hour': i,
                    'datetime': row['ds'].isoformat(),
                    'aqi': round(predicted_aqi),
                    'quality': quality,
                    'confidence_lower': max(20, row['yhat_lower']),
                    'confidence_upper': min(300, row['yhat_upper'])
                })
            
            print(f"✅ Generated {len(predictions)} predictions for {city_name}")
            return predictions
            
        except Exception as e:
            print(f"❌ Error predicting for {city_name}: {e}")
            return None
    
    def get_available_cities(self):
        """Get list of available cities in the dataset"""
        if self.data is not None:
            return sorted(self.data['location_name'].unique().tolist())
        return []

# Global Prophet model instance
prophet_model = ProphetAQIModel()

def initialize_prophet_model():
    """Initialize the Prophet model with data"""
    global prophet_model
    
    # Try to load the data
    if prophet_model.load_data():
        print("✅ Prophet AQI model initialized successfully")
        return True
    else:
        print("⚠️ Prophet model initialization failed - using fallback")
        return False

def predict_with_prophet(city_name, hours_ahead=168):
    """
    Use Prophet model to predict AQI for a city
    
    Args:
        city_name: Name of the city
        hours_ahead: Number of hours to predict
        
    Returns:
        List of predictions or None if failed
    """
    global prophet_model
    
    try:
        # Use current datetime as starting point
        start_datetime = datetime.now()
        
        # Get predictions
        predictions = prophet_model.predict_aqi_for_city(
            city_name=city_name,
            start_datetime=start_datetime,
            hours_ahead=hours_ahead
        )
        
        return predictions
        
    except Exception as e:
        print(f"❌ Prophet prediction error: {e}")
        return None