import React, { useEffect, useState } from 'react';
import { Shield, Award, Users, ArrowRight } from 'lucide-react';

interface HeroProps {
  theme: 'teal' | 'blue' | 'cyan';
  isDarkMode: boolean;
}

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  theme: 'teal' | 'blue' | 'cyan';
}

const Counter: React.FC<CounterProps> = ({ target, suffix = '', duration = 1500, theme }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount(0); // Reset count when entering view
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 800, 1);
            
            // Ease-in and ease-out animation with 200ms each
            let easedProgress;
            if (progress < 0.25) { // First 200ms (25% of 800ms) - ease in
              easedProgress = 4 * progress * progress * progress;
            } else if (progress > 0.75) { // Last 200ms (25% of 800ms) - ease out
              const t = (progress - 0.75) / 0.25;
              easedProgress = 0.5 + 0.5 * (1 - (1 - t) * (1 - t) * (1 - t));
            } else { // Middle 400ms - linear
              easedProgress = 0.25 + (progress - 0.25);
            }
            
            const currentCount = Math.floor(easedProgress * target);
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          animate();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${target}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [target]);

  const themeColors = {
    teal: 'text-teal-400',
    blue: 'text-[#2d7384]',
    cyan: 'text-[#12efd5]'
  };

  return (
    <div id={`counter-${target}`} className={`text-3xl font-bold ${themeColors[theme]}`}>
      {count.toLocaleString()}{suffix}
    </div>
  );
};
const Hero: React.FC<HeroProps> = ({ theme, isDarkMode }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for sticky header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const themeColors = {
    teal: {
      accent: 'text-teal-400',
      gradient: 'bg-gradient-to-r from-teal-400 to-teal-600',
      button: 'bg-teal-600 hover:bg-teal-700',
      border: 'hover:border-teal-400 hover:text-teal-400',
      stats: 'text-teal-400',
      card: 'bg-teal-600',
      iconBg: 'bg-teal-600/20',
      iconColor: 'text-teal-400'
    },
    blue: {
      accent: 'text-[#2d7384]',
      gradient: 'bg-gradient-to-r from-[#2d7384] to-[#1e5a6b]',
      button: 'bg-[#2d7384] hover:bg-[#1e5a6b]',
      border: 'hover:border-[#2d7384] hover:text-[#2d7384]',
      stats: 'text-[#2d7384]',
      card: 'bg-[#2d7384]',
      iconBg: 'bg-[#2d7384]/20',
      iconColor: 'text-[#2d7384]'
    },
    cyan: {
      accent: 'text-[#12efd5]',
      gradient: 'bg-gradient-to-r from-[#12efd5] to-[#0dd4c4]',
      button: 'bg-[#12efd5] hover:bg-[#0dd4c4]',
      border: 'hover:border-[#12efd5] hover:text-[#12efd5]',
      stats: 'text-[#12efd5]',
      card: 'bg-[#12efd5]',
      iconBg: 'bg-[#12efd5]/20',
      iconColor: 'text-[#12efd5]'
    }
  };

  return (
    <section id="home" className={`relative ${isDarkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'} text-white overflow-hidden min-h-screen`}>
      {/* Parallax Background Layer */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: `url('https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/95' : 'bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90'}`}></div>
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-transparent via-transparent to-slate-950/60' : 'bg-gradient-to-b from-transparent via-transparent to-slate-900/50'}`}></div>
      
      {/* Animated Background Elements */}
      <div 
        className={`absolute top-20 left-10 w-72 h-72 ${theme === 'teal' ? 'bg-teal-600/10' : theme === 'blue' ? 'bg-[#2d7384]/10' : 'bg-[#12efd5]/10'} rounded-full blur-3xl`}
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      ></div>
      <div 
        className={`absolute bottom-20 right-10 w-96 h-96 ${isDarkMode ? 'bg-slate-700/10' : 'bg-slate-600/10'} rounded-full blur-3xl`}
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className={`flex items-center space-x-2 ${themeColors[theme].accent}`}>
                <Shield className="h-6 w-6" />
                <span className="font-semibold">Sub-Saharan Africa's #1 WithSecure™ Distributor</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Securing Your
                <span className={`text-transparent bg-clip-text ${themeColors[theme].gradient}`}> Digital Future</span>
              </h1>
              <p className={`text-xl ${isDarkMode ? 'text-slate-200' : 'text-slate-300'} leading-relaxed`}>
                WiVision delivers enterprise-grade cybersecurity solutions through our exclusive partnership with WithSecure™, protecting businesses across Sub-Saharan Africa with cutting-edge AI driven threat detection and response capabilities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className={`${themeColors[theme].button} text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center group`}
              >
                Get Protected Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`border-2 ${isDarkMode ? 'border-white/30' : 'border-white/20'} ${themeColors[theme].border} text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300`}
              >
                Learn More
              </button>
            </div>

            <div className={`grid grid-cols-3 gap-8 pt-8 border-t ${isDarkMode ? 'border-slate-600' : 'border-slate-700'}`}>
              <div className="text-center">
                <Counter target={10000} suffix="+" theme={theme} />
                <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-400'}`}>Endpoints</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${themeColors[theme].stats}`}>
                  24
                  <span className="text-2xl">/</span>
                  7
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-400'}`}>Security Monitoring</div>
              </div>
              <div className="text-center">
                <Counter target={99.9} suffix="%" theme={theme} />
                <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-400'}`}>Threat Detection</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div 
              className={`relative z-10 ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'} backdrop-blur-sm rounded-2xl p-8 border`}
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${themeColors[theme].card} rounded-lg flex items-center justify-center`}>
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Advanced Threat Protection</h3>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-400'} text-sm`}>Real-time monitoring and response</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${themeColors[theme].card} rounded-lg flex items-center justify-center`}>
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Certified Expertise</h3>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-400'} text-sm`}>WithSecure™ certified professionals</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${themeColors[theme].card} rounded-lg flex items-center justify-center`}>
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dedicated Support</h3>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-400'} text-sm`}>Local Sub-Saharan Africa team</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className={`absolute -top-4 -right-4 w-72 h-72 ${themeColors[theme].iconBg} rounded-full blur-3xl`}
              style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            ></div>
            <div 
              className={`absolute -bottom-4 -left-4 w-72 h-72 ${isDarkMode ? 'bg-slate-700/20' : 'bg-slate-600/20'} rounded-full blur-3xl`}
              style={{ transform: `translateY(${scrollY * 0.25}px)` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;