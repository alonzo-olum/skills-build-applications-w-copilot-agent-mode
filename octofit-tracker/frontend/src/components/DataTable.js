import React from 'react';
import PropTypes from 'prop-types';
import useApiData from '../hooks/useApiData';

/**
 * Reusable component for displaying API data in a table format.
 * 
 * @param {object} props
 * @param {string} props.title - The title to display above the table
 * @param {string} props.endpoint - The API endpoint path (e.g., 'users', 'teams')
 */
const DataTable = ({ title, endpoint }) => {
  const { data, loading, error } = useApiData(endpoint);

  if (loading) return <div className="text-center my-5">Loading {title.toLowerCase()}...</div>;

  if (error) return <div className="text-center my-5 text-danger">Error loading {title.toLowerCase()}</div>;

  if (!data || data.length === 0) {
    return (
      <div className="card shadow mb-4">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">{title}</h2>
          <p className="text-muted">No {title.toLowerCase()} found.</p>
        </div>
      </div>
    );
  }

  // Get all unique keys for table headers
  const allKeys = Array.from(
    data.reduce((keys, item) => {
      Object.keys(item).forEach(k => keys.add(k));
      return keys;
    }, new Set())
  );

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">{title}</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                {allKeys.map(key => (
                  <th key={key}>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx}>
                  {allKeys.map(key => (
                    <td key={key}>{String(item[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default DataTable;
