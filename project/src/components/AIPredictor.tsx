import React, { useState, useEffect } from 'react';
import { Brain, Shield, Wind, Heart, AlertTriangle, CheckCircle, Info, RefreshCw, User, Calendar, Activity, Zap } from 'lucide-react';
import { AQIData, HealthMeasure } from '../types';
import { getAIInsight, getHealthMeasures } from '../data/mockData';

interface AIPredictorProps {
  data: AQIData;
  user: { name: string; age?: number };
}

const AIPredictor: React.FC<AIPredictorProps> = ({ data, user }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [insight, setInsight] = useState(getAIInsight(data.forecast));
  const [isLoadingHealthMeasures, setIsLoadingHealthMeasures] = useState(false);
  const [healthMeasures, setHealthMeasures] = useState(getHealthMeasures(data.aqi, user.age));

  const generateNewInsight = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setInsight(getAIInsight(data.forecast));
    setIsGenerating(false);
  };

  const refreshHealthMeasures = async () => {
    setIsLoadingHealthMeasures(true);
    
    // Simulate backend API calls with loading messages
    const loadingSteps = [
      'Analyzing your age profile...',
      'Connecting to health database...',
      'Calculating personalized recommendations...',
      'Fetching age-appropriate measures...',
      'Loading protective equipment data...',
      'Finalizing your health plan...'
    ];

    for (let i = 0; i < loadingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Refresh the health measures data with age consideration
    setHealthMeasures(getHealthMeasures(data.aqi, user.age));
    setIsLoadingHealthMeasures(false);
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'from-green-400 to-green-600';
    if (aqi <= 100) return 'from-yellow-400 to-yellow-600';
    if (aqi <= 150) return 'from-orange-400 to-orange-600';
    if (aqi <= 200) return 'from-red-400 to-red-600';
    return 'from-purple-400 to-purple-600';
  };

  const getAgeCategory = (age?: number) => {
    if (!age) return 'Adult';
    if (age < 18) return 'Youth';
    if (age < 35) return 'Young Adult';
    if (age < 55) return 'Adult';
    if (age < 70) return 'Senior Adult';
    return 'Elder';
  };

  const getAgeRiskLevel = (age?: number) => {
    if (!age) return 'Standard';
    if (age < 18 || age > 65) return 'High Risk';
    if (age > 55) return 'Moderate Risk';
    return 'Standard Risk';
  };

  return (
    <div className="space-y-6">
      {/* Personalized Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold">AI Health Assistant</h2>
            <p className="text-indigo-100">Personalized recommendations for {user.name}</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5" />
                <span className="font-semibold">{user.name}</span>
              </div>
              {user.age && (
                <div className="flex items-center gap-2 text-sm text-indigo-100">
                  <Calendar className="w-4 h-4" />
                  <span>Age {user.age} • {getAgeCategory(user.age)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Age-Based Risk Assessment */}
        {user.age && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Your Health Risk Profile</h3>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                getAgeRiskLevel(user.age) === 'High Risk' ? 'bg-red-500/20 text-red-100' :
                getAgeRiskLevel(user.age) === 'Moderate Risk' ? 'bg-yellow-500/20 text-yellow-100' :
                'bg-green-500/20 text-green-100'
              }`}>
                {getAgeRiskLevel(user.age)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <p className="text-sm text-white/70">Age Category</p>
                <p className="font-semibold">{getAgeCategory(user.age)}</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <p className="text-sm text-white/70">Protection Level</p>
                <p className="font-semibold">
                  {user.age < 18 || user.age > 65 ? 'Enhanced' : 'Standard'}
                </p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <p className="text-sm text-white/70">Sensitivity</p>
                <p className="font-semibold">
                  {user.age < 18 || user.age > 65 ? 'High' : user.age > 55 ? 'Moderate' : 'Normal'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${getAQIColor(data.aqi)} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
              {data.aqi <= 50 ? <CheckCircle className="w-6 h-6 text-white" /> : <AlertTriangle className="w-6 h-6 text-white" />}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Personalized Air Quality Assessment for {data.city}</h3>
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white/80">Analyzing health impacts for your age group...</span>
                </div>
              ) : (
                <p className="text-white/90 leading-relaxed">{insight}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={generateNewInsight}
            disabled={isGenerating}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            {isGenerating ? 'Analyzing...' : 'New Analysis'}
          </button>
          
          <button
            onClick={refreshHealthMeasures}
            disabled={isLoadingHealthMeasures}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${isLoadingHealthMeasures ? 'animate-spin' : ''}`} />
            {isLoadingHealthMeasures ? 'Refreshing...' : 'Refresh Recommendations'}
          </button>
        </div>
      </div>

      {/* Health Measures Loading State */}
      {isLoadingHealthMeasures ? (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Personalizing Health Measures</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-gray-600">Creating age-specific recommendations for {user.name}...</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-2">
                {[
                  'Analyzing your age profile...',
                  'Connecting to health database...',
                  'Calculating personalized recommendations...',
                  'Fetching age-appropriate measures...',
                  'Loading protective equipment data...',
                  'Finalizing your health plan...'
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Personalized Health Measures */
        <div className="space-y-6">
          {/* Age-Specific Guidelines */}
          {user.age && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Age-Specific Health Guidelines</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-3">For Your Age Group ({getAgeCategory(user.age)})</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    {user.age < 18 ? (
                      <>
                        <p>• Developing respiratory systems are more vulnerable</p>
                        <p>• Limit outdoor sports during high AQI days</p>
                        <p>• Always wear masks when AQI 100</p>
                        <p>• Ensure adequate indoor air filtration</p>
                      </>
                    ) : user.age > 65 ? (
                      <>
                        <p>• Higher risk due to potential underlying conditions</p>
                        <p>• Avoid outdoor activities when AQI 150</p>
                        <p>• Consider N95 masks for any outdoor exposure</p>
                        <p>• Monitor for respiratory symptoms closely</p>
                      </>
                    ) : user.age > 55 ? (
                      <>
                        <p>• Increased sensitivity to air pollution</p>
                        <p>• Reduce outdoor exercise when AQI 100</p>
                        <p>• Use quality masks for extended outdoor time</p>
                        <p>• Consider air purifiers for home/office</p>
                      </>
                    ) : (
                      <>
                        <p>• Generally resilient to moderate pollution</p>
                        <p>• Exercise caution when AQI 150</p>
                        <p>• Use masks during high pollution days</p>
                        <p>• Maintain good indoor air quality</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-3">Recommended Actions for AQI {data.aqi}</h4>
                  <div className="space-y-2 text-sm text-purple-700">
                    {data.aqi <= 50 ? (
                      <>
                        <p>• Enjoy all outdoor activities freely</p>
                        <p>• Perfect time for exercise and sports</p>
                        <p>• No special precautions needed</p>
                        <p>• Great day for outdoor family time</p>
                      </>
                    ) : data.aqi <= 100 ? (
                      <>
                        <p>• Outdoor activities are generally safe</p>
                        <p>• {user.age && (user.age < 18 || user.age > 65) ? 'Consider limiting prolonged exposure' : 'Normal activities are fine'}</p>
                        <p>• Monitor air quality if sensitive</p>
                        <p>• Keep windows open for ventilation</p>
                      </>
                    ) : data.aqi <= 150 ? (
                      <>
                        <p>• {user.age && (user.age < 18 || user.age > 65) ? 'Stay indoors when possible' : 'Limit outdoor activities'}</p>
                        <p>• Wear N95 masks when going outside</p>
                        <p>• Avoid outdoor exercise</p>
                        <p>• Use air purifiers indoors</p>
                      </>
                    ) : (
                      <>
                        <p>• Stay indoors as much as possible</p>
                        <p>• Wear N95/N99 masks for any outdoor exposure</p>
                        <p>• Avoid all outdoor physical activities</p>
                        <p>• Seal windows and use air purifiers</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Masks */}
          {healthMeasures.masks.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-500" />
                Recommended Masks for {user.name} (Age {user.age || 'Adult'})
              </h3>
              <p className="text-gray-600 mb-6">
                Based on current AQI {data.aqi} in {data.city} and your age profile, these masks provide optimal protection:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {healthMeasures.masks.map((mask, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{mask.name}</h4>
                      {user.age && (user.age < 18 || user.age > 65) && mask.name.includes('N95') && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{mask.effectiveness}</p>
                    <p className="text-lg font-bold text-purple-600 mb-3">{mask.price}</p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700">
                        {mask.name.includes('N95') || mask.name.includes('KN95') 
                          ? `Ideal for ${getAgeCategory(user.age)} - Filters 95% of airborne particles`
                          : mask.name.includes('N99') || mask.name.includes('P3')
                          ? `Premium protection for ${getAgeRiskLevel(user.age)} individuals`
                          : 'Basic protection for low pollution days'
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Air Purifiers */}
          {healthMeasures.purifiers.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wind className="w-6 h-6 text-green-500" />
                Recommended Air Purifiers for Indoor Protection
              </h3>
              <p className="text-gray-600 mb-6">
                Create a clean air sanctuary in your home with these HEPA-certified air purifiers, 
                {user.age && (user.age < 18 || user.age > 65) ? ' especially important for your age group:' : ':'}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {healthMeasures.purifiers.map((purifier, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">{purifier.name}</h4>
                      {user.age && (user.age < 18 || user.age > 65) && index === 0 && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                          Age Priority
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-gray-600">{purifier.roomSize}</span>
                      <span className="text-xl font-bold text-green-600">{purifier.price}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {purifier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-700">
                        HEPA filtration removes 99.97% of particles ≥0.3 microns - 
                        {user.age && (user.age < 18 || user.age > 65) 
                          ? ' Essential for protecting vulnerable age groups'
                          : ' Excellent for maintaining healthy indoor air'
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personalized Health Tips */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Personalized Health Tips for {user.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Tailored recommendations based on AQI {data.aqi} and your age profile:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthMeasures.general.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Important Health Notice for {getAgeCategory(user.age)}
              </h4>
              <p className="text-sm text-red-700">
                {data.aqi <= 50 
                  ? 'Air quality is excellent. Perfect day for all activities regardless of age.'
                  : data.aqi <= 100
                  ? user.age && (user.age < 18 || user.age > 65)
                    ? 'Sensitive age group: Monitor symptoms and limit prolonged outdoor exposure.'
                    : 'Air quality is acceptable. Sensitive individuals should monitor symptoms.'
                  : data.aqi <= 150
                  ? user.age && (user.age < 18 || user.age > 65)
                    ? 'High risk age group: Stay indoors. Use N95 masks for any outdoor exposure.'
                    : 'Everyone should reduce outdoor activities. Children and elderly should stay indoors.'
                  : user.age && (user.age < 18 || user.age > 65)
                  ? 'Critical health emergency for your age group. Avoid all outdoor activities and use multiple air purifiers indoors.'
                  : 'Health emergency conditions. Avoid all outdoor activities and use air purifiers indoors.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictor;