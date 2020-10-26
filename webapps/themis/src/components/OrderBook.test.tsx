import { shallow } from "enzyme";
import React from "react";

import OrderBook from "./OrderBook";

describe("<OrderBook/>", () => {
  it("exists", () => {
    const wrapper = shallow(<OrderBook />);

    expect(wrapper.exists()).toEqual(true);
  });
});
