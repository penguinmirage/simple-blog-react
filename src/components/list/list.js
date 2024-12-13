import React, { useState, useEffect } from 'react';
import ApiService from '../../realworldblog-api/rwbapi';
import ListElement from '../list-element';
import { Pagination, Spin } from 'antd';
import './list.css';

const ListOfArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articlesCount, setArticlesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const pageSize = 10;

  const apiService = new ApiService();

  const fetchArticles = (page) => {
    setLoading(true);
    apiService
      .getListOfArticles(page, pageSize)
      .then(({ articles, total }) => {
        setArticles(articles);
        setArticlesCount(total);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin tip="Loading articles..." />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  const elements = articles.map((article) => {
    const { id, ...itemProps } = article;
    return (
      <li key={id} className="list-group-item">
        <ListElement {...itemProps} />
      </li>
    );
  });

  return (
    <div>
      <ul className="list-of-articles">{elements}</ul>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Pagination current={currentPage} pageSize={pageSize} total={articlesCount} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ListOfArticles;
