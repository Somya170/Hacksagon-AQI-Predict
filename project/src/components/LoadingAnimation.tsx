import React, { useState, useEffect } from 'react';
import { Wind, MapPin, Brain, BarChart3, Zap, Sparkles } from 'lucide-react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: MapPin, text: 'Loading 25 Indian Cities...', color: 'from-green-500 to-emerald-500' },
    { icon: Brain, text: 'Activating AI Models...', color: 'from-purple-500 to-pink-500' },
    { icon: BarChart3, text: 'Preparing Analytics...', color: 'from-orange-500 to-red-500' },
    { icon: Zap, text: 'Connecting Live Data...', color: 'from-indigo-500 to-purple-500' },
    { icon: Sparkles, text: 'Ready to Launch!', color: 'from-pink-500 to-rose-500' }
  ];

  useEffect(() => {
    // Progress animation - completes in exactly 3 seconds
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 200); // Small delay before completing
          return 100;
        }
        return prev + 3.33; // 100 / 30 intervals = 3.33 per interval
      });
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  useEffect(() => {
    // Step animation - changes every 600ms
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, 600);

    return () => clearInterval(stepTimer);
  }, [steps.length]);

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Static Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${20 + (i * 4)}%`,
              top: `${30 + (i * 3)}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Main Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl transform transition-transform duration-1000 hover:scale-110">
            <Wind className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            AQI Monitor
          </h1>
          <p className="text-blue-200 text-lg">Smart Air Quality Platform</p>
        </div>

        {/* Current Step */}
        <div className="mb-8">
          <div className={`w-16 h-16 bg-gradient-to-r ${currentStepData.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl transform transition-all duration-500`}>
            <StepIcon className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-lg font-medium transition-all duration-500">{currentStepData.text}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-blue-200 text-sm font-medium">{Math.round(progress)}% Complete</p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-3 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index <= currentStep 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 scale-125' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-400"></div>
        </div>

        {/* Hackathon Badge */}
        <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm font-medium">Hackathon 2025</span>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;