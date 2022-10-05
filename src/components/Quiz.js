import React from 'react';
import Options from './Options';
import Questions from './Questions';
import Buttons from './Buttons';
import Score from './Score';
import './Styling/styling.css';


const Quiz = ({ status }) => {
    const initialGame = {
        allQuestions: [],
        resQuestions: []
    }
    const initialConfig = {
        finish: 'start',
        force: false
    }
    /**
     * try to better structure questions state
     * Create EndGame to appear as the Show Answer in the last question is clicked
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
                finish: false // not sure if I should keep this as a boolean
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

        if (config.finish === 'start' || config.finish === 'play again') {
            getData();
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

    const forceAnswer = (positive) => {
        if (positive) {
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
        }
        setConfig(prevGame => ({
            ...prevGame,
            force: false
        }));
    }

    const finishGame = () => setConfig(prevGame => ({
            ...prevGame,
            finish: 'play again'
        })
    );
console.log(game)
// console.log(config)
    return (
        <React.Fragment>
            {status &&
                <React.Fragment>
                    <Score
                        toRender={questionToRender}
                        resQuestions={game.resQuestions}
                        finish={config.finish}
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
                    <Buttons
                        force={config.force}
                        toRenderRef={questionRef}
                        resQuestions={game.resQuestions}
                        util={{forceAnswer, showAnswer, finishGame, updateRender}}
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
            }
        </React.Fragment>
    );
}

export default Quiz;