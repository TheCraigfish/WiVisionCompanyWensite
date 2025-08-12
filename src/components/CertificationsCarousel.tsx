import React from 'react';

const CertificationsCarousel = () => {
  const certifications = [
    { src: '/AV-test1.png', alt: 'AV-Test Award' },
    { src: '/PC-PRO1.png', alt: 'PC Pro A-List Award' },
    { src: '/Software-Reviews2.png', alt: 'Software Reviews Award' },
    { src: '/AI-Intel1.png', alt: 'AI Artificial Intelligence Excellence' },
    { src: '/G21.png', alt: 'G21 Award' },
    { src: '/AV-comparatives1.png', alt: 'AV-Comparatives Award' },
  ];

  // Duplicate the array multiple times for seamless infinite scroll
  const duplicatedCertifications = [
    ...certifications,
    ...certifications,
    ...certifications
  ];

  return (
    <section className="py-12 bg-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
            Industry Recognition & Certifications
          </h2>
          <p className="text-sm lg:text-base text-slate-600 max-w-2xl mx-auto">
            WithSecure™'s cybersecurity solutions are recognized by leading industry organizations and testing laboratories worldwide.
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Left blur gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-200 to-transparent z-10 pointer-events-none"></div>
          
          {/* Right blur gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-200 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll-seamless">
            {duplicatedCertifications.map((cert, index) => (
              <div 
                key={index} 
                className="flex-shrink-0"
              >
                <div className="bg-slate-200 rounded-lg p-8 shadow-md h-40 w-64 flex items-center justify-center">
                  <img 
                    src={cert.src} 
                    alt={cert.alt}
                    className="max-h-32 max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${certifications.length * 256}px);
          }
        }
        
        .animate-scroll-seamless {
          animation: scroll-seamless 30s linear infinite;
          width: ${duplicatedCertifications.length * 256}px;
        }
        
        .animate-scroll-seamless:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CertificationsCarousel;