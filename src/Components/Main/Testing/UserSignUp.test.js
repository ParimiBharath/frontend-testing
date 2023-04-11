import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserSignUp from './UserSignUp';

jest.mock('axios');

describe('UserSignUp component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    jest.spyOn(React, 'useNavigate').mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the signup form', () => {
    const { getByText, getByLabelText } = render(<UserSignUp />);

    expect(getByText(/User SignUp/)).toBeInTheDocument();
    expect(getByLabelText(/Your Name/)).toBeInTheDocument();
    expect(getByLabelText(/Your Email/)).toBeInTheDocument();
    expect(getByLabelText(/Your Mobile No/)).toBeInTheDocument();
    expect(getByLabelText(/Your Password/)).toBeInTheDocument();
    expect(getByText(/SignUp/)).toBeInTheDocument();
    expect(getByText(/Already have an account!/)).toBeInTheDocument();
    expect(getByText(/login/)).toBeInTheDocument();
  });

  it('should navigate to the login page when clicking the login link', () => {
    const { getByText } = render(<UserSignUp />);

    const loginLink = getByText(/login/);
    fireEvent.click(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith('/userlogin');
  });

  describe('register function', () => {
    const mockUserGet = [
      { email: 'test@test.com', mobileNo: '1234567890' },
      { email: 'test2@test.com', mobileNo: '0987654321' },
    ];

    beforeEach(() => {
      axios.get.mockResolvedValue({ data: mockUserGet });
    });

    it('should display an alert if the mobile number is not 10 digits', () => {
      const { getByText, getByLabelText } = render(<UserSignUp />);
      const mobileNoInput = getByLabelText(/Your Mobile No/);

      fireEvent.change(mobileNoInput, { target: { value: '12345' } });
      fireEvent.click(getByText(/SignUp/));

      expect(window.alert).toHaveBeenCalledWith('Please Enter 10 Digit Mobile No');
    });

    it('should display an alert if the email is not in the right format', () => {
      const { getByText, getByLabelText } = render(<UserSignUp />);
      const emailInput = getByLabelText(/Your Email/);

      fireEvent.change(emailInput, { target: { value: 'test@test' } });
      fireEvent.click(getByText(/SignUp/));

      expect(window.alert).toHaveBeenCalledWith('Please Enter Email in right format');
    });

    it('should display an alert if the name contains non-alphabetic characters', () => {
      const { getByText, getByLabelText } = render(<UserSignUp />);
      const nameInput = getByLabelText(/Your Name/);

      fireEvent.change(nameInput, { target: { value: 'John123 Smith!' } });
      fireEvent.click(getByText(/SignUp/));

      expect(window.alert).toHaveBeenCalledWith('Please Enter only Alphabate in Name');
    });

    it('should display an alert if the password is too short or too long', () => {
      const { getByText, getByLabelText } = render(<UserSignUp />);
      const passwordInput = getByLabelText(/Your Password/);

      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(getByText(/SignUp/));

      expect(window.alert).toHaveBeenCalledWith('PassWord Should have Minimum character of 7 and Maximum of 13');

      fireEvent.change(passwordInput, { target: { value: 'waytoolongpassword' } });
      fireEvent.click(getByText(/SignUp/));

      expect(window.alert).toHaveBeenCalledWith('PassWord Should have Minimum character of 7 and Maximum of 13');
    });

    it('should display an alert if the password does not meet the specified requirements', () => {
      const { getByText, getByLabelText } = render(<UserSignUp />);
      const passwordInput = getByLabelText(/Your Password/);

      fireEvent.change(passwordInput, { target: { value: 'abcdefg' } });
      fireEvent.click(getByText(/SignUp/));

      expect(window.alert).toHaveBeenCalledWith('Password should contain at least one number and one special character');
    });


});

});