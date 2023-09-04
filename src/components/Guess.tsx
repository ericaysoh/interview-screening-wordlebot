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

export {}
