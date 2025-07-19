
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Car, User, Briefcase, DollarSign, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const applicationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  idNumber: z.string().regex(/^\d{13}$/, 'ID number must be 13 digits'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+27|0)[0-9]{9}$/, 'Invalid South African phone number'),
  address: z.string().min(10, 'Complete address is required'),
  
  // Employment Information
  employmentStatus: z.enum(['employed', 'self-employed', 'pensioner', 'student', 'unemployed']),
  employer: z.string().optional(),
  jobTitle: z.string().optional(),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  workPhone: z.string().optional(),
  employmentDuration: z.string().optional(),
  
  // Financial Information
  bankName: z.string().min(2, 'Bank name is required'),
  accountType: z.enum(['current', 'savings']),
  creditScore: z.string().optional(),
  existingLoans: z.string().optional(),
  monthlyExpenses: z.string().min(1, 'Monthly expenses estimate is required'),
  
  // Vehicle & Loan Information
  preferredLoanTerm: z.enum(['12', '24', '36', '48', '60', '72']),
  depositAmount: z.string().min(1, 'Deposit amount is required'),
  intendedUse: z.enum(['personal', 'business', 'family']),
  tradeInVehicle: z.string().optional(),
  
  // Additional Information
  additionalInformation: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface CarApplicationFormProps {
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
  onSubmit: (data: ApplicationFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const CarApplicationForm = ({ 
  car, 
  dealership, 
  onSubmit, 
  onBack, 
  isLoading = false 
}: CarApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      employmentStatus: 'employed',
      accountType: 'current',
      preferredLoanTerm: '60',
      intendedUse: 'personal',
      depositAmount: '0',
    },
  });

  const handleSubmit = (data: ApplicationFormData) => {
    console.log('Application submitted:', data);
    onSubmit(data);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5 text-orange" />
          Vehicle Finance Application
        </CardTitle>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {car.year} {car.make} {car.model} - {formatPrice(car.price)}
          </p>
          <p className="text-sm text-muted-foreground">
            Dealership: {dealership.name}, {dealership.location}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-orange h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-orange" />
                  <h3 className="font-semibold">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complete Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="123 Main Street, Suburb, City, Postal Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Employment Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-orange" />
                  <h3 className="font-semibold">Employment Information</h3>
                </div>

                <FormField
                  control={form.control}
                  name="employmentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self Employed</SelectItem>
                          <SelectItem value="pensioner">Pensioner</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="employer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employer</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Your position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Income (ZAR)</FormLabel>
                        <FormControl>
                          <Input placeholder="25000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="2 years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Financial Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-4 h-4 text-orange" />
                  <h3 className="font-semibold">Financial Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Standard Bank" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="current">Current Account</SelectItem>
                            <SelectItem value="savings">Savings Account</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="monthlyExpenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Expenses (ZAR)</FormLabel>
                      <FormControl>
                        <Input placeholder="15000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="existingLoans"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Existing Loans/Credit (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List any existing loans, credit cards, or financial obligations"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 4: Loan Information */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-orange" />
                  <h3 className="font-semibold">Loan Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preferredLoanTerm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Loan Term</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select loan term" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="12">12 months</SelectItem>
                            <SelectItem value="24">24 months</SelectItem>
                            <SelectItem value="36">36 months</SelectItem>
                            <SelectItem value="48">48 months</SelectItem>
                            <SelectItem value="60">60 months</SelectItem>
                            <SelectItem value="72">72 months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="depositAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deposit Amount (ZAR)</FormLabel>
                        <FormControl>
                          <Input placeholder="50000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="intendedUse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intended Use</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select intended use" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">Personal Use</SelectItem>
                          <SelectItem value="business">Business Use</SelectItem>
                          <SelectItem value="family">Family Use</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tradeInVehicle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trade-in Vehicle (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your trade-in vehicle (make, model, year, condition)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional information you'd like to share"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back to Car
                </Button>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep} variant="orange">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} variant="orange">
                    {isLoading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
