import React from 'react';

const StockInfoCard = ({ stockInfo, selectedCompany, stockLoading }) => {
  if (stockLoading) {
    return (
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stockInfo) {
    return (
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-500">주식 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-md p-6 border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {stockInfo.companyName || selectedCompany}
            </h3>
            <p className="text-sm text-gray-500 mt-1">티커: {stockInfo.ticker}</p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">현재가</p>
              <p className="text-3xl font-bold text-gray-900">
                ${stockInfo.price}
              </p>
            </div>
            
            <div className={`text-center px-4 py-2 rounded-lg ${
              stockInfo.isPositive 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className="text-xs text-gray-600 mb-1">변동</p>
              <div className={`flex items-center gap-1 ${stockInfo.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stockInfo.isPositive ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" />
                  </svg>
                )}
                <span className="text-lg font-semibold">
                  {stockInfo.change}
                </span>
                <span className="text-sm font-medium">
                  ({stockInfo.changePercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            마지막 업데이트: {new Date(stockInfo.lastUpdated).toLocaleString('ko-KR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockInfoCard;
