// import { useState, useEffect } from "react";
// import { Box, Grid, CircularProgress } from "@mui/material"
// import { fetchWordleResult, WordleRequestItem } from "../api/api";

// const Guess = () => {

//     const guess = {
//         char: '',
//         index: -1,
//         color: ''
//     }

//     // console.log('guess', guess['color' as keyof typeof guess])

//     const [ wordRequest, setwordRequest ] = useState<WordleRequestItem>(); // initial state shouldn't be an empty object but rather an initial guess from the API call - unless empty object as initial state is allowed, which then a conditional statement could be used (if guessBox state is {}, then do initial loading)
//     const [ guessBox, setGuessBox ] = useState<typeof guess>();
//     const [ guessBoxArr, setGuessBoxArr ] = useState<typeof guess[]>([]); //array of all the guesses - each guess # should correspond with guessBoxArr index + 1
//     const [ selectedIndex, setSelectedIndex ] = useState(-1);
//     const [ selectedColor, setSelectedColor ] = useState('');
//     // add a Guess# state and incorporate into GuessWord component to avoid all boxes of the same index turning into the same color.. or utilize key? -> props.key === blah blah ? blah blah : blah blah (for backgroundColor in GuessWord)
//     const [ isLoading, setIsLoading ] = useState(true);
//     const [ guessWord, setGuessWord ] = useState('');
//     const [ count, setCount ] = useState(1);
//     const [ showSecondGrid, setShowSecondGrid ] = useState(true);
//     const [ clue, setClue ] = useState('xxxxx');

//     /*
//     guessBox:
//     {guess1: {word: 'rndwd', color: 'xyxgg'}}
//     // update guessBox state each time a box color changes

//     guessBoxArr:
//     [{guess1: {word: 'rndwd', color: 'xyxgg'}}, {guess2: {word: 'anrnd', color: 'yxygg'}}, ...]
//     // update the guessBoxArr at each submit button click

//     // submit button should do the following:
//     // -update guessBoxArr
//     // -make an API call to submit the guess & color and receive the next guess
//     // -generate the next guess component and move the ColoredRow component beneath the newly generated guess component
//     */

//     useEffect(() => {
//         async function fetchInitialGuess() {
//             try {
//                 const response = await fetchWordleResult([]);
//                 // setGuessBox({ word: response.guess, clue: ""});
//                 setIsLoading(false);
//                 console.log('guess here', response.guess)
//                 setGuessWord(response.guess)
//             } catch (error) {
//                 console.error(error);
//                 setIsLoading(false);
//             }
//         }
//         fetchInitialGuess()
//     }, [])


//     // have a function that generates the components for Word to Guess and response back word boxes
//     const GuessWord = ({ selectedIndex, selectedColor, response } : { selectedIndex: number, selectedColor: string, response: string}) => {
        
//         return (
//             <Grid container spacing={1}>
//                 {[0, 1, 2, 3, 4].map((index) => (
//                     <Grid item xs={2} key={`transparent-${index}`}>
//                         <Box
//                             sx={{
//                                 m: 0.6,
//                                 height: 50,
//                                 width: 50,
//                                 backgroundColor: 
//                                     index === selectedIndex && response === 'toSend' && selectedColor !== 'transparent' ? selectedColor : 'transparent',
//                                 border: '0.5px solid lightgrey',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center'
//                             }}
//                         >{//guessWord[index].toUpperCase()
//                         }</Box>
//                     </Grid>
//                 ))}
//             </Grid>
//         )
//     }


//     const colorChange = ({ index, color } : { index : number, color: string}) => {
//         setSelectedIndex(index);
//         console.log('index', index)
//         setSelectedColor(color);
//         console.log('color', color)
//         setGuessBox({
//             char: guessWord[index],
//             index: index,
//             color: color
//         });
//         // setGuessBoxArr((prevState) => [...prevState, guessBox]);
//         // setGuessBoxArr([...guessBoxArr, {guessBox}])
//         // setClue((index, color) => {})
//         console.log('guessboxarr', guessBoxArr)
//     }

//     // const handleSubmit = (index: number) => {
//     //     async function fetchGuess() {
//     //         try {
//     //             const response = await fetchWordleResult(guessBoxArr[-1]);
//     //             setGuessBox({ word: response.guess, clue: ""});
//     //             setIsLoading(false);
//     //             console.log('guess here', response.guess)
//     //             setGuessWord(response.guess)
//     //         } catch (error) {
//     //             console.error(error);
//     //             setIsLoading(false);
//     //         }
//     //     }
//     // }

//     const GuessComponent = () => {
//         return (
//             <div>
//                 <h3>Guess #{count}</h3>
//                 <div>Word to Guess:
//                     <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='received'/>
//                 </div>
//                 <div>What response did you get back?
//                     <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='toSend'/>
//                 </div>
//             </div>
//         )
//     }

//     const [ guesses, setGuesses ] = useState<{}[]>([])
//     const addGuessComponent = () => {
//         if (guesses.length <= 6) {
//             setGuesses([...guesses, {newColor: selectedColor, newIndex: selectedIndex}])
//         }
//     }
//     console.log('guessesArr', guesses)

//     const wordArr = Array.from(guessWord)

//     const TempGuessWord = ({ selectedIndex, selectedColor, response } : { selectedIndex: number, selectedColor: string, response: string}) => {
        
//         return (
//             <Grid container spacing={1} direction='row'>
//                     <Grid item xs={2} key={`transparent-${selectedIndex}`}>
//                         <Box
//                             sx={{
//                                 m: 0.6,
//                                 height: 50,
//                                 width: 50,
//                                 backgroundColor: selectedColor,
//                                 border: '0.5px solid lightgrey',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center'
//                             }}
//                         >{'a'}</Box>
//                     </Grid>
              
//             </Grid>
//         )
//     }
   

//     const ColoredRowGrid = () => {
//         return (
//             <Grid>
//                 <ColoredRow color="green" />
//                 <ColoredRow color="yellow" />
//                 <ColoredRow color="white" />
//             </Grid>
//         )
//     }

    
//     // Reusable component for a colored row
//     const ColoredRow = ({ color }: { color: string}) => (
//         <Grid container spacing={1}>
//             {[0, 1, 2, 3, 4].map((index) => (
//                 <Grid item xs={2} key={`${color}-${index}`}>
//                     <Box
//                         sx={{
//                             m: 0.6,
//                             height: 50,
//                             width: 50,
//                             backgroundColor: color,
//                             border: '0.5px solid lightgrey'
//                         }}
//                         onClick={() => colorChange({index, color})}
//                     />
//                 </Grid>
//             ))}
//         </Grid>
//     );

//     const userDataStyle = {
//         fontWeight: 'bold',
//         fontSize: 18
//       }

//     return isLoading ? (
//         <Box alignItems="center">
//             <CircularProgress />
//         </Box>
//     ) : (
        
//         <div>
//             <Box sx={userDataStyle}>Hellooooo</Box>
//             <GuessComponent />
//             {wordArr.map((index, color) => (
//                  <TempGuessWord selectedColor={selectedColor} selectedIndex={selectedIndex} response='toSend' key={`transparent-${selectedIndex}`}/>
//             ))}
//             {showSecondGrid && (<ColoredRowGrid />)}

//             <button onClick={() => {setCount(count + 1); setShowSecondGrid(false); setTimeout(() => { setShowSecondGrid(true);}, 0)}}>Submit</button>
//         </div>
//     )
// }

// export default Guess

// // export {}







// // import Layout from "./Layout";
// import { useState, useEffect } from 'react';
// import { Box, Grid, Stack, CircularProgress, Button, Typography, Divider } from "@mui/material"
// import { fetchWordleResult, WordleRequestItem, WordleRequest } from "../api/api";

// const WordleBot = () => {

//     // const [ wordRequest, setWordRequest ] = useState<WordleRequestItem[]>([{word: '', clue: ''}]);
//     const [ wordRequest, setWordRequest ] = useState<WordleRequest>([{word: '', clue: ''}])
//     const [ guessComponentArr, setGuessComponentArr ] = useState<{word: string; clue: string; count: number}[]>([]); //array of all the guesses - each guess # should correspond with guessComponentArr index + 1
//     const [ selectedIndex, setSelectedIndex ] = useState(-1);
//     const [ selectedColor, setSelectedColor ] = useState('');
//     const [ currentColorIndex, setCurrentColorIndex ] = useState(-1)
//     const [ isLoading, setIsLoading ] = useState(true);
//     const [ guessWord, setGuessWord ] = useState('');
//     const [ count, setCount ] = useState(1);
//     const [ colorClue, setColorClue ] = useState('xxxxx');
//     const [ winOrLose, setWinOrLose ] = useState('playing');
//     const [ errorMessage, setErrorMessage ] = useState<Error | null>(null);


//     useEffect(() => {
//         if (wordRequest[0].word !== '' || isLoading){
//             fetchGuess()
//         }
//         // setWordBoard(setNewRow())
//     }, [wordRequest])

//     async function fetchGuess() {
//         try {

//             let response;

//             if (isLoading) {
//                 response = await fetchWordleResult([]);
//                 setGuessComponentArr([{word: guessWord, clue: colorClue, count: count}])
//             } else {
//                 response = await fetchWordleResult(wordRequest);
//             }

//             setIsLoading(false);
//             setGuessWord(response.guess);
//             setWordRequest([{ word: '', clue: ''}])

//             // setWordBoard(setNewRow())
//         console.log('wordBoardddd', wordBoard)
//         } catch (error) {
//             // setErrorMessage(error as any);
//             console.error(error);
//             // const errorMessage1 = (error instanceof Error) ? error.message : "An unknown error occurred";
//             setErrorMessage(error as Error);
//             setIsLoading(false);
//         }
//     }

//     // interface BoardState {
//     //     [arrNum: string]: {
//     //         index: number,
//     //         char: string,
//     //         color: string,
//     //     }
//     // } 

//     interface BoardState {
//         rows: {
//             boxes: {
//                 char: string,
//                 color: string,
//             }[]
//         }[]
//     }

//     // { 
//     // arrNum: [{[box1]: {index: 0, char: 'a', color: 'white'}}, 
//     // {[box2]: {index: 0, char: 'a', color: 'white'}}, {...}, {...}, {...}] 
//     // }

//     // for (let i = 0; i < 5; i++) {
//     //     initialBoard[arr-0][`box-${i}`] = {
//     //         index: i,
//     //         char: '',
//     //         color: 'white'
//     //     }
//     // }

//     // const setNewRow = (): BoardState => {
//     //     const newRow: BoardState = wordBoard;
//     //         for (let i = 0; i < 5; i++) {
//     //             newRow[count-1][i] = {
//     //                 index: i, //necessary??
//     //                 char: '',
//     //                 color: 'white'
//     //             }
//     //         }
//     //     // setRow(newRow)
//     //     return newRow
//     // }


//     const [wordBoard, setWordBoard] = useState<BoardState>({rows:[]})
//     // const [wordBoard, setWordBoard] = useState<[{index: number, char: string, color: string}][]>([]) // -> nested array
    
//     // const setNewRow = (): BoardState => {
//     //     // Create a new row with empty boxes
//     //     // const newRow = {
//     //     //   boxes: Array(5).fill({
//     //     //     // index: 0,
//     //     //     char: guessWord,
//     //     //     color: 'white',
//     //     //   }),
//     //     // };
//     //     const newRow = {
//     //         boxes: [] as {char: string, color: string}[]
//     //     }
//     //     for (let i = 0; i < 5; i++) {
//     //         newRow.boxes.push({
//     //             char: guessWord[i],
//     //             color: 'white'
//     //         })
//     //     }

//     //     return {
//     //         rows: [...wordBoard.rows, newRow]
//     //     }
//     // }

//     const setNewRow = (): BoardState => {
//         const newBoard: BoardState = {
//           rows: [],
//         };
      
//         for (let rowNum = 0; rowNum < 5; rowNum++) {
//           const row = {
//             boxes: [] as {char: string, color: string}[],
//           };
      
//           for (let boxNum = 0; boxNum < 5; boxNum++) {
//             row.boxes.push({
//               char: '',
//               color: 'white',
//             });
//           }
      
//           newBoard.rows.push(row);
//         }
      
//         return newBoard;
//     };
    
      


//     useEffect(() => {
//         setWordBoard(setNewRow())
//         console.log('wordBoardddd', wordBoard)
//     }, [])
    
//     // console.log('guessword', guessWord)
//     // const setInitialBoard = (): BoardState => {
//     //     const initialBoard: BoardState = {};
//     //         for (let i = 0; i < 5; i++) {
//     //             initialBoard[`arr-${i}`] = {
//     //                 index: i, //necessary??
//     //                 char: '',
//     //                 color: 'white'
//     //             }
//     //         }
//     //     // setBoard(initialBoard)
//     //     return initialBoard
//     // }


//     const GuessComponent = ({guessData}: {guessData: any}) => {
//         // const board: any = {};
//         const boardArr1: JSX.Element[] = []
//         const boardArr2: JSX.Element[] = []

//         for (let i = 0; i < 5; i++) {
//             boardArr1.push(<CharBox boxIndex={i} key={`bA1-${i}`} response='received' board={boardArr1}/>)
//             boardArr2.push(<CharBox boxIndex={i} key={`bA2-${i}`} response='toSend' board={boardArr2}/>)
//         }
//         console.log('bA1', boardArr1)
//         console.log('bA2', boardArr2)

//         return (
//             <div>
//                 <Typography variant='h3' sx={{my:2}} >Guess #{guessData.count}</Typography>
//                 <Typography variant='h5' sx={{my:0.5}}>Word to Guess:</Typography>
//                 <Stack direction='row' sx={{mb:1, mx:10}} alignItems='center'>
//                     {boardArr1}
//                 </Stack>
                
//                 <Typography variant='h5' sx={{my:0.5}}>What response did you get back?</Typography>
//                 <Stack direction='row' sx={{mb:2, mx:10}}>
//                     {boardArr2}
//                     {/* {boardArr2.map((_, index) => (
//                         <GuessWord
//                             key={index}
//                             index={index}
//                             response='toSend'
//                             handleBoxClick={handleBoxClick}
//                             board={boardArr2}
//                         />
//                     ))} */}
//                 </Stack>
//                 { (winOrLose === 'playing' && guessData.count===guessComponentArr.length) && (
//                     <Typography color='violet'>Click on the letters above to change colors!</Typography>)}
//                 <Divider sx={{my:5}}/>
//             </div>
//         )
//     };

//     const colors = ['green', 'yellow', 'white']
    

//     const handleBoxClick = (response: string, index: number) => {
//         const nextColorIndex = (currentColorIndex + 1) % colors.length;

//         setSelectedIndex(index); // necessary?

//         if (response === 'toSend') {
//             setWordBoard((prevBoard) => {

//                 const updatedRow = [...prevBoard.rows];
//                 const updatedBox = { ...updatedRow[count-1].boxes[index], color: colors[nextColorIndex] };
//                 updatedRow[count-1].boxes[index] = updatedBox; 
//                 return { rows: updatedRow };
//         })
//     }
//         setSelectedColor(colors[nextColorIndex]) // necessary?

//         // function for setting color clue
//         if (colors[nextColorIndex] === 'green') setColorClue(colorClue.substring(0, index) + 'g' + colorClue.substring(index+1));
//         if (colors[nextColorIndex] === 'yellow') setColorClue(colorClue.substring(0, index) + 'y' + colorClue.substring(index+1));
//         if (colors[nextColorIndex] === 'white') setColorClue(colorClue.substring(0, index) + 'x' + colorClue.substring(index+1));
//         console.log('colorClueee', colorClue)
//         setCurrentColorIndex(nextColorIndex);


//     }

//     const CharBox = (props: any) => {
//         const char = ""+guessWord[props.boxIndex]

//         // const board = props.response === 'toSend' ? boardArr2 : boardArr1
//         return (
//                 <Box
//                     onClick={() => {handleBoxClick(props.response, props.boxIndex)}}
//                     sx={{
//                         mx: 2,
//                         my: 2,
//                         ml: 'auto',
//                         mr: 'auto',
//                         height: 50,
//                         width: 50,
//                         backgroundColor: props.response === 'toSend' ? wordBoard.rows[count-1].boxes[props.boxIndex].color : 'white',
//                         border: '0.5px solid lightgrey',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center'
//                     }}
                    
//                 >{char.toUpperCase()}
//                 </Box>
//         )
//     }
//     console.log('guesscomparr', guessComponentArr)

//     const handleSubmitClick = () => {

//         const newGuessData = {
//             word: guessWord,
//             clue: colorClue,
//             count: count+1
//         }
//         if (count < 6 && colorClue !== 'ggggg' && errorMessage === null) {
//             setGuessComponentArr([...guessComponentArr, newGuessData])
//         }

//           //const newBoardStateRow =      initialBoard[arr-0][`box-${i}`] = {
//     //         index: i,
//     //         char: guessWord[i],
//     //         color: 'white'
//     //     }
//     //      setBoardState([...boardState])

//         console.log('guessComponentArr here',guessComponentArr)
        
//         setWordRequest([{ word: guessWord, clue: colorClue }])
//         setCount(count + 1)
//         setGuessWord('')
//         setColorClue('xxxxx')
        
//         if (count <= 6 && colorClue === 'ggggg') {
//             setWinOrLose('win')
//         }
//         if (count >= 6 && colorClue !== 'ggggg') {
//             setWinOrLose('lose')
//         }
//     };


//     return isLoading ? (
//         <Box alignItems="center">
//             <CircularProgress />
//         </Box>
//     ) : (
//         <div>
//             {/* <Grid container justifyContent='center'> */}

//             {guessComponentArr.map((guessData, index) => (
//                 <GuessComponent key={index} guessData={guessData} />
//                 ))}
//                 {/* </Grid> */}

//             {/* <GuessWord selectedIndex={selectedIndex} selectedColor={selectedColor} response='toSend'/> */}
//             { winOrLose === 'playing' && (
//                 <div>
//                     {/* <Typography color='violet'>Click on the letters above to change colors!</Typography> */}
                    
//                     <Box display='flex' justifyContent='flex-end' sx={{m:2}}>
//                         <Button
//                             variant='contained' 
//                             onClick={handleSubmitClick}
//                             >Submit
//                         </Button>
//                     </Box>
//                 </div>
//             )}
//             { errorMessage !== null && <Typography color='red' sx={{mb: 10}}>Error: {errorMessage.message}</Typography>}
//             { winOrLose === 'win' && <Typography variant='h3' sx={{my:10}}>Yay! All done!</Typography> }
//             { winOrLose === 'lose' && <Typography variant='h3' sx={{my:10}}>Sorry, try again!</Typography>}
//         </div>
//     )
    
// }

// export default WordleBot;
export {}