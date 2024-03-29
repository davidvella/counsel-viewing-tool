import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import warning from 'warning';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import TreeViewContext from '../TreeView/TreeViewContext';

const styles = {
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    '&:focus > $content': {
      outline: 'auto 1px',
    },
  },
  /* Styles applied to the `role="group"` element. */
  group: {
    margin: 0,
    padding: 0,
    marginLeft: 26,
  },
  /* Styles applied to the tree node content. */
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  /* Styles applied to the tree node icon and collapse/expand icon. */
  iconContainer: {
    marginRight: 2,
    width: 24,
    minWidth: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  /* Styles applied to the label element. */
  label: {},
};

const isPrintableCharacter = str => {
  return str && str.length === 1 && str.match(/\S/);
};

const TreeNode = React.forwardRef(function TreeNode(props, ref) {
  const {
    classes,
    className,
    children,
    collapseIcon,
    expandIcon,
    icon,
    nodeId,
    label,
    onClick,
    onFocus,
    onKeyDown,
    ...other
  } = props;
  const {
    icons,
    toggle,
    isExpanded,
    isFocusable,
    focus,
    focusNextNode,
    focusPreviousNode,
    focusFirstNode,
    focusLastNode,
    isFocused,
    handleLeftArrow,
    expandAllSiblings,
    setFocusByFirstCharacter,
    handleNodeMap,
    handleFirstChars,
  } = React.useContext(TreeViewContext);

  const nodeRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, ref);

  let stateIcon = null;

  const expandable = Boolean(children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const focusable = isFocusable ? isFocusable(nodeId) : false;

  if (icons.defaultExpandIcon && expandable && !expanded) {
    stateIcon = icons.defaultExpandIcon;
  }
  if (icons.defaultCollapseIcon && expandable && expanded) {
    stateIcon = icons.defaultCollapseIcon;
  }

  if (expandIcon && expandable && !expanded) {
    stateIcon = expandIcon;
  }

  if (collapseIcon && expandable && expanded) {
    stateIcon = collapseIcon;
  }

  const stateIconsProvided = icons && (icons.defaultCollapseIcon || icons.defaultExpandIcon);

  let startAdornment = null;

  if (expandable) {
    if (icons.defaultParentIcon || icon) {
      startAdornment = icon || icons.defaultParentIcon;
    }
  } else if (icons.defaultEndIcon || icon) {
    startAdornment = icon || icons.defaultEndIcon;
  }

  const handleClick = event => {
    // only process click events that directly happened on this tree item
    if (!contentRef.current.contains(event.target)) {
      return;
    }

    if (!focused) {
      focus(nodeId);
    }

    if (expandable) {
      toggle(nodeId);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = event => {
    let flag = false;
    const key = event.key;

    const printableCharacter = () => {
      if (key === '*') {
        expandAllSiblings(nodeId);
        flag = true;
      } else if (isPrintableCharacter(key)) {
        setFocusByFirstCharacter(nodeId, key);
        flag = true;
      }
    };

    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    if (event.shift) {
      if (key === ' ' || key === 'Enter') {
        event.stopPropagation();
      } else if (isPrintableCharacter(key)) {
        printableCharacter();
      }
    } else {
      switch (key) {
        case 'Enter':
        case ' ':
          if (nodeRef.current === event.currentTarget && expandable) {
            toggle();
            flag = true;
          }
          event.stopPropagation();
          break;
        case 'ArrowDown':
          focusNextNode(nodeId);
          flag = true;
          break;
        case 'ArrowUp':
          focusPreviousNode(nodeId);
          flag = true;
          break;
        case 'ArrowRight':
          if (expandable) {
            if (expanded) {
              focusNextNode(nodeId);
            } else {
              toggle();
            }
          }
          flag = true;
          break;
        case 'ArrowLeft':
          handleLeftArrow(nodeId, event);
          break;
        case 'Home':
          focusFirstNode();
          flag = true;
          break;
        case 'End':
          focusLastNode();
          flag = true;
          break;
        default:
          if (isPrintableCharacter(key)) {
            printableCharacter();
          }
      }
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleFocus = event => {
    if (!focused && focusable) {
      focus(nodeId);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  React.useEffect(() => {
    const childIds = React.Children.map(children, child => child.props.nodeId);
    if (handleNodeMap) {
      handleNodeMap(nodeId, childIds);
    }
  }, [children, nodeId, handleNodeMap]);

  React.useEffect(() => {
    if (handleFirstChars && label) {
      handleFirstChars(nodeId, label.substring(0, 1).toLowerCase());
    }
  }, [handleFirstChars, nodeId, label]);

  if (focused) {
    nodeRef.current.focus();
  }

  if (!handleFirstChars || !handleNodeMap || !isExpanded || !isFocused || !isFocusable) {
    warning(false, 'Material-UI: A `TreeNode` must be rendered inside a `TreeView`.');
    return null;
  }

  return (
    <li
      className={clsx(classes.root, className)}
      role="treeitem"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      aria-expanded={expandable ? expanded : null}
      ref={handleRef}
      tabIndex={focusable ? 0 : -1}
      {...other}
    >
      <div className={classes.content} ref={contentRef}>
        {stateIconsProvided ? <div className={classes.iconContainer}>{stateIcon}</div> : null}
        {startAdornment ? <div className={classes.iconContainer}>{startAdornment}</div> : null}
        <Typography className={classes.label}>{label}</Typography>
      </div>
      {children && (
        <Collapse className={classes.group} in={expanded} component="ul" role="group">
          {children}
        </Collapse>
      )}
    </li>
  );
});

TreeNode.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon used to collapse the node.
   */
  collapseIcon: PropTypes.node,
  /**
   * The icon used to expand the node.
   */
  expandIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,
  /**
   * The tree node label.
   */
  label: PropTypes.node,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
};

export default withStyles(styles)(TreeNode);
