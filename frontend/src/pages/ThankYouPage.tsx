import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui';
import { CheckCircleIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

// Declare Cal for TypeScript
declare global {
  interface Window {
    Cal: any;
  }
}

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Automatically transition to calendar after 3 seconds
    const timer = setTimeout(() => {
      if (currentStep === 1) {
        setCurrentStep(2);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    // Initialize Cal.com embed when component mounts
    if (currentStep === 2) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function (C, A, L) { 
          let p = function (a, ar) { a.q.push(ar); }; 
          let d = C.document; 
          C.Cal = C.Cal || function () { 
            let cal = C.Cal; 
            let ar = arguments; 
            if (!cal.loaded) { 
              cal.ns = {}; 
              cal.q = cal.q || []; 
              d.head.appendChild(d.createElement("script")).src = A; 
              cal.loaded = true; 
            } 
            if (ar[0] === L) { 
              const api = function () { p(api, arguments); }; 
              const namespace = ar[1]; 
              api.q = api.q || []; 
              if(typeof namespace === "string"){
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar); 
              return;
            } 
            p(cal, ar); 
          }; 
        })(window, "https://app.cal.com/embed/embed.js", "init");
        
        Cal("init", "quick-chat-with-tau", {origin:"https://app.cal.com"});
        Cal.ns["quick-chat-with-tau"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      `;
      document.head.appendChild(script);
    }
  }, [currentStep]);

  const handleScheduleClick = () => {
    // This will trigger the Cal.com modal
    if (window.Cal && window.Cal.ns && window.Cal.ns['quick-chat-with-tau']) {
      window.Cal.ns['quick-chat-with-tau']('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step 1: Thank You Message */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-soft p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-8 h-8 text-success-600" />
              </div>
              <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                Thank You for Registering!
              </h1>
              <p className="text-xl text-neutral-600 mb-6">
                Your registration has been successfully submitted. We're excited to help you find your perfect match.
              </p>
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Next Steps:</h3>
                <p className="text-primary-700">
                  Schedule a complimentary 45-minute screening call to discuss your preferences and begin your personalized matchmaking journey.
                </p>
              </div>
              <div className="flex items-center justify-center text-sm text-neutral-500">
                <span>Redirecting to calendar in a few seconds...</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Schedule Call */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-soft p-8 max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                Schedule Your Screening Call
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-6">
                Choose a time that works best for you. Our expert matchmakers are available Monday through Friday, 9 AM to 5 PM GMT.
              </p>
            </div>
            
            <div className="text-center mb-8">
              <button
                onClick={handleScheduleClick}
                data-cal-link="tau-mutimutema-woelnh/quick-chat-with-tau"
                data-cal-namespace="quick-chat-with-tau"
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-warm text-lg"
              >
                <ClockIcon className="w-6 h-6" />
                Book Your Free Screening Call
              </button>
            </div>
            
            <div className="bg-neutral-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">What to Expect in Your Call:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-neutral-700">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                    <span>Discuss your relationship goals and values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                    <span>Review your preferences and dealbreakers</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                    <span>Learn about our matching process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                    <span>Understand service options and next steps</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 text-sm text-neutral-500 bg-neutral-50 px-4 py-2 rounded-full">
                <CheckCircleIcon className="w-4 h-4 text-success-600" />
                <span>100% Private Service • No Fancy Algorithms • Completely Confidential</span>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button onClick={() => navigate('/')} variant="outline">
                Return to Home
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThankYouPage;
