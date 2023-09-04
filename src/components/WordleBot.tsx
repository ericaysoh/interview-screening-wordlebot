// import Layout from "./Layout";
import { useState, useEffect } from 'react';
import { Box, Grid, Stack, CircularProgress, Button, Typography, Divider } from "@mui/material"
import { fetchWordleResult, WordleRequestItem, WordleRequest } from "../api/api";

const WordleBot = () => {

    const [ wordRequest, setWordRequest ] = useState<WordleRequest>([{word: '', clue: ''}])
    const [ guessComponentArr, setGuessComponentArr ] = useState<{word: string; clue: string; count: number}[]>([]);
    const [ currentColorIndex, setCurrentColorIndex ] = useState(-1)
    const [ isLoading, setIsLoading ] = useState(true);
    const [ guessWord, setGuessWord ] = useState('');
    const [ count, setCount ] = useState(1);
    const [ colorClue, setColorClue ] = useState('xxxxx');
    const [ winOrLose, setWinOrLose ] = useState('playing');
    const [ errorMessage, setErrorMessage ] = useState<Error | null>(null);
    const [wordBoard, setWordBoard] = useState<BoardState>({rows:[]})


    useEffect(() => {
        if (wordRequest[0].word !== '' || isLoading){
            fetchGuess()
        }
        // setWordBoard(setNewRow())
    }, [wordRequest])

    async function fetchGuess() {
        try {

            let response;

            if (isLoading) {
                response = await fetchWordleResult([]);
                setGuessComponentArr([{word: guessWord, clue: colorClue, count: count}])
                setWordBoard(setNewRow())
            } else {
                response = await fetchWordleResult(wordRequest);
            }

            setIsLoading(false);
            setGuessWord(response.guess);
            setWordRequest([{ word: '', clue: ''}])
        console.log('wordBoardddd', wordBoard)
        } catch (error) {
            console.error(error);
            setErrorMessage(error as Error);
            setIsLoading(false);
        }
    }


    interface BoardState {
        rows: {
            boxes: {
                char: string,
                color: string,
            }[]
        }[]
    }

    // { 
    // arrNum: [{[box1]: {index: 0, char: 'a', color: 'white'}}, 
    // {[box2]: {index: 0, char: 'a', color: 'white'}}, {...}, {...}, {...}] 
    // }

    // for (let i = 0; i < 5; i++) {
    //     initialBoard[arr-0][`box-${i}`] = {
    //         index: i,
    //         char: '',
    //         color: 'white'
    //     }
    // }

    // const setNewRow = (): BoardState => {
    //     const newRow: BoardState = wordBoard;
    //         for (let i = 0; i < 5; i++) {
    //             newRow[count-1][i] = {
    //                 index: i, //necessary??
    //                 char: '',
    //                 color: 'white'
    //             }
    //         }
    //     // setRow(newRow)
    //     return newRow
    // }


  


    const setNewRow = (): BoardState => {
        const newBoard: BoardState = {
          rows: [],
        };
      
        for (let rowNum = 0; rowNum < 6; rowNum++) {
          const row = {
            boxes: [] as {char: string, color: string}[],
          };
      
          for (let boxNum = 0; boxNum < 5; boxNum++) {
            row.boxes.push({
              char: '',
              color: 'white',
            });
          }
      
          newBoard.rows.push(row);
        }
      
        return newBoard;
    };
    
      


    // useEffect(() => {
    //     setWordBoard(setNewRow())
    //         console.log('wordBoardddd?', wordBoard)

    //         // setWordBoard((prevBoard) => {
                
    //         //     const updatedRow = [...prevBoard.rows];
    //         //     const updatedBox = { ...updatedRow[count-1].boxes[boxIndex], char: guessWord[boxIndex] };
    //         //     updatedRow[count-1].boxes[boxIndex] = updatedBox; 
    //         //     return { rows: updatedRow };
    //         // })
    
    // }, [guessWord])
    
    // console.log('guessword', guessWord)
    // const setInitialBoard = (): BoardState => {
    //     const initialBoard: BoardState = {};
    //         for (let i = 0; i < 5; i++) {
    //             initialBoard[`arr-${i}`] = {
    //                 index: i, //necessary??
    //                 char: '',
    //                 color: 'white'
    //             }
    //         }
    //     // setBoard(initialBoard)
    //     return initialBoard
    // }


    const GuessComponent = ({guessData}: {guessData: any}) => {
        // const board: any = {};
        const boardArr1: JSX.Element[] = []
        const boardArr2: JSX.Element[] = []

        for (let i = 0; i < 5; i++) {
            boardArr1.push(<CharBox rowIndex={guessData.count-1} boxIndex={i} key={`bA1-${i}`} char={guessWord[i]} response='received'/>)
            boardArr2.push(<CharBox rowIndex={guessData.count-1} boxIndex={i} key={`bA2-${i}`} char={guessWord[i]} response='toSend'/>)
        }
        console.log('bA1', boardArr1)
        console.log('bA2', boardArr2)
        // console.log('rows', wordBoard.rows[count])
        return (
            <div>
                <Typography variant='h3' sx={{my:2}} >Guess #{guessData.count}</Typography>
                <Typography variant='h5' sx={{my:0.5}}>Word to Guess:</Typography>
                <Stack direction='row' sx={{mb:1, mx:10}} alignItems='center'>
                    {boardArr1}
                </Stack>
                
                <Typography variant='h5' sx={{my:0.5}}>What response did you get back?</Typography>
                <Stack direction='row' sx={{mb:2, mx:10}}>
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
    };

    const colors = ['green', 'yellow', 'white']
    

    const handleBoxClick = (response: string, boxIndex: number) => {
        const nextColorIndex = (currentColorIndex + 1) % colors.length;

        if (response === 'toSend') {
            setWordBoard((prevBoard) => {
                const updatedRow = [...prevBoard.rows];
                const updatedBox = { ...updatedRow[count-1].boxes[boxIndex], color: colors[nextColorIndex] };
                updatedRow[count-1].boxes[boxIndex] = updatedBox; 
                return { rows: updatedRow };
            })
        };

        // function for setting color clue
        if (colors[nextColorIndex] === 'green') setColorClue(colorClue.substring(0, boxIndex) + 'g' + colorClue.substring(boxIndex+1));
        if (colors[nextColorIndex] === 'yellow') setColorClue(colorClue.substring(0, boxIndex) + 'y' + colorClue.substring(boxIndex+1));
        if (colors[nextColorIndex] === 'white') setColorClue(colorClue.substring(0, boxIndex) + 'x' + colorClue.substring(boxIndex+1));
        console.log('colorClueee', colorClue)
        setCurrentColorIndex(nextColorIndex);


    }

    const CharBox = (props: {rowIndex: number, boxIndex: number, key: string, char: string, response: string}) => {
        // const char = ""+guessWord[props.boxIndex]
        const wbChar = wordBoard.rows[props.rowIndex].boxes[props.boxIndex].char
        const char = ""+props.char

        return (
                <Box
                    onClick={() => {handleBoxClick(props.response, props.boxIndex)}}
                    sx={{
                        mx: 2,
                        my: 2,
                        ml: 'auto',
                        mr: 'auto',
                        height: 50,
                        width: 50,
                        backgroundColor: props.response === 'toSend' ? wordBoard.rows[props.rowIndex].boxes[props.boxIndex].color : 'white',
                        border: '0.5px solid lightgrey',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    
                >{!wbChar ? char.toUpperCase() : wbChar.toUpperCase()}
                </Box>
        )
    }
    console.log('guesscomparr', guessComponentArr)

    const handleSubmitClick = () => {

        const newGuessData = {
            word: guessWord,
            clue: colorClue,
            count: count+1
        }
        if (count < 6 && colorClue !== 'ggggg' && errorMessage === null) {
            setGuessComponentArr([...guessComponentArr, newGuessData])
        }


    setWordBoard((prevBoard) => {
        const updatedRow = [...prevBoard.rows];
            for (let boxIndex = 0; boxIndex < 5; boxIndex++) {
                const updatedBox = { ...updatedRow[count-1].boxes[boxIndex], char: guessWord[boxIndex] };
                updatedRow[count-1].boxes[boxIndex] = updatedBox; 
            }
        return { rows: updatedRow };
    })

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
    };


    return isLoading ? (
        <Box alignItems="center">
            <CircularProgress />
        </Box>
    ) : (
        <div>
            {/* <Grid container justifyContent='center'> */}

            {guessComponentArr.map((guessData, index) => (
                <GuessComponent key={index} guessData={guessData} />
                ))}
                {/* </Grid> */}
            { winOrLose === 'playing' && (
                <div>
                    <Box display='flex' justifyContent='flex-end' sx={{m:2}}>
                        <Button
                            variant='contained' 
                            onClick={handleSubmitClick}
                            >Submit
                        </Button>
                    </Box>
                </div>
            )}
            { errorMessage !== null && <Typography color='red' sx={{mb: 10}}>Error: {errorMessage.message}</Typography>}
            { winOrLose === 'win' && <Typography variant='h3' sx={{my:10}}>Yay! All done!</Typography> }
            { winOrLose === 'lose' && <Typography variant='h3' sx={{my:10}}>Sorry, try again!</Typography>}
        </div>
    )
    
}

export default WordleBot;