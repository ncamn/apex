import React from "react";
import NavBar from "./NavBar";
import { shallow } from "enzyme";

describe("<NavBar/>", () => {
  it("exists", () => {
    const wrapper = shallow(<NavBar />);

    expect(wrapper.exists()).toEqual(true);
  });
});
