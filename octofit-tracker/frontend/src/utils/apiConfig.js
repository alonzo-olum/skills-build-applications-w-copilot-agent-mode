/**
 * Returns the base URL for API requests based on the environment.
 * 
 * When running in a GitHub Codespace, uses the REACT_APP_CODESPACE_NAME
 * environment variable to construct the appropriate HTTPS URL.
 * Otherwise, falls back to localhost for local development.
 * 
 * @returns {string} The base URL for API requests
 */
const getApiBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default getApiBaseUrl;
