import React from 'react';
import { useState, useEffect } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  theme: 'teal' | 'blue' | 'cyan';
  countDown?: boolean;
  countDownFrom?: number;
}

const Counter: React.FC<CounterProps> = ({ 
  target, 
  suffix = '', 
  prefix = '',
  duration = 1500, 
  theme,
  countDown = false,
  countDownFrom = 1000
}) => {
  const [count, setCount] = useState(countDown ? countDownFrom : 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount(countDown ? countDownFrom : 0); // Reset count when entering view
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
            
            let currentCount;
            if (countDown) {
              // Count down from countDownFrom to target
              currentCount = Math.floor(countDownFrom - (easedProgress * (countDownFrom - target)));
            } else {
              // Count up from 0 to target
              currentCount = Math.floor(easedProgress * target);
            }
            
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

    const element = document.getElementById(`counter-solutions-${target}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [target, countDown, countDownFrom]);

  const themeColors = {
    teal: 'text-teal-400',
    blue: 'text-[#2d7384]',
    cyan: 'text-[#12efd5]'
  };

  return (
    <div id={`counter-solutions-${target}`} className={`text-4xl font-bold text-white`}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

interface SolutionsProps {
  theme: 'teal' | 'blue' | 'cyan';
  isDarkMode: boolean;
}

const Solutions: React.FC<SolutionsProps> = ({ theme, isDarkMode }) => {
  const themeColors = {
    teal: {
      gradient: 'bg-gradient-to-r from-teal-600 to-teal-700',
      accent: 'text-teal-100',
      stats: 'text-teal-400'
    },
    blue: {
      gradient: 'bg-gradient-to-r from-[#2d7384] to-[#1e5a6b]',
      accent: 'text-[#2d7384]/20',
      stats: 'text-[#2d7384]'
    },
    cyan: {
      gradient: 'bg-gradient-to-r from-[#12efd5] to-[#0dd4c4]',
      accent: 'text-[#12efd5]/20',
      stats: 'text-[#12efd5]'
    }
  };

  return (
    <section id="solutions" className={`py-20 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${isDarkMode ? 'bg-gradient-to-r from-slate-950 to-slate-900' : 'bg-gradient-to-r from-slate-900 to-slate-800'} rounded-2xl p-12 text-white`}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Why Partner with WithSecure™?
              </h3>
              <p className={`${theme === 'teal' ? 'text-teal-100' : 'text-white/80'} text-lg leading-relaxed mb-6`}>
              <p className={`${isDarkMode ? 'text-slate-200' : 'text-slate-300'} text-lg leading-relaxed mb-6`}>
                Ready to unlock new opportunities in cybersecurity? Join our global network of trusted WithSecure™ partners and deliver cutting-edge protection to your clients. Together, we can grow your business while providing world-class security solutions backed by Finnish innovation and engineering excellence.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Trusted, proven cybersecurity solutions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Dedicated partner support & training</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Co-marketing & lead generation opportunities</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Scalable business model with recurring revenue</span>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className={`${isDarkMode ? 'bg-white/20' : 'bg-white/10'} backdrop-blur-sm rounded-xl p-8 inline-block`}>
                <Counter target={30} suffix="+" theme={theme} />
                <div className={`${theme === 'teal' ? 'text-teal-100' : 'text-white/80'} mb-4`}>Years of WithSecure™ Innovation</div>
                <div className={`${isDarkMode ? 'text-slate-200' : 'text-slate-300'} mb-4`}>Years of WithSecure™ Innovation</div>
                <Counter target={200} suffix="M+" theme={theme} />
                <div className={`${theme === 'teal' ? 'text-teal-100' : 'text-white/80'} mb-4`}>Devices Protected Globally</div>
                <div className={`${isDarkMode ? 'text-slate-200' : 'text-slate-300'} mb-4`}>Devices Protected Globally</div>
                <Counter target={1} prefix="#" theme={theme} countDown={true} countDownFrom={1000} />
                <div className={`${theme === 'teal' ? 'text-teal-100' : 'text-white/80'}`}>Distributor in Sub-Saharan Africa</div>
                <div className={`${isDarkMode ? 'text-slate-200' : 'text-slate-300'}`}>Distributor in Sub-Saharan Africa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
  )
}