import { renderHook, waitFor } from '@testing-library/react';
import useApiData from './useApiData';

// Mock the api utility
jest.mock('../utils/api', () => () => 'http://localhost:8000');

describe('useApiData', () => {
  beforeEach(() => {
    // Create a fresh fetch mock before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Clear all mocks after each test to ensure test isolation
    jest.restoreAllMocks();
  });

  it('should initialize with loading state', () => {
    global.fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    const { result } = renderHook(() => useApiData('users'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should fetch data successfully and set loading to false', async () => {
    const mockData = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });
    
    const { result } = renderHook(() => useApiData('users'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle paginated response with results array', async () => {
    const mockResults = [
      { id: 1, name: 'Team 1' },
      { id: 2, name: 'Team 2' }
    ];
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: mockResults, count: 2 })
    });
    
    const { result } = renderHook(() => useApiData('teams'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockResults);
    expect(result.current.error).toBeNull();
  });

  it('should handle HTTP error responses', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404
    });
    
    const { result } = renderHook(() => useApiData('nonexistent'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe('HTTP error! status: 404');
    expect(result.current.data).toEqual([]);
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network failure');
    global.fetch.mockRejectedValue(networkError);
    
    const { result } = renderHook(() => useApiData('activities'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe(networkError);
    expect(result.current.data).toEqual([]);
  });

  it('should construct the correct API endpoint', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([])
    });
    
    const { result } = renderHook(() => useApiData('leaderboard'));
    
    // Wait for the hook to complete loading
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/leaderboard/');
  });
});
