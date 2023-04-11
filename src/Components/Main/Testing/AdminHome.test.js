import axios from 'axios';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminHome from './AdminHome';

jest.mock('axios');

describe('AdminHome', () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.get.mockResolvedValue({ data: [] });
  });

  test('renders AdminHome with table', async () => {
    axios.get.mockResolvedValue({ data: [
      { mobileNo: '123', imageUrl: 'http://example.com/image.jpg', name: 'Product 1', price: 10, quantity: 2, date: '2021-01-01' },
      { mobileNo: '456', imageUrl: 'http://example.com/image.jpg', name: 'Product 2', price: 20, quantity: 1, date: '2021-01-02' },
    ]});

    render(<AdminHome />);

    // Check that the search input and button exist
    expect(screen.getByLabelText('Search By Mobile Numaber :')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

    // Check that the table headers and rows exist
    expect(screen.getByText('USER')).toBeInTheDocument();
    expect(screen.getByText('PRODUCT IMAGE')).toBeInTheDocument();
    expect(screen.getByText('PRODUCT NAME')).toBeInTheDocument();
    expect(screen.getByText('PRODUCT PRICE')).toBeInTheDocument();
    expect(screen.getByText('PRODUCT QUANTITY')).toBeInTheDocument();
    expect(screen.getByText('DATE')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('2021-01-01')).toBeInTheDocument();
    expect(screen.getByText('456')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2021-01-02')).toBeInTheDocument();

    // Check that the API was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith('http://localhost:9100/order');
  });

  test('searches for orders by mobile number', async () => {
    axios.get.mockResolvedValue({ data: [
      { mobileNo: '123', imageUrl: 'http://example.com/image.jpg', name: 'Product 1', price: 10, quantity: 2, date: '2021-01-01' },
      { mobileNo: '456', imageUrl: 'http://example.com/image.jpg', name: 'Product 2', price: 20, quantity: 1, date: '2021-01-02' },
    ]});

    render(<AdminHome />);

    // Enter the mobile number and click search
    const input = screen.getByLabelText('Search By Mobile Numaber :');
    fireEvent.change(input, { target: { value: '123' } });
    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(button);

    // Check that the table only shows the order with the desired mobile number
    expect(screen.queryByText('456')).not.toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();

    // Check that the API was called with the correct URL and parameters
    expect(axios.get).toHaveBeenCalledWith('http://localhost:9100/order');
    expect(axios.get).toHaveBeenCalledWith('http://localhost:9100/order', { params: { mobileNo: '123' } });
  });
});
