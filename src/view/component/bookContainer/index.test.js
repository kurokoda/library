import React from "react";
import renderer from "react-test-renderer";

import BooksContainer from ".";

const props = {
  buttonLabel: "Button Label",
  label: "Label",
  onBookButtonClick: () => {},
  onPageChange: () => {},
};

it("renders correctly", () => {
  const tree = renderer.create(<BooksContainer {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
