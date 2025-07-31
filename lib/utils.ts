import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    active: { label: '正常', variant: 'default' },
    inactive: { label: '停用', variant: 'secondary' },
    draft: { label: '草稿', variant: 'outline' },
    pending: { label: '待审核', variant: 'outline' },
    maintenance: { label: '维护中', variant: 'outline' },
    discontinued: { label: '停产', variant: 'destructive' },
    completed: { label: '已完成', variant: 'default' },
    processing: { label: '处理中', variant: 'secondary' },
    approved: { label: '已审核', variant: 'default' },
    rejected: { label: '已拒绝', variant: 'destructive' },
    cancelled: { label: '已取消', variant: 'secondary' },
    shipped: { label: '已发货', variant: 'secondary' },
    low: { label: '库存不足', variant: 'destructive' },
    normal: { label: '正常', variant: 'default' },
    high: { label: '库存充足', variant: 'secondary' }
  };
  return statusMap[status] || { label: status, variant: 'default' };
};

export const getAlertLevelBadge = (level: string) => {
  const levelMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    high: { label: '高风险', variant: 'destructive' },
    medium: { label: '中风险', variant: 'outline' },
    low: { label: '低风险', variant: 'default' }
  };
  return levelMap[level] || { label: level, variant: 'default' };
};