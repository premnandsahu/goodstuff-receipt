import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CurrencyDetail = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="erp-section">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="erp-collapsible-trigger">
          <CardTitle className="erp-section-title">
            <DollarSign className="w-5 h-5" />
            Currency Detail
          </CardTitle>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-6">
            <div className="erp-form-grid">
              <div className="erp-form-field">
                <Label className="erp-label-required">Currency Name</Label>
                <Select>
                  <SelectTrigger className="erp-select">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR (₹)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              <div className="erp-form-field">
                <Label className="erp-label-required">Exchange Rate</Label>
                <Input 
                  type="number"
                  placeholder="1.00"
                  step="0.0001"
                  className="erp-input"
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CurrencyDetail;