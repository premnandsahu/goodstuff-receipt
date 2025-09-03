import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Send, X } from 'lucide-react';
import GRNHeader from '@/components/forms/GRNHeader';
import DocumentDetail from '@/components/forms/DocumentDetail';
import GeneralDetail from '@/components/forms/GeneralDetail';
import CurrencyDetail from '@/components/forms/CurrencyDetail';
import TransportationDetail from '@/components/forms/TransportationDetail';
import ItemDetail from '@/components/forms/ItemDetail';

const GRNForm = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <GRNHeader />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Goods Receipt Note (GRN)</h1>
            <p className="text-muted-foreground">Create and manage goods receipt documentation</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="erp-button-secondary">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button className="erp-button-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button className="erp-button-primary">
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Document Detail Section */}
          <DocumentDetail />

          {/* General Detail Section */}
          <GeneralDetail />

          {/* Currency Detail Section */}
          <CurrencyDetail />

          {/* Transportation Detail Section */}
          <TransportationDetail />

          {/* Item Detail Section */}
          <ItemDetail />
        </div>

        {/* Form Footer */}
        <div className="mt-8 p-6 bg-card border border-border rounded-lg shadow-[var(--shadow-section)]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Form Status: <span className="erp-badge erp-badge-draft">Draft</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="erp-button-secondary">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button className="erp-button-primary">
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button className="erp-button-primary">
                <Send className="w-4 h-4 mr-2" />
                Submit for Approval
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GRNForm;