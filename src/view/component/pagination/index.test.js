import React from "react";
import renderer from "react-test-renderer";

import Pagination from ".";

const props = {
  count: 0,
  countPerPage: 100,
  onPageChange: () => {},
};

it("renders correctly", () => {
  const tree = renderer.create(<Pagination {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
