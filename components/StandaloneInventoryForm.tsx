import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { mockProducts } from '../constants/mockData';

export function StandaloneInventoryForm() {
  // Form state
  const [formData, setFormData] = useState({
    inventoryDate: new Date().toISOString().split('T')[0],
    inventoryPerson: '张三',
    warehouseCode: 'WH001',
    warehouseName: '主仓库',
    remark: '',
    items: mockProducts.map(product => ({ 
      ...product, 
      systemQuantity: Math.floor(Math.random() * 100) + 1, 
      actualQuantity: 0, 
      difference: 0 
    }))
  });

  // Handle input changes for form fields
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle item quantity changes
  const handleItemQuantityChange = (index: number, field: string, value: number) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = {
        ...newItems[index],
        [field]: value,
        difference: field === 'actualQuantity' ? value - newItems[index].systemQuantity : newItems[index].difference
      };
      return { ...prev, items: newItems };
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Inventory form submitted:', formData);
    alert('盘点单创建成功！');
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      inventoryDate: new Date().toISOString().split('T')[0],
      inventoryPerson: '张三',
      warehouseCode: 'WH001',
      warehouseName: '主仓库',
      remark: '',
      items: mockProducts.map(product => ({ 
        ...product, 
        systemQuantity: Math.floor(Math.random() * 100) + 1, 
        actualQuantity: 0, 
        difference: 0 
      }))
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">库存盘点单</h1>
        <p className="text-center text-gray-600">Inventory Checklist</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">基本信息</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="inventoryDate" className="font-medium">盘点日期</Label>
              <Input
                id="inventoryDate"
                type="date"
                value={formData.inventoryDate}
                onChange={(e) => handleInputChange('inventoryDate', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inventoryPerson" className="font-medium">盘点人员</Label>
              <Input
                id="inventoryPerson"
                value={formData.inventoryPerson}
                onChange={(e) => handleInputChange('inventoryPerson', e.target.value)}
                className="w-full"
                placeholder="请输入盘点人员姓名"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="warehouseCode" className="font-medium">仓库编码</Label>
              <Input
                id="warehouseCode"
                value={formData.warehouseCode}
                onChange={(e) => handleInputChange('warehouseCode', e.target.value)}
                className="w-full"
                placeholder="请输入仓库编码"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="warehouseName" className="font-medium">仓库名称</Label>
              <Input
                id="warehouseName"
                value={formData.warehouseName}
                onChange={(e) => handleInputChange('warehouseName', e.target.value)}
                className="w-full"
                placeholder="请输入仓库名称"
              />
            </div>
          </div>
        </div>

        {/* Inventory Items Section */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">盘点物料明细</h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-16 text-center font-semibold">#</TableHead>
                  <TableHead className="w-32 font-semibold">物料编码</TableHead>
                  <TableHead className="w-48 font-semibold">物料名称</TableHead>
                  <TableHead className="w-24 font-semibold">类别</TableHead>
                  <TableHead className="w-16 font-semibold">单位</TableHead>
                  <TableHead className="w-24 text-right font-semibold">系统数量</TableHead>
                  <TableHead className="w-32 font-semibold">实际数量</TableHead>
                  <TableHead className="w-20 text-right font-semibold">差异</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.items.map((item, index) => (
                  <TableRow 
                    key={item.code} 
                    className="hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="font-mono text-sm">{item.code}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-right">{item.systemQuantity}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={item.actualQuantity || ''}
                        onChange={(e) => handleItemQuantityChange(index, 'actualQuantity', parseInt(e.target.value) || 0)}
                        className="w-full text-center"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell className={`text-right font-medium ${item.difference > 0 ? "text-red-600" : item.difference < 0 ? "text-green-600" : "text-gray-500"}`}>
                      {item.difference > 0 ? `+${item.difference}` : item.difference}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">汇总信息</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="font-medium">物料总数</Label>
              <div className="text-2xl font-bold text-blue-600">{formData.items.length}</div>
              <p className="text-sm text-gray-500">种物料</p>
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">盘盈数量</Label>
              <div className="text-2xl font-bold text-red-600">
                {formData.items.reduce((sum, item) => sum + (item.difference > 0 ? item.difference : 0), 0)}
              </div>
              <p className="text-sm text-gray-500">件物品</p>
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">盘亏数量</Label>
              <div className="text-2xl font-bold text-green-600">
                {Math.abs(formData.items.reduce((sum, item) => sum + (item.difference < 0 ? item.difference : 0), 0))}
              </div>
              <p className="text-sm text-gray-500">件物品</p>
            </div>
          </div>
        </div>

        {/* Remarks Section */}
        <div className="space-y-2">
          <Label htmlFor="remark" className="font-medium">备注说明</Label>
          <textarea
            id="remark"
            value={formData.remark}
            onChange={(e) => handleInputChange('remark', e.target.value)}
            className="w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入盘点备注信息..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="px-8 py-2 text-base"
          >
            重置
          </Button>
          <Button
            type="button"
            variant="outline"
            className="px-8 py-2 text-base"
          >
            保存草稿
          </Button>
          <Button
            type="submit"
            className="px-8 py-2 text-base bg-blue-600 hover:bg-blue-700"
          >
            提交盘点单
          </Button>
        </div>
      </form>
    </div>
  );
}