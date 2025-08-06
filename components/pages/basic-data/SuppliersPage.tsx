import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  Users,
  ArrowLeft,
  Mail,
  Phone,
  Building,
  MapPin,
  TrendingUp,
  Download,
  Upload
} from 'lucide-react';
import { getStatusBadge } from '../../../lib/utils';
import { mockSuppliers, supplierCooperationAnalysis } from '../../../mockdata';

export function SuppliersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // 筛选数据
  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || supplier.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 统计数据
  const totalSuppliers = mockSuppliers.length;
  const activeSuppliers = mockSuppliers.filter(s => s.status === 'active').length;
  const pausedSuppliers = mockSuppliers.filter(s => s.status === 'inactive').length;
  const categories = [...new Set(mockSuppliers.map(s => s.category))].length;

  const SupplierForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="supplierId">供应商编号</Label>
          <Input id="supplierId" placeholder="如：SUP003" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplierName">供应商名称</Label>
          <Input id="supplierName" placeholder="公司名称" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact">联系人</Label>
          <Input id="contact" placeholder="联系人姓名" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPhone">联系电话</Label>
          <Input id="contactPhone" placeholder="电话号码" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" placeholder="邮箱地址" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">地址</Label>
        <Input id="address" placeholder="详细地址" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="supplierCategory">主营类别</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="选择主营类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hardware">五金件</SelectItem>
            <SelectItem value="electronic">电子元件</SelectItem>
            <SelectItem value="cable">电缆线材</SelectItem>
            <SelectItem value="mechanical">机械零件</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 页面标题和导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/basic-data')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">供应商管理</h2>
            <p className="text-muted-foreground">
              供应商信息维护、合作状态和业务分类管理
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            导入
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">供应商总数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              已注册供应商
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">合作中</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              正常合作状态
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">暂停合作</CardTitle>
            <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pausedSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              暂停或待审核
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">业务分类</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{categories}</div>
            <p className="text-xs text-muted-foreground">
              不同业务类别
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和操作 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            供应商列表
          </CardTitle>
          <CardDescription>
            查看和管理所有供应商的基本信息和合作状态
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索供应商..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-80"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="分类筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="五金件">五金件</SelectItem>
                  <SelectItem value="电子元件">电子元件</SelectItem>
                  <SelectItem value="电缆线材">电缆线材</SelectItem>
                  <SelectItem value="机械零件">机械零件</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">合作中</SelectItem>
                  <SelectItem value="inactive">暂停</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    新增供应商
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>新增供应商</DialogTitle>
                    <DialogDescription>
                      创建新的供应商信息
                    </DialogDescription>
                  </DialogHeader>
                  <SupplierForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>供应商编号</TableHead>
                  <TableHead>供应商名称</TableHead>
                  <TableHead>联系人</TableHead>
                  <TableHead>联系电话</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead>主营类别</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => {
                  const statusInfo = getStatusBadge(supplier.status);
                  return (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.category}</TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant as any}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <div>没有找到匹配的供应商信息</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 分类统计和合作分析 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              业务分类统计
            </CardTitle>
            <CardDescription>
              各类业务供应商的数量分布
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['五金件', '电子元件', '电缆线材', '机械零件'].map((category) => {
                const count = mockSuppliers.filter(s => s.category === category).length;
                const percentage = totalSuppliers > 0 ? Math.round((count / totalSuppliers) * 100) : 0;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-12">{count}家</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              合作分析
            </CardTitle>
            <CardDescription>
              供应商合作状态和质量评估
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">合作率</span>
                <span className="font-medium text-green-600">{supplierCooperationAnalysis.cooperationRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">平均合作时长</span>
                <span className="font-medium">{supplierCooperationAnalysis.averageCooperationDuration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">质量评分</span>
                <span className="font-medium text-blue-600">{supplierCooperationAnalysis.qualityScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">交付准时率</span>
                <span className="font-medium text-purple-600">{supplierCooperationAnalysis.onTimeDeliveryRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">新增供应商</span>
                <span className="font-medium text-orange-600">{supplierCooperationAnalysis.newSuppliers}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
