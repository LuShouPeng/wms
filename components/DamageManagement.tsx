import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Eye,
  Edit,
  Trash2,
  FileImage,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { getStatusBadge } from '../lib/utils';
import { mockDamageRecords, mockProducts, damageTypes } from '../constants/mockData';

export function DamageManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const itemsPerPage = 10;

  const getDamageTypeColor = (type) => {
    const colorMap = {
      '损坏报损': 'bg-red-100 text-red-800',
      '丢失报损': 'bg-yellow-100 text-yellow-800',
      '其他报损': 'bg-gray-100 text-gray-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredRecords = mockDamageRecords.filter(record => {
    const matchesSearch = record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.operator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.damageType === filterType;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectRow = (recordId) => {
    setSelectedRows(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedRecords.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedRecords.map(record => record.id));
    }
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setShowEditForm(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedRows([]); // 清空选择
  };

  const DamageForm = ({ editRecord = null, onClose }) => {
    const [formData, setFormData] = useState({
      productCode: editRecord?.productCode || '',
      quantity: editRecord?.quantity || '',
      damageType: editRecord?.damageType || '',
      reason: editRecord?.reason || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // 这里处理表单提交逻辑
      console.log('提交表单数据:', formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="productSelect">选择产品 *</Label>
            <Select 
              value={formData.productCode} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, productCode: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="选择要报损的产品" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map(product => (
                  <SelectItem key={product.code} value={product.code}>
                    {product.code} - {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">报损数量 *</Label>
            <Input 
              id="quantity" 
              type="number" 
              placeholder="输入报损数量" 
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
              required
              min="1"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="damageType">报损类型 *</Label>
          <Select 
            value={formData.damageType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, damageType: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="选择报损类型" />
            </SelectTrigger>
            <SelectContent>
              {damageTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">报损原因 *</Label>
          <Textarea 
            id="reason" 
            placeholder="请详细描述报损原因，包括损坏情况、发现时间等..." 
            className="min-h-20"
            value={formData.reason}
            onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="attachments">附件上传</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <Button type="button" variant="outline" size="sm">
                  选择文件
                </Button>
                <p className="text-sm text-gray-500 mt-1">
                  支持图片、PDF等格式，最大10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button type="submit">
            {editRecord ? '保存修改' : '提交报损'}
          </Button>
        </div>
      </form>
    );
  };

  const ReviewDialog = ({ record, onClose }) => {
    const [reviewComment, setReviewComment] = useState('');
    const [reviewResult, setReviewResult] = useState('');

    const handleReview = (result) => {
      setReviewResult(result);
      // 这里处理审核逻辑
      console.log(`审核结果: ${result}, 意见: ${reviewComment}`);
      onClose();
    };

    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>报损单号</Label>
            <p className="text-sm text-gray-600">{record.id}</p>
          </div>
          <div>
            <Label>产品名称</Label>
            <p className="text-sm text-gray-600">{record.productName}</p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>报损数量</Label>
            <p className="text-sm text-gray-600 font-semibold">{record.quantity}</p>
          </div>
          <div>
            <Label>报损类型</Label>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getDamageTypeColor(record.damageType)}`}>
              {record.damageType}
            </span>
          </div>
        </div>

        <div>
          <Label>报损原因</Label>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{record.reason}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reviewComment">审核意见 *</Label>
          <Textarea 
            id="reviewComment" 
            placeholder="请填写审核意见..." 
            className="min-h-20"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={() => handleReview('rejected')}
            disabled={!reviewComment.trim()}
          >
            <XCircle className="h-4 w-4 mr-2" />
            拒绝
          </Button>
          <Button 
            onClick={() => handleReview('approved')}
            disabled={!reviewComment.trim()}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            通过
          </Button>
        </div>
      </div>
    );
  };

  const DetailsDialog = ({ record }) => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>报损单号</Label>
          <p className="font-medium">{record.id}</p>
        </div>
        <div>
          <Label>报损时间</Label>
          <p className="text-sm text-gray-600">{record.damageTime}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>产品信息</Label>
          <p className="font-medium">{record.productName}</p>
          <p className="text-sm text-gray-500">编码: {record.productCode}</p>
        </div>
        <div>
          <Label>报损类型</Label>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getDamageTypeColor(record.damageType)}`}>
            {record.damageType}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>报损数量</Label>
          <p className="text-lg font-semibold text-red-600">{record.quantity}</p>
        </div>
        <div>
          <Label>操作人</Label>
          <p className="text-sm text-gray-600">{record.operator}</p>
        </div>
      </div>

      <div>
        <Label>报损原因</Label>
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{record.reason}</p>
      </div>

      {record.attachments.length > 0 && (
        <div>
          <Label>附件</Label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {record.attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md">
                <FileImage className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{file}</span>
                <Button variant="ghost" size="sm" className="h-6 px-2">查看</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label>状态</Label>
        <div className="flex items-center gap-2 mt-1">
          {getStatusIcon(record.status)}
          <Badge variant={getStatusBadge(record.status).variant}>
            {getStatusBadge(record.status).label}
          </Badge>
        </div>
      </div>

      {record.reviewComment && (
        <div>
          <Label>审核意见</Label>
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">{record.reviewComment}</p>
          <p className="text-xs text-gray-500 mt-1">
            审核人: {record.reviewer} | 审核时间: {record.reviewTime}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* 筛选和搜索区域 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索报损单号、产品名称、操作人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-80"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="报损类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              {damageTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="pending">待审核</SelectItem>
              <SelectItem value="approved">审核成功</SelectItem>
              <SelectItem value="rejected">审核失败</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            高级筛选
          </Button>
        </div>

        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    批量删除 ({selectedRows.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>确认删除</AlertDialogTitle>
                    <AlertDialogDescription>
                      您确定要删除选中的 {selectedRows.length} 条报损记录吗？此操作不可撤销。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction>确认删除</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button variant="outline" size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                批量审核 ({selectedRows.length})
              </Button>
            </>
          )}

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>

          <Button size="sm" onClick={() => setShowNewForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新增报损
          </Button>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>总报损记录</CardDescription>
            <CardTitle className="text-2xl">{filteredRecords.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>待审核</CardDescription>
            <CardTitle className="text-2xl text-yellow-600">
              {filteredRecords.filter(r => r.status === 'pending').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>已通过</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              {filteredRecords.filter(r => r.status === 'approved').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>已拒绝</CardDescription>
            <CardTitle className="text-2xl text-red-600">
              {filteredRecords.filter(r => r.status === 'rejected').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* 报损记录表格 */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedRows.length === paginatedRecords.length && paginatedRecords.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>报损单号</TableHead>
              <TableHead>报损类型</TableHead>
              <TableHead>产品名称</TableHead>
              <TableHead>报损数量</TableHead>
              <TableHead>报损原因</TableHead>
              <TableHead>报损时间</TableHead>
              <TableHead>操作人</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecords.map((record) => {
              const statusInfo = getStatusBadge(record.status);
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedRows.includes(record.id)}
                      onCheckedChange={() => handleSelectRow(record.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getDamageTypeColor(record.damageType)}`}>
                      {record.damageType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.productName}</p>
                      <p className="text-sm text-gray-500">{record.productCode}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-red-600 font-medium">{record.quantity}</TableCell>
                  <TableCell className="max-w-48">
                    <p className="truncate text-sm" title={record.reason}>{record.reason}</p>
                  </TableCell>
                  <TableCell>{record.damageTime}</TableCell>
                  <TableCell>{record.operator}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(record)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      {record.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(record)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>确认删除</AlertDialogTitle>
                                <AlertDialogDescription>
                                  您确定要删除报损单 {record.id} 吗？此操作不可撤销。
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>取消</AlertDialogCancel>
                                <AlertDialogAction>确认删除</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>审核报损记录</DialogTitle>
                                <DialogDescription>
                                  请仔细审核报损信息并填写审核意见
                                </DialogDescription>
                              </DialogHeader>
                              <ReviewDialog record={record} onClose={() => {}} />
                            </DialogContent>
                          </Dialog>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {paginatedRecords.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' ? '没有找到匹配的记录' : '暂无报损记录'}
            </p>
          </div>
        )}
      </Card>

      {/* 分页 */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* 新增报损弹窗 */}
      <Dialog open={showNewForm} onOpenChange={setShowNewForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>新增报损记录</DialogTitle>
            <DialogDescription>
              填写报损信息，提交后将进入审核流程
            </DialogDescription>
          </DialogHeader>
          <DamageForm onClose={() => setShowNewForm(false)} />
        </DialogContent>
      </Dialog>

      {/* 编辑报损弹窗 */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑报损记录</DialogTitle>
            <DialogDescription>
              修改报损信息，仅限待审核状态的记录
            </DialogDescription>
          </DialogHeader>
          <DamageForm editRecord={editingRecord} onClose={() => setShowEditForm(false)} />
        </DialogContent>
      </Dialog>

      {/* 详情弹窗 */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>报损记录详情</DialogTitle>
            <DialogDescription>
              查看报损记录的详细信息
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && <DetailsDialog record={selectedRecord} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}