
import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CarInfoCard } from '@/components/booking/CarInfoCard';
import { PersonalInfoForm } from '@/components/booking/PersonalInfoForm';
import { DateTimeSelector } from '@/components/booking/DateTimeSelector';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  car?: {
    make: string;
    model: string;
    year: number;
    price: number;
  };
  dealership?: {
    name: string;
    location: string;
  };
}

export const BookingModal = ({ isOpen, onClose, car, dealership }: BookingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Test Drive Booked!",
      description: `Your test drive for the ${car?.make} ${car?.model} has been scheduled. The dealership will contact you shortly to confirm.`,
    });

    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!car || !dealership) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Book Test Drive</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <CarInfoCard 
            car={car}
            dealership={dealership}
          />
          <div className="text-accent font-bold text-lg">
            {formatPrice(car.price)}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <PersonalInfoForm 
              formData={{
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
              }}
              onInputChange={handleInputChange}
            />

            <DateTimeSelector
              formData={{
                date: formData.date,
                time: formData.time,
              }}
              onInputChange={handleInputChange}
            />

            <div className="space-y-2">
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Any specific requirements or questions..."
                rows={3}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" variant="premium" className="flex-1">
                Book Test Drive
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
