import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import WordleBot from "./components/WordleBot";
// import Guess from "./components/Guess";
// import Bot from "./components/Bot";

function App() {
    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                {/* Insert App here */}
                <WordleBot />
                {/* <Guess /> */}
            </Container>
        </Layout>
    );
}

export default App;
