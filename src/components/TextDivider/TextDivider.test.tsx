import React from 'react';
import {
    render,
    cleanup,
} from "@testing-library/react";
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import { TextDivider } from './TextDivider';

describe('<Text Divider />', () => {

    afterEach(cleanup);

    it("renders the component", () => {
        const { container } = render(<TextDivider label="Flags" />);
        expect(container.firstChild).toMatchSnapshot();
    });
});