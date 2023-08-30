import { useState, useEffect } from "react";
import { Box, Stack, Grid } from "@mui/material"

const Guess = () => {

    const [ guessBox, setGuessBox ] = useState({}); // initial state shouldn't be an empty object but rather an initial guess from the API call - unless empty object as initial state is allowed, which then a conditional statement could be used (if guessBox state is {}, then do initial loading)
    const [ guessBoxArr, setGuessBoxArr ] = useState([]); //array of all the guesses - each guess # should correspond with guessBoxArr index + 1

    // have a function that generates the components for Word to Guess and response back word boxes
    const GuessWord = () => {
        return (
            <Stack direction="row" spacing={1}>
                <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
            </Stack>
        )
    }

    const ColorPalette = () => {
        return (
            <Grid>

            
                <Grid direction="row" spacing={1}>
                    <Box sx={{p: 2, border: '1px solid black', backgroundColor: 'green'}}>w</Box>
                    <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                    <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                    <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                    <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                </Grid>
                <Grid direction="column" spacing={1}>
                    <Box sx={{p: 2, border: '1px solid black', backgroundColor: 'yellow'}}>w</Box>
                    <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                    <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                    <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                    <Box sx={{p: 2, border: '1px solid black'}}>w</Box>
                </Grid>
            </Grid>
        )
    }

    return (
        <div>
            <h5>Guess #</h5>
            <h6>Word to Guess:<GuessWord/></h6>
            <div>What response did you get back?<GuessWord /><ColorPalette/></div>
        </div>
    )
}

export default Guess