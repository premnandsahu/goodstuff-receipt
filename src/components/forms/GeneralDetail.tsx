import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, ChevronDown, ChevronUp, FileText, Search } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const GeneralDetail = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="erp-section">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="erp-collapsible-trigger">
          <CardTitle className="erp-section-title">
            <FileText className="w-5 h-5" />
            General Detail
          </CardTitle>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* First Row */}
              <div className="erp-form-grid">
                <div className="erp-form-field">
                  <Label className="erp-label-required">Ref Doc Type No.</Label>
                  <Select>
                    <SelectTrigger className="erp-select">
                      <SelectValue placeholder="Select reference type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="purchase-order">Purchase Order</SelectItem>
                      <SelectItem value="purchase-request">Purchase Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label-required">Supplier Location</Label>
                  <div className="flex">
                    <Input 
                      placeholder="Search supplier location..."
                      className="erp-input rounded-r-none"
                    />
                    <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label-required">Challan No.</Label>
                  <Input 
                    placeholder="Enter challan number"
                    className="erp-input"
                    maxLength={30}
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="erp-form-grid">
                <div className="erp-form-field">
                  <Label className="erp-label-required">Bill Date</Label>
                  <div className="relative">
                    <Input 
                      type="date"
                      defaultValue="2025-09-03"
                      className="erp-input"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label-required">Warehouse</Label>
                  <div className="flex">
                    <Input 
                      placeholder="Search warehouse..."
                      className="erp-input rounded-r-none"
                    />
                    <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label-required">Challan Date</Label>
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

              {/* Third Row */}
              <div className="erp-form-grid-2">
                <div className="erp-form-field">
                  <Label className="erp-label">Bill No.</Label>
                  <Input 
                    placeholder="Enter bill number"
                    className="erp-input"
                    maxLength={30}
                  />
                </div>

                <div className="erp-form-field">
                  <Label className="erp-label">Tags</Label>
                  <Input 
                    placeholder="Enter tags (comma separated)"
                    className="erp-input"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="erp-form-field">
                <Label className="erp-label">Remarks</Label>
                <Textarea 
                  placeholder="Enter general remarks..."
                  className="erp-input min-h-[80px]"
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default GeneralDetail;