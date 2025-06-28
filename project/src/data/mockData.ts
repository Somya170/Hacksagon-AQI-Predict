import { AQIData, City } from '../types';

export const topCities: City[] = [
  { name: 'Delhi', aqi: 168, quality: 'Unhealthy' },
  { name: 'Mumbai', aqi: 95, quality: 'Moderate' },
  { name: 'Hyderabad', aqi: 92, quality: 'Moderate' },
  { name: 'Bhopal', aqi: 112, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Indore', aqi: 105, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Ahmedabad', aqi: 125, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Chennai', aqi: 78, quality: 'Moderate' },
  { name: 'Gwalior', aqi: 145, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Jaipur', aqi: 135, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Varanasi', aqi: 152, quality: 'Unhealthy' },
  { name: 'Nagpur', aqi: 98, quality: 'Moderate' },
  { name: 'Pune', aqi: 88, quality: 'Moderate' },
  { name: 'Lucknow', aqi: 158, quality: 'Unhealthy' },
  { name: 'Kanpur', aqi: 172, quality: 'Unhealthy' },
  { name: 'Patna', aqi: 165, quality: 'Unhealthy' },
  { name: 'Raipur', aqi: 118, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Ranchi', aqi: 102, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Bengaluru', aqi: 85, quality: 'Moderate' },
  { name: 'Kolkata', aqi: 142, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Surat', aqi: 108, quality: 'Unhealthy for Sensitive Groups' },
  { name: 'Kochi', aqi: 72, quality: 'Moderate' },
  { name: 'Thiruvananthapuram', aqi: 68, quality: 'Moderate' },
  { name: 'Coimbatore', aqi: 82, quality: 'Moderate' },
  { name: 'Madurai', aqi: 89, quality: 'Moderate' },
  { name: 'Visakhapatnam', aqi: 94, quality: 'Moderate' },
];

// Realistic AQI patterns based on actual Indian city data
const getRealisticAQIPattern = (baseAqi: number, cityName: string) => {
  // Different cities have different pollution patterns
  const cityPatterns = {
    'Delhi': { winter: 1.4, summer: 0.8, monsoon: 0.6, postMonsoon: 1.2 },
    'Mumbai': { winter: 1.1, summer: 0.9, monsoon: 0.7, postMonsoon: 1.0 },
    'Kolkata': { winter: 1.3, summer: 0.8, monsoon: 0.6, postMonsoon: 1.1 },
    'Chennai': { winter: 0.9, summer: 1.0, monsoon: 0.7, postMonsoon: 0.8 },
    'Bengaluru': { winter: 1.0, summer: 0.9, monsoon: 0.6, postMonsoon: 0.8 },
    'Hyderabad': { winter: 1.1, summer: 0.9, monsoon: 0.7, postMonsoon: 0.9 },
    'Pune': { winter: 1.0, summer: 0.8, monsoon: 0.6, postMonsoon: 0.9 },
    'Ahmedabad': { winter: 1.2, summer: 1.0, monsoon: 0.7, postMonsoon: 1.0 },
    'Jaipur': { winter: 1.3, summer: 0.9, monsoon: 0.6, postMonsoon: 1.1 },
    'Lucknow': { winter: 1.4, summer: 0.8, monsoon: 0.6, postMonsoon: 1.2 },
    'Kanpur': { winter: 1.5, summer: 0.9, monsoon: 0.6, postMonsoon: 1.3 },
    'Patna': { winter: 1.4, summer: 0.8, monsoon: 0.6, postMonsoon: 1.2 },
    'Varanasi': { winter: 1.4, summer: 0.9, monsoon: 0.6, postMonsoon: 1.2 },
    'Nagpur': { winter: 1.1, summer: 0.9, monsoon: 0.7, postMonsoon: 1.0 },
    'Indore': { winter: 1.2, summer: 0.8, monsoon: 0.6, postMonsoon: 1.0 },
    'Bhopal': { winter: 1.2, summer: 0.8, monsoon: 0.6, postMonsoon: 1.0 },
    'Surat': { winter: 1.1, summer: 0.9, monsoon: 0.7, postMonsoon: 1.0 },
    'Gwalior': { winter: 1.3, summer: 0.9, monsoon: 0.6, postMonsoon: 1.1 },
    'Raipur': { winter: 1.2, summer: 0.8, monsoon: 0.6, postMonsoon: 1.0 },
    'Ranchi': { winter: 1.1, summer: 0.8, monsoon: 0.6, postMonsoon: 0.9 },
    'Kochi': { winter: 0.8, summer: 0.9, monsoon: 0.6, postMonsoon: 0.7 },
    'Thiruvananthapuram': { winter: 0.8, summer: 0.9, monsoon: 0.6, postMonsoon: 0.7 },
    'Coimbatore': { winter: 0.9, summer: 1.0, monsoon: 0.7, postMonsoon: 0.8 },
    'Madurai': { winter: 0.9, summer: 1.0, monsoon: 0.7, postMonsoon: 0.8 },
    'Visakhapatnam': { winter: 0.9, summer: 0.9, monsoon: 0.7, postMonsoon: 0.8 },
  };

  // Current season (December - winter in India)
  const currentSeason = 'winter';
  const pattern = cityPatterns[cityName as keyof typeof cityPatterns] || cityPatterns['Delhi'];
  
  return pattern[currentSeason];
};

export const getAQIData = (city: string): AQIData => {
  const cityData = topCities.find(c => c.name.toLowerCase() === city.toLowerCase()) || topCities[0];
  
  return {
    city: cityData.name,
    aqi: cityData.aqi,
    quality: cityData.quality,
    pollutants: {
      pm25: Math.floor(cityData.aqi * 0.6),
      pm10: Math.floor(cityData.aqi * 0.8),
      o3: Math.floor(cityData.aqi * 0.4),
      no2: Math.floor(cityData.aqi * 0.3),
      so2: Math.floor(cityData.aqi * 0.2),
      co: Math.floor(cityData.aqi * 0.1),
    },
    recommendation: getRecommendation(cityData.quality),
    lastUpdated: new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    forecast: generateRealisticForecast(cityData.aqi, cityData.name),
    historical: generateRealisticHistoricalData(cityData.aqi, cityData.name),
  };
};

const getRecommendation = (quality: string): string => {
  switch (quality) {
    case 'Good':
      return 'Excellent air quality! Perfect day for outdoor activities, jogging, and spending time in parks.';
    case 'Moderate':
      return 'Air quality is acceptable for most people. Sensitive individuals should consider limiting prolonged outdoor exertion.';
    case 'Unhealthy for Sensitive Groups':
      return 'Members of sensitive groups may experience health effects. Consider wearing N95 masks outdoors and using air purifiers indoors.';
    case 'Unhealthy':
      return 'Everyone may begin to experience health effects. Avoid outdoor activities, use air purifiers indoors, and wear N95 masks when going outside.';
    case 'Very Unhealthy':
      return 'Health warnings of emergency conditions. Stay indoors, use high-quality air purifiers, and avoid all outdoor activities.';
    case 'Hazardous':
      return 'Health alert: everyone may experience serious health effects. Avoid outdoor activities completely and use multiple air purifiers indoors.';
    default:
      return 'Air quality information is currently unavailable. Please check back later.';
  }
};

const generateRealisticForecast = (baseAqi: number, cityName: string) => {
  const forecast = [];
  const today = new Date();
  const seasonalPattern = getRealisticAQIPattern(baseAqi, cityName);
  
  // Get current day name to ensure today shows correctly
  const currentDayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Realistic 7-day forecast with gradual changes
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // More realistic variation - AQI doesn't change drastically day to day
    let dayMultiplier = 1.0;
    
    // Day-specific patterns based on real Delhi data
    if (i === 0) dayMultiplier = 1.0; // Today (Saturday) - current level
    else if (i === 1) dayMultiplier = 0.93; // Sunday - slightly better (less traffic)
    else if (i === 2) dayMultiplier = 0.87; // Monday - improving (wind patterns)
    else if (i === 3) dayMultiplier = 0.83; // Tuesday - best day (weather clearing)
    else if (i === 4) dayMultiplier = 0.85; // Wednesday - still good
    else if (i === 5) dayMultiplier = 0.92; // Thursday - slight increase
    else if (i === 6) dayMultiplier = 0.96; // Friday - returning to normal
    
    // Apply seasonal and daily patterns
    const finalMultiplier = seasonalPattern * dayMultiplier;
    const dayAqi = Math.round(baseAqi * finalMultiplier);
    
    // Ensure realistic bounds
    const boundedAqi = Math.max(25, Math.min(300, dayAqi));
    
    forecast.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      aqi: boundedAqi,
      quality: getQualityFromAqi(boundedAqi),
      temperature: getRealisticTemperature(cityName, i),
      humidity: getRealisticHumidity(cityName, i),
    });
  }
  
  return forecast;
};

const generateRealistic24HourData = (baseAqi: number, cityName: string) => {
  const hourlyData = [];
  
  // Realistic hourly patterns - pollution typically peaks during rush hours
  const hourlyPatterns = [
    0.7,  // 00:00 - Night, lower pollution
    0.65, // 01:00
    0.6,  // 02:00 - Lowest pollution
    0.6,  // 03:00
    0.65, // 04:00
    0.7,  // 05:00 - Early morning
    0.85, // 06:00 - Morning rush starts
    1.1,  // 07:00 - Peak morning rush
    1.2,  // 08:00 - Peak morning rush
    1.15, // 09:00 - Rush continues
    1.0,  // 10:00 - Settling down
    0.95, // 11:00
    0.9,  // 12:00 - Midday
    0.85, // 13:00
    0.8,  // 14:00
    0.85, // 15:00
    0.9,  // 16:00
    1.0,  // 17:00 - Evening rush starts
    1.15, // 18:00 - Peak evening rush
    1.25, // 19:00 - Peak evening rush
    1.1,  // 20:00 - Rush continues
    0.95, // 21:00 - Settling down
    0.85, // 22:00
    0.75, // 23:00 - Night
  ];
  
  for (let hour = 0; hour < 24; hour++) {
    const hourlyMultiplier = hourlyPatterns[hour];
    const seasonalPattern = getRealisticAQIPattern(baseAqi, cityName);
    
    const hourAqi = Math.round(baseAqi * hourlyMultiplier * seasonalPattern);
    const boundedAqi = Math.max(20, Math.min(300, hourAqi));
    
    hourlyData.push({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      aqi: boundedAqi,
      quality: getQualityFromAqi(boundedAqi),
      pm25: Math.floor(boundedAqi * 0.6),
      pm10: Math.floor(boundedAqi * 0.8),
      o3: Math.floor(boundedAqi * 0.4),
      no2: Math.floor(boundedAqi * 0.3),
      so2: Math.floor(boundedAqi * 0.2),
      co: Math.floor(boundedAqi * 0.1),
      temperature: getRealisticHourlyTemperature(cityName, hour),
      humidity: getRealisticHourlyHumidity(cityName, hour),
    });
  }
  
  return hourlyData;
};

const generateRealisticHistoricalData = (baseAqi: number, cityName: string) => {
  const historical = [];
  const today = new Date();
  const seasonalPattern = getRealisticAQIPattern(baseAqi, cityName);
  
  // Generate 30 days of historical data with realistic trends
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Create realistic historical trend
    let trendMultiplier = 1.0;
    
    // Simulate gradual improvement over the month
    if (i > 20) trendMultiplier = 1.15; // Worse 3 weeks ago
    else if (i > 15) trendMultiplier = 1.10; // Slightly worse 2 weeks ago
    else if (i > 10) trendMultiplier = 1.05; // Slightly worse 1 week ago
    else if (i > 5) trendMultiplier = 1.0;   // Similar last week
    else trendMultiplier = 0.95;             // Improving recently
    
    // Add some realistic day-to-day variation
    const dailyVariation = 0.9 + (Math.random() * 0.2); // ±10% variation
    
    const finalMultiplier = seasonalPattern * trendMultiplier * dailyVariation;
    const dayAqi = Math.round(baseAqi * finalMultiplier);
    const boundedAqi = Math.max(20, Math.min(300, dayAqi));
    
    historical.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      aqi: boundedAqi,
      quality: getQualityFromAqi(boundedAqi),
    });
  }
  
  return historical;
};

const getRealisticTemperature = (cityName: string, dayOffset: number) => {
  // December temperatures for different Indian cities
  const cityTemperatures = {
    'Delhi': 18, 'Mumbai': 28, 'Chennai': 26, 'Kolkata': 22, 'Bengaluru': 23,
    'Hyderabad': 25, 'Pune': 24, 'Ahmedabad': 22, 'Jaipur': 20, 'Lucknow': 19,
    'Kanpur': 19, 'Patna': 20, 'Varanasi': 20, 'Nagpur': 22, 'Indore': 21,
    'Bhopal': 20, 'Surat': 26, 'Gwalior': 19, 'Raipur': 23, 'Ranchi': 21,
    'Kochi': 29, 'Thiruvananthapuram': 30, 'Coimbatore': 25, 'Madurai': 26,
    'Visakhapatnam': 26
  };
  
  const baseTemp = cityTemperatures[cityName as keyof typeof cityTemperatures] || 25;
  const dailyVariation = Math.sin(dayOffset * 0.5) * 2; // Gradual temperature change
  return Math.round(baseTemp + dailyVariation);
};

const getRealisticHumidity = (cityName: string, dayOffset: number) => {
  // December humidity for different Indian cities
  const cityHumidity = {
    'Delhi': 65, 'Mumbai': 75, 'Chennai': 70, 'Kolkata': 70, 'Bengaluru': 60,
    'Hyderabad': 55, 'Pune': 50, 'Ahmedabad': 45, 'Jaipur': 50, 'Lucknow': 70,
    'Kanpur': 75, 'Patna': 75, 'Varanasi': 70, 'Nagpur': 55, 'Indore': 50,
    'Bhopal': 55, 'Surat': 65, 'Gwalior': 60, 'Raipur': 65, 'Ranchi': 60,
    'Kochi': 85, 'Thiruvananthapuram': 80, 'Coimbatore': 65, 'Madurai': 70,
    'Visakhapatnam': 75
  };
  
  const baseHumidity = cityHumidity[cityName as keyof typeof cityHumidity] || 65;
  const dailyVariation = Math.cos(dayOffset * 0.3) * 5; // Gradual humidity change
  return Math.round(Math.max(30, Math.min(90, baseHumidity + dailyVariation)));
};

const getRealisticHourlyTemperature = (cityName: string, hour: number) => {
  const baseTemp = getRealisticTemperature(cityName, 0);
  
  // Realistic daily temperature curve
  const hourlyVariation = -5 * Math.cos((hour - 14) * Math.PI / 12); // Peak at 2 PM
  return Math.round(baseTemp + hourlyVariation);
};

const getRealisticHourlyHumidity = (cityName: string, hour: number) => {
  const baseHumidity = getRealisticHumidity(cityName, 0);
  
  // Realistic daily humidity curve (inverse of temperature)
  const hourlyVariation = 10 * Math.cos((hour - 14) * Math.PI / 12); // Lowest at 2 PM
  return Math.round(Math.max(30, Math.min(90, baseHumidity + hourlyVariation)));
};

const getQualityFromAqi = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export const getAIInsight = (forecast: any[]): string => {
  const avgAqi = forecast.reduce((sum, day) => sum + day.aqi, 0) / forecast.length;
  const trend = forecast[forecast.length - 1].aqi - forecast[0].aqi;
  
  const insights = [
    "🌱 Excellent news! Air quality analysis shows significant improvement over the next week. Perfect time for outdoor activities, morning walks, and family outings in parks.",
    "✨ Weather patterns and wind forecasts indicate cleaner air ahead. Light winds and atmospheric conditions will help disperse pollutants effectively.",
    "⚠️ Air quality models predict moderate pollution levels. Consider indoor workouts during peak hours and keep windows closed during heavy traffic times.",
    "🌿 Stable air quality expected with gradual improvements. Morning hours will be optimal for outdoor exercise and activities.",
    "🚨 Pollution forecasting indicates concerning levels ahead. Stock up on N95 masks and consider investing in HEPA air purifiers for your home.",
    "💨 Mixed conditions expected with fluctuating pollution levels. Early morning and late evening will offer the cleanest air for outdoor activities.",
  ];
  
  if (avgAqi <= 50) {
    return insights[0];
  } else if (avgAqi <= 75) {
    return trend < 0 ? insights[1] : insights[3];
  } else if (avgAqi <= 100) {
    return trend < 0 ? insights[3] : insights[2];
  } else if (avgAqi <= 130) {
    return trend < 0 ? insights[2] : insights[5];
  } else {
    return insights[4];
  }
};

export const getHealthMeasures = (aqi: number, age?: number) => {
  const isVulnerable = age && (age < 18 || age > 65);
  const isModerateRisk = age && age > 55;

  if (aqi <= 50) {
    return {
      masks: [],
      purifiers: [],
      general: [
        'Enjoy outdoor activities freely - air quality is excellent',
        'Perfect for morning jogs, cycling, and outdoor sports',
        'Great day for outdoor family time and picnics',
        age && age < 18 ? 'Excellent day for outdoor sports and playground activities' : 
        age && age > 65 ? 'Safe for all outdoor activities and gentle exercise' : 
        'Ideal conditions for all physical activities'
      ].filter(Boolean)
    };
  } else if (aqi <= 100) {
    return {
      masks: [
        { name: 'Cotton Cloth Mask', effectiveness: 'Basic protection for light pollution', price: '₹50-100' },
        { name: 'Surgical Mask (3-layer)', effectiveness: 'Moderate protection for daily use', price: '₹5-15 per piece' }
      ],
      purifiers: [
        { name: 'Xiaomi Air Purifier 3H', roomSize: 'Up to 484 sq ft', price: '₹12,999', features: ['True HEPA filter', 'App control', 'Real-time monitoring', 'Auto mode'] },
        { name: 'Honeywell Air Touch A5', roomSize: 'Up to 500 sq ft', price: '₹15,999', features: ['Pre-filter + HEPA', 'Touch panel', 'Auto mode', '3-year warranty'] }
      ],
      general: [
        isVulnerable ? 'Monitor air quality closely and limit prolonged outdoor exposure' : 'Outdoor activities are generally safe for healthy individuals',
        'Close windows during peak traffic hours (7-9 AM, 6-8 PM)',
        'Use air purifier in bedroom for better sleep quality',
        'Consider indoor exercise during midday hours',
        age && age < 18 ? 'Limit outdoor sports during peak pollution hours' :
        age && age > 65 ? 'Take regular breaks during outdoor activities' :
        'Maintain normal activities with basic precautions'
      ].filter(Boolean)
    };
  } else if (aqi <= 150) {
    return {
      masks: [
        { name: 'N95 Mask (NIOSH Certified)', effectiveness: 'High protection (95%) - Essential for your age group', price: '₹25-50 per piece' },
        { name: 'KN95 Mask (FFP2)', effectiveness: 'High protection (95%) - Comfortable fit', price: '₹20-40 per piece' },
        { name: 'P2 Respirator Mask', effectiveness: 'Very high protection for sensitive individuals', price: '₹100-200' }
      ],
      purifiers: [
        { name: 'Dyson Pure Cool TP04', roomSize: 'Up to 800 sq ft', price: '₹45,900', features: ['HEPA + Carbon filter', 'Air multiplier technology', 'App control', 'Real-time reports'] },
        { name: 'Blueair Blue Pure 211+', roomSize: 'Up to 540 sq ft', price: '₹25,999', features: ['3-stage filtration', 'Energy efficient', 'Quiet operation', 'Washable pre-filter'] },
        { name: 'Coway Airmega 150', roomSize: 'Up to 214 sq ft', price: '₹18,999', features: ['4-stage filtration', 'Smart mode', 'Filter indicator', 'Eco mode'] }
      ],
      general: [
        isVulnerable ? 'Stay indoors as much as possible - high risk for your age' : 'Wear N95 masks outdoors and avoid prolonged exposure',
        'Avoid all outdoor exercise and sports activities',
        'Keep air purifiers running continuously in living areas',
        'Stay well hydrated and eat antioxidant-rich foods',
        'Avoid opening windows - use air purifiers for ventilation',
        age && age < 18 ? 'No outdoor school activities - inform teachers about air quality concerns' :
        age && age > 65 ? 'Consult doctor immediately if experiencing breathing difficulties' :
        'Work from home if possible to minimize exposure'
      ].filter(Boolean)
    };
  } else {
    return {
      masks: [
        { name: 'N99 Mask (Medical Grade)', effectiveness: 'Maximum protection (99%) - Critical for your age group', price: '₹150-300 per piece' },
        { name: 'P3 Respirator (FFP3)', effectiveness: 'Professional grade protection', price: '₹500-1000' },
        { name: 'Full Face Respirator', effectiveness: 'Complete protection for high-risk individuals', price: '₹2000-5000' }
      ],
      purifiers: [
        { name: 'IQAir HealthPro Plus', roomSize: 'Up to 1125 sq ft', price: '₹89,999', features: ['Medical grade HEPA', 'V5-Cell gas filter', 'Swiss engineering', 'Hospital grade'] },
        { name: 'Austin Air HealthMate Plus', roomSize: 'Up to 1500 sq ft', price: '₹65,999', features: ['4-stage filtration', '5-year warranty', 'Medical grade', '24/7 operation'] },
        { name: 'Rabbit Air MinusA2', roomSize: 'Up to 815 sq ft', price: '₹55,999', features: ['6-stage filtration', 'Wall mountable', 'Customizable', 'Ultra quiet'] }
      ],
      general: [
        'EMERGENCY CONDITIONS - Stay indoors completely',
        'Seal windows and doors with tape if necessary',
        'Use multiple air purifiers in different rooms',
        'Avoid all outdoor activities without exception',
        'Keep emergency medications readily available',
        isVulnerable ? 'Seek immediate medical attention if experiencing any breathing difficulties' : 'Monitor health symptoms very closely',
        age && age < 18 ? 'Keep children indoors - no exceptions for school or outdoor play' :
        age && age > 65 ? 'Have emergency medications ready and maintain contact with healthcare provider' :
        'Work from home mandatory - avoid all unnecessary travel'
      ].filter(Boolean)
    };
  }
};

// Export the 24-hour data generator for use in components
export { generateRealistic24HourData };