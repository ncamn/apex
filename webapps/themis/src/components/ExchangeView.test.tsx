import React from "react";
import ExchangeView from "./ExchangeView";
import { shallow } from "enzyme";

describe("<ExchangeView/>", () => {
  it("exists", () => {
    const wrapper = shallow(<ExchangeView />);

    expect(wrapper.exists()).toEqual(true);
  });
});
