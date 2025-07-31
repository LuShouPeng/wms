import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  ArrowLeft,
  RefreshCw,
  Save,
  X,
  CalendarIcon,
  Search,
  Building2,
  MapPin,
  User,
  Phone,
  FileText,
  Warehouse
} from 'lucide-react';
import { cn } from '../lib/utils';

interface WarehouseEditPageProps {
  warehouseId?: string;
  onBack: () => void;
  onSave?: (data: any) => void;
}

export function WarehouseEditPage({ warehouseId, onBack, onSave }: WarehouseEditPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [supplierSearchTerm, setSupplierSearchTerm] = useState('');

  // 表单数据状态
  const [formData, setFormData] = useState({
    warehouseNumber: 'WH-2024-001', // 只读字段
    warehouseName: '',
    department: '',
    warehouseType: '',
    leaseTime: '',
    description: '',
    area: '',
    address: '',
    contactPerson: '',
    phone: '',
    supplierId: '',
    supplierName: ''
  });

  // 表单验证错误状态
  const [errors, setErrors] = useState({});

  // 部门选项
  const departments = [
    { value: 'finance', label: '财务中心' },
    { value: 'it', label: '信息技术中心' },
    { value: 'production', label: '生产中心' },
    { value: 'logistics', label: '物流中心' },
    { value: 'hr', label: '人力资源中心' }
  ];

  // 仓库类型选项
  const warehouseTypes = [
    { value: 'product', label: '产品仓库' },
    { value: 'raw_material', label: '原料仓库' },
    { value: 'finished_goods', label: '成品仓库' },
    { value: 'spare_parts', label: '备件仓库' },
    { value: 'temporary', label: '临时仓库' }
  ];

  // 模拟供应商数据
  const suppliers = [
    { id: 'SUP001', name: '北京xx电子有限公司', contact: '李总', phone: '010-12345678' },
    { id: 'SUP002', name: '上海xx五金有限公司', contact: '王总', phone: '021-87654321' },
    { id: 'SUP003', name: '深圳xx科技有限公司', contact: '张总', phone: '0755-12345678' },
    { id: 'SUP004', name: '广州xx贸易有限公司', contact: '刘总', phone: '020-87654321' }
  ];

  // 过滤后的供应商列表
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(supplierSearchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(supplierSearchTerm.toLowerCase())
  );

  // 加载仓库数据（如果是编辑模式）
  useEffect(() => {
    if (warehouseId) {
      // 模拟加载现有仓库数据
      setFormData(prev => ({
        ...prev,
        warehouseName: '主仓库A',
        department: 'logistics',
        warehouseType: 'product',
        leaseTime: '2024-01-01',
        description: '用于存放成品和半成品的主要仓库',
        area: '1000',
        address: '北京市朝阳区xxx路123号',
        contactPerson: '张经理',
        phone: '13800138000',
        supplierId: 'SUP001',
        supplierName: '北京xx电子有限公司'
      }));
    }
  }, [warehouseId]);

  // 处理表单字段变化
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // 表单验证
  const validateForm = () => {
    const newErrors = {};

    // 必填字段验证
    const requiredFields = {
      warehouseName: '仓库名称',
      department: '部门',
      warehouseType: '仓库类型',
      area: '面积',
      address: '地址',
      contactPerson: '联系人',
      phone: '电话'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field] || String(formData[field]).trim() === '') {
        newErrors[field] = `${label}不能为空`;
      }
    });

    // 电话号码格式验证
    if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入正确的手机号码';
    }

    // 面积数字验证
    if (formData.area && (isNaN(formData.area) || Number(formData.area) <= 0)) {
      newErrors.area = '面积必须是大于0的数字';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('保存仓库数据:', formData);
      
      if (onSave) {
        onSave(formData);
      }
      
      // 这里可以显示成功提示
      alert(warehouseId ? '仓库信息更新成功！' : '仓库创建成功！');
      
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 刷新页面数据
  const handleRefresh = () => {
    if (warehouseId) {
      // 重新加载数据
      window.location.reload();
    } else {
      // 清空表单
      setFormData({
        warehouseNumber: 'WH-2024-001',
        warehouseName: '',
        department: '',
        warehouseType: '',
        leaseTime: '',
        description: '',
        area: '',
        address: '',
        contactPerson: '',
        phone: '',
        supplierId: '',
        supplierName: ''
      });
      setErrors({});
    }
  };

  // 选择供应商
  const handleSelectSupplier = (supplier) => {
    setFormData(prev => ({
      ...prev,
      supplierId: supplier.id,
      supplierName: supplier.name
    }));
    setShowSupplierDialog(false);
    setSupplierSearchTerm('');
  };

  // 供应商选择弹窗
  const SupplierSelectionDialog = () => (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>选择供应商</DialogTitle>
        <DialogDescription>
          搜索并选择合作供应商
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索供应商名称或联系人..."
            value={supplierSearchTerm}
            onChange={(e) => setSupplierSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleSelectSupplier(supplier)}
            >
              <div>
                <p className="font-medium">{supplier.name}</p>
                <p className="text-sm text-gray-500">
                  {supplier.contact} | {supplier.phone}
                </p>
              </div>
            </div>
          ))}
          {filteredSuppliers.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              没有找到匹配的供应商
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      {/* 页面标题栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {warehouseId ? '编辑仓库' : '新增仓库'}
            </h1>
            <p className="text-gray-500">
              {warehouseId ? '修改仓库基础信息' : '创建新的仓库档案'}
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
          刷新
        </Button>
      </div>

      {/* 基础信息编辑区 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="h-5 w-5" />
            基础信息
          </CardTitle>
          <CardDescription>
            填写仓库的基本信息，带有 * 号的为必填项
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* 仓库编号（只读） */}
              <div className="space-y-2">
                <Label htmlFor="warehouseNumber">
                  <FileText className="inline h-4 w-4 mr-1" />
                  仓库编号
                </Label>
                <Input
                  id="warehouseNumber"
                  value={formData.warehouseNumber}
                  readOnly
                  className="bg-gray-50"
                />
              </div>

              {/* 仓库名称 */}
              <div className="space-y-2">
                <Label htmlFor="warehouseName" className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  仓库名称 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="warehouseName"
                  value={formData.warehouseName}
                  onChange={(e) => handleInputChange('warehouseName', e.target.value)}
                  placeholder="请输入仓库名称"
                  maxLength={50}
                  className={errors.warehouseName ? 'border-red-500' : ''}
                />
                {errors.warehouseName && (
                  <p className="text-sm text-red-500">{errors.warehouseName}</p>
                )}
              </div>

              {/* 部门选择 */}
              <div className="space-y-2">
                <Label htmlFor="department">
                  部门 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleInputChange('department', value)}
                >
                  <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                    <SelectValue placeholder="选择所属部门" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-500">{errors.department}</p>
                )}
              </div>

              {/* 仓库类型 */}
              <div className="space-y-2">
                <Label htmlFor="warehouseType">
                  仓库类型 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.warehouseType}
                  onValueChange={(value) => handleInputChange('warehouseType', value)}
                >
                  <SelectTrigger className={errors.warehouseType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="选择仓库类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouseTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.warehouseType && (
                  <p className="text-sm text-red-500">{errors.warehouseType}</p>
                )}
              </div>

              {/* 租赁时间 */}
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  租赁时间
                </Label>
                <Input
                  type="date"
                  value={formData.leaseTime}
                  onChange={(e) => handleInputChange('leaseTime', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* 面积 */}
              <div className="space-y-2">
                <Label htmlFor="area">
                  面积(㎡) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="area"
                  type="number"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="请输入仓库面积"
                  min="1"
                  className={errors.area ? 'border-red-500' : ''}
                />
                {errors.area && (
                  <p className="text-sm text-red-500">{errors.area}</p>
                )}
              </div>
            </div>

            {/* 作用说明 */}
            <div className="space-y-2">
              <Label htmlFor="description">
                作用说明
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="请描述仓库的主要用途和作用..."
                maxLength={200}
                className="min-h-20"
              />
              <p className="text-sm text-gray-500">
                {formData.description.length}/200 字符
              </p>
            </div>

            {/* 地址 */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                地址 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="请输入仓库详细地址"
                maxLength={100}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* 联系人 */}
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  联系人 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="请输入联系人姓名"
                  maxLength={20}
                  className={errors.contactPerson ? 'border-red-500' : ''}
                />
                {errors.contactPerson && (
                  <p className="text-sm text-red-500">{errors.contactPerson}</p>
                )}
              </div>

              {/* 电话 */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  电话 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="请输入联系电话"
                  maxLength={11}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* 供应商选择 */}
            <div className="space-y-2">
              <Label>关联供应商</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.supplierName}
                  placeholder="未选择供应商"
                  readOnly
                  className="flex-1 bg-gray-50"
                />
                <Dialog open={showSupplierDialog} onOpenChange={setShowSupplierDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">选择供应商</Button>
                  </DialogTrigger>
                  <SupplierSelectionDialog />
                </Dialog>
                {formData.supplierName && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleInputChange('supplierName', '');
                      handleInputChange('supplierId', '');
                    }}
                  >
                    清除
                  </Button>
                )}
              </div>
            </div>

            {/* 操作按钮区 */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                取消
              </Button>
              
              {warehouseId && (
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isLoading}>
                      删除仓库
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>确认删除</AlertDialogTitle>
                      <AlertDialogDescription>
                        您确定要删除仓库"{formData.warehouseName}"吗？此操作不可撤销，
                        删除后相关的库存数据也将被清除。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction>确认删除</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="min-w-24"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isLoading ? '保存中...' : '提交'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}