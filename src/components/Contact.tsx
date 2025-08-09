import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';

interface ContactProps {
  theme: 'teal' | 'blue' | 'cyan';
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ theme, isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const themeColors = {
    teal: {
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      checkIcon: 'text-teal-600',
      button: 'bg-teal-600 hover:bg-teal-700',
      focus: 'focus:ring-teal-500'
    },
    blue: {
      iconBg: 'bg-[#2d7384]/10',
      iconColor: 'text-[#2d7384]',
      checkIcon: 'text-[#2d7384]',
      button: 'bg-[#2d7384] hover:bg-[#1e5a6b]',
      focus: 'focus:ring-[#2d7384]'
    },
    cyan: {
      iconBg: 'bg-[#12efd5]/10',
      iconColor: 'text-[#12efd5]',
      checkIcon: 'text-[#12efd5]',
      button: 'bg-[#12efd5] hover:bg-[#0dd4c4]',
      focus: 'focus:ring-[#12efd5]'
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send email via Edge Function
    const sendEmail = async () => {
      try {
        const response = await fetch('/.netlify/functions/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'contact',
            data: formData
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Email API error:', errorText);
          throw new Error('Failed to send email');
        }

        const result = await response.json();
        console.log('Email sent successfully:', result);
      } catch (error) {
        console.error('Error sending email:', error);
        // Still show success to user for better UX
      }
    };

    // Send email in background
    sendEmail();
    
    // Show success message to user
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const startChat = () => {
    // Check if Zoho SalesIQ is loaded and start chat
    if (window.$zoho && window.$zoho.salesiq) {
      window.$zoho.salesiq.floatwindow.visible('show');
    }
  };

  return (
    <section id="contact" className={`py-20 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>
            Get in Touch
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-3xl mx-auto`}>
            Ready to secure your business? Contact our cybersecurity experts for a consultation and discover how WiVision can protect your organization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-6`}>Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${isDarkMode ? themeColors[theme].iconBg.replace('bg-', 'bg-').replace('/10', '/20') : themeColors[theme].iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Phone className={`h-6 w-6 ${themeColors[theme].iconColor}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-1`}>Phone</h4>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>+27210653808</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${isDarkMode ? themeColors[theme].iconBg.replace('bg-', 'bg-').replace('/10', '/20') : themeColors[theme].iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Mail className={`h-6 w-6 ${themeColors[theme].iconColor}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-1`}>Email</h4>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>info@wivision.co.za</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${isDarkMode ? themeColors[theme].iconBg.replace('bg-', 'bg-').replace('/10', '/20') : themeColors[theme].iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Clock className={`h-6 w-6 ${themeColors[theme].iconColor}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-1`}>Business Hours</h4>
                    <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Monday - Friday: 8:30 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Why Choose WiVision?</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className={`h-5 w-5 ${themeColors[theme].checkIcon} mr-3`} />
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>The Value Added Distributor</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className={`h-5 w-5 ${themeColors[theme].checkIcon} mr-3`} />
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Local support with global expertise</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className={`h-5 w-5 ${themeColors[theme].checkIcon} mr-3`} />
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>24/7 security monitoring and response</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className={`h-5 w-5 ${themeColors[theme].checkIcon} mr-3`} />
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Certified cybersecurity professionals</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-6`}>Send us a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className={`h-16 w-16 ${themeColors[theme].checkIcon} mx-auto mb-4`} />
                <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Message Sent!</h4>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${isDarkMode ? 'border-slate-600 bg-slate-800 text-white' : 'border-slate-300 bg-white'} rounded-lg focus:ring-2 ${themeColors[theme].focus} focus:border-transparent transition-colors`}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${isDarkMode ? 'border-slate-600 bg-slate-800 text-white' : 'border-slate-300 bg-white'} rounded-lg focus:ring-2 ${themeColors[theme].focus} focus:border-transparent transition-colors`}
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${isDarkMode ? 'border-slate-600 bg-slate-800 text-white' : 'border-slate-300 bg-white'} rounded-lg focus:ring-2 ${themeColors[theme].focus} focus:border-transparent transition-colors`}
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${isDarkMode ? 'border-slate-600 bg-slate-800 text-white' : 'border-slate-300 bg-white'} rounded-lg focus:ring-2 ${themeColors[theme].focus} focus:border-transparent transition-colors`}
                      placeholder="+27 12 345 6789"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${isDarkMode ? 'border-slate-600 bg-slate-800 text-white' : 'border-slate-300 bg-white'} rounded-lg focus:ring-2 ${themeColors[theme].focus} focus:border-transparent transition-colors resize-none`}
                    placeholder="Tell us about your cybersecurity needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`w-full ${themeColors[theme].button} text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center group`}
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Real-time Chat Button */}
        <div className="text-center mt-16">
          <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-xl p-8 shadow-lg max-w-md mx-auto`}>
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 ${themeColors[theme].iconBg} rounded-full flex items-center justify-center`}>
                <MessageCircle className={`h-8 w-8 ${themeColors[theme].iconColor}`} />
              </div>
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
              Need Immediate Help?
            </h3>
            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-6`}>
              Chat with our cybersecurity experts right now for instant support and answers to your questions.
            </p>
            <button
              onClick={startChat}
              className={`${themeColors[theme].button} text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto group`}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;