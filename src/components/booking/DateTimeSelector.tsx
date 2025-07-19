
import { Calendar, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DateTimeSelectorProps {
  formData: {
    date: string;
    time: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export function DateTimeSelector({ formData, onInputChange }: DateTimeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="date">
          <Calendar className="w-4 h-4 inline mr-1" />
          Preferred Date
        </Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => onInputChange('date', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>
          <Clock className="w-4 h-4 inline mr-1" />
          Preferred Time
        </Label>
        <Select onValueChange={(value) => onInputChange('time', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
