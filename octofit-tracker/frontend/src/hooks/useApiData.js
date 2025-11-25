import { useEffect, useState } from 'react';

/**
 * Custom hook for fetching data from API endpoints.
 * Handles loading state, error handling, and data transformation.
 * 
 * @param {string} path - The API endpoint path (e.g., 'users', 'teams')
 * @returns {object} - { data, loading, error }
 */
const useApiData = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/${path}/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(responseData => {
        const results = responseData.results || responseData;
        setData(results);
        console.log(`Fetched ${path}:`, results);
        setLoading(false);
      })
      .catch(err => {
        console.error(`Error fetching ${path}:`, err);
        setError(err);
        setLoading(false);
      });
  }, [endpoint, path]);

  return { data, loading, error };
};

export default useApiData;
