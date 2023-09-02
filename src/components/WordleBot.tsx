// import Layout from "./Layout";
import { useState, useEffect } from 'react';
import { Box, Grid, CircularProgress } from "@mui/material"
import { fetchWordleResult, WordleRequestItem } from "../api/api";

const WordleBot = () => {

    // circlularPro at initial load
    // render the following components:
        // "Guess # --" <-- Typography
        // "Word to Guess:" <-- Typography + 5 boxes that renders the return value, one character at a time, from initial load, then subsequently from WordleResponse
        // "What response did you get back?" <-- Typography + 4 rows of 5 boxes, where the first row should be the same as "Word to Guess" and the following rows being different colors which the user can choose from; when the user clicks a color, the corresponding character above it should have its box turn into that same color
        // Submit button - should grab properties of WordleRequestItem within WordleRequest array; if boxes are not all green at submission, another set of "Guess # --" and following components should be added to the page
        // an extra div to render the error statement if any or a "Yay! All Done" message if all green boxes - create another file for error handling if API doesn't already handle it

    const [ wordRequest, setwordRequest ] = useState<WordleRequestItem>(); // initial state shouldn't be an empty object but rather an initial guess from the API call - unless empty object as initial state is allowed, which then a conditional statement could be used (if guessBox state is {}, then do initial loading)
    // const [ guessBox, setGuessBox ] = useState<typeof guess>();
    // const [ guessBoxArr, setGuessBoxArr ] = useState<typeof guess[]>([]); //array of all the guesses - each guess # should correspond with guessBoxArr index + 1
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ selectedColor, setSelectedColor ] = useState('');
    // add a Guess# state and incorporate into GuessWord component to avoid all boxes of the same index turning into the same color.. or utilize key? -> props.key === blah blah ? blah blah : blah blah (for backgroundColor in GuessWord)
    const [ isLoading, setIsLoading ] = useState(true);
    const [ guessWord, setGuessWord ] = useState('');
    const [ count, setCount ] = useState(1);
    // const [ showSecondGrid, setShowSecondGrid ] = useState(true);
    const [ clue, setClue ] = useState('xxxxx');

    useEffect(() => {
        async function fetchInitialGuess() {
            try {
                const response = await fetchWordleResult([]);
                // setGuessBox({ word: response.guess, clue: ""});
                setIsLoading(false);
                console.log('guess here', response.guess)
                setGuessWord(response.guess)
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        fetchInitialGuess()
    }, [])



    interface BoardState {
        [arrNum: string]: {
            index: number,
            char: string,
            color: string
        }
    }

    const [board, setBoard] = useState<BoardState>({})
    // what I want board to look like for state management:

    useEffect(() => {
        setBoard(setInitialBoard())
    }, [])

    const setInitialBoard = (): BoardState => {
        const initialBoard: BoardState = {};
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                initialBoard[`arr-${i}-${j}`] = {
                    index: j,
                    char: '',
                    color: ''
                }
            }
        }
        // setBoard(initialBoard)
        return initialBoard
    }
   
    /*
    guessObj = {
        index: number,
        character: guessWord[index],
        color: response from Wordle, input by user - static for array1, dynamic for array2,
        array: for Word to Guess (1) or for What response did you get back (2)
    } 
    board = {
        // array containing the guess response from API
        [{guessObj}, {guessObj}, ...],
        [{guessObj}, {guessObj}, ...]

        //second option
        [guessObj, guessObj, guessObj, ...]
    }
    */

    const GuessComponent = () => {
        // const board: any = {};
        const boardArr1 = []
        const boardArr2 = []
        for (let i = 0; i < 5; i++) {
            // board[`idx${i}`] = guessWord[i]
            // setBoard(...board, {`idx[${i}]`:guessWord[i]})
            boardArr1.push(<GuessWord index={i} response='received'/>)
            boardArr2.push(<GuessWord index={i} response='toSend'/>)
        }

        return (
            <div>
                <h3>Guess #{count}</h3>
                <div>Word to Guess:
                    {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='received'/> */}
                    <Grid container direction='row'>

                    {boardArr1}
                    </Grid>
                </div>
                <div>What response did you get back?
                    {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='toSend'/> */}
                    <Grid container direction='row'>

                    {boardArr2}
                    </Grid>
                </div>
            </div>
        )
    }

    const colors = ['green', 'yellow', 'white']
    const [currentColorIndex, setCurrentColorIndex] = useState(-1)

    const handleBoxClick = (response: string, index: number) => {
        const nextColorIndex = (currentColorIndex + 1) % colors.length;
        setSelectedIndex(index);
        if (response === 'toSend') {
            setBoard((prevBoard) => {
                const updated = {
                    ...prevBoard[`arr-1-${index}`],
                    color: colors[nextColorIndex]
                };
                return {
                    ...prevBoard,
                    [`arr-1-${index}`]: updated
                }
            })}
        setCurrentColorIndex(nextColorIndex);
        setSelectedColor(colors[nextColorIndex])
    }


    const wordArr = Array.from(guessWord)

    const GuessWord = (props: any) => {
        const word = ""+guessWord[props.index]
        return (
            <Grid container spacing={1}>
                {/* {[0, 1, 2, 3, 4].map((index) => ( */}
                    {/* <Grid item xs={2} key={`transparent-${selectedIndex}`}> */}
                        <Box
                            onClick={() => {handleBoxClick(props.response, props.index); console.log('props color', props.selectedColor)}}
                            id={`arr-1-${props.index}`}
                            bgcolor={board[`arr-1-${props.index}`].color}
                            sx={{
                                m: 0.6,
                                height: 50,
                                width: 50,
                                // backgroundColor: colors[currentColorIndex],
                                border: '0.5px solid lightgrey',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            
                        >{word.toUpperCase()
                        }</Box>
                    {/* </Grid> */}
                {/* ))} */}
            </Grid>
        )
    }


    return isLoading ? (
        <Box alignItems="center">
            <CircularProgress />
        </Box>
    ) : (
        <div>

            <div>Hello from the other side</div>
            <GuessComponent />
            {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='toSend'/> */}
        </div>
    )
    
}

export default WordleBot;
// export {}