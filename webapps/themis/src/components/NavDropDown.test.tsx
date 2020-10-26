import React from "react";
import NavDropDown from "./NavDropDown";
import { shallow } from "enzyme";

describe("<NavDropDown/>", () => {
  it("exists", () => {
    const wrapper = shallow(<NavDropDown name="test" items={"oui"} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("change state on mouse over", () => {
    const wrapper = shallow(<NavDropDown name="test" items={"oui"} />);
    wrapper.simulate("mouseOver");

    expect(wrapper.state().hover).toEqual(true);
  });

  it("change state on mouse out", () => {
    const wrapper = shallow(<NavDropDown />);
    wrapper.simulate("mouseOut");

    expect(wrapper.state("hover")).toEqual(false);
  });
});
