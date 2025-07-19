
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CarApplicationForm } from './CarApplicationForm';
import { POPIAConsent } from '../compliance/POPIAConsent';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { toast } from '@/hooks/use-toast';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: {
    make: string;
    model: string;
    year: number;
    price: number;
  };
  dealership: {
    name: string;
    location: string;
  };
}

export const ApplicationModal = ({ isOpen, onClose, car, dealership }: ApplicationModalProps) => {
  const [currentStep, setCurrentStep] = useState<'auth' | 'form' | 'consent' | 'success'>('auth');
  const [applicationData, setApplicationData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // If user is logged in, skip auth step
  useState(() => {
    if (user && currentStep === 'auth') {
      setCurrentStep('form');
    }
  });

  const handleAuthSuccess = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: any) => {
    setApplicationData(data);
    setCurrentStep('consent');
  };

  const handleConsentAccept = async (consentData: any) => {
    setIsSubmitting(true);
    try {
      // Here you would send the application to your backend
      console.log('Application submitted:', {
        car,
        dealership,
        applicationData,
        consentData,
        user,
        timestamp: new Date().toISOString(),
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Application Submitted Successfully!",
        description: `Your application for the ${car.year} ${car.make} ${car.model} has been sent to ${dealership.name}. They will contact you within 24 hours.`,
      });

      setCurrentStep('success');
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setCurrentStep('auth');
        setApplicationData(null);
      }, 3000);

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConsentDecline = () => {
    setCurrentStep('form');
    toast({
      title: "Consent Required",
      description: "You must accept the privacy policy to submit your application.",
      variant: "destructive",
    });
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const handleClose = () => {
    setCurrentStep('auth');
    setApplicationData(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {currentStep === 'auth' && 'Login Required'}
            {currentStep === 'form' && 'Vehicle Finance Application'}
            {currentStep === 'consent' && 'Privacy & Consent'}
            {currentStep === 'success' && 'Application Submitted'}
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'auth' && !user && (
          <AuthModal
            isOpen={true}
            onClose={handleClose}
            defaultTab="signup"
          />
        )}

        {currentStep === 'form' && (
          <CarApplicationForm
            car={car}
            dealership={dealership}
            onSubmit={handleFormSubmit}
            onBack={handleClose}
            isLoading={isSubmitting}
          />
        )}

        {currentStep === 'consent' && (
          <POPIAConsent
            onAccept={handleConsentAccept}
            onDecline={handleConsentDecline}
            isLoading={isSubmitting}
          />
        )}

        {currentStep === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Application Submitted Successfully!</h3>
            <p className="text-muted-foreground">
              Your application has been sent to {dealership.name}. They will contact you within 24 hours.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
