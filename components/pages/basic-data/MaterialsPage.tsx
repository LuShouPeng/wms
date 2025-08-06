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
  Package,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react';
import { getStatusBadge } from '../../../lib/utils';
import { mockMaterials, materialPriceAnalysis } from '../../../mockdata';

export function MaterialsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // 筛选数据
  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || material.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 统计数据
  const totalMaterials = mockMaterials.length;
  const activeMaterials = mockMaterials.filter(m => m.status === 'active').length;
  const lowStockMaterials = mockMaterials.filter(m => parseInt(m.minStock) > 50).length; // 假设库存数据
  const categories = [...new Set(mockMaterials.map(m => m.category))].length;

  const MaterialForm = () => (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="materialCode">物料编码</Label>
          <Input id="materialCode" placeholder="如：M004" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="materialName">物料名称</Label>
          <Input id="materialName" placeholder="输入物料名称" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">物料分类</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hardware">五金件</SelectItem>
              <SelectItem value="electronic">电子元件</SelectItem>
              <SelectItem value="cable">电缆线材</SelectItem>
              <SelectItem value="mechanical">机械零件</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">计量单位</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择单位" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="piece">个</SelectItem>
              <SelectItem value="meter">米</SelectItem>
              <SelectItem value="kg">千克</SelectItem>
              <SelectItem value="box">箱</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="supplier">供应商</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择供应商" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sup1">供应商A</SelectItem>
              <SelectItem value="sup2">供应商B</SelectItem>
              <SelectItem value="sup3">供应商C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">参考价格</Label>
          <Input id="price" placeholder="单价" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="minStock">最低库存</Label>
        <Input id="minStock" placeholder="最低库存数量" />
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
            <h2 className="text-2xl font-bold tracking-tight">物料档案</h2>
            <p className="text-muted-foreground">
              维护物料基础信息、分类管理和价格配置
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
            <CardTitle className="text-sm font-medium">物料总数</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMaterials}</div>
            <p className="text-xs text-muted-foreground">
              已配置物料档案
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃物料</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeMaterials}</div>
            <p className="text-xs text-muted-foreground">
              正常使用状态
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">物料分类</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{categories}</div>
            <p className="text-xs text-muted-foreground">
              不同物料类别
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">低库存预警</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockMaterials}</div>
            <p className="text-xs text-muted-foreground">
              需要补货物料
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和操作 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            物料列表
          </CardTitle>
          <CardDescription>
            查看和管理所有物料的基本信息和配置
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索物料..."
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
                  <SelectItem value="active">正常</SelectItem>
                  <SelectItem value="inactive">停用</SelectItem>
                  <SelectItem value="discontinued">停产</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    新增物料
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>新增物料</DialogTitle>
                    <DialogDescription>
                      创建新的物料档案
                    </DialogDescription>
                  </DialogHeader>
                  <MaterialForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>物料编码</TableHead>
                  <TableHead>物料名称</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>单位</TableHead>
                  <TableHead>供应商</TableHead>
                  <TableHead>参考价格</TableHead>
                  <TableHead>最低库存</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => {
                  const statusInfo = getStatusBadge(material.status);
                  return (
                    <TableRow key={material.code}>
                      <TableCell className="font-medium">{material.code}</TableCell>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.category}</TableCell>
                      <TableCell>{material.unit}</TableCell>
                      <TableCell>{material.supplier}</TableCell>
                      <TableCell>{material.price}</TableCell>
                      <TableCell>{material.minStock}</TableCell>
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

          {filteredMaterials.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <div>没有找到匹配的物料信息</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 物料分类统计 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              分类统计
            </CardTitle>
            <CardDescription>
              各类物料的数量分布
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['五金件', '电子元件', '电缆线材', '机械零件'].map((category) => {
                const count = mockMaterials.filter(m => m.category === category).length;
                const percentage = Math.round((count / totalMaterials) * 100);
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
                      <span className="text-sm text-muted-foreground w-12">{count}个</span>
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
              <DollarSign className="h-5 w-5" />
              价格分析
            </CardTitle>
            <CardDescription>
              物料价格分布和统计信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">平均单价</span>
                <span className="font-medium">{materialPriceAnalysis.averagePrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">最高单价</span>
                <span className="font-medium text-red-600">{materialPriceAnalysis.maxPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">最低单价</span>
                <span className="font-medium text-green-600">{materialPriceAnalysis.minPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">价格变动</span>
                <span className="font-medium text-orange-600">{materialPriceAnalysis.priceChange}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
