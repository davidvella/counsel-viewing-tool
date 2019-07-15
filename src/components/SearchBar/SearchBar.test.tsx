import React from 'react';
import {
    render,
    cleanup,
    fireEvent,
} from "@testing-library/react";
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import { SearchBar } from './SearchBar';

describe('<SearchBar />', () => {

    afterEach(cleanup);

    it("renders the component", () => {
        const { container } = render(<SearchBar
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            placeholder={"Search Case"}            
        />);
        expect(container.firstChild).toMatchSnapshot();
    });

    
    test('On Change is called', () => {
        const handleNodeToggle = jest.fn();
        const utils = render(<SearchBar
            onChange={handleNodeToggle}
            onRequestSearch={() => console.log('onRequestSearch')}
            placeholder={"Search Case"}            
        />)
        const input = utils.container.querySelectorAll('input')[0];
        fireEvent.change(input, { target: { value: '23' } });
        expect(handleNodeToggle).toHaveBeenCalledTimes(1);
    })
});