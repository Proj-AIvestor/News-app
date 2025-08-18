import React, { useState, useEffect } from 'react';
import { getCompanyList, getCompanyNewsInfo, getCompanyStockInfo } from '../apis/companyNews/companyNews';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import CompanySelector from '../components/companyNews/CompanySelector';
import StockInfoCard from '../components/companyNews/StockInfoCard';
import NewsList from '../components/companyNews/NewsList';

const CompanyNewsPage = () => {
  const [companyList, setCompanyList] = useState([]);
  const [filteredCompanyList, setFilteredCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stockInfo, setStockInfo] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(false);
  const [stockLoading, setStockLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 인기 회사 목록 (예시)
  const popularCompanies = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'AMD', 'INTC'];

  // 회사 리스트 가져오기
  useEffect(() => {
    const fetchCompanyList = async () => {
      try {
        setLoading(true);
        const data = await getCompanyList();
        setCompanyList(data);
        setFilteredCompanyList(data);
        // 기본적으로 첫 번째 회사 선택
        if (data && data.length > 0) {
          setSelectedCompany(data[0]);
        }
      } catch (err) {
        console.error('Error fetching company list:', err);
        setError('회사 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyList();
  }, []);

  // 검색어에 따라 회사 리스트 필터링
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCompanyList(companyList);
    } else {
      const filtered = companyList.filter(company => 
        company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanyList(filtered);
    }
  }, [searchTerm, companyList]);

  // 선택된 회사의 주식 정보와 뉴스 가져오기
  useEffect(() => {
    if (!selectedCompany) return;

    const fetchCompanyData = async () => {
      try {
        // 주식 정보 가져오기
        setStockLoading(true);
        try {
          const stockData = await getCompanyStockInfo(selectedCompany);
          setStockInfo(stockData);
        } catch (stockErr) {
          console.error('Error fetching stock info:', stockErr);
          setStockInfo(null);
        } finally {
          setStockLoading(false);
        }

        // 뉴스 정보 가져오기
        setNewsLoading(true);
        try {
          const newsData = await getCompanyNewsInfo(selectedCompany);
          setNewsData(newsData);
        } catch (newsErr) {
          console.error('Error fetching news info:', newsErr);
          setNewsData([]);
        } finally {
          setNewsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching company data:', err);
      }
    };

    fetchCompanyData();
  }, [selectedCompany]);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">회사별 뉴스</h1>
        
        {/* 회사 선택 섹션 */}
        <CompanySelector
          companyList={companyList}
          filteredCompanyList={filteredCompanyList}
          selectedCompany={selectedCompany}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleCompanySelect={handleCompanySelect}
          popularCompanies={popularCompanies}
        />

        {/* 주식 정보 섹션 */}
        {selectedCompany && (
          <StockInfoCard
            stockInfo={stockInfo}
            selectedCompany={selectedCompany}
            stockLoading={stockLoading}
          />
        )}

        {/* 뉴스 섹션 */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">
            {selectedCompany} 관련 뉴스
          </h2>
          
          <NewsList
            newsData={newsData}
            newsLoading={newsLoading}
            selectedCompany={selectedCompany}
            formatDate={formatDate}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyNewsPage;
