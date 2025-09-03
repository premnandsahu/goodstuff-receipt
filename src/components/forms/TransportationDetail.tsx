import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ChevronDown, ChevronUp, Truck } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const TransportationDetail = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="erp-section">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="erp-collapsible-trigger">
          <CardTitle className="erp-section-title">
            <Truck className="w-5 h-5" />
            Transportation Detail
          </CardTitle>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* First Row */}
              <div className="erp-form-grid">
                <div className="erp-form-field">
                  <Label className="erp-label">Transporter Name</Label>
                  <Input 
                    placeholder="Enter transporter name"
                    className="erp-input"
                    maxLength={50}
                  />
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label">Driver Name</Label>
                  <Input 
                    placeholder="Enter driver name"
                    className="erp-input"
                    maxLength={50}
                  />
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label">Vehicle No.</Label>
                  <Input 
                    placeholder="Enter vehicle number"
                    className="erp-input"
                    maxLength={15}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="erp-form-grid">
                <div className="erp-form-field">
                  <Label className="erp-label-required">Freight Type</Label>
                  <Select>
                    <SelectTrigger className="erp-select">
                      <SelectValue placeholder="Select freight type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="to-pay">To Pay</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label">LR No.</Label>
                  <Input 
                    placeholder="Enter LR number"
                    className="erp-input"
                    maxLength={30}
                  />
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label">LR Date</Label>
                  <div className="relative">
                    <Input 
                      type="date"
                      defaultValue="2025-09-03"
                      className="erp-input"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default TransportationDetail;