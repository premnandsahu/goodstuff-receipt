import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronDown, ChevronUp, Expand, FileText } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

interface POItemDetailProps {
  onItemsSelected: (items: POItem[]) => void;
}

const POItemDetail: React.FC<POItemDetailProps> = ({ onItemsSelected }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    poNumber: '',
    itemName: '',
    warehouse: '',
    projectNo: ''
  });

  const poItems: POItem[] = [
    {
      id: 'PO-001-ITEM-001',
      poNumber: '25-26/101',
      poDate: '01.05.2025',
      itemName: 'Bearing 505',
      currency: 'INR',
      preGRNQty: 2,
      balQty: 8,
      warehouse: 'Main Store',
      projectNo: 'PRJ-005',
      unit: 'Nos',
      make: 'NBC',
      description: 'Plain Bearing',
      rate: 500.00
    },
    {
      id: 'PO-001-ITEM-002',
      poNumber: '25-26/101',
      poDate: '01.05.2025',
      itemName: 'Bearing 360',
      currency: 'INR',
      preGRNQty: 1,
      balQty: 4,
      warehouse: 'Main Store',
      projectNo: 'PRJ-005',
      unit: 'Nos',
      make: 'SKF',
      description: 'Roller Bearing',
      rate: 750.00
    },
    {
      id: 'PO-002-ITEM-001',
      poNumber: '25-26/102',
      poDate: '02.05.2025',
      itemName: 'Bearing 360',
      currency: 'INR',
      preGRNQty: 0,
      balQty: 8,
      warehouse: 'Raw Material',
      projectNo: 'PRJ-006',
      unit: 'Nos',
      make: 'NBC',
      description: 'Roller Bearing',
      rate: 720.00
    },
    {
      id: 'PO-003-ITEM-001',
      poNumber: '25-26/103',
      poDate: '03.05.2025',
      itemName: 'Seal Ring',
      currency: 'INR',
      preGRNQty: 5,
      balQty: 15,
      warehouse: 'Main Store',
      projectNo: 'PRJ-007',
      unit: 'Nos',
      make: 'ABC',
      description: 'Rubber Seal Ring',
      rate: 150.00
    },
    {
      id: 'PO-004-ITEM-001',
      poNumber: '25-26/104',
      poDate: '04.05.2025',
      itemName: 'Gasket',
      currency: 'INR',
      preGRNQty: 0,
      balQty: 20,
      warehouse: 'Finished Goods',
      projectNo: 'PRJ-008',
      unit: 'Nos',
      make: 'XYZ',
      description: 'Metal Gasket',
      rate: 200.00
    }
  ];

  const filteredItems = poItems.filter(item => {
    return (
      (!filters.poNumber || item.poNumber.toLowerCase().includes(filters.poNumber.toLowerCase())) &&
      (!filters.itemName || item.itemName.toLowerCase().includes(filters.itemName.toLowerCase())) &&
      (!filters.warehouse || item.warehouse.toLowerCase().includes(filters.warehouse.toLowerCase())) &&
      (!filters.projectNo || item.projectNo.toLowerCase().includes(filters.projectNo.toLowerCase()))
    );
  });

  const handleItemSelection = (itemId: string, checked: boolean) => {
    let newSelectedItems: string[];
    
    if (checked) {
      newSelectedItems = [...selectedItems, itemId];
    } else {
      newSelectedItems = selectedItems.filter(id => id !== itemId);
    }
    
    setSelectedItems(newSelectedItems);
    
    // Get selected item objects and pass to parent
    const selectedItemObjects = poItems.filter(item => newSelectedItems.includes(item.id));
    onItemsSelected(selectedItemObjects);
  };

  const handleModalOK = () => {
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const renderDataGrid = (items: POItem[], showFilters: boolean = false, limitRows: boolean = false) => {
    const displayItems = limitRows ? items.slice(0, 4) : items;

    return (
      <div className="space-y-4">
        {showFilters && (
          <div className="erp-form-grid-4">
            <div className="erp-form-field">
              <Input 
                value={filters.poNumber}
                onChange={(e) => setFilters(prev => ({ ...prev, poNumber: e.target.value }))}
                placeholder="Filter PO Number"
                className="erp-input"
              />
            </div>
            <div className="erp-form-field">
              <Input 
                value={filters.itemName}
                onChange={(e) => setFilters(prev => ({ ...prev, itemName: e.target.value }))}
                placeholder="Filter Item Name"
                className="erp-input"
              />
            </div>
            <div className="erp-form-field">
              <Input 
                value={filters.warehouse}
                onChange={(e) => setFilters(prev => ({ ...prev, warehouse: e.target.value }))}
                placeholder="Filter Warehouse"
                className="erp-input"
              />
            </div>
            <div className="erp-form-field">
              <Input 
                value={filters.projectNo}
                onChange={(e) => setFilters(prev => ({ ...prev, projectNo: e.target.value }))}
                placeholder="Filter Project No."
                className="erp-input"
              />
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead className="erp-table-header">
              <tr>
                <th className="erp-table-cell font-medium">Select</th>
                <th className="erp-table-cell font-medium">PO No.</th>
                <th className="erp-table-cell font-medium">PO Date</th>
                <th className="erp-table-cell font-medium">Item Name</th>
                <th className="erp-table-cell font-medium">Currency</th>
                <th className="erp-table-cell font-medium">Pre GRN Qty.</th>
                <th className="erp-table-cell font-medium">Bal Qty.</th>
                <th className="erp-table-cell font-medium">Warehouse</th>
                <th className="erp-table-cell font-medium">Project No.</th>
              </tr>
            </thead>
            <tbody>
              {displayItems.map((item, index) => (
                <tr key={item.id} className={`erp-table-row ${index % 2 === 0 ? 'erp-table-row-even' : ''}`}>
                  <td className="erp-table-cell">
                    <Checkbox 
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleItemSelection(item.id, checked as boolean)}
                    />
                  </td>
                  <td className="erp-table-cell font-medium">{item.poNumber}</td>
                  <td className="erp-table-cell">{item.poDate}</td>
                  <td className="erp-table-cell">{item.itemName}</td>
                  <td className="erp-table-cell">{item.currency}</td>
                  <td className="erp-table-cell">{item.preGRNQty}</td>
                  <td className="erp-table-cell">{item.balQty}</td>
                  <td className="erp-table-cell">{item.warehouse}</td>
                  <td className="erp-table-cell">{item.projectNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="erp-section">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="erp-collapsible-trigger">
            <CardTitle className="erp-section-title">
              <FileText className="w-5 h-5" />
              PO Item Detail
            </CardTitle>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {renderDataGrid(filteredItems, false, true)}
                
                <div className="flex justify-center pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsModalOpen(true)}
                    className="erp-button-secondary"
                  >
                    <Expand className="w-4 h-4 mr-2" />
                    Expand
                  </Button>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Modal for expanded view */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>PO Item Detail - Full View</DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto flex-1">
            {renderDataGrid(filteredItems, true, false)}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleModalCancel}
              className="erp-button-secondary"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleModalOK}
              className="erp-button-primary"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default POItemDetail;