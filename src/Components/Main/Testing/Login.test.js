import React from 'react';
import axios from 'axios';
import { render, fireEvent, act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import UserLogin from './UserLogin';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('UserLogin component', () => {
  let mockGet, mockNavigate;

  beforeEach(() => {
    // Create a mock function for the axios get method
    mockGet = jest.spyOn(axios, 'get').mockResolvedValue({
      data: [
        {
          email: 'test1@test.com',
          password: '123456',
          mobileNo: '1111111111',
        },
        {
          email: 'test2@test.com',
          password: '654321',
          mobileNo: '2222222222',
        },
      ],
    });

    // Create a mock function for the useNavigate hook
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form properly', () => {
    const { getByText, getByPlaceholderText } = render(<UserLogin />);
    expect(getByPlaceholderText(' Your Email')).toBeInTheDocument();
    expect(getByPlaceholderText(' Your Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('SignUp')).toBeInTheDocument();
  });

  it('should navigate to registration page when SignUp button is clicked', () => {
    const { getByText } = render(<UserLogin />);
    fireEvent.click(getByText('SignUp'));
    expect(mockNavigate).toHaveBeenCalledWith('/userregistration');
  });

  it('should display error message when email or password is incorrect', async () => {
    const { getByText, getByPlaceholderText } = render(<UserLogin />);
    const emailInput = getByPlaceholderText(' Your Email');
    const passwordInput = getByPlaceholderText(' Your Password');
    const loginButton = getByText('Login');

    await act(async () => {
      // Wait for the axios get method to return its data
      await new Promise((resolve) => setTimeout(resolve, 0));

      fireEvent.change(emailInput, { target: { value: 'test3@test.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(loginButton);
    });

    expect(getByText('Incorrect email or password. Please try again.')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should log the user in and navigate to product page when email and password are correct', async () => {
    const { getByText, getByPlaceholderText } = render(<UserLogin />);
    const emailInput = getByPlaceholderText(' Your Email');
    const passwordInput = getByPlaceholderText(' Your Password');
    const loginButton = getByText('Login');

    await act(async () => {
      // Wait for the axios get method to return its data
      await new Promise((resolve) => setTimeout(resolve, 0));

      fireEvent.change(emailInput, { target: { value: 'test1@test.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(loginButton);
    });

    expect(getByText('You have successfully logged in.')).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/productpage');
    expect(sessionStorage.getItem('data')).toBe('1111111111');
  });
});
