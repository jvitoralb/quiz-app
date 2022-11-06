import React from 'react';
import { LoadingScore } from './Waiting';


const Score = ({ toRender, toRenderRef, resQuestions, finish }) => {
    const initialState = {
        totalQuestions: resQuestions.length,
        rightCount: 0,
        round: 1
    }

    const reset = (initial) => initial;

    const reducer = (state, action) => {
        switch(action.type) {
            case 'increment':
                return {
                    ...state,
                    rightCount: state.rightCount + 1
                }
            case 'play again':
                return {
                    ...state,
                    totalQuestions: state.totalQuestions + resQuestions.length,
                    round: state.round + 1
                }
            case 'reset':
                return reset(action.payload);
            default:
                throw new Error(`Reducer Action Error`);
        }
    }

    const [score, dispatch] = React.useReducer(reducer, initialState, reset);

    React.useEffect(() => {
        if (finish === 'play again') {
            dispatch({type: 'play again'});
        }
    }, [finish]);

    React.useEffect(() => {
        const { resolve, selected } = toRenderRef;

        if (resolve === 'resolve' && selected[1]) {
            dispatch({type: 'increment'});
        }
    }, [toRenderRef]);

    const decodedCategory = decodeURIComponent(toRender.category);

    const editDifficulty = ((level) =>
        level.slice(0, 1).toUpperCase() + level.slice(1)
    )(toRender.difficulty);

    const editCategory = ((category) =>
        category.replace('Entertainment: ', '')
    )(decodedCategory);

    const successRategt = (rateToCompare) => (score.rightCount / score.totalQuestions) > rateToCompare;

    const scoreBoard = {
        'play again': () => (
            <LoadingScore />
        ),
        'playing': () => (
            <React.Fragment>
                <p>Score {score.rightCount}/{score.totalQuestions}</p>
                <div className='score-stats'>
                    <p title={`Category ${decodedCategory}`}>{editCategory}</p>
                    <p title={`Difficulty ${editDifficulty}`}>{editDifficulty}</p>
                </div>
            </React.Fragment>
        ),
        'end game': () => {
            let effect = successRategt(0.4) ? 'Congrats!!' : 'Keep Working!!';
            let feedback = `You got ${score.rightCount} question${score.rightCount > 1 && 's'} right`;
            return (
                score.round < 2
                ?
                <React.Fragment>
                    <p>{effect}</p>
                    {
                        !successRategt(0.2)
                        ?
                        <p>You can do better next time!!</p>
                        :
                        <p>{feedback}!</p>
                    }
                </React.Fragment>
                :
                <React.Fragment>
                    <p>Round {score.round} done!!</p>
                    <p>
                        {feedback} so far! <br /> {effect}
                    </p>
                </React.Fragment>
            )
        }
    }

    return (
        <div className='score'>
            {scoreBoard[finish]()}
        </div>
    );
}

export default Score;