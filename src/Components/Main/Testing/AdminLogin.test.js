import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import AdminLogin from "./AdminLogin";

jest.mock("axios");

describe("AdminLogin component", () => {
  it("renders the login form", () => {
    const { getByPlaceholderText, getByText } = render(<AdminLogin />);
    
    const emailInput = getByPlaceholderText(" Your Email / MobileNo");
    expect(emailInput).toBeInTheDocument();
    
    const passwordInput = getByPlaceholderText(" Your Password");
    expect(passwordInput).toBeInTheDocument();
    
    const loginButton = getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });
  
  it("submits the login form on button click", () => {
    const { getByPlaceholderText, getByText } = render(<AdminLogin />);
    axios.post.mockResolvedValueOnce({ data: { token: "abc123" } });
    
    const emailInput = getByPlaceholderText(" Your Email / MobileNo");
    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    
    const passwordInput = getByPlaceholderText(" Your Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    const loginButton = getByText("Login");
    fireEvent.click(loginButton);
    
    expect(axios.post).toHaveBeenCalledWith("/api/admin/login", {
      email: "admin@example.com",
      password: "password123",
    });
  });
});
