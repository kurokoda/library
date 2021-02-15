import React from "react";
import renderer from "react-test-renderer";

import Search from ".";

const props = {
  onClear: () => {},
  onSubmit: () => {},
};

it("renders correctly", () => {
  const tree = renderer.create(<Search {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
