import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';
import useApiData from '../hooks/useApiData';

// Mock the useApiData hook
jest.mock('../hooks/useApiData');

describe('DataTable Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    useApiData.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<DataTable title="Users" endpoint="users" />);
    
    expect(screen.getByText(/loading users.../i)).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    useApiData.mockReturnValue({
      data: [],
      loading: false,
      error: new Error('Network error'),
    });

    render(<DataTable title="Users" endpoint="users" />);
    
    expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
  });

  it('renders empty data state correctly', () => {
    useApiData.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<DataTable title="Teams" endpoint="teams" />);
    
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText(/no teams found/i)).toBeInTheDocument();
  });

  it('renders null data state correctly', () => {
    useApiData.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<DataTable title="Activities" endpoint="activities" />);
    
    expect(screen.getByText('Activities')).toBeInTheDocument();
    expect(screen.getByText(/no activities found/i)).toBeInTheDocument();
  });

  it('renders data table correctly with data', () => {
    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    useApiData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<DataTable title="Users" endpoint="users" />);
    
    // Check title is rendered
    expect(screen.getByText('Users')).toBeInTheDocument();
    
    // Check table headers are rendered and formatted correctly
    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    
    // Check data rows are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('formats column headers with underscores correctly', () => {
    const mockData = [
      { id: 1, user_name: 'testuser', created_at: '2024-01-01' },
    ];

    useApiData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<DataTable title="Records" endpoint="records" />);
    
    // Headers should have underscores replaced with spaces and capitalized
    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Created At')).toBeInTheDocument();
  });

  it('handles data with varying keys across objects', () => {
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2', extra_field: 'Extra' },
    ];

    useApiData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<DataTable title="Items" endpoint="items" />);
    
    // All unique keys should be rendered as headers
    expect(screen.getByText('Id')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Extra Field')).toBeInTheDocument();
    
    // Data should be rendered, including undefined for missing keys
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Extra')).toBeInTheDocument();
  });

  it('calls useApiData with correct endpoint', () => {
    useApiData.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<DataTable title="Leaderboard" endpoint="leaderboard" />);
    
    expect(useApiData).toHaveBeenCalledWith('leaderboard');
  });
});
