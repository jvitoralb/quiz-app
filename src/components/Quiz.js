import React from 'react';
import Options from './SubComponents/Options';
import Questions from './SubComponents/Questions';
import Waiting from './SubComponents/Waiting';
import Buttons from './SubComponents/Buttons';
import Score from './SubComponents/Score';
import EndGame from './EndGame';
import './Styling/styling.css';


const Quiz = ({ status, restart, settings }) => {
    const initialGame = {
        allQuestions: [],
        resQuestions: []
    }
    const initialConfig = {
        finish: 'start',
        forceAswr: false
    }

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

        const getQuestions = async () => {
            try {
                // console.log('API Call fired')
                const response = await fetch(`https://opentdb.com/api.php?amount=5${settings}&encode=url3986`);
                const data = await response.json();
                questState(data.results);
            } catch(err) {
                console.error(err);
            }
        }

        if (['start', 'play again'].includes(config.finish) && status) {
            getQuestions();
        }
    }, [config.finish, settings, status]);

    React.useEffect(() => {
        const questArr = game.resQuestions;
        if (questArr.length && questArr.every(obj => obj.resolve === 'done')) {
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

    const selectAnswer = (item, questionID) => setGame(prevGame => ({
            ...prevGame,
            resQuestions: prevGame.resQuestions.map(resObj =>
                resObj.ref === questionID ? ({
                    ...resObj,
                    selected: (
                        resObj.selected.includes(item) ? [] : [item, item === questionToRender.correct_answer]
                    )
                }) : resObj
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
                        selected: [`force${obj.ref}`, null],
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

    const finishGame = () => setConfig(prevConfig => ({
            ...prevConfig,
            finish: 'play again'
        })
    );

    const quitGame = () => {
        setGame(initialGame);
        setConfig(initialConfig);
        restart();
    }

    return (
        config.finish === 'start'
        ?
        <Waiting
            status={status}
        />
        :
        <React.Fragment>
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
                        finish={config.finish}
                    />
                    <Options
                        {...config}
                        select={selectAnswer}
                        toRenderRef={questionRef}
                        toRender={questionToRender}
                    />
                </React.Fragment>
            }
            <Buttons
                {...config}
                toRenderRef={questionRef}
                resQuestions={game.resQuestions}
                util={{forceAnswer, showAnswer, finishGame, updateRender, quitGame}}
            />
        </React.Fragment>
    );
}

export default Quiz;