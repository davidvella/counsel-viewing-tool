import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { WithStyles } from '@material-ui/styles/withStyles';
import Divider from '@material-ui/core/Divider';

const styles = (theme: any) => createStyles({
  container: {
    height: "40px",
    "line-height": "40px"
  },
  label: {
    float: "left",
    "padding-right": "5px",
    "line-height": "40px"
  },
  divider: {
    "margin-bottom": "10px",
    "padding-top": "19px",
    "line-height": "40px"
  }
});

export interface ITextDividerProps extends WithStyles<typeof styles> {
  /**
   * The Text to be displayed.
   */
  label?: React.ReactNode;
  /**
   * If true, the divider will have a lighter color.
   */
  light?: boolean;
}

/*************************************************************************************
 * This is an extension to the material design divider which allows text to be added.
 *************************************************************************************/
export const TextDivider = withStyles(styles)(
  class extends React.Component<ITextDividerProps, any> {

    /**
      * Default React component render method
      */
    public render() {
      const { classes } = this.props;

      return (
        <div className={classes.container}>
          <Typography variant="body2" className={classes.label}>
            {
              this.props.label
            }
          </Typography>
          <div className={classes.divider}>
            <Divider light={this.props.light} />
          </div>
        </div>
      );
    }
  }
);

