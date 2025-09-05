import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Package, Plus, Trash2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import TolerancePanel from './TolerancePanel';
import IdentificationModal from './IdentificationModal';

interface POItem {
  id: string;
  poNumber: string;
  poDate: string;
  itemName: string;
  currency: string;
  preGRNQty: number;
  balQty: number;
  warehouse: string;
  projectNo: string;
  unit: string;
  make: string;
  description: string;
  rate: number;
}

interface ItemDetailProps {
  refDocType?: string;
  selectedPOItems?: POItem[];
}

const ItemDetail: React.FC<ItemDetailProps> = ({ refDocType = '', selectedPOItems = [] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [items, setItems] = useState([
    {
      id: 1,
      poNumber: '25-26/101',
      poDate: '01.05.2025',
      itemName: 'Bearing 505',
      unit: 'Nos',
      make: 'NBC',
      description: 'Plain Bearing',
      costCenter: 'Kiln',
      challanQty: 10.000,
      receivedQty: 9.000,
      acceptedQty: 8.000,
      balanceQty: 0.000,
      rejectedQty: 1.000,
      rate: 500.00,
      amount: 4000.00,
      warehouse: 'Main Store',
      remarks: '1 Qty is faulty',
      firstCF: '100 Kg',
      secondCF: '1 Quintale'
    }
  ]);

  // Add selected PO items to the grid
  useEffect(() => {
    if (selectedPOItems.length > 0) {
      const newItems = selectedPOItems.map((poItem, index) => ({
        id: items.length + index + 1,
        poNumber: poItem.poNumber,
        poDate: poItem.poDate,
        itemName: poItem.itemName,
        unit: poItem.unit,
        make: poItem.make,
        description: poItem.description,
        costCenter: '',
        challanQty: 0,
        receivedQty: 0,
        acceptedQty: 0,
        balanceQty: poItem.balQty,
        rejectedQty: 0,
        rate: poItem.rate,
        amount: 0,
        warehouse: poItem.warehouse,
        remarks: '',
        firstCF: '',
        secondCF: ''
      }));
      setItems(prev => [...prev, ...newItems]);
    }
  }, [selectedPOItems]);

  const addNewItem = () => {
    const newItem = {
      id: items.length + 1,
      poNumber: '',
      poDate: '',
      itemName: '',
      unit: '',
      make: '',
      description: '',
      costCenter: '',
      challanQty: 0,
      receivedQty: 0,
      acceptedQty: 0,
      balanceQty: 0,
      rejectedQty: 0,
      rate: 0,
      amount: 0,
      warehouse: '',
      remarks: '',
      firstCF: '',
      secondCF: ''
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateAmount = (acceptedQty: number, rate: number) => {
    return (acceptedQty * rate).toFixed(2);
  };

  const calculateRejectedQty = (receivedQty: number, acceptedQty: number) => {
    return (receivedQty - acceptedQty).toFixed(3);
  };

  return (
    <Card className="erp-section">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="erp-collapsible-trigger">
          <CardTitle className="erp-section-title">
            <Package className="w-5 h-5" />
            Item Detail
          </CardTitle>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Add Item Button */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Total Items: {items.length}
                </div>
                <Button onClick={addNewItem} className="erp-button-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="erp-table">
                  <thead className="erp-table-header">
                    <tr>
                      <th className="erp-table-cell font-medium">S.No.</th>
                      {refDocType === 'purchase-order' && (
                        <>
                          <th className="erp-table-cell font-medium">PO No.</th>
                          <th className="erp-table-cell font-medium">Date</th>
                        </>
                      )}
                      <th className="erp-table-cell font-medium">Item Name</th>
                      <th className="erp-table-cell font-medium">Unit</th>
                      <th className="erp-table-cell font-medium">Make</th>
                      <th className="erp-table-cell font-medium">Description</th>
                      <th className="erp-table-cell font-medium">Cost Center</th>
                      <th className="erp-table-cell font-medium">Challan Qty</th>
                      <th className="erp-table-cell font-medium">Received Qty</th>
                      <th className="erp-table-cell font-medium">Accepted Qty</th>
                      <th className="erp-table-cell font-medium">Balance Qty</th>
                      <th className="erp-table-cell font-medium">Positive Tolerance Qty</th>
                      <th className="erp-table-cell font-medium">Negative Tolerance Qty</th>
                      <th className="erp-table-cell font-medium">Rejected Qty</th>
                      <th className="erp-table-cell font-medium">Rate</th>
                      <th className="erp-table-cell font-medium">Amount</th>
                      <th className="erp-table-cell font-medium">First CF</th>
                      <th className="erp-table-cell font-medium">Second CF</th>
                      <th className="erp-table-cell font-medium">Warehouse</th>
                      <th className="erp-table-cell font-medium">Identification/ Dimension</th>
                      <th className="erp-table-cell font-medium">Remark</th>
                      <th className="erp-table-cell font-medium">Information</th>
                      <th className="erp-table-cell font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className={`erp-table-row ${index % 2 === 0 ? 'erp-table-row-even' : ''}`}>
                        <td className="erp-table-cell">{index + 1}</td>
                        {refDocType === 'purchase-order' && (
                          <>
                            <td className="erp-table-cell">{item.poNumber}</td>
                            <td className="erp-table-cell">{item.poDate}</td>
                          </>
                        )}
                        <td className="erp-table-cell">
                          <Input 
                            value={item.itemName}
                            placeholder="Select item"
                            className="min-w-[120px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            value={item.unit}
                            placeholder="Unit"
                            className="min-w-[80px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            value={item.make}
                            placeholder="Make"
                            className="min-w-[80px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            value={item.description}
                            placeholder="Description"
                            className="min-w-[120px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Select>
                            <SelectTrigger className="min-w-[100px] text-xs">
                              <SelectValue placeholder="Cost Center" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kiln">Kiln</SelectItem>
                              <SelectItem value="production">Production</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            value={item.challanQty}
                            step="0.001"
                            className="min-w-[90px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            value={item.receivedQty}
                            step="0.001"
                            className="min-w-[90px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            value={item.acceptedQty}
                            step="0.001"
                            className="min-w-[90px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            value={item.balanceQty}
                            readOnly
                            className="min-w-[90px] text-xs bg-muted"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            defaultValue="1"
                            step="0.001"
                            className="min-w-[90px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            defaultValue="1"
                            step="0.001"
                            className="min-w-[90px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            value={calculateRejectedQty(item.receivedQty, item.acceptedQty)}
                            readOnly
                            className="min-w-[90px] text-xs bg-muted"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            value={item.rate}
                            step="0.01"
                            className="min-w-[80px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            type="number"
                            value={calculateAmount(item.acceptedQty, item.rate)}
                            readOnly
                            className="min-w-[90px] text-xs bg-muted"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            value={item.firstCF}
                            placeholder="First CF"
                            className="min-w-[80px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            value={item.secondCF}
                            placeholder="Second CF"
                            className="min-w-[80px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Select>
                            <SelectTrigger className="min-w-[100px] text-xs">
                              <SelectValue placeholder="Warehouse" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="main-store">Main Store</SelectItem>
                              <SelectItem value="raw-material">Raw Material</SelectItem>
                              <SelectItem value="finished-goods">Finished Goods</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="erp-table-cell">
                          <IdentificationModal 
                            itemId={item.id}
                            itemName={item.itemName}
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Input 
                            value={item.remarks}
                            placeholder="Remarks"
                            className="min-w-[100px] text-xs"
                          />
                        </td>
                        <td className="erp-table-cell">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                          >
                            Info
                          </Button>
                        </td>
                        <td className="erp-table-cell">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Amount */}
              <div className="flex justify-end pt-4 border-t border-border">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total Amount:</div>
                  <div className="text-lg font-semibold">
                    ₹ {items.reduce((sum, item) => sum + parseFloat(calculateAmount(item.acceptedQty, item.rate)), 0).toFixed(2)}
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

export default ItemDetail;