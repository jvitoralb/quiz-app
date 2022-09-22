import React from 'react';
import Quiz from './components/Quiz';
import Header from './components/Header';
import './components/Styling/styling.css';


const App = () => {
    const [gameStatus, setGameStatus] = React.useState(false);

    const start = () => setGameStatus(!gameStatus);

    // const devHomePage = (
    //     <div className='home'>
    //         <p>Let's Play a really cool Trivia Quiz</p>
    //         <form>
    //             <label>
    //                 Pick a Category
    //                 <select value={categories.category} onChange={selectCategory}>
    //                     <option value={'Any'}>Any category</option>
    //                     {/* Call API to get them all */}
    //                 </select>
    //             </label>
    //             <label>
    //                 Number of Questions
    //                 <select value={categories.number} onChange={selectNumber}>
    //                     <option value={5}>5</option>
    //                     <option value={10}>10</option>
    //                 </select>
    //             </label>
    //             <label>
    //                 Difficulty
    //                 <select value={categories.number} onChange={selectNumber}>
    //                     <option value={5}>5</option>
    //                     <option value={10}>10</option>
    //                 </select>
    //             </label>
    //         </form>
    //         <button onClick={start}>Start Playing</button>
    //     </div>
    // );

    const HomePage = (
        <React.Fragment>
            {
                !gameStatus &&
                <div className='home'>
                    {/* Both Quizz and homepage have div with class='home' */}
                    <p className='home-text'>Let's Play a really cool Trivia Quiz!</p>
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