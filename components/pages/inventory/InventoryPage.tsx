import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StandaloneInventoryForm } from './StandaloneInventoryForm';

interface InventoryPageProps {
  warehouse?: any;
  onBack?: () => void;
}

export function InventoryPage({ warehouse: propWarehouse, onBack }: InventoryPageProps) {
  const params = useParams();
  const navigate = useNavigate();
  const warehouseId = params.id;
  
  // 处理返回按钮点击
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // 如果没有提供onBack回调，则使用路由导航
      navigate('/warehouse');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {warehouseId && (
          <div className="mb-4">
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              返回仓库列表
            </button>
            <h1 className="text-2xl font-bold mt-2">仓库ID: {warehouseId} 的库存</h1>
          </div>
        )}
        <StandaloneInventoryForm warehouseId={warehouseId} />
      </div>
    </div>
  );
}
