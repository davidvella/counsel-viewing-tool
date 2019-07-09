import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/styles/createStyles';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { WithStyles } from '@material-ui/styles/withStyles';
import { Avatar } from '@material-ui/core';
var initials = require("initials");

const styles = (theme: any) => createStyles({
  avatar: {
    float: "left",
    height: "24px",
    width: "24px",
    fontSize: '12px'
  },
  text: {
    fontSize: '12px',
    lineHeight: "24px",
    marginLeft: "36px"
  }
});

export interface IMaterialAvatarProps extends WithStyles<typeof styles> {
  /**
   * The Text to be displayed.
   */
  Name: String;
}

/*************************************************************************************
 * This is an extension to the material design avatar which allows text to be added.
 *************************************************************************************/
export const MaterialAvatar = withStyles(styles)(
  class extends React.Component<IMaterialAvatarProps, any> {

    /**
      * Default React component render method
      */
    public render() {
      const { classes } = this.props;

      return (
        <div>
          <div className={classes.avatar}>
            <Avatar className={classes.avatar}>{initials(this.props.Name)}</Avatar>
          </div>
          <Typography className={classes.text} color="textPrimary" >
            {this.props.Name}
          </Typography>
        </div>
      );
    }
  }
);

