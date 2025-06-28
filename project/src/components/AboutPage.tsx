import React from 'react';
import { Github, Linkedin, Mail, Code, Heart, Users, Award, Target, Star, Trophy, Lightbulb, Rocket } from 'lucide-react';

const AboutPage: React.FC = () => {
  const developers = [
    {
      name: 'Jiya Darvai',
      role: 'AI/ML Engineer & Data Analysis Engineer (Team Lead)',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Leads the development team with expertise in AI/ML algorithms and data science. Passionate about environmental technology solutions.',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science', 'Leadership'],
      github: 'https://github.com/jiyadarvai',
      linkedin: 'https://linkedin.com/in/jiyadarvai',
      email: 'jiyadarwai@gmail.com',
      achievements: ['Best UI Design Award', 'Frontend Excellence']
    },
    {
      name: 'Somya Jaiswal',
      role: 'Fullstack Engineer',
      image: '?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Passionate about creating Efficient and functional user interfaces. Deep Knowledge on modern design principles.',
      skills: ['Flask','Python','React','UI/UX'],
      github: 'https://github.com/somya170',
      linkedin: 'https://linkedin.com/in/somyajaiswal121',
      email: 'somya.jaiswal1218@gmail.com',
      achievements: ['AI Innovation Award', 'Team Leadership Excellence']
    },
    {
      name: 'Anushka Pandey',
      role: 'Backend Developer & Data Engineer',
      image: '?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Builds robust backend systems and manages data pipelines. Expert in API development and database optimization.',
      skills: ['Flask', 'Python', 'PostgreSQL', 'API Development', 'Data Engineering'],
      github: 'https://github.com/anushkapandey',
      linkedin: 'https://linkedin.com/in/anushkapandey',
      email: 'anushka.pandey@gmail.com',
      achievements: ['Backend Excellence', 'Data Architecture Award']
    },
    {
      name: 'Soumya Choubitkar',
      role: 'Frontend Developer & Quality Assurance',
      image: '?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Ensures code quality and creates responsive user interfaces. Specializes in testing frameworks and performance optimization.',
      skills: ['React', 'JavaScript', 'Testing', 'Performance Optimization', 'QA'],
      github: 'https://github.com/soumyachoubitkar',
      linkedin: 'https://linkedin.com/in/soumyachoubitkar',
      email: 'soumya.choubitkar@gmail.com',
      achievements: ['Quality Excellence', 'Performance Optimization']
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Real-time Monitoring',
      description: 'Live air quality data from 25 major Indian cities with instant updates and intelligent alerts.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models providing accurate 7-day air quality forecasting with 96% accuracy.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Personalized Health Recommendations',
      description: 'Age-based health advice, mask recommendations, and air purifier suggestions tailored to individual needs.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Community-Focused Platform',
      description: 'Built specifically for Indian cities with localized data and culturally relevant health recommendations.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Cities Monitored', value: '25', icon: Target },
    { label: 'Data Points Daily', value: '3.9k', icon: Award },
    { label: 'Prediction Accuracy', value: '89%', icon: Star },
    { label: 'Team Members', value: '4', icon: Users }
  ];

  const techStack = [
    { 
      category: 'Frontend', 
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Leaflet.js'],
      color: 'from-blue-500 to-purple-500'
    },
    { 
      category: 'Backend', 
      technologies: ['Flask', 'Python', 'RESTful APIs', 'Real-time Processing'],
      color: 'from-green-500 to-blue-500'
    },
    { 
      category: 'AI/ML', 
      technologies: ['TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
      color: 'from-purple-500 to-pink-500'
    },
    { 
      category: 'Data & APIs', 
      technologies: ['Ambee API', 'OpenStreetMap', 'Real-time Data', 'JSON Processing'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const projectHighlights = [
    {
      icon: Rocket,
      title: 'Hackathon Ready',
      description: 'Built in 48 hours for the ultimate coding challenge',
      color: 'text-blue-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focus',
      description: 'Combining AI, real-time data, and health insights',
      color: 'text-yellow-600'
    },
    {
      icon: Trophy,
      title: 'Production Quality',
      description: 'Enterprise-grade code with scalable architecture',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">AQI Monitor - Smart Air Quality Platform</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-6">
            Empowering People with real-time air quality data and AI-driven health recommendations 
            to make informed decisions about their daily activities and health protection.
          </p>
          <div className="flex justify-center gap-4">
            {projectHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{highlight.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To provide accessible, accurate, and actionable air quality information to every Indian citizen, 
            helping them protect their health and make informed decisions about outdoor activities, 
            travel, and lifestyle choices in an increasingly polluted environment.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To become India's most trusted platform for air quality monitoring and health protection, 
            leveraging cutting-edge AI technology to predict pollution patterns and provide 
            personalized recommendations that improve the quality of life for millions.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Development Team */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meet Our Development Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {developers.map((dev, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <img
                src={dev.image}
                alt={dev.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-1">{dev.name}</h3>
              <p className="text-purple-600 font-medium mb-3">{dev.role}</p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{dev.bio}</p>
              
              {/* Achievements */}
              <div className="mb-4">
                {dev.achievements.map((achievement, achIndex) => (
                  <span
                    key={achIndex}
                    className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium mr-1 mb-1"
                  >
                    🏆 {achievement}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {dev.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-center gap-3">
                <a
                  href={dev.github}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={dev.linkedin}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${dev.email}`}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((stack, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 bg-gradient-to-r ${stack.color} rounded-xl flex items-center justify-center mb-3`}>
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-3">{stack.category}</h3>
              <div className="space-y-2">
                {stack.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="text-center p-2 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Hackathon Development Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Day 1: Planning & Design</h3>
            <p className="text-gray-600 text-sm">Ideation, architecture design, UI/UX mockups, and technology selection</p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Day 2: Development Sprint</h3>
            <p className="text-gray-600 text-sm">Core development, API integration, AI model implementation, and testing</p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Final: Polish & Present</h3>
            <p className="text-gray-600 text-sm">Final testing, documentation, presentation preparation, and deployment</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        <p className="text-purple-100 mb-6">
          Have questions, suggestions, or want to contribute? We'd love to hear from you!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="mailto:somya.jaiswal1218@gmail.com"
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Contact Team Lead
          </a>
          <a
            href="https://github.com/aqimonitor"
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5" />
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;