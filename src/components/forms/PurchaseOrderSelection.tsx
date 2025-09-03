import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, FileText, Search, Calendar } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const PurchaseOrderSelection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPOs, setSelectedPOs] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    poNumber: '',
    fromDate: '',
    toDate: '',
    itemName: ''
  });

  const purchaseOrders = [
    {
      id: 'PO-001',
      poNumber: '25-26/101',
      poDate: '01.05.2025',
      supplierName: 'ABC Bearings Ltd',
      currency: 'INR',
      exchangeRate: 1.00,
      totalAmount: 50000.00,
      items: [
        { itemName: 'Bearing 505', make: 'NBC', pendingQty: 10, unit: 'Nos' },
        { itemName: 'Bearing 360', make: 'SKF', pendingQty: 5, unit: 'Nos' }
      ]
    },
    {
      id: 'PO-002',
      poNumber: '25-26/102',
      poDate: '02.05.2025',
      supplierName: 'ABC Bearings Ltd',
      currency: 'INR',
      exchangeRate: 1.00,
      totalAmount: 75000.00,
      items: [
        { itemName: 'Bearing 360', make: 'NBC', pendingQty: 8, unit: 'Nos' }
      ]
    }
  ];

  const handlePOSelection = (poId: string) => {
    setSelectedPOs(prev => 
      prev.includes(poId) 
        ? prev.filter(id => id !== poId)
        : [...prev, poId]
    );
  };

  const filteredPOs = purchaseOrders.filter(po => {
    return (
      (!filters.poNumber || po.poNumber.toLowerCase().includes(filters.poNumber.toLowerCase())) &&
      (!filters.itemName || po.items.some(item => 
        item.itemName.toLowerCase().includes(filters.itemName.toLowerCase())
      ))
    );
  });

  return (
    <Card className="erp-section">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="erp-collapsible-trigger">
          <CardTitle className="erp-section-title">
            <FileText className="w-5 h-5" />
            Purchase Order Selection
          </CardTitle>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Filters */}
              <div className="erp-form-grid-4">
                <div className="erp-form-field">
                  <Label>PO Number</Label>
                  <Input 
                    value={filters.poNumber}
                    onChange={(e) => setFilters(prev => ({ ...prev, poNumber: e.target.value }))}
                    placeholder="Search PO number"
                    className="erp-input"
                  />
                </div>
                <div className="erp-form-field">
                  <Label>From Date</Label>
                  <div className="relative">
                    <Input 
                      type="date"
                      value={filters.fromDate}
                      onChange={(e) => setFilters(prev => ({ ...prev, fromDate: e.target.value }))}
                      className="erp-input"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                  </div>
                </div>
                <div className="erp-form-field">
                  <Label>To Date</Label>
                  <div className="relative">
                    <Input 
                      type="date"
                      value={filters.toDate}
                      onChange={(e) => setFilters(prev => ({ ...prev, toDate: e.target.value }))}
                      className="erp-input"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                  </div>
                </div>
                <div className="erp-form-field">
                  <Label>Item Name</Label>
                  <Input 
                    value={filters.itemName}
                    onChange={(e) => setFilters(prev => ({ ...prev, itemName: e.target.value }))}
                    placeholder="Search item name"
                    className="erp-input"
                  />
                </div>
              </div>

              {/* Purchase Orders Table */}
              <div className="overflow-x-auto">
                <table className="erp-table">
                  <thead className="erp-table-header">
                    <tr>
                      <th className="erp-table-cell font-medium">Select</th>
                      <th className="erp-table-cell font-medium">PO Number</th>
                      <th className="erp-table-cell font-medium">PO Date</th>
                      <th className="erp-table-cell font-medium">Supplier Name</th>
                      <th className="erp-table-cell font-medium">Currency</th>
                      <th className="erp-table-cell font-medium">Exchange Rate</th>
                      <th className="erp-table-cell font-medium">Total Amount</th>
                      <th className="erp-table-cell font-medium">Pending Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPOs.map((po, index) => (
                      <tr key={po.id} className={`erp-table-row ${index % 2 === 0 ? 'erp-table-row-even' : ''}`}>
                        <td className="erp-table-cell">
                          <Checkbox 
                            checked={selectedPOs.includes(po.id)}
                            onCheckedChange={() => handlePOSelection(po.id)}
                          />
                        </td>
                        <td className="erp-table-cell font-medium">{po.poNumber}</td>
                        <td className="erp-table-cell">{po.poDate}</td>
                        <td className="erp-table-cell">{po.supplierName}</td>
                        <td className="erp-table-cell">{po.currency}</td>
                        <td className="erp-table-cell">{po.exchangeRate.toFixed(4)}</td>
                        <td className="erp-table-cell">₹{po.totalAmount.toLocaleString()}</td>
                        <td className="erp-table-cell">
                          <div className="space-y-1">
                            {po.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="text-xs">
                                {item.itemName} - {item.pendingQty} {item.unit}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedPOs.length > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium mb-2">Selected Purchase Orders:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPOs.map(poId => {
                      const po = purchaseOrders.find(p => p.id === poId);
                      return po ? (
                        <span key={poId} className="erp-badge erp-badge-primary">
                          {po.poNumber}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default PurchaseOrderSelection;