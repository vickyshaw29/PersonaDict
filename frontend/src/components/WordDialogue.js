import { AppBar, Box, Button, Dialog, Divider, Grid, IconButton, List, ListItem, ListItemText, makeStyles, Paper, Slide, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import React, { Fragment } from 'react'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flexGrow: 1,
        fontSize:"2rem",
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(2),
            width: theme.spacing(200),
            height: theme.spacing("2rem"),
        },
        
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const WordDialogue = ({ open, wordpopClose, val, ind, showWord }) => {
    const [temp, settemp] = React.useState(open)
    const classes = useStyles();

    // console.log(val.i)
    return (
        <div>
            <Dialog fullScreen open={open} onClose={() => settemp(wordpopClose(!open))} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h5" noWrap>
                            {showWord.map((val,i)=>(
                                ind===i?
                                <>
                                    {val.text}
                                </>
                                :""
                            ))}
						</Typography>
                        <Button disableRipple  autoFocus color="inherit" onClick={() => settemp(wordpopClose(!open))} style={{backgroundColor:"transparent"}}>
                            <CloseIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* comparing the index of props with the newly mapped index */}
                {showWord.map((val, i) => (
                    ind === i ?
                        <>
                            <div className={classes.root}>
                                <Paper elevation={4} >
                                    {/* <Typography key={`${ind}`}>{val.definitions[0]}</Typography> */}
                                    <Fragment  >
                                        
                                        <Typography variant="h6" style={{ marginLeft: "1.2em", fontSize: "1.3em" }}>
                                            <Box fontStyle="italic" fontWeight="bold">{`${val.lexicalCategory[0][0]}`}</Box>
                                        </Typography>
                                        <Typography style={{ marginLeft: "1.3em",fontSize:"1.2em" }}>
                                            {`${val.definitions[0][0]}`}
                                        </Typography>
                                        <Typography style={{ marginLeft: "1.2em", fontSize: "1.3em" }}>
                                            <Box fontStyle="italic" fontWeight="bold">{`${val.lexicalCategory[0][1] ? val.lexicalCategory[0][1] : ""}`}</Box>
                                        </Typography>
                                        <Typography style={{ marginLeft: "1.3em",fontSize:"1.2em" }}>
                                            {`${val.definitions[0][1] ? val.definitions[0][1] : ""}`}
                                        </Typography>
                                    </Fragment>
                                </Paper>
                            </div>




                        </>
                        : ""
                ))}



            </Dialog>
        </div>
    )
}

export default WordDialogue
