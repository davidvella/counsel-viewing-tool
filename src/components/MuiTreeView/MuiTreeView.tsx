import React from 'react';
import { MuiTreeViewProps, Leaf } from './TreeViewProps';
import TreeNode from '../TreeNode/TreeNode';
import TreeView from '../TreeView/TreeView';
import memoize from 'fast-memoize';

/**
 * A React tree view for material-ui.
 */
export default class MuiTreeView extends React.Component<MuiTreeViewProps, any> {

    createMemoizeTree = memoize(
        (tree) => (tree),
        {
            serializer: ([tree]) =>
                `${JSON.stringify(tree)}`,
        }
    );


    handleLeafClick = (leaf: Leaf) => {
        if (this.props.onLeafClick) {
            this.props.onLeafClick(leaf);
        }
    };

    isLeaf(node: any) {
        return typeof node === 'string' || !node.nodes || !node.nodes.length;
    }

    getNodeValue(node: any) {
        return typeof node === 'string' ? node : node.value;
    }

    getNodeId(node: any) {
        if (typeof node === 'object') {
            return node.id;
        }
    }

    renderNode = ({ node, parent, depth = 0 }: { node: any, parent: any, depth: number }) => {
        const value = this.getNodeValue(node);
        const id = this.getNodeId(node);
        const isLeaf = this.isLeaf(node);

        if (isLeaf) {
            return (
                <TreeNode nodeId={id} label={value} onClick={() => this.handleLeafClick({ ...node, value, parent, id })} key={typeof node.id !== 'undefined' ? node.id : node.value} />
            );
        }

        return (
            <TreeNode nodeId={id} label={value} key={typeof node.id !== 'undefined' ? node.id : node.value}>
                {node.nodes.map((l: any) =>
                    this.renderNode({
                        node: l,
                        parent: node,
                        depth: depth + 1
                    })
                )}
            </TreeNode>
        );
    };

    /**
     *  Default React component render method
     */
    public render() {
        const { tree,
            defaultCollapseIcon,
            defaultEndIcon,
            defaultExpandIcon,
            defaultParentIcon } = this.props;
        const graph = this.createMemoizeTree(tree);

        return (
            <TreeView defaultCollapseIcon={defaultCollapseIcon} defaultExpandIcon={defaultExpandIcon} defaultEndIcon={defaultEndIcon} defaultParentIcon={defaultParentIcon}>
                {
                    graph.map((node: any) =>
                        this.renderNode({ node, parent: null, depth: 0 })
                    )
                }
            </TreeView>
        );
    }

}