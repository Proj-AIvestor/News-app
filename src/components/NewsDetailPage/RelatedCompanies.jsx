import React from 'react';

const RelatedCompanies = ({ companies, companiesInfo }) => {
  return (
    <div className="border-t border-gray-200 mt-8 pt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Related Companies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => {
          const info = companiesInfo[company];
          
          if (info?.error) {
            return (
              <div key={company} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{company}</span>
                  <div className="text-sm text-gray-500">Data unavailable</div>
                </div>
              </div>
            );
          }
          
          return (
            <div key={company} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{company}</span>
                <span className="text-lg font-medium">${info.price}</span>
              </div>
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium ${info.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {info.change} ({info.changePercent}%)
                </span>
                {info.isPositive ? (
                  <span className="material-symbols-outlined text-green-600 text-sm ml-1">trending_up</span>
                ) : (
                  <span className="material-symbols-outlined text-red-600 text-sm ml-1">trending_down</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-gray-600">* Stock data as of market close. All values in USD unless otherwise noted.</p>
      </div>
    </div>
  );
};

export default RelatedCompanies;