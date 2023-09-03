// import Layout from "./Layout";
import { useState, useEffect } from 'react';
import { Box, Grid, Stack, CircularProgress, Button } from "@mui/material"
import { fetchWordleResult, WordleRequestItem, WordleRequest } from "../api/api";

const WordleBot = () => {

    const [ wordRequest, setWordRequest ] = useState<WordleRequestItem[]>([{word: '', clue: ''}]);
    // const [ wordRequest, setWordRequest ] = useState<WordleRequest>([{word: '', clue: ''}])
    // const [ guessBox, setGuessBox ] = useState<typeof guess>();
    const [ guessComponentArr, setGuessComponentArr ] = useState([]); //array of all the guesses - each guess # should correspond with guessComponentArr index + 1
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ selectedColor, setSelectedColor ] = useState('');
    // add a Guess# state and incorporate into GuessWord component to avoid all boxes of the same index turning into the same color.. or utilize key? -> props.key === blah blah ? blah blah : blah blah (for backgroundColor in GuessWord)
    const [ isLoading, setIsLoading ] = useState(true);
    const [ guessWord, setGuessWord ] = useState('');
    const [ count, setCount ] = useState(1);
    // const [ showSecondGrid, setShowSecondGrid ] = useState(true);
    const [ colorClue, setColorClue ] = useState('xxxxx');

    // useEffect(() => {
    //     async function fetchInitialGuess() {
    //         try {
    //             const response = await fetchWordleResult([]);
    //             // setGuessBox({ word: response.guess, clue: ""});
    //             setIsLoading(false);
    //             console.log('guess here', response.guess)
    //             setGuessWord(response.guess)
    //         } catch (error) {
    //             console.error(error);
    //             setIsLoading(false);
    //         }
    //     }
    //     fetchInitialGuess()
    // }, [])

    useEffect(() => {
        if (wordRequest[0].word !== '' || isLoading){
            fetchGuess()
        }
    }, [wordRequest])

    async function fetchGuess() {
        try {
            console.log('wordrequestttt', wordRequest)
            let response;
            if (isLoading) {
                response = await fetchWordleResult([]);
            } else {
                response = await fetchWordleResult(wordRequest);
            }
            // const response = await fetchWordleResult(wordRequest);
            // setGuessBox({ word: response.guess, clue: ""});
            setIsLoading(false);
            console.log('fetched guess here', response.guess)
            setGuessWord(response.guess);
            setWordRequest([{ word: '', clue: ''}])
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    interface BoardState {
        [arrNum: string]: {
            index: number,
            char: string,
            color: string,
            set: boolean
        }
    }

    const [boardArr2, setBoardArr2] = useState<BoardState>({})

    useEffect(() => {
        setBoardArr2(setInitialBoard())
    }, [])

    const setInitialBoard = (): BoardState => {
        const initialBoard: BoardState = {};
            for (let i = 0; i < 5; i++) {
                initialBoard[`arr-${i}`] = {
                    index: i,
                    char: '',
                    color: 'white',
                    set: false
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
        const boardArr1: JSX.Element[] = []
        const boardArr2: JSX.Element[] = []

        for (let i = 0; i < 5; i++) {
            boardArr1.push(<GuessWord index={i} response='received' board={boardArr1}/>)
            boardArr2.push(<GuessWord index={i} response='toSend' board={boardArr2}/>)
        }

        return (
            <div>
                <h3>Guess #{count}</h3>
                <div>Word to Guess:
                    {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='received'/> */}
                    <Stack direction='row'>
                        {boardArr1}
                    </Stack>
                </div>
                <div>What response did you get back?
                    {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='toSend'/> */}
                    <Stack direction='row'>
                        {boardArr2}
                        {/* {boardArr2.map((_, index) => (
                            <GuessWord
                                key={index}
                                index={index}
                                response='toSend'
                                handleBoxClick={handleBoxClick}
                                board={boardArr2}
                            />
                        ))} */}
                    </Stack>
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
            setBoardArr2((prevBoard) => {
                const updated = {
                    ...prevBoard[`arr-${index}`],
                    color: colors[nextColorIndex]
                };
                return {
                    ...prevBoard,
                    [`arr-${index}`]: updated
                }
        })}
        setSelectedColor(colors[nextColorIndex])
        // function for setting color clue
        console.log('clicked color', colors[nextColorIndex])
        if (colors[nextColorIndex] === 'green') setColorClue(colorClue.substring(0, index) + 'g' + colorClue.substring(index+1));
        if (colors[nextColorIndex] === 'yellow') setColorClue(colorClue.substring(0, index) + 'y' + colorClue.substring(index+1));
        if (colors[nextColorIndex] === 'white') setColorClue(colorClue.substring(0, index) + 'x' + colorClue.substring(index+1));
        console.log('colorClueee', colorClue)

        setCurrentColorIndex(nextColorIndex);
    }


    // const wordArr = Array.from(guessWord)

    const GuessWord = (props: any) => {
        const word = ""+guessWord[props.index]

        // const board = props.response === 'toSend' ? boardArr2 : boardArr1
        return (
            <Grid container spacing={1}>
                <Box
                    onClick={() => {handleBoxClick(props.response, props.index)}}
                    id={`arr-${props.index}`}
                    // bgcolor={board[`arr-1-${props.index}`].color}
                    sx={{
                        mx: 'auto',
                        my: 2,
                        height: 50,
                        width: 50,
                        backgroundColor: boardArr2[`arr-${props.index}`].color,
                        border: '0.5px solid lightgrey',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    
                >{word.toUpperCase()}
                </Box>
            </Grid>
        )
    }


   

    const HandleSubmitClick = () => {
        // setWordRequest((prevWordRequest) => ({
        //     ...prevWordRequest,
        //     word: guessWord,
        //     clue: colorClue
        // }))
        
        setWordRequest([{
            word: guessWord,
            clue: colorClue
        }])
        console.log('newguess', guessWord)
        setCount(count + 1)

    }


     // an extra div to render the error statement if any or a "Yay! All Done" message if all green boxes - create another file for error handling if API doesn't already handle it

    return isLoading ? (
        <Box alignItems="center">
            <CircularProgress />
        </Box>
    ) : (
        <div>
            <GuessComponent />
            {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='toSend'/> */}
            <Box display='flex' justifyContent='flex-end'>
                <Button 
                    variant='contained' 
                    onClick={HandleSubmitClick}
                >Submit</Button>
            </Box>
        </div>
    )
    
}

export default WordleBot;
// export {}
