
import { User, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export function PersonalInfoForm({ formData, onInputChange }: PersonalInfoFormProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          <User className="w-4 h-4 inline mr-1" />
          Full Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          <Mail className="w-4 h-4 inline mr-1" />
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          <Phone className="w-4 h-4 inline mr-1" />
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          required
        />
      </div>
    </div>
  );
}
