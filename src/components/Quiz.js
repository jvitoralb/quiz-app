import React from 'react';
import Options from './Options';
import './Styling/styling.css';


const Quiz = ({ status }) => {
    const initialState = {
        finish: false,
        results: []
    }
    const [game, setGame] = React.useState(initialState);

    const getID = () => Math.random().toString(36).substring(6);

    const startPlaying = () => {
        const questState = (quizData) => {
            setGame(prevGame => ({
                ...prevGame,
                results: quizData.map((obj, idx) => {
                    const { correct_answer, incorrect_answers, type, ...rest } = obj;
                    return {
                        ...rest,
                        id: idx + getID(),
                        correct_answer,
                        selected: [],
                        answers: [...incorrect_answers, correct_answer].sort(() => 0.5 - Math.random())
                    }
                })
            }));
        }
        if (!game.results.length) {
        /**
         * Unecessary if statement && also bugs play again feature - dev 
         */
            fetch('https://opentdb.com/api.php?amount=5&encode=url3986')
            .then(res => res.json())
            .then(data => questState(data.results))
                .catch(err => console.log(err))
        }
    }
    React.useEffect(startPlaying, []);

    const selectAnswer = (item, questID) => {
        const correct = (rightAnswer) => item === rightAnswer;

        setGame(prevGame => ({
            ...prevGame,
            results: prevGame.results.map(obj =>
                questID === obj.id ? ({
                    ...obj,
                    selected: [item, correct(obj.correct_answer)]
                }) : obj
            )
        }));
    }

    const showAnswers = () => {
        setGame(prevGame => ({
            ...prevGame,
            finish: true
        }));
    }

    const resetGame = () => {
        setGame(initialState);
        startPlaying();
    }

    const showResetButton = {
        true: (click) => click ? resetGame : 'Play Again',
        false: (click) => click ? showAnswers : 'Show Answers'
    }
// console.log(game)
    return (
        <React.Fragment>
            {status &&
                <div className='home'>
                    {
                        game.results.map((obj, idx) => (
                            <React.Fragment key={idx}>
                                <div className='question-stats'>
                                    <p className='question'>{idx + 1}. {decodeURIComponent(obj.question)}</p>
                                    <p className='stats'>{decodeURIComponent(obj.category)}</p>
                                </div>
                                <ul className='list-options'>
                                    <Options
                                        obj={obj}
                                        select={selectAnswer}
                                        finish={game.finish}
                                    />
                                </ul>
                            </React.Fragment>
                        ))
                    }
                    <button
                        onClick={showResetButton[game.finish](true)}
                        className='show-reset-btn'
                    >
                        {showResetButton[game.finish]()}
                    </button>

                    {/* Dev */}
                    <button onClick={
                        () => setGame(prevGame => ({
                            ...prevGame,
                            finish: false,
                            results: prevGame.results.map(obj => ({
                                    ...obj,
                                    selected: []
                                })
                            )
                        }))}
                    >
                        dev
                    </button>
                    {/* Dev */}
                </div>
            }
        </React.Fragment>
    );
}

export default Quiz;