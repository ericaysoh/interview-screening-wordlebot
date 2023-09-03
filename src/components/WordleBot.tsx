// import Layout from "./Layout";
import { useState, useEffect } from 'react';
import { Box, Grid, Stack, CircularProgress, Button, Typography, Divider } from "@mui/material"
import { fetchWordleResult, WordleRequestItem, WordleRequest } from "../api/api";

const WordleBot = () => {

    const [ wordRequest, setWordRequest ] = useState<WordleRequestItem[]>([{word: '', clue: ''}]);
    // const [ wordRequest, setWordRequest ] = useState<WordleRequest>([{word: '', clue: ''}])
    const [ guessComponentArr, setGuessComponentArr ] = useState<{word: string; clue: string; count: number}[]>([]); //array of all the guesses - each guess # should correspond with guessComponentArr index + 1
    const [ selectedIndex, setSelectedIndex ] = useState(-1);
    const [ selectedColor, setSelectedColor ] = useState('');
    const [ currentColorIndex, setCurrentColorIndex ] = useState(-1)
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
                <Typography variant='h3' sx={{my:2}} >Guess #{guessData.count}</Typography>
                <Typography variant='h5' sx={{my:0.5}}>Word to Guess:</Typography>
                    {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='received'/> */}
                <Stack direction='row' sx={{mb:1}}>
                    {boardArr1}
                </Stack>
                
                <Typography variant='h5' sx={{my:0.5}}>What response did you get back?</Typography>
                    {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='toSend'/> */}
                <Stack direction='row' sx={{mb:2}}>
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
                { (winOrLose === 'playing' && guessData.count===guessComponentArr.length) && (
                    <Typography color='violet'>Click on the letters above to change colors!</Typography>)}
                <Divider sx={{my:5}}/>
            </div>
        )
    }

    const colors = ['green', 'yellow', 'white']
    

    const handleBoxClick = (response: string, index: number) => {
        const nextColorIndex = (currentColorIndex + 1) % colors.length;

        setSelectedIndex(index); // necessary?

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
        if (colors[nextColorIndex] === 'green') setColorClue(colorClue.substring(0, index) + 'g' + colorClue.substring(index+1));
        if (colors[nextColorIndex] === 'yellow') setColorClue(colorClue.substring(0, index) + 'y' + colorClue.substring(index+1));
        if (colors[nextColorIndex] === 'white') setColorClue(colorClue.substring(0, index) + 'x' + colorClue.substring(index+1));
        console.log('colorClueee', colorClue)
        setCurrentColorIndex(nextColorIndex);
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
        if (count < 6 && colorClue !== 'ggggg') {
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
                <div>
                    {/* <Typography color='violet'>Click on the letters above to change colors!</Typography> */}
                    
                    <Box display='flex' justifyContent='flex-end' sx={{m:2}}>
                        <Button
                            variant='contained' 
                            onClick={handleSubmitClick}
                            >Submit
                        </Button>
                    </Box>
                </div>
            )}
            { winOrLose === 'win' && <Typography variant='h3' sx={{my:5}}>Yay! All done!</Typography> }
            { winOrLose === 'lose' && <Typography variant='h3' sx={{my:10}}>Sorry, try again!</Typography>}
        </div>
    )
    
}

export default WordleBot;
// export {}
