import { useEffect, useState, useMemo } from 'react';
import getApiBaseUrl from '../utils/api';

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
  
  // Memoize endpoint to prevent unnecessary effect re-runs
  const endpoint = useMemo(() => `${getApiBaseUrl()}/api/${path}/`, [path]);

  useEffect(() => {
    fetch(endpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(responseData => {
        const results = responseData.results || responseData;
        setData(results);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
};

export default useApiData;
