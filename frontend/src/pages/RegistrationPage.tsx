import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Select, Checkbox, Button, TextArea } from '../components/ui';
import { UserIcon, HeartIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const RegistrationPage: React.FC = () => {
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const clientType = watch('clientType');
    const referralSource = watch('referralSource');

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        console.log('Registration data:', data);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Navigate to thank you page
        navigate('/thank-you');
        setIsSubmitting(false);
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const preferenceOptions = [
        'Honesty & Integrity',
        'Family-oriented',
        'Career-driven',
        'Financially stable',
        'Educated',
        'Spiritual/Religious',
        'Health-conscious',
        'Adventurous',
        'Good sense of humor',
        'Emotionally mature',
        'Culturally aware',
        'Community-minded'
    ];

    const dealbreakerOptions = [
        'Smoking',
        'Excessive drinking',
        'Not wanting children',
        'Already has children',
        'Divorced',
        'Lives with parents',
        'Unemployed',
        'Different religion',
        'Age gap (>5 years)',
        'Long distance',
        'Different life goals',
        'Poor communication'
    ];

    const referralOptions = [
        'Social media (Instagram, Facebook, Twitter)',
        'Google search',
        'Friend or family referral',
        'Professional network',
        'Community event',
        'Online advertisement',
        'Word of mouth',
        'Dating app advertisement',
        'Podcast or blog',
        'Other'
    ];

    const eventOptions = [
        'African Heritage Month event',
        'Professional networking event',
        'Community gathering',
        'Dating workshop',
        'Cultural celebration',
        'Business conference',
        'Social mixer',
        'Other'
    ];

    const steps = [
        { number: 1, title: 'Basic Information', icon: UserIcon },
        { number: 2, title: 'Background & Values', icon: HeartIcon },
        { number: 3, title: 'Preferences & Standards', icon: CheckCircleIcon },
        { number: 4, title: 'How You Found Us', icon: ShieldCheckIcon }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                        Begin Your Journey
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Tell us about yourself so we can find your perfect match. This comprehensive intake helps us understand your unique needs and preferences.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isCompleted = currentStep > step.number;
                            const isCurrent = currentStep === step.number;
                            
                            return (
                                <div key={step.number} className="flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                        isCompleted ? 'bg-primary-600 text-white' : 
                                        isCurrent ? 'bg-primary-100 text-primary-600 border-2 border-primary-600' :
                                        'bg-neutral-200 text-neutral-400'
                                    }`}>
                                        {isCompleted ? (
                                            <CheckCircleIcon className="w-5 h-5" />
                                        ) : (
                                            <Icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="ml-2 hidden sm:block">
                                        <div className={`text-sm font-medium ${
                                            isCompleted || isCurrent ? 'text-primary-600' : 'text-neutral-400'
                                        }`}>
                                            {step.title}
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`ml-4 w-12 h-0.5 ${
                                            isCompleted ? 'bg-primary-600' : 'bg-neutral-200'
                                        }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white rounded-2xl shadow-soft p-8">
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Basic Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Controller 
                                        name="firstName" 
                                        control={control} 
                                        rules={{ required: 'First name is required' }}
                                        render={({ field }) => (
                                            <Input {...field} label="First Name" error={errors.firstName?.message} />
                                        )} 
                                    />
                                    <Controller 
                                        name="lastName" 
                                        control={control} 
                                        rules={{ required: 'Last name is required' }}
                                        render={({ field }) => (
                                            <Input {...field} label="Last Name" error={errors.lastName?.message} />
                                        )} 
                                    />
                                    <Controller 
                                        name="email" 
                                        control={control} 
                                        rules={{ 
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input {...field} label="Email" type="email" error={errors.email?.message} />
                                        )} 
                                    />
                                    <Controller 
                                        name="phone" 
                                        control={control} 
                                        rules={{ required: 'Phone number is required' }}
                                        render={({ field }) => (
                                            <Input {...field} label="Phone Number" type="tel" error={errors.phone?.message} />
                                        )} 
                                    />
                                    <Controller 
                                        name="dateOfBirth" 
                                        control={control} 
                                        rules={{ required: 'Date of birth is required' }}
                                        render={({ field }) => (
                                            <Input {...field} label="Date of Birth" type="date" error={errors.dateOfBirth?.message} />
                                        )} 
                                    />
                                    <Controller 
                                        name="location" 
                                        control={control} 
                                        rules={{ required: 'Location is required' }}
                                        render={({ field }) => (
                                            <Input {...field} label="City, UK" placeholder="e.g., London, Manchester" error={errors.location?.message} />
                                        )} 
                                    />
                                    <Controller 
                                        name="occupation" 
                                        control={control} 
                                        rules={{ required: 'Occupation is required' }}
                                        render={({ field }) => (
                                            <Input {...field} label="Occupation" error={errors.occupation?.message} />
                                        )} 
                                    />
                                    <Controller 
                                        name="education" 
                                        control={control} 
                                        render={({ field }) => (
                                            <Select {...field} label="Education Level" options={[
                                                'High School',
                                                'College/University',
                                                'Bachelor\'s Degree',
                                                'Master\'s Degree',
                                                'PhD/Doctorate',
                                                'Professional Qualification'
                                            ]} />
                                        )} 
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Background & Values */}
                        {currentStep === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Background & Values</h2>
                                <div className="space-y-6">
                                    <Controller 
                                        name="culturalBackground" 
                                        control={control} 
                                        render={({ field }) => (
                                            <TextArea {...field} label="Cultural Background" placeholder="Tell us about your cultural heritage, traditions that are important to you..." />
                                        )} 
                                    />
                                    <Controller 
                                        name="lifeGoals" 
                                        control={control} 
                                        render={({ field }) => (
                                            <TextArea {...field} label="Life Goals & Aspirations" placeholder="What are your personal and professional goals for the next 5-10 years?" />
                                        )} 
                                    />
                                    <Controller 
                                        name="values" 
                                        control={control} 
                                        render={({ field }) => (
                                            <TextArea {...field} label="Core Values" placeholder="What values are most important to you in life and relationships?" />
                                        )} 
                                    />
                                    <Controller 
                                        name="relationshipHistory" 
                                        control={control} 
                                        render={({ field }) => (
                                            <TextArea {...field} label="Relationship History" placeholder="Tell us about your relationship experience and what you've learned..." />
                                        )} 
                                    />
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Controller 
                                            name="hasChildren" 
                                            control={control} 
                                            render={({ field }) => (
                                                <Select {...field} label="Do you have children?" options={[
                                                    'No',
                                                    'Yes, living with me',
                                                    'Yes, living elsewhere',
                                                    'Yes, shared custody'
                                                ]} />
                                            )} 
                                        />
                                        <Controller 
                                            name="wantsChildren" 
                                            control={control} 
                                            render={({ field }) => (
                                                <Select {...field} label="Do you want children?" options={[
                                                    'Yes, definitely',
                                                    'Yes, maybe',
                                                    'No',
                                                    'Unsure'
                                                ]} />
                                            )} 
                                        />
                                    </div>
                                    <Controller 
                                        name="clientType" 
                                        control={control} 
                                        render={({ field }) => (
                                            <Select {...field} label="Professional Category" options={[
                                                'Executive/Business Leader',
                                                'Creative Professional',
                                                'Healthcare Professional',
                                                'Legal Professional',
                                                'Financial Services',
                                                'Academic/Education',
                                                'Technology Professional',
                                                'Entrepreneur',
                                                'Other'
                                            ]} />
                                        )} 
                                    />
                                    
                                    {/* Dynamic questions based on client type */}
                                    {clientType === 'Executive/Business Leader' && (
                                        <Controller 
                                            name="executiveDetails" 
                                            control={control} 
                                            render={({ field }) => (
                                                <TextArea {...field} label="Executive Background" placeholder="Tell us about your leadership role, industry, and what drives you professionally..." />
                                            )} 
                                        />
                                    )}
                                    {clientType === 'Creative Professional' && (
                                        <Controller 
                                            name="creativeDetails" 
                                            control={control} 
                                            render={({ field }) => (
                                                <TextArea {...field} label="Creative Background" placeholder="Describe your creative work, passions, and what inspires you..." />
                                            )} 
                                        />
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Preferences & Standards */}
                        {currentStep === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Preferences & Standards</h2>
                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                                            What qualities are most important to you in a partner? (Select all that apply)
                                        </label>
                                        <div className="grid md:grid-cols-3 gap-3">
                                            {preferenceOptions.map((preference) => (
                                                <Controller 
                                                    key={preference}
                                                    name="preferences" 
                                                    control={control} 
                                                    render={({ field }) => {
                                                        const currentValues = field.value || [];
                                                        return (
                                                            <Checkbox 
                                                                value={preference}
                                                                label={preference}
                                                                checked={currentValues.includes(preference)}
                                                                onChange={(checked) => {
                                                                    if (checked) {
                                                                        field.onChange([...currentValues, preference]);
                                                                    } else {
                                                                        field.onChange(currentValues.filter((v: string) => v !== preference));
                                                                    }
                                                                }}
                                                            />
                                                        );
                                                    }} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                                            What are your absolute dealbreakers? (Select all that apply)
                                        </label>
                                        <div className="grid md:grid-cols-3 gap-3">
                                            {dealbreakerOptions.map((dealbreaker) => (
                                                <Controller 
                                                    key={dealbreaker}
                                                    name="dealbreakers" 
                                                    control={control} 
                                                    render={({ field }) => {
                                                        const currentValues = field.value || [];
                                                        return (
                                                            <Checkbox 
                                                                value={dealbreaker}
                                                                label={dealbreaker}
                                                                checked={currentValues.includes(dealbreaker)}
                                                                onChange={(checked) => {
                                                                    if (checked) {
                                                                        field.onChange([...currentValues, dealbreaker]);
                                                                    } else {
                                                                        field.onChange(currentValues.filter((v: string) => v !== dealbreaker));
                                                                    }
                                                                }}
                                                            />
                                                        );
                                                    }} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <Controller 
                                        name="additionalPreferences" 
                                        control={control} 
                                        render={({ field }) => (
                                            <TextArea {...field} label="Additional Preferences or Requirements" placeholder="Any other specific preferences, requirements, or details you'd like us to know..." />
                                        )} 
                                    />
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Controller 
                                            name="ageRangeMin" 
                                            control={control} 
                                            render={({ field }) => (
                                                <Input {...field} label="Minimum Age Preference" type="number" min="18" max="80" />
                                            )} 
                                        />
                                        <Controller 
                                            name="ageRangeMax" 
                                            control={control} 
                                            render={({ field }) => (
                                                <Input {...field} label="Maximum Age Preference" type="number" min="18" max="80" />
                                            )} 
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: How You Found Us */}
                        {currentStep === 4 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">How You Found Us</h2>
                                <div className="space-y-6">
                                    <Controller 
                                        name="referralSource" 
                                        control={control} 
                                        render={({ field }) => (
                                            <Select {...field} label="How did you hear about our service?" options={referralOptions} />
                                        )} 
                                    />
                                    
                                    {referralSource === 'Friend or family referral' && (
                                        <Controller 
                                            name="referralDetails" 
                                            control={control} 
                                            render={({ field }) => (
                                                <Input {...field} label="Referral Details" placeholder="Who referred you to us?" />
                                            )} 
                                        />
                                    )}
                                    
                                    {referralSource === 'Other' && (
                                        <Controller 
                                            name="referralOther" 
                                            control={control} 
                                            render={({ field }) => (
                                                <Input {...field} label="Please specify" placeholder="How did you hear about us?" />
                                            )} 
                                        />
                                    )}
                                    
                                    <Controller 
                                        name="eventAttended" 
                                        control={control} 
                                        render={({ field }) => (
                                            <Select {...field} label="Have you attended any of our events?" options={[
                                                'No, I haven\'t attended any events',
                                                ...eventOptions
                                            ]} />
                                        )} 
                                    />
                                    
                                    <Controller 
                                        name="expectations" 
                                        control={control} 
                                        render={({ field }) => (
                                            <TextArea {...field} label="What are your expectations from our service?" placeholder="Tell us what you're hoping to achieve through our matchmaking service..." />
                                        )} 
                                    />
                                    
                                    <Controller 
                                        name="timeframe" 
                                        control={control} 
                                        render={({ field }) => (
                                            <Select {...field} label="What's your ideal timeframe for finding a serious relationship?" options={[
                                                'Within 3 months',
                                                '3-6 months',
                                                '6-12 months',
                                                '1-2 years',
                                                'No specific timeframe'
                                            ]} />
                                        )} 
                                    />
                                    
                                    <div className="bg-primary-50 p-4 rounded-lg">
                                        <Controller 
                                            name="privacyConsent" 
                                            control={control} 
                                            rules={{ required: 'You must agree to our privacy policy' }}
                                            render={({ field }) => (
                                                <Checkbox 
                                                    {...field}
                                                    label="I agree to the privacy policy and terms of service. I understand that my information will be kept confidential and used only for matchmaking purposes."
                                                    error={errors.privacyConsent?.message}
                                                />
                                            )} 
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={prevStep}
                                disabled={currentStep === 1}
                            >
                                Previous
                            </Button>
                            
                            <div className="text-sm text-neutral-500">
                                Step {currentStep} of {steps.length}
                            </div>
                            
                            {currentStep < steps.length ? (
                                <Button type="button" onClick={nextStep}>
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;

