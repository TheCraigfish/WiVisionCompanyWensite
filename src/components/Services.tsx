import React from 'react';
import { Shield, Monitor, Users, Settings, AlertTriangle, Lock, X, Mail } from 'lucide-react';

interface ServicesProps {
  theme: 'teal' | 'blue' | 'cyan';
  isDarkMode: boolean;
}

const Services: React.FC<ServicesProps> = ({ theme, isDarkMode }) => {
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  const [visibleCards, setVisibleCards] = React.useState<boolean[]>(new Array(6).fill(false));

  const themeColors = {
    teal: {
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      iconHover: 'group-hover:bg-teal-600',
      dot: 'bg-teal-600'
    },
    blue: {
      iconBg: 'bg-[#2d7384]/10',
      iconColor: 'text-[#2d7384]',
      iconHover: 'group-hover:bg-[#2d7384]',
      dot: 'bg-[#2d7384]'
    },
    cyan: {
      iconBg: 'bg-[#12efd5]/10',
      iconColor: 'text-[#12efd5]',
      iconHover: 'group-hover:bg-[#12efd5]',
      dot: 'bg-[#12efd5]'
    }
  };

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (activeModal) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeModal]);

  // Intersection Observer for scroll animations
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    services.forEach((_, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add delay for domino effect
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, (index % 3) * 150); // First 3 cards: 0ms, 150ms, 300ms; Second 3 cards: 0ms, 150ms, 300ms
            } else {
              // Reset animation when card goes out of view
              setVisibleCards(prev => {
                const newVisible = [...prev];
                newVisible[index] = false;
                return newVisible;
              });
            }
          });
        },
        { 
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px'
        }
      );
      
      observers.push(observer);
    });

    // Observe each card
    services.forEach((_, index) => {
      const element = document.getElementById(`feature-card-${index}`);
      if (element && observers[index]) {
        observers[index].observe(element);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const services = [
    {
      icon: Shield,
      title: "Automated Device Isolation",
      description: "WithSecure's Endpoint Detection & Response (EDR) automatically isolates compromised devices to stop threats in their tracks",
      features: ["Instant threat containment", "Security lockdown & alerts", "Network segmentation", "Automated blocking", "Device isolation"]
    },
    {
      icon: Settings,
      title: "Patch Management",
      description: "Proactively fix vulnerabilities before attackers can exploit them. Automatically identify, prioritize, and deploy critical security updates across all endpoints—reducing risk and ensuring compliance.",
      features: ["Patch, update & fix", "System maintenance", "Software package management", "Automation & operations", "Missing patch components"]
    },
    {
      icon: Monitor,
      title: "GenAI Luminen™",
      description: "Luminen™ supercharges threat response with AI-driven intelligence, enabling faster, more strategic decisions at every stage of a security incident.",
      features: ["Artificial Intelligence", "Intelligent decision-making", "Investigation assistance", "Fast response", "Human & AI collaboration"]
    },
    {
      icon: Shield,
      title: "Ransomware Rollback Protection",
      description: "WithSecure's advanced ransomware rollback technology automatically detects and reverses ransomware attacks, restoring your files to their pre-attack state, neutralizing damage and ensuring business continuity.",
      features: ["Automatic File Recovery", "Behavior-Based Detection", "Minimize Downtime", "Protects Business-Critical Data", "Improves Resilience"]
    },
    {
      icon: Users,
      title: "Identity Security",
      description: "Protect your digital identities and secure access with AI-powered detection and automated response.",
      features: ["Real-Time Credential Monitoring", "Access Risk Mitigation", "AI-Driven Threat Detection", "Automated Response Actions", "Seamless Integration", "Comprehensive Reporting & Alerts"]
    },
    {
      icon: Lock,
      title: "BitLocker Handler",
      description: "Seamless management and recovery of BitLocker-encrypted drives, ensuring business continuity even when encryption keys are lost.",
      features: ["Automated key management", "Emergency recovery access", "Centralized administration", "Compliance reporting"]
    }
  ];

  return (
    <>
    <section id="services" className={`py-20 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>
            Our Solutions
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-3xl mx-auto`}>
            Comprehensive cybersecurity solutions powered by WithSecure™ technology, delivered with local expertise and support.
          </p>
        </div>

        {/* Three Main Portfolio Blocks */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Extended Detection and Response (XDR) */}
          <button 
            onClick={() => openModal('xdr')}
            className="relative overflow-hidden rounded-xl text-white p-8 min-h-[350px] group hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer text-left w-full hover:scale-105 hover:-translate-y-2"
            style={{
              backgroundImage: `url('/Extended-detection-and-response-BlueClouds.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/60 to-blue-900/80 group-hover:from-blue-800/70 group-hover:via-blue-700/50 group-hover:to-blue-800/70 transition-all duration-500"></div>
            
            {/* Animated glass panels */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
              <div className="absolute top-4 left-4 w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-24 h-24 bg-blue-300/20 backdrop-blur-sm rounded-full blur-lg animate-pulse delay-300"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 backdrop-blur-md rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>
            
            {/* Floating glass particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
              <div className="absolute top-16 left-16 w-3 h-3 bg-white/30 backdrop-blur-sm rounded-full animate-bounce delay-100"></div>
              <div className="absolute top-32 right-20 w-2 h-2 bg-blue-200/40 backdrop-blur-sm rounded-full animate-bounce delay-300"></div>
              <div className="absolute bottom-24 left-12 w-4 h-4 bg-white/20 backdrop-blur-sm rounded-full animate-bounce delay-500"></div>
              <div className="absolute bottom-16 right-16 w-2 h-2 bg-blue-100/50 backdrop-blur-sm rounded-full animate-bounce delay-700"></div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 border-2 border-white/30 rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm bg-white/10 group-hover:bg-white/20 group-hover:border-white/50 transition-all duration-500 group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Extended Detection &<br />
                Response (XDR)
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed h-[4.5rem] flex items-start">
                Unified protection, detection, and response against cyber threats
              </p>
              <div 
                className="flex items-center text-white font-medium group-hover:translate-x-1 transition-transform mt-auto"
              >
                Read more
                <div className="ml-2 w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                  <span className="text-sm">→</span>
                </div>
              </div>
            </div>
          </button>

          {/* Exposure Management (XM) */}
          <button 
            onClick={() => openModal('xm')}
            className="relative overflow-hidden rounded-xl text-white p-8 min-h-[350px] group hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer text-left w-full hover:scale-105 hover:-translate-y-2"
            style={{
              backgroundImage: `url('/Exposture-management-Aurora-NorthernLights.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-teal-800/60 to-emerald-900/80 group-hover:from-teal-800/70 group-hover:via-teal-700/50 group-hover:to-emerald-800/70 transition-all duration-500"></div>
            
            {/* Animated glass panels */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
              <div className="absolute top-6 right-6 w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-12 left-6 w-36 h-36 bg-teal-300/20 backdrop-blur-sm rounded-full blur-lg animate-pulse delay-200"></div>
              <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-white/5 backdrop-blur-md rounded-full blur-2xl animate-pulse delay-400"></div>
            </div>
            
            {/* Floating glass particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
              <div className="absolute top-20 left-20 w-3 h-3 bg-white/30 backdrop-blur-sm rounded-full animate-bounce delay-150"></div>
              <div className="absolute top-28 right-24 w-2 h-2 bg-teal-200/40 backdrop-blur-sm rounded-full animate-bounce delay-350"></div>
              <div className="absolute bottom-28 left-16 w-4 h-4 bg-white/20 backdrop-blur-sm rounded-full animate-bounce delay-550"></div>
              <div className="absolute bottom-20 right-20 w-2 h-2 bg-emerald-100/50 backdrop-blur-sm rounded-full animate-bounce delay-750"></div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 border-2 border-white/30 rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm bg-white/10 group-hover:bg-white/20 group-hover:border-white/50 transition-all duration-500 group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2M8 12h8M12 8v8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Exposure Management<br />
                (XM)
              </h3>
              <p className="text-teal-100 mb-6 leading-relaxed h-[4.5rem] flex items-start">
                Exposure remediation through the attacker's lens
              </p>
              <div 
                className="flex items-center text-white font-medium group-hover:translate-x-1 transition-transform mt-auto"
              >
                Read more
                <div className="ml-2 w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                  <span className="text-sm">→</span>
                </div>
              </div>
            </div>
          </button>

          {/* Co-Security Services */}
          <button 
            onClick={() => openModal('co-security')}
            className="relative overflow-hidden rounded-xl text-white p-8 min-h-[350px] group hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer text-left w-full hover:scale-105 hover:-translate-y-2"
            style={{
              backgroundImage: `url('/Co-security-services-ArcticMountains.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/60 to-indigo-900/80 group-hover:from-purple-800/70 group-hover:via-purple-700/50 group-hover:to-indigo-800/70 transition-all duration-500"></div>
            
            {/* Animated glass panels */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
              <div className="absolute top-8 left-8 w-30 h-30 bg-white/10 backdrop-blur-sm rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-6 right-10 w-32 h-32 bg-purple-300/20 backdrop-blur-sm rounded-full blur-lg animate-pulse delay-250"></div>
              <div className="absolute top-2/3 right-1/3 w-28 h-28 bg-white/5 backdrop-blur-md rounded-full blur-2xl animate-pulse delay-450"></div>
            </div>
            
            {/* Floating glass particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
              <div className="absolute top-24 left-24 w-3 h-3 bg-white/30 backdrop-blur-sm rounded-full animate-bounce delay-200"></div>
              <div className="absolute top-36 right-28 w-2 h-2 bg-purple-200/40 backdrop-blur-sm rounded-full animate-bounce delay-400"></div>
              <div className="absolute bottom-32 left-20 w-4 h-4 bg-white/20 backdrop-blur-sm rounded-full animate-bounce delay-600"></div>
              <div className="absolute bottom-24 right-24 w-2 h-2 bg-indigo-100/50 backdrop-blur-sm rounded-full animate-bounce delay-800"></div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 border-2 border-white/30 rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm bg-white/10 group-hover:bg-white/20 group-hover:border-white/50 transition-all duration-500 group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Withsecure Co-Monitoring Service
              </h3>
              <p className="text-purple-100 mb-6 leading-relaxed h-[4.5rem] flex items-start">
                Protecting business outcomes, together
              </p>
              <div 
                className="flex items-center text-white font-medium group-hover:translate-x-1 transition-transform mt-auto"
              >
                Read more
                <div className="ml-2 w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                  <span className="text-sm">→</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Modal Overlay */}
        {activeModal && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={closeModal}
          >
            <div 
              className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-2xl max-w-[90vw] w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 animate-slide-up`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* XDR Modal Content */}
              {activeModal === 'xdr' && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Extended Detection and Response (XDR)
                    </h2>
                    <button 
                      onClick={closeModal}
                      className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
                    >
                      <X className={`h-6 w-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                    </button>
                  </div>
                  
                  {/* Hero Section */}
                  <div className={`${isDarkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'} rounded-xl p-6 mb-8`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Unified Cyber Defense</h3>
                        <p className={`${isDarkMode ? 'text-blue-300' : 'text-blue-600'} font-medium`}>AI-Powered • Real-Time • Comprehensive</p>
                      </div>
                    </div>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} text-lg leading-relaxed`}>
                      WithSecure Elements XDR is your <strong>all-in-one cybersecurity command center</strong> that unifies protection across your entire digital ecosystem. Think of it as having a team of AI-powered security experts working 24/7 to keep your business safe.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Endpoint Security Card */}
                    <div className={`${isDarkMode ? 'bg-blue-900/10 border-blue-800/20' : 'bg-blue-25 border-blue-100'} border rounded-xl p-6 hover:shadow-lg transition-shadow`}>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <Monitor className="h-5 w-5 text-white" />
                        </div>
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Advanced Endpoint Security</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Ransomware rollback & malware blocking</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Award-winning protection (Windows, macOS, Linux)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Broad Context Detection™ technology</span>
                        </div>
                      </div>
                    </div>

                    {/* Cloud Security Card */}
                    <div className={`${isDarkMode ? 'bg-blue-900/10 border-blue-800/20' : 'bg-blue-25 border-blue-100'} border rounded-xl p-6 hover:shadow-lg transition-shadow`}>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <div className="w-5 h-5 border-2 border-white rounded-full"></div>
                        </div>
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Cloud Security</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Azure infrastructure protection</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Threat research-based detection</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Quick threat mitigation tools</span>
                        </div>
                      </div>
                    </div>

                    {/* Microsoft 365 Card */}
                    <div className={`${isDarkMode ? 'bg-blue-900/10 border-blue-800/20' : 'bg-blue-25 border-blue-100'} border rounded-xl p-6 hover:shadow-lg transition-shadow`}>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <Mail className="h-5 w-5 text-white" />
                        </div>
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Microsoft 365 Protection</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Advanced email & collaboration security</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Teams, OneDrive & SharePoint protection</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>No email re-routing required</span>
                        </div>
                      </div>
                    </div>

                    {/* Identity Security Card */}
                    <div className={`${isDarkMode ? 'bg-blue-900/10 border-blue-800/20' : 'bg-blue-25 border-blue-100'} border rounded-xl p-6 hover:shadow-lg transition-shadow`}>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Identity Security</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Compromised account detection</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Microsoft Entra ID integration</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Automated response actions</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-800/30' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6 text-center`}>
                    <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Ready to Experience XDR?</h4>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-4`}>
                      Join thousands of organizations worldwide who trust WithSecure Elements XDR to protect their digital assets.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <span className={`px-3 py-1 ${isDarkMode ? 'bg-blue-800/30 text-blue-200' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium`}>✓ 30-Day Free Trial</span>
                      <span className={`px-3 py-1 ${isDarkMode ? 'bg-blue-800/30 text-blue-200' : 'bg-blue-100 text-blue-700'} rounded-full text-sm font-medium`}>✓ Expert Support</span>
                    </div>
                  </div>
                </div>
              )}

              {/* XM Modal Content */}
              {activeModal === 'xm' && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Exposure Management (XM)
                    </h2>
                    <button 
                      onClick={closeModal}
                      className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
                    >
                      <X className={`h-6 w-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                    </button>
                  </div>
                  
                  {/* Hero Section */}
                  <div className={`${isDarkMode ? 'bg-teal-900/20 border border-teal-800/30' : 'bg-teal-50 border border-teal-200'} rounded-xl p-6 mb-8`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-4">
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Think Like an Attacker</h3>
                        <p className={`${isDarkMode ? 'text-teal-300' : 'text-teal-600'} font-medium`}>Proactive • AI-Powered • European Excellence</p>
                      </div>
                    </div>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} text-lg leading-relaxed`}>
                      Stop playing defense and start thinking offense! WithSecure Elements XM shows you <strong>exactly how attackers see your organization</strong> - before they strike. It's like having a crystal ball for cybersecurity.
                    </p>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className={`${isDarkMode ? 'bg-teal-900/10 border-teal-800/20' : 'bg-teal-25 border-teal-100'} border rounded-xl p-6`}>
                      <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center`}>
                        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mr-3">
                          <AlertTriangle className="h-4 w-4 text-white" />
                        </div>
                        The Challenge
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Reactive security = Always one step behind</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>AI-powered attacks evolving faster than defenses</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Hybrid environments with unclear security boundaries</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>NIS 2 compliance requirements</span>
                        </div>
                      </div>
                    </div>

                    <div className={`${isDarkMode ? 'bg-teal-900/10 border-teal-800/20' : 'bg-teal-25 border-teal-100'} border rounded-xl p-6`}>
                      <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4 flex items-center`}>
                        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mr-3">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        The Solution
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>360° visibility of your attack surface</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>AI simulates real attack paths</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Prioritized, actionable recommendations</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2"></div>
                          <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>European data privacy standards</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className={`${isDarkMode ? 'bg-teal-900/10 border-teal-800/20' : 'bg-teal-25 border-teal-100'} border rounded-xl p-6 mb-8`}>
                    <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-6 text-center`}>How It Works</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Discover & Map</h5>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Combines data from external surfaces, identities, devices, networks & cloud services</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Simulate Attacks</h5>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Patent-pending AI simulates real attack paths to your critical assets</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Prioritize & Act</h5>
                        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Get clear, prioritized recommendations that make sense to both IT and business teams</p>
                      </div>
                    </div>
                  </div>

                  {/* Expert Consultation */}
                  <div className={`${isDarkMode ? 'bg-teal-900/20 border-teal-800/30' : 'bg-teal-50 border-teal-200'} border rounded-xl p-6 text-center`}>
                    <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>WithSecure™ Elevate Service</h4>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-4`}>
                      Need expert validation? Send any finding directly to our cybersecurity experts for deeper analysis and priority confirmation.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <span className={`px-3 py-1 ${isDarkMode ? 'bg-teal-800/30 text-teal-200' : 'bg-teal-100 text-teal-700'} rounded-full text-sm font-medium`}>✓ Expert Analysis</span>
                      <span className={`px-3 py-1 ${isDarkMode ? 'bg-teal-800/30 text-teal-200' : 'bg-teal-100 text-teal-700'} rounded-full text-sm font-medium`}>✓ Priority Validation</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Co-Security Modal Content */}
              {activeModal === 'co-security' && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Co-Security Services
                    </h2>
                    <button 
                      onClick={closeModal}
                      className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
                    >
                      <X className={`h-6 w-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
                    </button>
                  </div>
                  
                  {/* Hero Section */}
                  <div className={`${isDarkMode ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-purple-50 border border-purple-200'} rounded-xl p-6 mb-8`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Your Security Dream Team</h3>
                        <p className={`${isDarkMode ? 'text-purple-300' : 'text-purple-600'} font-medium`}>Partnership • Expertise • 24/7 Support</p>
                      </div>
                    </div>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} text-lg leading-relaxed`}>
                      Why go it alone? Our Co-Security Services give you <strong>instant access to world-class cybersecurity experts</strong> who work as an extension of your team. It's like having a superhero squad on speed dial!
                    </p>
                  </div>

                  {/* Service Cards */}
                  <div className="space-y-6 mb-8">
                    {/* 24/7 SOC */}
                    <div className={`${isDarkMode ? 'bg-purple-900/10 border-purple-800/20' : 'bg-purple-25 border-purple-100'} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                          <Shield className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-3`}>24/7 Security Operations Center</h4>
                          <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-4 leading-relaxed`}>
                            <strong>Never sleep on security again!</strong> Our elite team of security analysts monitors your environment around the clock, like digital guardians who never take a break.
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Continuous threat monitoring</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Real-time threat analysis</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Instant response coordination</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Rapid threat containment</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expert Consultation */}
                    <div className={`${isDarkMode ? 'bg-purple-900/10 border-purple-800/20' : 'bg-purple-25 border-purple-100'} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                          <Users className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-3`}>Expert Consultation & Support</h4>
                          <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-4 leading-relaxed`}>
                            <strong>Tap into decades of expertise!</strong> Our cybersecurity veterans become your strategic advisors, helping you navigate complex security challenges with confidence.
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Strategic security planning</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Complex incident analysis</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Best practices implementation</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Security team extension</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Incident Response */}
                    <div className={`${isDarkMode ? 'bg-purple-900/10 border-purple-800/20' : 'bg-purple-25 border-purple-100'} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                          <AlertTriangle className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-3`}>Incident Response & Recovery</h4>
                          <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-4 leading-relaxed`}>
                            <strong>When crisis strikes, we strike back!</strong> Our rapid response team jumps into action faster than you can say "cyber attack," minimizing damage and getting you back to business.
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Immediate response support</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Threat containment & isolation</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Damage assessment & analysis</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Guided recovery operations</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Partnership Benefits */}
                  <div className={`${isDarkMode ? 'bg-purple-900/20 border-purple-800/30' : 'bg-purple-50 border-purple-200'} border rounded-xl p-6 text-center`}>
                    <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Why Choose Co-Security?</h4>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-white font-bold">$</span>
                        </div>
                        <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm font-medium`}>Cost-Effective</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-white font-bold">⚡</span>
                        </div>
                        <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm font-medium`}>Instant Expertise</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-white font-bold">★</span>
                        </div>
                        <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-sm font-medium`}>Business-Focused</span>
                      </div>
                    </div>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Get enterprise-level security without the enterprise-level headaches. We handle the complexity, you focus on growing your business!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>

    {/* New Key Features Section */}
    <section className={`py-20 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>
            WithSecure™ Key Features
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-3xl mx-auto`}>
            Advanced security capabilities that power our comprehensive cybersecurity solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              id={`feature-card-${index}`}
              className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 group hover:-translate-y-1 transform ${
                visibleCards[index] 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className={`w-16 h-16 ${themeColors[theme].iconBg} rounded-lg flex items-center justify-center mb-6 ${themeColors[theme].iconHover} transition-colors`}>
                <service.icon className={`h-8 w-8 ${themeColors[theme].iconColor} group-hover:text-white transition-colors`} />
              </div>
              
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>{service.title}</h3>
              <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-6 leading-relaxed`}>{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={`flex items-center text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <div className={`w-2 h-2 ${themeColors[theme].dot} rounded-full mr-3`}></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Services;