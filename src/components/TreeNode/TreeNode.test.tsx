import React from 'react';
import {
  render, cleanup
} from "@testing-library/react";
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import TreeNode from './TreeNode';
import TreeView from '../TreeView/TreeView';

describe('<TreeNode />', () => {
  const defaultProps = {
    nodeId: 'node1',
  };

  afterEach(cleanup);

  describe('Accessibility', () => {
    it('should have the role `treeitem`', () => {
      const dom = render(<TreeView>
        <TreeNode nodeId="test" label="test" />
      </TreeView>);

      expect(dom.getAllByRole('treeitem').length > 0).toEqual(true);
    });

    it('should add the role `group` to a `ul` component if it has children', () => {
      const { container } = render(<TreeView>
        <TreeNode nodeId="test" label="test">
          <TreeNode nodeId="test2" label="test" />
        </TreeNode>
      </TreeView>);

      expect(container.querySelectorAll('ul[role="group"]').length > 0).toEqual(true);
    });

    it('should have the attribute `aria-expanded=false` if collapsed', () => {
      const { container } = render(<TreeView>
        <TreeNode nodeId="test" label="test">
          <TreeNode nodeId="test2" label="test" />
        </TreeNode>
      </TreeView>);

      expect(container.querySelectorAll('[aria-expanded=false]').length > 0).toEqual(true);
    });

    it('should have the attribute `aria-expanded=true` if expanded', () => {
      const { container } = render(<TreeView expanded={['test']}>
        <TreeNode nodeId="test" label="test">
          <TreeNode nodeId="test2" label="test" />
        </TreeNode>
      </TreeView>);
      expect(container.querySelectorAll('[aria-expanded=true]').length > 0).toEqual(true);
    });

    it('should not have the attribute `aria-expanded` if no children are present', () => {

      const { container } = render(<TreeView>
        <TreeNode nodeId="test" label="test" />
      </TreeView>);

      expect(container.querySelectorAll('[aria-expanded]').length > 0).toEqual(false);
    });
  });
});
