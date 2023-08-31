import { useState, useEffect, createContext, useContext } from "react";
import { Box, Stack, Grid } from "@mui/material"

const Guess = () => {

    const [ guessBox, setGuessBox ] = useState({}); // initial state shouldn't be an empty object but rather an initial guess from the API call - unless empty object as initial state is allowed, which then a conditional statement could be used (if guessBox state is {}, then do initial loading)
    const [ guessBoxArr, setGuessBoxArr ] = useState([]); //array of all the guesses - each guess # should correspond with guessBoxArr index + 1
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ selectedColor, setSelectedColor ] = useState('');

    // have a function that generates the components for Word to Guess and response back word boxes
    const GuessWord = ({ selectedIndex, selectedColor } : { selectedIndex: number, selectedColor: string}) => {
        return (
            <Grid container spacing={1}>
                {[0, 1, 2, 3, 4].map((index) => (
                    <Grid item xs={2} key={`transparent-${index}`}>
                        <Box
                            sx={{
                                m: 0.6,
                                height: 50,
                                width: 50,
                                backgroundColor: 
                                    index === selectedIndex ? selectedColor : 'transparent',
                                border: '0.5px solid lightgrey',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >a</Box>
                    </Grid>
                ))}
            </Grid>
        )
    }



    const colorChange = ({ index, color } : { index : number, color: string}) => {
        setSelectedIndex(index);
        setSelectedColor(color);
    }

    // const handleBoxClick = (index: number) => {
    //     colorChange(index)
    // }

    // Reusable component for a colored row
    const ColoredRow = ({ color }: { color: string}) => (
        <Grid container spacing={1}>
            {[0, 1, 2, 3, 4].map((index) => (
                <Grid item xs={2} key={`${color}-${index}`}>
                    <Box
                        sx={{
                            m: 0.6,
                            height: 50,
                            width: 50,
                            backgroundColor: color,
                            border: '0.5px solid lightgrey'
                        }}
                        onClick={() => colorChange}
                    />
                </Grid>
            ))}
        </Grid>
    );


    return (
        <div>
            <h3>Guess #</h3>
            <div>Word to Guess:<GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor}/></div>
            <div>What response did you get back?
                <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor}/>
            </div>
            <div>
                {/* <ColoredRow color="transparent" /> */}
                <ColoredRow color="green" />
                <ColoredRow color="yellow" />
                <ColoredRow color="white" />
            </div>
            <button>Submit</button>
        </div>
    )
}

export default Guess