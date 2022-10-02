import React from 'react';
import Options from './Options';
import Questions from './Questions';
import Score from './Score';
import './Styling/styling.css';


const Quiz = ({ status }) => {
    const initialGame = {
        allQuestions: [],
        resQuestions: []
    }
    const initialConfig = {
        finish: false,
        force: false
    }
    /**
     * also try to to structure questions state better
     * Perhaps add a EndGame component
     * with the right and wrong questions + difficulty + category
    **/
    const [config, setConfig] = React.useState(initialConfig);
    const [game, setGame] = React.useState(initialGame);

    const getID = () => Math.random().toString(36).substring(6);

    React.useEffect(() => {
        const questState = (results) => {
            setGame(() => {
                let questionsArr = results.map((obj, idx) => {
                    const { correct_answer, incorrect_answers, type, ...rest } = obj;
                    return {
                        ...rest,
                        id: idx + getID(),
                        correct_answer,
                        answers: [...incorrect_answers, correct_answer].sort(() => 0.5 - Math.random())
                    }
                });
                return {
                    allQuestions: questionsArr,
                    resQuestions: questionsArr.map(obj => ({
                            ref: obj.id,
                            resolve: 'initial',
                            selected: []
                        })
                    )
                }
            });
            setConfig(prevConfig => ({
                ...prevConfig,
                finish: false
            }));
        }
        if (config.finish) {
            /*
            * When finish dev clear this if statement
            */
            fetch('https://opentdb.com/api.php?amount=5&encode=url3986')
            .then(res => res.json())
            .then(data => questState(data.results))
                .catch(err => console.log(err));
        }
    }, [config.finish]);

    const { questionToRender, questionIndex, questionRef } = (() => {
        let refObj = game.resQuestions.find(obj => (obj.resolve === 'initial' || obj.resolve === 'resolve'));
        let [question] = game.allQuestions.filter(obj => obj.id === refObj.ref);
        let index = game.allQuestions.findIndex(obj => obj === question);

        return {
            questionToRender: question,
            questionIndex: index,
            questionRef: refObj
        }
    })();

    const updateRender = () => setGame(prevGame => ({
        ...prevGame,
        resQuestions: prevGame.resQuestions.map(obj =>
            obj.resolve === 'resolve' ? ({
                ...obj,
                resolve: 'done'
            }) : obj
        )
    }));

    const correct = (answer) => answer === questionToRender.correct_answer;

    const selectAnswer = (item, questionID) => setGame(prevGame => ({
        /**
         * Think about unselecting a option
         * when a selected option is clicked
        **/
            ...prevGame,
            resQuestions: prevGame.resQuestions.map(selectObj =>
                selectObj.ref === questionID ? ({
                    ...selectObj,
                    selected: [item, correct(item, questionID)]
                }) : selectObj
            )
        })
    );

    const showAnswer = () => {

        if (!questionRef.selected.length) {
            return setConfig(prevConfig => ({
                ...prevConfig,
                force: true
            }));
        }

        setGame(prevGame => ({
            ...prevGame,
            resQuestions: prevGame.resQuestions.map(resQ =>
                resQ.ref === questionToRender.id ? ({
                    ...resQ,
                    resolve: 'resolve'
                }) : resQ
            )
        }));
    }

    const resetForce = () => setConfig(prevGame => ({
            ...prevGame,
            force: false
        })
    );

    const forceAnswer = () => {
        setGame(prevGame => ({
            ...prevGame,
            resQuestions: prevGame.resQuestions.map(obj => 
                obj === questionRef ? ({
                    ...obj,
                    selected: [`force-${getID()}`, false],
                    resolve: 'resolve'
                }) : obj
            )
        }));
        resetForce()
    }

    const finishGame = () => setConfig(prevGame => ({
            ...prevGame,
            finish: true
        })
    );

    const buttonDisplay = {
        resolve: (clickFunc) => {
            let lastIndex = game.resQuestions.length - 1 === questionIndex;
            if (clickFunc) {
                return lastIndex ? finishGame : updateRender;
            }
            return lastIndex ? 'Keep Playing' : 'Next Question';
        },
        initial: (clickFunc) => {
            if (clickFunc) {
                return showAnswer;
            }
            return 'Show Answer';
        }
    }

// console.log(game)
// console.log(config)
    return (
        <React.Fragment>
            {status &&
                <div className='home'>
                    <Score
                        toRender={questionToRender}
                        resQuestions={game.resQuestions}
                    />
                    <Questions
                        toRender={questionToRender}
                        toRenderIndex={questionIndex}
                        toRenderRef={questionRef}
                    />
                    <Options
                        toRender={questionToRender}
                        toRenderRef={questionRef}
                        forceAnswer={config.force}
                        select={selectAnswer}
                    />
                    {
                        config.force
                        ?
                        <div className='select-warning'>
                            <p>You haven't selected any answer</p>
                            <button
                                onClick={forceAnswer}
                            >
                                Show Anyways
                            </button>
                            <button
                                onClick={resetForce}
                            >
                                Cancel
                            </button>
                        </div>
                        :
                        <button
                            className='show-reset-btn'
                            onClick={buttonDisplay[questionRef.resolve](true)}
                            >
                            {buttonDisplay[questionRef.resolve](false)}
                        </button>
                    }

                    {/* Dev 
                    <button onClick={
                        () => setGame(prevGame => ({
                            ...prevGame,
                            finish: false,
                            resQuestions: prevGame.resQuestions.map(
                                ({ ref }) => ({ref, resolve: 'initial', selected: []})
                            )
                        }))}
                        style={{padding: `${10}px`}}
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