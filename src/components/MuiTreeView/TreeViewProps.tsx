export interface Tree {
  value: string;
  nodes?: Array<string | Tree>;
  id: string;
}

export interface Leaf { 
  value: string; 
  parent: Tree; 
  id: string; 
}


export interface MuiTreeViewProps {
  /**
   * The data to render as a tree view
   */
  tree: Tree[];
  /**
   * Callback function fired when a tree leaf is clicked.
   */
  onLeafClick?: (
    leaf: Leaf
  ) => void;
  /**
   * 
   */
  defaultCollapseIcon?: React.ReactNode;
  /**
   * 
   */
  defaultEndIcon?: React.ReactNode;
  /**
   * 
   */
  defaultExpandIcon?: React.ReactNode;
  /**
   * 
   */
  defaultParentIcon?: React.ReactNode;
}