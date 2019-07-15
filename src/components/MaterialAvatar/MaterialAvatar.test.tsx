import React from 'react';
import {
  render,
  cleanup,
} from "@testing-library/react";
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import { MaterialAvatar } from './MaterialAvatar';

describe('<MaterialAvatar />', () => {

  afterEach(cleanup);

  it("renders the component", () => {
    const { container } = render(<MaterialAvatar Name="Test" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
