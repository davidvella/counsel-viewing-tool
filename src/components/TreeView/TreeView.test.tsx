import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "@testing-library/react";
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import TreeNode from '../TreeNode/TreeNode';
import TreeView from './TreeView';

describe('<TreeView />', () => {

  afterEach(cleanup);

  describe('onNodeToggle', () => {
    it('should be called when a parent node is clicked', () => {
      const handleNodeToggle = jest.fn();

      const { container } = render(<TreeView onNodeToggle={handleNodeToggle}>
        <TreeNode nodeId="1">
          <TreeNode nodeId="2" />
        </TreeNode>
      </TreeView>);

      fireEvent.click(container.querySelectorAll('[role="treeitem"] > *')[0]);

      expect(handleNodeToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('(TreeView) should have the role `tree`', () => {
      const { container } = render(<TreeView />);
      expect(container.querySelectorAll('[role="tree"]').length > 0).toEqual(true);
    });
  });
});
