describe('getApiBaseUrl', () => {
  const originalEnv = process.env;

  const loadGetApiBaseUrl = () => require('./api').default;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns localhost URL when REACT_APP_CODESPACE_NAME is not set', () => {
    delete process.env.REACT_APP_CODESPACE_NAME;
    const getApiBaseUrl = loadGetApiBaseUrl();
    expect(getApiBaseUrl()).toBe('http://localhost:8000');
  });

  it('returns Codespace URL when REACT_APP_CODESPACE_NAME is set', () => {
    process.env.REACT_APP_CODESPACE_NAME = 'my-codespace';
    const getApiBaseUrl = loadGetApiBaseUrl();
    expect(getApiBaseUrl()).toBe('https://my-codespace-8000.app.github.dev');
  });

  it('returns localhost URL when REACT_APP_CODESPACE_NAME is an empty string', () => {
    process.env.REACT_APP_CODESPACE_NAME = '';
    const getApiBaseUrl = loadGetApiBaseUrl();
    expect(getApiBaseUrl()).toBe('http://localhost:8000');
  });

  it('returns localhost URL when REACT_APP_CODESPACE_NAME is whitespace only', () => {
    process.env.REACT_APP_CODESPACE_NAME = '   ';
    const getApiBaseUrl = loadGetApiBaseUrl();
    expect(getApiBaseUrl()).toBe('http://localhost:8000');
  });
});
