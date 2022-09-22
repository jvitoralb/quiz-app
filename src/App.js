import React from 'react';
import Quiz from './components/Quiz';
import Header from './components/Header';
import './components/Styling/styling.css';


const App = () => {
    const [gameStatus, setGameStatus] = React.useState(false);

    const start = () => setGameStatus(!gameStatus);

    // const devHomePage = (
    //     <React.Fragment>
    //         <p>Let's Play a really cool Trivia Quiz</p>
    //         <form>
    //             {/* 
    //                 set up a input to select category and difficulty
    //                 and also how many questions, max 10 default 5
    //             */}
    //         </form>
    //         <button onClick={start}>Start Playing</button>
    //     </React.Fragment>
    // );

    const HomePage = (
        <React.Fragment>
            {
                !gameStatus &&
                <div className='home'>
                    {/* <h1>Quiz</h1> */}
                    <p>Let's Play a really cool Trivia Quiz!</p>
                    <button 
                        onClick={start}
                        className='start-btn'
                    >
                        Start Playing
                    </button>
                </div>
            }
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Header />
            <main id='main' className='page-main'>
                <Quiz status={gameStatus} />
                {HomePage}
            </main>
        </React.Fragment>
    );
};

export default App;