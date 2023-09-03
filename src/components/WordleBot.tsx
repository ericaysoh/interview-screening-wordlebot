// import Layout from "./Layout";
import { useState, useEffect } from 'react';
import { Box, Grid, Stack, CircularProgress, Button, Typography } from "@mui/material"
import { fetchWordleResult, WordleRequestItem, WordleRequest } from "../api/api";

const WordleBot = () => {

    const [ wordRequest, setWordRequest ] = useState<WordleRequestItem[]>([{word: '', clue: ''}]);
    // const [ wordRequest, setWordRequest ] = useState<WordleRequest>([{word: '', clue: ''}])
    const [ guessComponentArr, setGuessComponentArr ] = useState<{word: string; clue: string; count: number}[]>([]); //array of all the guesses - each guess # should correspond with guessComponentArr index + 1
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ selectedColor, setSelectedColor ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);
    const [ guessWord, setGuessWord ] = useState('');
    const [ count, setCount ] = useState(1);
    const [ colorClue, setColorClue ] = useState('xxxxx');
    const [ winOrLose, setWinOrLose ] = useState('playing')


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
                setGuessComponentArr([{word: guessWord, clue: colorClue, count: count}])
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

    const GuessComponent = ({componentIndex, guessData}: {componentIndex: number, guessData: any}) => {
        // const board: any = {};
        const boardArr1: JSX.Element[] = []
        const boardArr2: JSX.Element[] = []

        for (let i = 0; i < 5; i++) {
            boardArr1.push(<GuessWord index={i} response='received' board={boardArr1}/>)
            boardArr2.push(<GuessWord index={i} response='toSend' board={boardArr2}/>)
        }

        return (
            <div>
                <h3>Guess #{guessData.count}</h3>
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
        setSelectedColor(colors[nextColorIndex]) // necessary?
        // function for setting color clue
        console.log('clicked color', colors[nextColorIndex])
        if (colors[nextColorIndex] === 'green') setColorClue(colorClue.substring(0, index) + 'g' + colorClue.substring(index+1));
        if (colors[nextColorIndex] === 'yellow') setColorClue(colorClue.substring(0, index) + 'y' + colorClue.substring(index+1));
        if (colors[nextColorIndex] === 'white') setColorClue(colorClue.substring(0, index) + 'x' + colorClue.substring(index+1));
        console.log('colorClueee', colorClue)

        setCurrentColorIndex(nextColorIndex); //necessary?
    }

    const GuessWord = (props: any) => {
        const word = ""+guessWord[props.index]

        // const board = props.response === 'toSend' ? boardArr2 : boardArr1
        return (
            <Grid container spacing={1}>
                <Box
                    onClick={() => {handleBoxClick(props.response, props.index)}}
                    id={`arr-${props.index}`}
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


   

    const handleSubmitClick = () => {

        const newGuessData = {
            word: guessWord,
            clue: colorClue,
            count: count+1
        }
        if (count < 6) {
            setGuessComponentArr([...guessComponentArr, newGuessData])
        }

        console.log('guessComponentArr here',guessComponentArr)
        
        setWordRequest([{ word: guessWord, clue: colorClue }])
        setCount(count + 1)
        setGuessWord('')
        setColorClue('xxxxx')
        
        if (count <= 6 && colorClue === 'ggggg') {
            setWinOrLose('win')
        }
        if (count >= 6 && colorClue !== 'ggggg') {
            setWinOrLose('lose')
        }
    }

    return isLoading ? (
        <Box alignItems="center">
            <CircularProgress />
        </Box>
    ) : (
        <div>
            {guessComponentArr.map((guessData, index) => (
                <GuessComponent key={index} componentIndex={count} guessData={guessData} />
            ))}

            {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='toSend'/> */}
            { winOrLose === 'playing' && (
                <Box display='flex' justifyContent='flex-end'>
                    <Button 
                        variant='contained' 
                        onClick={handleSubmitClick}
                    >Submit</Button>
                </Box>
            )}
            { winOrLose === 'win' && <Typography>Yay all done!</Typography> }
            { winOrLose === 'lose' && <Typography>Sorry, try again!</Typography>}
        </div>
    )
    
}

export default WordleBot;
// export {}
