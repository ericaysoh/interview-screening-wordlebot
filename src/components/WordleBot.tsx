// import Layout from "./Layout";
import { fetchWordleResult, WordleRequestItem, /*WordleRequest,*/ WordleResponse } from "../api/api";
// import { Box, Typography } from "@mui/material";
import { useState, useEffect } from 'react';


// const requestArr: WordleRequest[] = [];

// let item1: WordleRequestItem
// let item2: WordleRequestItem

// item1 = {
//     word: 'apple',
//     clue: 'yxxyg'
// }

// item2 = {
//     word: 'table',
//     clue: 'xgxyg'
// }

// requestArr.push(item1, item2)




// const request: WordleRequest = []



// const request: WordleRequest = [
//     {
//         word: "apple",
//         clue: "yxxgg"
//     },
//     {
//         word: "table",
//         clue: "ygggg"
//     },
// ]

const WordleBot = () => {

    // circlularPro at initial load
    // render the following components:
        // "Guess # --" <-- Typography
        // "Word to Guess:" <-- Typography + 5 boxes that renders the return value, one character at a time, from initial load, then subsequently from WordleResponse
        // "What response did you get back?" <-- Typography + 4 rows of 5 boxes, where the first row should be the same as "Word to Guess" and the following rows being different colors which the user can choose from; when the user clicks a color, the corresponding character above it should have its box turn into that same color
        // Submit button - should grab properties of WordleRequestItem within WordleRequest array; if boxes are not all green at submission, another set of "Guess # --" and following components should be added to the page
        // an extra div to render the error statement if any or a "Yay! All Done" message if all green boxes - create another file for error handling if API doesn't already handle it
    
        // Define an initial state that matches the structure of WordleResponse
        const initialWordleResponse = {
            guess: "",
        };
        
        const [wordleResponse, setWordleResponse] = useState(initialWordleResponse);
        const [error, setError] = useState(null);


        const requestItem: WordleRequestItem[] = [
            {
                word: "apple",
                clue: "yxxgg"
            },
            {
                word: "table",
                clue: "ygggg"
            },
        ]


    // async function getResult() {
    //     try {
    //         const wordleRes = await fetchWordleResult(requestItem);
    //         console.log("Guess:", wordleRes);
    //         return wordleRes
    //     } catch (error) {
    //         console.log("Error:", error);
    //     }
    // }

    // const result = getResult();



    useEffect(() => {
        async function fetchWordleData() {
            try {
                const response = await fetchWordleResult(requestItem);
                setWordleResponse(response);
            } catch (err) {
                setError(err);
            }
        }

        fetchWordleData();
    }, []); // Run once when the component mounts

    // console.log('here is result', result);
    // return (
    //     <div>
    //         hello
    //         { result }
    //     </div>
    // )


    return (
        <div>
            {wordleResponse && <p>Guess: {wordleResponse.guess}</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}

export default WordleBot;