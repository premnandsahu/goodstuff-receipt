import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings, Save } from 'lucide-react';

interface TolerancePanelProps {
  itemId: number;
  positiveTolerancePercentage?: number;
  negativeTolerancePercentage?: number;
  onSave?: (itemId: number, positive: number, negative: number) => void;
}

const TolerancePanel: React.FC<TolerancePanelProps> = ({ 
  itemId, 
  positiveTolerancePercentage = 5, 
  negativeTolerancePercentage = 2,
  onSave 
}) => {
  const [positive, setPositive] = React.useState(positiveTolerancePercentage);
  const [negative, setNegative] = React.useState(negativeTolerancePercentage);

  const handleSave = () => {
    onSave?.(itemId, positive, negative);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Settings className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="font-medium text-sm">Tolerance Settings</div>
          
          <div className="space-y-3">
            <div className="erp-form-field">
              <Label className="text-xs">Positive Tolerance (%)</Label>
              <Input
                type="number"
                value={positive}
                onChange={(e) => setPositive(parseFloat(e.target.value) || 0)}
                step="0.1"
                min="0"
                max="100"
                className="erp-input text-xs"
                placeholder="Enter positive tolerance"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Maximum acceptable excess quantity
              </div>
            </div>

            <div className="erp-form-field">
              <Label className="text-xs">Negative Tolerance (%)</Label>
              <Input
                type="number"
                value={negative}
                onChange={(e) => setNegative(parseFloat(e.target.value) || 0)}
                step="0.1"
                min="0"
                max="100"
                className="erp-input text-xs"
                placeholder="Enter negative tolerance"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Maximum acceptable shortage quantity
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t">
            <Button variant="outline" size="sm" className="text-xs">
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm" className="text-xs erp-button-primary">
              <Save className="w-3 h-3 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TolerancePanel;