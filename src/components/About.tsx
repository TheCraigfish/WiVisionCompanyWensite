import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Target, Users, Award, Globe } from 'lucide-react';

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

    const element = document.getElementById(`counter-about-${target}`);
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
    <div id={`counter-about-${target}`} className={`text-4xl font-bold ${themeColors[theme]}`}>
      {count.toLocaleString()}{suffix}
    </div>
  );
};

interface AboutProps {
  theme: 'teal' | 'blue' | 'cyan';
  isDarkMode: boolean;
}

const About: React.FC<AboutProps> = ({ theme, isDarkMode }) => {
  const [visibleBoxes, setVisibleBoxes] = useState<boolean[]>(new Array(4).fill(false));
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const themeColors = {
    teal: {
      icon: 'text-teal-600',
      iconBg: 'bg-teal-100',
      iconHover: 'group-hover:bg-teal-600',
      stats: 'text-teal-400'
    },
    blue: {
      icon: 'text-[#2d7384]',
      iconBg: 'bg-[#2d7384]/10',
      iconHover: 'group-hover:bg-[#2d7384]',
      stats: 'text-[#2d7384]'
    },
    cyan: {
      icon: 'text-[#12efd5]',
      iconBg: 'bg-[#12efd5]/10',
      iconHover: 'group-hover:bg-[#12efd5]',
      stats: 'text-[#12efd5]'
    }
  };

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    boxRefs.current.forEach((_, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add staggered delay for liquid wave effect
              setTimeout(() => {
                setVisibleBoxes(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 200); // 200ms delay between each box
            } else {
              // Reset animation when out of view
              setVisibleBoxes(prev => {
                const newVisible = [...prev];
                newVisible[index] = false;
                return newVisible;
              });
            }
          });
        },
        { 
          threshold: 0.3,
          rootMargin: '0px 0px -50px 0px'
        }
      );
      
      observers.push(observer);
    });

    // Observe each box
    boxRefs.current.forEach((box, index) => {
      if (box && observers[index]) {
        observers[index].observe(box);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section id="about" className={`py-20 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl lg:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>
            About WiVision
          </h2>
          <p className={`text-lg lg:text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-3xl mx-auto`}>
            As Sub-Saharan Africa's premier WithSecure™ distributor, we bridge the gap between world-class cybersecurity technology and local business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className={`text-2xl lg:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Leading WithSecure™ Distribution in Sub-Saharan Africa
            </h3>
            <p className={`text-base lg:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
              WiVision has established itself as the trusted bridge between WithSecure™'s innovative cybersecurity solutions and Sub-Saharan African businesses. Our deep understanding of both the local market and global security challenges positions us uniquely to deliver tailored protection strategies.
            </p>
            <p className={`text-base lg:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
              With years of experience in the cybersecurity landscape, we've built a reputation for excellence, reliability, and unmatched customer service. Our team of certified professionals ensures that every client receives not just products, but comprehensive security solutions.
            </p>
            
            <div className="flex items-center space-x-4 pt-4">
              <img 
                src="/WiVison_Secondary_Logo.png" 
                alt="WiVision Secondary Logo" 
                className="h-16 w-auto"
              />
              <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Authorized WithSecure™ Distributor
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div 
              ref={el => boxRefs.current[0] = el}
              className={`relative ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} p-6 rounded-xl transition-all duration-700 group overflow-hidden ${
                visibleBoxes[0] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              } hover:scale-105 hover:-translate-y-2 hover:shadow-2xl`}
            >
              {/* Liquid gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/15 to-transparent transition-all duration-1000 ${
                visibleBoxes[0] ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
              }`}></div>
              
              {/* Floating liquid orbs */}
              <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-2xl transition-all duration-1200 ${
                visibleBoxes[0] ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-0'
              }`}></div>
              <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-purple-400/25 to-blue-500/25 rounded-full blur-xl transition-all duration-1000 delay-300 ${
                visibleBoxes[0] ? 'opacity-100 scale-125' : 'opacity-0 scale-0'
              }`}></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 ${themeColors[theme].iconBg} rounded-lg flex items-center justify-center mb-4 ${themeColors[theme].iconHover} transition-all duration-500 ${
                  visibleBoxes[0] ? 'rotate-0' : 'rotate-180'
                }`}>
                  <Target className={`h-6 w-6 ${themeColors[theme].icon} group-hover:text-white transition-colors`} />
                </div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Our Mission</h4>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base`}>
                  To democratize enterprise-grade cybersecurity across Sub-Saharan Africa, making advanced protection accessible to businesses of all sizes.
                </p>
              </div>
            </div>

            <div 
              ref={el => boxRefs.current[1] = el}
              className={`relative ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} p-6 rounded-xl transition-all duration-700 group overflow-hidden ${
                visibleBoxes[1] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              } hover:scale-105 hover:-translate-y-2 hover:shadow-2xl`}
            >
              {/* Liquid gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-bl from-teal-400/20 via-cyan-500/15 to-transparent transition-all duration-1000 delay-200 ${
                visibleBoxes[1] ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
              }`}></div>
              
              {/* Floating liquid orbs */}
              <div className={`absolute -top-4 -left-6 w-24 h-24 bg-gradient-to-br from-teal-400/30 to-cyan-500/30 rounded-full blur-2xl transition-all duration-1200 delay-200 ${
                visibleBoxes[1] ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-0'
              }`}></div>
              <div className={`absolute -bottom-6 -right-4 w-18 h-18 bg-gradient-to-tl from-cyan-400/25 to-teal-500/25 rounded-full blur-xl transition-all duration-1000 delay-500 ${
                visibleBoxes[1] ? 'opacity-100 scale-130' : 'opacity-0 scale-0'
              }`}></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 ${themeColors[theme].iconBg} rounded-lg flex items-center justify-center mb-4 ${themeColors[theme].iconHover} transition-all duration-500 delay-200 ${
                  visibleBoxes[1] ? 'rotate-0' : 'rotate-180'
                }`}>
                  <Users className={`h-6 w-6 ${themeColors[theme].icon} group-hover:text-white transition-colors`} />
                </div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Our Team</h4>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base`}>
                  Certified cybersecurity professionals with deep local market knowledge and global security expertise.
                </p>
              </div>
            </div>

            <div 
              ref={el => boxRefs.current[2] = el}
              className={`relative ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} p-6 rounded-xl transition-all duration-700 group overflow-hidden ${
                visibleBoxes[2] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              } hover:scale-105 hover:-translate-y-2 hover:shadow-2xl`}
            >
              {/* Liquid gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-tr from-purple-400/20 via-pink-500/15 to-transparent transition-all duration-1000 delay-400 ${
                visibleBoxes[2] ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
              }`}></div>
              
              {/* Floating liquid orbs */}
              <div className={`absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-2xl transition-all duration-1200 delay-400 ${
                visibleBoxes[2] ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-0'
              }`}></div>
              <div className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-bl from-pink-400/25 to-purple-500/25 rounded-full blur-xl transition-all duration-1000 delay-700 ${
                visibleBoxes[2] ? 'opacity-100 scale-115' : 'opacity-0 scale-0'
              }`}></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 ${themeColors[theme].iconBg} rounded-lg flex items-center justify-center mb-4 ${themeColors[theme].iconHover} transition-all duration-500 delay-400 ${
                  visibleBoxes[2] ? 'rotate-0' : 'rotate-180'
                }`}>
                  <Award className={`h-6 w-6 ${themeColors[theme].icon} group-hover:text-white transition-colors`} />
                </div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Our Excellence</h4>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base`}>
                  Recognized as the #1 WithSecure™ distributor in Sub-Saharan Africa with proven track record of success.
                </p>
              </div>
            </div>

            <div 
              ref={el => boxRefs.current[3] = el}
              className={`relative ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} p-6 rounded-xl transition-all duration-700 group overflow-hidden ${
                visibleBoxes[3] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              } hover:scale-105 hover:-translate-y-2 hover:shadow-2xl`}
            >
              {/* Liquid gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-tl from-emerald-400/20 via-green-500/15 to-transparent transition-all duration-1000 delay-600 ${
                visibleBoxes[3] ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
              }`}></div>
              
              {/* Floating liquid orbs */}
              <div className={`absolute -bottom-6 -left-6 w-22 h-22 bg-gradient-to-br from-emerald-400/30 to-green-500/30 rounded-full blur-2xl transition-all duration-1200 delay-600 ${
                visibleBoxes[3] ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-0'
              }`}></div>
              <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-tr from-green-400/25 to-emerald-500/25 rounded-full blur-xl transition-all duration-1000 delay-900 ${
                visibleBoxes[3] ? 'opacity-100 scale-120' : 'opacity-0 scale-0'
              }`}></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 ${themeColors[theme].iconBg} rounded-lg flex items-center justify-center mb-4 ${themeColors[theme].iconHover} transition-all duration-500 delay-600 ${
                  visibleBoxes[3] ? 'rotate-0' : 'rotate-180'
                }`}>
                  <Globe className={`h-6 w-6 ${themeColors[theme].icon} group-hover:text-white transition-colors`} />
                </div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Our Reach</h4>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm lg:text-base`}>
                  Serving businesses across Sub-Saharan Africa with localized support and global security standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gradient-to-r from-slate-950 to-slate-900' : 'bg-gradient-to-r from-slate-900 to-slate-800'} rounded-2xl p-12 text-white`}>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Counter target={25} suffix="+" theme={theme} />
              <div className="mb-2"></div>
              <div className={`${isDarkMode ? 'text-slate-200' : 'text-slate-300'}`}>Years Experience</div>
            </div>
            <div>
              <Counter target={300} suffix="+" theme={theme} />
              <div className="mb-2"></div>
              <div className={`${isDarkMode ? 'text-slate-200' : 'text-slate-300'}`}>Protected Clients</div>
            </div>
            <div>
              <Counter target={10000} suffix="+" theme={theme} />
              <div className="mb-2"></div>
              <div className={`${isDarkMode ? 'text-slate-200' : 'text-slate-300'}`}>Endpoints</div>
            </div>
            <div>
              <div className={`text-4xl font-bold ${themeColors[theme].stats} mb-2`}>
                24
                <span className="text-3xl">/</span>
                7
              </div>
              <div className={`${isDarkMode ? 'text-slate-200' : 'text-slate-300'}`}>Co-Security service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;