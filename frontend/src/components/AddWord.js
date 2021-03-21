import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, makeStyles, TextField } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import Words from './Words';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        right: '40px',
        top: '500px',
        transition: 'all 0.2s ease-in 0s',//this is the key attribute
        zIndex: 9999,
        cursor: 'pointer',
        margin: theme.spacing(1),
    },
}));

const AddWord = ({ check, wordProp }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [floatingword, setfloatingword] = React.useState("")
    const [temp, settemp] = useState(check)
    const [error, seterror] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const postHandler = async () => {
        settemp(check)
        const data = await fetch(`http://localhost:8000/api/word`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                word: floatingword
            }
        })
        const response = await data.json()
        if (response.error) {
            seterror('please enter a valid word')
            return false
        }
        console.log(response, 'response from the addword')
        setOpen(false)
        settemp(wordProp(!check))
    }
    const handleChange = () => {
        seterror("")
    }
    return (
        <>
            {/* <Alert severity="error" style={{ display: error ? "" : 'none' }}/> */}
            <div className={classes.root}>
                <Fab size="large" color="primary" aria-label="add" onClick={handleClickOpen}  >
                    <AddIcon />
                </Fab>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"  >
                    <DialogTitle id="form-dialog-title">Add a new word</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: "#E30425" }}>
                            {error&&error}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Add word"
                            type="email"
                            fullWidth
                            onChange={(e) => {setfloatingword(e.target.value);seterror("")}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
          </Button>
                        <Button color="primary" onClick={postHandler}>
                            Add
          </Button>
                    </DialogActions>
                </Dialog>
                {/* <Words flag={temp}/> */}
            </div>
        </>
    )
}

export default AddWord
