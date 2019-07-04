import React from 'react';
import {
  render
} from "@testing-library/react";
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect";
import MuiTreeView from "./MuiTreeView";
import { Tree } from "./TreeViewProps";


const testTree: Tree[] = [
  {
    value: 'Parent A',
    nodes: [{ value: 'Child A', id: "2" }, { value: 'Child B', id: "3" }],
    id: "1"
  },
  {
    value: 'Parent B',
    id: "4",
    nodes: [
      {
        id: "5",
        value: 'Child C',
      },
      {
        id: "6",
        value: 'Parent C',
        nodes: [
          { value: 'Child D', id: "7" },
          { value: 'Child E', id: "8" },
          {
            value: 'Child F', id: "9", nodes: [
              {
                id: "10",
                value: 'Child C',
                nodes: [
                  {
                    id: "11",
                    value: 'Child C',
                  }
                ]
              }
            ]
          },
        ],
      },
    ],
  },
];

describe('<MuiTreeView /> spec', () => {

  it("renders the component", () => {
    const { container } = render(<MuiTreeView tree={testTree} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('assert there are 11 leafs', () => {
    expect(document.querySelectorAll('.MuiTypography-body1').length).toBe(11)
  })

  it('assert the first leaf to be Parent A', () => {
    const leaf = document.querySelector('.MuiTypography-body1:first-child')
    expect(leaf).toBeTruthy();
    expect(leaf!.innerHTML).toBe('Parent A')
   });

});

