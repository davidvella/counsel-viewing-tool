import React, { Component, FocusEventHandler } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import { WithStyles } from '@material-ui/styles/withStyles';
import classNames from 'classnames';

const styles = {
    root: {
        height: 48,
        display: 'flex',
        justifyContent: 'space-between'
    },
    iconButton: {
        transform: 'scale(1, 1)',
        transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
    },
    iconButtonHidden: {
        transform: 'scale(0, 0)',
        '& > $icon': {
            opacity: 0
        }
    },
    iconButtonDisabled: {
        opacity: 0.38
    },
    searchIconButton: {
        marginRight: -48
    },
    icon: {
        opacity: 0.54,
        transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
    },
    input: {
        width: '100%',
        "input[type=textbox]::-ms-clear" : "display: none",
        "input[type=textbox]::-ms-reveal": "display: none;",
        "input[type=textbox]::-webkit-search-results-decoration": "display: none;"
    },
    searchContainer: {
        margin: 'auto 16px',
        width: 'calc(100% - 48px - 32px)' // 48px button + 32px margin
    }
}

export interface ISearchBarProps extends WithStyles<typeof styles> {
    /**
     * Whether to clear search on escape.
     */
    cancelOnEscape?: boolean;
    /**
     * Custom top-level class.
     */
    className?: string;
    /**
     * Override the close icon.
     */
    closeIcon?: any;
    /**
     * Disables text field.
     */
    disabled?: boolean;
    /**
     * Fired when the search is cancelled.
     */
    onCancelSearch?(): void;
    /**
     * Fired when the text value changes.
     */
    onChange?(query: string): void;
    /**
     * Fired when the search icon is clicked.
     */
    onRequestSearch?(value: any): void;
    /**
     * Sets placeholder for the embedded text field.
     */
    placeholder?: string;
    /**
     * Override the search icon.
     */
    searchIcon?: any;
    /**
     * Override the inline-styles of the root element.
     */
    style?: object;
    /**
     * The value of the text field.
     */
    value?: string;

    onBlur?: FocusEventHandler;

    onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;

    onFocus?: FocusEventHandler;
}


/**
 * Material design search bar
 * @see [Search patterns](https://material.io/guidelines/patterns/search.html)
 */
export const SearchBar = withStyles(styles)(
    class extends Component<ISearchBarProps, any>{

        constructor(props: any) {
            super(props)
            this.state = {
                focus: false,
                value: this.props.value,
                active: false
            }
        }

        /**
         * Lifecycle hook when component did update after state or property changes
         * @param nextProps
         */
        public componentWillReceiveProps(nextProps: any): void {
            if (this.props.value !== nextProps.value) {
                this.setState({ ...this.state, value: nextProps.value })
            }
        }

        handleFocus = (e: any) => {
            this.setState({ focus: true });
            if (this.props.onFocus) {
                this.props.onFocus(e);
            }
        }

        handleBlur = (e: any) => {
            this.setState({ focus: false });
            if (this.state.value.trim().length === 0) {
                this.setState({ value: '' });
            }
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        }

        handleInput = (e: any) => {
            this.setState({ value: e.target.value });
            if (this.props.onChange) {
                this.props.onChange(e.target.value);
            }
        }

        handleCancel = () => {
            this.setState({ active: false, value: '' })
            if (this.props.onCancelSearch) {
                this.props.onCancelSearch();
            }
        }

        handleKeyUp = (e: any) => {
            if (e.charCode === 13 || e.key === 'Enter') {
                this.handleRequestSearch();
            } else if (this.props.cancelOnEscape && (e.charCode === 27 || e.key === 'Escape')) {
                this.handleCancel();
            }
            if (this.props.onKeyUp) {
                this.props.onKeyUp(e);
            }
        }

        handleRequestSearch = () => {
            if (this.props.onRequestSearch) {
                this.props.onRequestSearch(this.state.value);
            }
        }

        public static defaultProps : Partial<ISearchBarProps> = {
            className: '',
            closeIcon: <ClearIcon style={{ color: grey[900] }} />,
            disabled: false,
            placeholder: 'Search',
            searchIcon: <SearchIcon style={{ color: grey[900] }} />,
            value: ''
        };

        public render() {
            const { value } = this.state;
            const {
                cancelOnEscape,
                className,
                classes,
                closeIcon,
                disabled,
                onCancelSearch,
                onRequestSearch,
                searchIcon,
                style,
                ...inputProps
            } = this.props;

            return (
                <Paper
                    className={classNames(classes.root, className)}
                    style={style}
                >
                    <div className={classes.searchContainer}>
                        <Input
                            {...inputProps}
                            onBlur={this.handleBlur}
                            value={value}
                            onChange={this.handleInput}
                            onKeyUp={this.handleKeyUp}
                            onFocus={this.handleFocus}
                            fullWidth
                            className={classes.input}
                            disableUnderline
                            disabled={disabled}
                        />
                    </div>
                    <IconButton
                        onClick={this.handleRequestSearch}
                        classes={{
                            root: classNames(classes.iconButton, classes.searchIconButton, {
                                [classes.iconButtonHidden]: value !== ''
                            }),
                            disabled: classes.iconButtonDisabled
                        }}
                        disabled={disabled}
                    >
                        {React.cloneElement(searchIcon, {
                            classes: { root: classes.icon }
                        })}
                    </IconButton>
                    <IconButton
                        onClick={this.handleCancel}
                        classes={{
                            root: classNames(classes.iconButton, {
                                [classes.iconButtonHidden]: value === ''
                            }),
                            disabled: classes.iconButtonDisabled
                        }}
                        disabled={disabled}
                    >
                        {React.cloneElement(closeIcon, {
                            classes: { root: classes.icon }
                        })}
                    </IconButton>
                </Paper>
            )
        }
    });