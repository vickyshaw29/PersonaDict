import { AppBar, fade, InputAdornment, InputBase, makeStyles, TextField, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Words from './Words'
import AddWord from './AddWord';
const useStyles = makeStyles(theme => ({
	toolbarMargin: {
		...theme.mixins.toolbar
	},
	title: {
		flexGrow: 1,
		fontSize:"2rem",
		[theme.breakpoints.down('sm')]: {
			fontSize:"1.5rem"
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
		[theme.breakpoints.down('sm')]: {
			marginLeft: theme.spacing(1),
			width: '9rem',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '20ch',
		},
		
	},
}))
const Header = (props) => {
	const classes = useStyles()
	const [Term, setTerm] = useState("")
	function ElevationScroll(props) {
		const { children } = props;
		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
		});

		return React.cloneElement(children, {
			elevation: trigger ? 4 : 0,
		});
	}
	return (
		<Fragment>
			<AppBar>
				<Toolbar>
					<Typography className={classes.title} variant="h5" noWrap>
						Vocabulary
						</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							value={Term}
							onChange={e=>setTerm(e.target.value)}
						/>
					</div>
				</Toolbar>
			</AppBar>

			<div className={classes.toolbarMargin} />
			<Words search={Term}/>
			
		</Fragment>
	)
}

export default Header
