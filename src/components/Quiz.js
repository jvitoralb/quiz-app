import React from 'react';
import Options from './Options';
import Questions from './Questions';
import Buttons from './Buttons';
import Score from './Score';
import EndGame from './EndGame';
import './Styling/styling.css';


const Quiz = ({ status, restartStatus }) => {
    const initialGame = {
        allQuestions: [],
        resQuestions: []
    }
    const initialConfig = {
        finish: 'start',
        forceAswr: false
    }
    /**
     * API is called twice of rsome weird reason
     * try to better structure questions state
     * need to separate CSS files its quite messy
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
                finish: 'playing'
            }));
        }

        const getData = async () => {
            try {
                console.log('API Call fired')
                const response = await fetch('https://opentdb.com/api.php?amount=5&encode=url3986');
                const data = await response.json();
                questState(data.results);
            } catch(err) {
                console.log(err);
            }
        }

        if (['start', 'play again'].includes(config.finish)) {
            getData();
        }
    }, [config.finish]);

    React.useEffect(() => {
        if (game.resQuestions.every(obj => obj.resolve === 'done')) {
            setConfig(prevConfig => ({
                ...prevConfig,
                finish: 'end game'
            }));
        }
    }, [game.resQuestions]);

    const { questionToRender, questionIndex, questionRef } = (() => {
        let refObj = game.resQuestions.find((obj, idx, arr) => {
            if (idx === arr.length - 1) return arr.at(-1); // stop at -1 so EndGame is rendered
            return ['initial', 'resolve'].includes(obj.resolve);
        });
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
            ...prevGame,
            resQuestions: prevGame.resQuestions.map(selectObj =>
                selectObj.ref === questionID ? ({
                    ...selectObj,
                    selected: (selectObj.selected.includes(item) ? [] : [item, correct(item, questionID)])
                }) : selectObj
            )
        })
    );

    const showAnswer = () => {

        if (!questionRef.selected.length) {
            return setConfig(prevConfig => ({
                ...prevConfig,
                forceAswr: true
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

    const forceAnswer = (positive) => {
        if (positive) {
            setGame(prevGame => ({
                ...prevGame,
                resQuestions: prevGame.resQuestions.map(obj =>
                    obj === questionRef ? ({
                        ...obj,
                        selected: [`force-${obj.ref}`, false],
                        resolve: 'resolve'
                    }) : obj
                )
            }));
        }
        setConfig(prevGame => ({
            ...prevGame,
            forceAswr: false
        }));
    }

    const finishGame = () => setConfig(prevGame => ({
            ...prevGame,
            finish: 'play again'
        })
    );

    const quitGame = () => {
        setGame(initialGame);
        setConfig(initialConfig);
        restartStatus();
    }
console.log(game)
// console.log(config)
    return (
        status && <React.Fragment>
            <Score
                toRender={questionToRender}
                toRenderRef={questionRef}
                resQuestions={game.resQuestions}
                finish={config.finish}
            />
            {
                config.finish === 'end game'
                ?
                <EndGame
                    {...game}
                />
                :
                <React.Fragment>
                    <Questions
                        toRender={questionToRender}
                        toRenderIndex={questionIndex}
                        toRenderRef={questionRef}
                    />
                    <Options
                        toRender={questionToRender}
                        toRenderRef={questionRef}
                        forceAnswer={config.forceAswr}
                        select={selectAnswer}
                    />
                </React.Fragment>
            }
            <Buttons
                toRenderRef={questionRef}
                forceAswr={config.forceAswr}
                resQuestions={game.resQuestions}
                util={{forceAnswer, showAnswer, finishGame, updateRender, quitGame}}
            />

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
        </React.Fragment>
    );
}

export default Quiz;