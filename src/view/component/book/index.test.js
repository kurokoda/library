import React from "react";
import renderer from "react-test-renderer";

import Book from ".";

const props = {
  book: {
    author_name: "John Doe",
    title: "Book Title",
  },
  label: "Label",
  onButtonClick: () => {},
};

it("renders correctly", () => {
  const tree = renderer.create(<Book {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
