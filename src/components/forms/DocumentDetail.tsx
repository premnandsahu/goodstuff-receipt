import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const DocumentDetail = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="erp-section">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="erp-collapsible-trigger">
          <CardTitle className="erp-section-title">
            <Settings className="w-5 h-5" />
            Document Detail
          </CardTitle>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-6">
            <div className="erp-form-grid-4">
              {/* Business Unit */}
              <div className="erp-form-field">
                <Label className="erp-label-required">Business Unit</Label>
                <Input 
                  value="ASPL" 
                  className="erp-input"
                  readOnly
                />
              </div>

              {/* Document Date */}
              <div className="erp-form-field">
                <Label className="erp-label-required">Document Date</Label>
                <div className="relative">
                  <Input 
                    type="date"
                    defaultValue="2025-09-03"
                    className="erp-input"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Document No */}
              <div className="erp-form-field">
                <Label className="erp-label-required">Document No.</Label>
                <div className="flex">
                  <Input 
                    placeholder="GRN-____-"
                    className="erp-input rounded-r-none"
                  />
                  <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Document Status */}
              <div className="erp-form-field">
                <Label className="erp-label-required">Document Status</Label>
                <Select>
                  <SelectTrigger className="erp-select">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default DocumentDetail;