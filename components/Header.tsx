import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Bell,
  LogOut,
  User,
  Settings,
  Search,
  AlertCircle,
  Clock,
  CheckCircle,
  Package,
  ShoppingCart,
  TrendingUp,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  HelpCircle,
  MessageSquare,
  Send
} from 'lucide-react';
import { ReplenishmentDialog } from './ReplenishmentDialog';

export function Header({ user, onLogout, activeModule, onModuleChange, onToggleSidebar }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [replenishmentDialog, setReplenishmentDialog] = useState({
    open: false,
    productCode: '',
    productName: '',
    currentStock: 0,
    minStock: 0
  });

  // 模拟通知数据
  const notifications = [
    { 
      id: 1, 
      type: 'warning', 
      title: '库存预警',
      message: '物料A001库存不足，当前仅剩15个',
      time: '5分钟前',
      isRead: false,
      action: () => onModuleChange('warehouse'),
      productCode: 'A001',
      productName: '标准螺丝M6x20',
      currentStock: 15,
      minStock: 50
    },
    { 
      id: 2, 
      type: 'info', 
      title: '待审批', 
      message: '采购单PO-2024-001等待您的审批', 
      time: '10分钟前',
      isRead: false,
      action: () => onModuleChange('business')
    },
    { 
      id: 3, 
      type: 'success', 
      title: '入库完成', 
      message: '入库单IN-2024-058已完成处理', 
      time: '1小时前',
      isRead: true,
      action: () => onModuleChange('warehouse')
    },
    { 
      id: 4, 
      type: 'info', 
      title: '系统更新', 
      message: '系统将于今晚23:00进行维护更新', 
      time: '2小时前',
      isRead: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'info':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getModuleTitle = (module) => {
    const titles = {
      dashboard: '仪表盘',
      warehouse: '仓库管理',
      business: '业务管理', 
      reports: '报表管理',
      basicData: '基础资料',
      settings: '系统设置'
    };
    return titles[module] || '仓储管理系统';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // 这里可以实现全局搜索功能
      console.log('搜索:', searchTerm);
      // 可以跳转到搜索结果页面或显示搜索结果
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // 这里可以实现主题切换逻辑
    document.documentElement.classList.toggle('dark');
  };

  const handleReplenishmentRequest = (notification: any) => {
    if (notification.type === 'warning' && notification.productCode) {
      setReplenishmentDialog({
        open: true,
        productCode: notification.productCode,
        productName: notification.productName,
        currentStock: notification.currentStock,
        minStock: notification.minStock
      });
      setShowNotifications(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* 左侧：菜单切换按钮、模块标题和面包屑 */}
        <div className="flex items-center gap-4 flex-1">
          {/* 侧边栏切换按钮 */}
          {onToggleSidebar && (
            <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {getModuleTitle(activeModule)}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>当前位置:</span>
              <span>首页</span>
              <span>/</span>
              <span>{getModuleTitle(activeModule)}</span>
            </div>
          </div>
        </div>

        {/* 中间：搜索框 */}
        <div className="flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索物料、订单、供应商..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4"
            />
          </form>
        </div>

        {/* 右侧：功能按钮和用户信息 */}
        <div className="flex items-center gap-2">
          {/* 主题切换 */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleDarkMode}
            className="relative"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* 帮助中心 */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* 消息中心 */}
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4" />
          </Button>

          {/* 通知消息 */}
          <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>系统通知</span>
                  <Badge variant="secondary">{unreadCount} 条未读</Badge>
                </DialogTitle>
                <DialogDescription>
                  查看最新的系统通知和提醒
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
                    }`}
                    onClick={notification.action}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  查看全部通知
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* 分隔线 */}
          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.role}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                个人信息
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                账户设置
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                通知设置
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Globe className="mr-2 h-4 w-4" />
                语言设置
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                帮助中心
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                意见反馈
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 快捷操作栏（可选） */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>上次登录: {new Date().toLocaleString('zh-CN')}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onModuleChange('warehouse')}>
            <Package className="h-4 w-4 mr-1" />
            快速入库
          </Button>
          <Button variant="outline" size="sm" onClick={() => onModuleChange('business')}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            新建采购
          </Button>
          <Button variant="outline" size="sm" onClick={() => onModuleChange('reports')}>
            <TrendingUp className="h-4 w-4 mr-1" />
            查看报表
          </Button>
        </div>
      </div>

      {/* 补货申请对话框 */}
      <ReplenishmentDialog
        open={replenishmentDialog.open}
        onOpenChange={(open) => setReplenishmentDialog({ ...replenishmentDialog, open })}
        productCode={replenishmentDialog.productCode}
        productName={replenishmentDialog.productName}
        currentStock={replenishmentDialog.currentStock}
        minStock={replenishmentDialog.minStock}
      />
    </header>
  );
}