import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import AddWord from './AddWord'
import WordDialogue from './WordDialogue'
// import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "0.8em",
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(200),
            height: theme.spacing("1rem"),
        },
        padding: "1rem 0",
        cursor:"pointer"
    },
}))

function Words({ search }) {
    console.log(search, "from words which is passed from header.js")
    // 
    const [index, setindex] = useState("")
    // 
    const [open, setOpen] = React.useState(false);
    const [showWord, setshowWord] = useState([])
    const [check, setcheck] = useState(false)
    const classes = useStyles();
    useEffect(() => {
        console.log('running useeffect from the words.js')
        // console.log(flag,"flag from the words.js")
        const fetchData = async () => {
            const data = await fetch(`http://localhost:8000/api/word/?search=${search}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                }
            })
            const response = await data.json()
            setshowWord(response)
        }
        fetchData()

    }, [search, check])
    return (
        <Fragment>
            {/* <div className={classes.root}> */}
                {showWord.map((val, i) => {
                    return (
                        <>
                        {/* sending setindex in the worddialogue to to compare  */}
                        
                        <Paper elevation={1} key={i} onClick={(e) => { setOpen(true);setindex(i) }} className={classes.root}>
                            {/* {console.log(index)} */}
                            <Fragment  >
                            <Grid item xs={60}>
                                <Typography variant="h4" style={{ marginLeft: "0.7em", marginTop: "6px", lineHeight: "" }} >
                                    {val.text}
                                </Typography>
                                <Typography variant="h6" style={{ marginLeft: "1.2em", fontSize: "1.3em" }}>
                                    <Box fontStyle="italic" fontWeight="bold">{`${val.lexicalCategory[0][0]}`}</Box>
                                </Typography>
                                <Typography style={{ marginLeft: "1.3em",fontSize:"1.2em" }}>
                                    {`${val.definitions[0][0]}`}
                                </Typography>
                                <Typography style={{ marginLeft: "1.2em",marginTop:"1.5em", fontSize: "1.3em" }}>
                                    <Box fontStyle="italic" fontWeight="bold">{`${val.lexicalCategory[0][1] ? val.lexicalCategory[0][1] : ""}`}</Box>
                                </Typography>
                                <Typography style={{ marginLeft: "1.3em",fontSize:"1.2em" }}>
                                    {`${val.definitions[0][1] ? val.definitions[0][1] : ""}`}
                                </Typography>
                                </Grid>
                            </Fragment>
                        </Paper>
                        <WordDialogue open={open} wordpopClose={open => setOpen(open)} val={val,i} ind={index} showWord={showWord}/>
                        </>
                    )

                })}

            {/* </div> */}
            {/* handling state tunneling from parent to child in relation with child to parent */}
            <AddWord check={check} wordProp={check => setcheck(check)} />
        </Fragment>
    )
}

export default Words
