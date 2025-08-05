import React from 'react';
import { Button } from '../components/ui';

const RegistrationPage: React.FC = () => {
    const whatsappNumber = '48532007086'; // Admin's WhatsApp number
    const message = 'Hi! I am interested in your matchmaking services.';
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    const handleWhatsAppClick = () => {
        window.open(whatsappLink, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="mb-4">
                        <h2 className="text-2xl font-display font-light text-neutral-700 mb-2">
                            Zuri Oasis Elite
                            <span className="block text-lg font-normal text-neutral-500 italic">i see you</span>
                        </h2>
                    </div>
                    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                        Get Started with Matchmaking
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Ready to find your perfect match? Contact us on WhatsApp to begin your personalized matchmaking journey.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-soft p-8">
                    <div className="text-center space-y-6">
                        <div className="flex justify-center">
                            <svg 
                                className="w-16 h-16 text-green-500 mb-4" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-semibold text-neutral-900">
                            Start Your Journey
                        </h2>
                        
                        <p className="text-neutral-600">
                            Click below to send us a message on WhatsApp. We'll discuss your preferences and help you find your ideal partner.
                        </p>

                        <div className="flex justify-center mt-8">
                            <Button 
                                onClick={handleWhatsAppClick}
                                className="w-full sm:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg"
                            >
                                💬 Contact Us on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
