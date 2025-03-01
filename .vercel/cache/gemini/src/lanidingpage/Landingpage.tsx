import React from 'react';
import { 
  Brain, 
  GraduationCap, 
  LineChart, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Mail,
  Twitter,
  Linkedin,
  Facebook,
  BookOpen,
  Globe,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Landingpage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white" style={{width: '100vw'}}>
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Brain className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-white opacity-20 rounded-xl group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-transparent bg-clip-text transform transition-all duration-300 group-hover:scale-105">Career Guide AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">Testimonials</a>
            </div>
            <button 
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
      onClick={() => navigate("/login")} // Redirect to login page
    >
      Get Started
    </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80" 
            alt="Students collaborating" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-blue-600/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              <span className="text-blue-200 font-medium">AI-Powered Career Guidance</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">Perfect Career</span> Path Today
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              Unlock your potential with our AI-driven career analysis, providing personalized insights and a comprehensive roadmap to your dream career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              onClick={() => navigate("/login")} // Redirect to login page
              >
              
                Get Started for Free 
                
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </button>
              {/* <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition flex items-center justify-center backdrop-blur-sm">
                Watch Demo
              </button> */}
            </div>
            <div className="mt-12 flex items-center space-x-8">
              <div className="flex -space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <div className="text-white">
                <span className="font-semibold">10,000+</span>
                <span className="ml-2 text-blue-200">students guided</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
                <span className="ml-2 text-blue-200">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold mb-4 block">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Your Path to Success</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to unlock your perfect career path with our AI-powered guidance system.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <GraduationCap className="w-12 h-12 text-blue-600" />,
                title: "Share Your Journey",
                description: "Enter your academic background, achievements, and personal details to help us understand your foundation."
              },
              {
                icon: <MessageSquare className="w-12 h-12 text-blue-600" />,
                title: "AI Assessment",
                description: "Complete our carefully crafted 50-question assessment designed to understand your aptitude and interests."
              },
              {
                icon: <LineChart className="w-12 h-12 text-blue-600" />,
                title: "Comprehensive Analysis",
                description: "Receive a detailed career roadmap with personalized insights and actionable recommendations."
              }
            ].map((step, index) => (
              <div key={index} className="relative p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 group hover:-translate-y-2">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-full shadow-lg group-hover:scale-110 transition duration-300">
                  <div className="text-white">{step.icon}</div>
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold mb-4 block">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Comprehensive Career Analysis</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform analyzes multiple aspects of your profile to provide detailed insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 text-blue-600" />,
                title: "Personal Traits",
                description: "In-depth analysis of your personality and strengths"
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />,
                title: "Skills Excellence",
                description: "Detailed evaluation of your technical and soft skills"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
                title: "Career Growth",
                description: "Long-term career progression and opportunities"
              },
              {
                icon: <BookOpen className="w-8 h-8 text-blue-600" />,
                title: "Education Pathway",
                description: "Tailored educational recommendations"
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-600" />,
                title: "Global Opportunities",
                description: "Insights into international career prospects"
              },
              {
                icon: <DollarSign className="w-8 h-8 text-blue-600" />,
                title: "Financial Planning",
                description: "Career-specific financial guidance and planning"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 group hover:-translate-y-1">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold mb-4 block">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students and parents who transformed their career journey with Career Guide AI.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Engineering Student",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
                quote: "Career Guide AI's comprehensive analysis helped me discover my passion for robotics engineering. The detailed roadmap made my career path crystal clear!"
              },
              {
                name: "Rahul Patel",
                role: "Parent",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
                quote: "As a parent, I was impressed by the depth of analysis. The platform provided invaluable insights for my daughter's future in biotechnology."
              },
              {
                name: "Anjali Desai",
                role: "Medical Student",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
                quote: "The AI's personalized recommendations aligned perfectly with my interests. Now I'm confidently pursuing my dream of becoming a neurosurgeon!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 group hover:-translate-y-1">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full ring-4 ring-blue-100 group-hover:ring-blue-200 transition duration-300"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Perfect Career Path?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their dream careers through our AI-powered guidance.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
          onClick={() => navigate("/login")} // Redirect to login page
          >
          
            Start Your Career Journey
            <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-12 flex justify-center space-x-8 text-blue-100">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-sm">Students Guided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm">Career Paths</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6 group">
                <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Brain className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-white opacity-20 rounded-xl group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text transform transition-all duration-300 group-hover:scale-105">Career Guide AI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering the next generation with AI-powered career guidance and comprehensive analysis.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-blue-400 transition cursor-pointer">About Us</li>
                <li className="hover:text-blue-400 transition cursor-pointer">How It Works</li>
                <li className="hover:text-blue-400 transition cursor-pointer">Success Stories</li>
                <li className="hover:text-blue-400 transition cursor-pointer">FAQs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <p className="flex items-center hover:text-blue-400 transition cursor-pointer">
                  <Mail className="w-5 h-5 mr-3" />
                  infoenhc@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Connect With Us</h3>
              <div className="flex space-x-6">
                <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400 transition cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-blue-400 transition cursor-pointer" />
                <Facebook className="w-6 h-6 text-gray-400 hover:text-blue-400 transition cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Career Guide AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landingpage;