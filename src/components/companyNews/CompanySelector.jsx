import React from 'react';

const CompanySelector = ({ 
  companyList, 
  filteredCompanyList, 
  selectedCompany, 
  searchTerm, 
  setSearchTerm,
  handleCompanySelect,
  popularCompanies 
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">회사 선택</h2>
      
      {/* 인기 회사 빠른 선택 */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">인기 회사:</p>
        <div className="flex flex-wrap gap-2">
          {popularCompanies.filter(company => companyList.includes(company)).map((company) => (
            <button
              key={company}
              onClick={() => handleCompanySelect(company)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCompany === company
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {company}
            </button>
          ))}
        </div>
      </div>
      
      {/* 검색 입력 필드 */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="회사 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* 회사 리스트 */}
      <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-sm max-h-48 overflow-y-auto">
        {filteredCompanyList.length > 0 ? (
          filteredCompanyList.map((company) => (
            <button
              key={company}
              onClick={() => handleCompanySelect(company)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCompany === company
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {company}
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            "{searchTerm}"에 해당하는 회사가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default CompanySelector;
