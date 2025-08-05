import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CertificationsCarousel from './components/CertificationsCarousel';
import About from './components/About';
import Services from './components/Services';
import Solutions from './components/Solutions';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState<'teal' | 'blue' | 'cyan'>('blue');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  return (
    <div className={`min-h-screen ${theme === 'blue' ? 'theme-blue' : theme === 'cyan' ? 'theme-cyan' : 'theme-teal'} ${isDarkMode ? 'dark' : ''}`}>
      <Header theme={theme} isDarkMode={isDarkMode} onDarkModeToggle={toggleDarkMode} />
      <Hero theme={theme} isDarkMode={isDarkMode} />
      <Services theme={theme} isDarkMode={isDarkMode} />
      <CertificationsCarousel />
      <About theme={theme} isDarkMode={isDarkMode} />
      <Solutions theme={theme} isDarkMode={isDarkMode} />
      <Contact theme={theme} isDarkMode={isDarkMode} />
      <Footer />
    </div>
  );
}

export default App;