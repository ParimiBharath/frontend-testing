import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import AddProducts from "./AddProducts";

describe("AddProducts Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AddProducts />);
  });

  it("should render AddProducts component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should set the product ID on change", () => {
    const idInput = wrapper.find("#prodid");
    idInput.simulate("change", { target: { value: "123" } });
    expect(wrapper.state("Id")).toEqual("123");
  });

  it("should set the product name on change", () => {
    const nameInput = wrapper.find("#prodname");
    nameInput.simulate("change", { target: { value: "Test Product" } });
    expect(wrapper.state("productName")).toEqual("Test Product");
  });

  it("should set the product price on change", () => {
    const priceInput = wrapper.find("#prodpri");
    priceInput.simulate("change", { target: { value: 10 } });
    expect(wrapper.state("productPric")).toEqual(10);
  });

  it("should set the product quantity on change", () => {
    const quantityInput = wrapper.find("#prodquan");
    quantityInput.simulate("change", { target: { value: 5 } });
    expect(wrapper.state("prodQuantity")).toEqual(5);
  });

  it("should set the product category on change", () => {
    const categoryInput = wrapper.find("#category");
    categoryInput.simulate("change", { target: { value: "Test Category" } });
    expect(wrapper.state("category")).toEqual("Test Category");
  });

  it("should set the product description on change", () => {
    const descriptionInput = wrapper.find("#prodDes");
    descriptionInput.simulate("change", { target: { value: "Test Description" } });
    expect(wrapper.state("description")).toEqual("Test Description");
  });

  it("should set the product image URL on change", () => {
    const imageInput = wrapper.find("#image");
    imageInput.simulate("change", { target: { value: "http://test-image.com" } });
    expect(wrapper.state("image")).toEqual("http://test-image.com");
  });

  it("should make API call when 'Add Product' button is clicked", () => {
    const axiosMock = jest.spyOn(axios, "post");
    const addButton = wrapper.find(".addcart");
    addButton.simulate("click", {
      preventDefault: () => {},
    });
    expect(axiosMock).toHaveBeenCalled();
  });
});
