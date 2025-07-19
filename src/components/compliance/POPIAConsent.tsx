
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, FileText, Clock, Trash2 } from 'lucide-react';

interface POPIAConsentProps {
  onAccept: (consents: ConsentData) => void;
  onDecline: () => void;
  isLoading?: boolean;
}

interface ConsentData {
  dataProcessing: boolean;
  thirdPartySharing: boolean;
  marketingCommunication: boolean;
  dataRetention: boolean;
  timestamp: string;
}

export const POPIAConsent = ({ onAccept, onDecline, isLoading = false }: POPIAConsentProps) => {
  const [consents, setConsents] = useState<ConsentData>({
    dataProcessing: false,
    thirdPartySharing: false,
    marketingCommunication: false,
    dataRetention: false,
    timestamp: new Date().toISOString(),
  });

  const handleConsentChange = (key: keyof ConsentData, value: boolean) => {
    setConsents(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const allRequiredConsentsGiven = consents.dataProcessing && consents.thirdPartySharing && consents.dataRetention;

  const handleAccept = () => {
    if (allRequiredConsentsGiven) {
      onAccept({
        ...consents,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-orange" />
          Data Protection & Privacy Consent
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          In accordance with South African privacy laws
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-6">
            {/* POPIA Compliance Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Protection of Personal Information Act (POPIA) Compliance
              </h3>
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  Under the <strong>Protection of Personal Information Act, 2013 (Act No. 4 of 2013)</strong>, 
                  we are required to obtain your consent before processing your personal information.
                </p>
                
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium mb-2">Information We Collect:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Personal details (name, surname, ID number, contact information)</li>
                    <li>Financial information (income, employment details, credit history)</li>
                    <li>Vehicle preferences and application details</li>
                    <li>Communication records and preferences</li>
                  </ul>
                </div>

                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium mb-2">Purpose of Processing:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Processing your vehicle finance application</li>
                    <li>Facilitating communication between you and the dealership</li>
                    <li>Conducting credit and affordability assessments</li>
                    <li>Complying with legal obligations under the National Credit Act</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Sharing Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Third-Party Data Sharing</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  Your information will be shared with authorized dealerships and financial institutions 
                  for the sole purpose of processing your application as permitted under:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>National Credit Act, 2005 (Act No. 34 of 2005)</strong> - Credit assessment</li>
                  <li><strong>Financial Intelligence Centre Act, 2001 (Act No. 38 of 2001)</strong> - Identity verification</li>
                  <li><strong>Consumer Protection Act, 2008 (Act No. 68 of 2008)</strong> - Consumer rights</li>
                </ul>
              </div>
            </div>

            {/* Data Retention Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Data Retention & Destruction
              </h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  In compliance with POPIA Section 14 (Data Retention and Restriction of Records):
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your data will be retained for the minimum period necessary</li>
                  <li>Application data: 30 days if unsuccessful, 7 years if successful (NCA requirement)</li>
                  <li>Communication records: 5 years (RICA compliance)</li>
                  <li>Marketing consent: Until withdrawn by you</li>
                </ul>
                
                <div className="bg-orange/10 p-3 rounded-md border border-orange/20">
                  <p className="font-medium text-orange">Data Destruction Promise:</p>
                  <p className="text-xs mt-1">
                    After the retention period, your data will be securely destroyed in accordance with 
                    POPIA Section 17 requirements. You have the right to request deletion at any time.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Rights Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Your Rights Under POPIA</h3>
              <div className="text-sm text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct or update your information</li>
                  <li>Delete your information (subject to legal obligations)</li>
                  <li>Object to processing</li>
                  <li>Withdraw consent at any time</li>
                  <li>Lodge a complaint with the Information Regulator</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Consent Checkboxes */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="dataProcessing"
              checked={consents.dataProcessing}
              onCheckedChange={(checked) => handleConsentChange('dataProcessing', checked as boolean)}
            />
            <label htmlFor="dataProcessing" className="text-sm leading-5">
              <strong>Required:</strong> I consent to the processing of my personal information for the purposes 
              outlined above in accordance with POPIA.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="thirdPartySharing"
              checked={consents.thirdPartySharing}
              onCheckedChange={(checked) => handleConsentChange('thirdPartySharing', checked as boolean)}
            />
            <label htmlFor="thirdPartySharing" className="text-sm leading-5">
              <strong>Required:</strong> I consent to sharing my information with authorized dealerships and 
              financial institutions for application processing.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="dataRetention"
              checked={consents.dataRetention}
              onCheckedChange={(checked) => handleConsentChange('dataRetention', checked as boolean)}
            />
            <label htmlFor="dataRetention" className="text-sm leading-5">
              <strong>Required:</strong> I understand and accept the data retention periods outlined above.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="marketingCommunication"
              checked={consents.marketingCommunication}
              onCheckedChange={(checked) => handleConsentChange('marketingCommunication', checked as boolean)}
            />
            <label htmlFor="marketingCommunication" className="text-sm leading-5">
              <strong>Optional:</strong> I consent to receiving marketing communications about similar vehicles and services.
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleAccept}
            disabled={!allRequiredConsentsGiven || isLoading}
            className="flex-1"
            variant="orange"
          >
            {isLoading ? 'Processing...' : 'Accept & Continue'}
          </Button>
          <Button 
            onClick={onDecline}
            variant="outline"
            disabled={isLoading}
          >
            Decline
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          For questions about data protection, contact our Information Officer at privacy@carmzansi.co.za
        </p>
      </CardContent>
    </Card>
  );
};
