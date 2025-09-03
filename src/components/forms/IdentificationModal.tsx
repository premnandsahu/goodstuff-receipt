import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge, Plus, Trash2, FileText, Upload } from 'lucide-react';

interface IdentificationModalProps {
  itemId: number;
  itemName: string;
}

const IdentificationModal: React.FC<IdentificationModalProps> = ({ itemId, itemName }) => {
  const [dimensionData, setDimensionData] = useState([
    {
      id: 1,
      indentNo: '25-26/001',
      projectNo: 'PRJ-005',
      length: 2.000,
      width: 3.000,
      standardWeight: 500.000,
      pcs: 2.00,
      totalQty: 6000.000
    }
  ]);

  const [identificationData, setIdentificationData] = useState([
    {
      id: 1,
      indentNo: '25-26/001',
      projectNo: 'PRJ-005',
      identificationType: 'Heat No.',
      identificationValue: 'H-1520',
      totalQty: 50.000,
      expiryDate: '',
      attachment: null
    }
  ]);

  const addDimensionRow = () => {
    const newRow = {
      id: dimensionData.length + 1,
      indentNo: '',
      projectNo: '',
      length: 0,
      width: 0,
      standardWeight: 0,
      pcs: 0,
      totalQty: 0
    };
    setDimensionData([...dimensionData, newRow]);
  };

  const addIdentificationRow = () => {
    const newRow = {
      id: identificationData.length + 1,
      indentNo: '',
      projectNo: '',
      identificationType: 'Heat No.',
      identificationValue: '',
      totalQty: 0,
      expiryDate: '',
      attachment: null
    };
    setIdentificationData([...identificationData, newRow]);
  };

  const removeDimensionRow = (id: number) => {
    setDimensionData(dimensionData.filter(row => row.id !== id));
  };

  const removeIdentificationRow = (id: number) => {
    setIdentificationData(identificationData.filter(row => row.id !== id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Badge className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Identification / Dimension Details - {itemName}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="dimension" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dimension">Dimension Details</TabsTrigger>
            <TabsTrigger value="identification">Material Identification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dimension" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">2D Dimension Details</div>
              <Button onClick={addDimensionRow} size="sm" className="erp-button-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Row
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead className="erp-table-header">
                  <tr>
                    <th className="erp-table-cell font-medium">S.No.</th>
                    <th className="erp-table-cell font-medium">Indent No.</th>
                    <th className="erp-table-cell font-medium">Project No.</th>
                    <th className="erp-table-cell font-medium">Length</th>
                    <th className="erp-table-cell font-medium">Width</th>
                    <th className="erp-table-cell font-medium">Standard Weight</th>
                    <th className="erp-table-cell font-medium">Pcs</th>
                    <th className="erp-table-cell font-medium">Total Qty</th>
                    <th className="erp-table-cell font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dimensionData.map((row, index) => (
                    <tr key={row.id} className={`erp-table-row ${index % 2 === 0 ? 'erp-table-row-even' : ''}`}>
                      <td className="erp-table-cell">{index + 1}</td>
                      <td className="erp-table-cell">
                        <Input value={row.indentNo} className="min-w-[100px] text-xs" />
                      </td>
                      <td className="erp-table-cell">
                        <Input value={row.projectNo} className="min-w-[100px] text-xs" />
                      </td>
                      <td className="erp-table-cell">
                        <Input 
                          type="number" 
                          value={row.length} 
                          step="0.001"
                          className="min-w-[80px] text-xs" 
                        />
                      </td>
                      <td className="erp-table-cell">
                        <Input 
                          type="number" 
                          value={row.width} 
                          step="0.001"
                          className="min-w-[80px] text-xs" 
                        />
                      </td>
                      <td className="erp-table-cell">
                        <Input 
                          type="number" 
                          value={row.standardWeight} 
                          readOnly
                          className="min-w-[100px] text-xs bg-muted" 
                        />
                      </td>
                      <td className="erp-table-cell">
                        <Input 
                          type="number" 
                          value={row.pcs} 
                          step="0.01"
                          className="min-w-[80px] text-xs" 
                        />
                      </td>
                      <td className="erp-table-cell">
                        <Input 
                          type="number" 
                          value={row.totalQty} 
                          readOnly
                          className="min-w-[100px] text-xs bg-muted" 
                        />
                      </td>
                      <td className="erp-table-cell">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeDimensionRow(row.id)}
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
          </TabsContent>
          
          <TabsContent value="identification" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Material Identification Details</div>
              <Button onClick={addIdentificationRow} size="sm" className="erp-button-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Row
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead className="erp-table-header">
                  <tr>
                    <th className="erp-table-cell font-medium">S.No.</th>
                    <th className="erp-table-cell font-medium">Indent No.</th>
                    <th className="erp-table-cell font-medium">Project No.</th>
                    <th className="erp-table-cell font-medium">Identification Type</th>
                    <th className="erp-table-cell font-medium">Identification Value</th>
                    <th className="erp-table-cell font-medium">Total Qty</th>
                    <th className="erp-table-cell font-medium">Expiry/Warranty Date</th>
                    <th className="erp-table-cell font-medium">Attachment</th>
                    <th className="erp-table-cell font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {identificationData.map((row, index) => (
                    <tr key={row.id} className={`erp-table-row ${index % 2 === 0 ? 'erp-table-row-even' : ''}`}>
                      <td className="erp-table-cell">{index + 1}</td>
                      <td className="erp-table-cell">
                        <Input value={row.indentNo} className="min-w-[100px] text-xs" />
                      </td>
                      <td className="erp-table-cell">
                        <Input value={row.projectNo} className="min-w-[100px] text-xs" />
                      </td>
                      <td className="erp-table-cell">
                        <Select defaultValue={row.identificationType}>
                          <SelectTrigger className="min-w-[120px] text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Heat No.">Heat No.</SelectItem>
                            <SelectItem value="Batch No.">Batch No.</SelectItem>
                            <SelectItem value="Serial No.">Serial No.</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="erp-table-cell">
                        <Input value={row.identificationValue} className="min-w-[120px] text-xs" />
                      </td>
                      <td className="erp-table-cell">
                        <Input 
                          type="number" 
                          value={row.totalQty} 
                          step="0.001"
                          className="min-w-[100px] text-xs" 
                        />
                      </td>
                      <td className="erp-table-cell">
                        <Input 
                          type="date"
                          value={row.expiryDate}
                          className="min-w-[120px] text-xs" 
                        />
                      </td>
                      <td className="erp-table-cell">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Upload className="w-3 h-3 mr-1" />
                          Upload
                        </Button>
                      </td>
                      <td className="erp-table-cell">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeIdentificationRow(row.id)}
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
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline">Cancel</Button>
          <Button className="erp-button-primary">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdentificationModal;