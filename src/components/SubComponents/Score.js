import React from 'react';


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
                throw new Error(`Switch Error Action`);
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

    const succesRategt = (rateToCompare) => (score.rightCount / score.totalQuestions) > rateToCompare;

    return (
        finish === 'end game'
        ?
        <div className='score'>
            {
                score.round < 2
                ?
                <React.Fragment>
                    <p>{succesRategt(0.4) ? 'Congrats!!' : 'Keep Working!!'}</p>
                    {
                        !succesRategt(0.2)
                        ?
                        <p>You can do better next time!!</p>
                        :
                        <p>You got {score.rightCount} question{score.rightCount > 1 && 's'} right!</p>
                    }
                </React.Fragment>
                :
                <React.Fragment>
                    <p>Round {score.round} done!!</p>
                    <p>
                        You got {score.rightCount} question{score.rightCount > 1 && 's'} right so far!<br />
                        {!succesRategt(0.4) && 'Keep Working!'}
                    </p>
                </React.Fragment>
            }
        </div>
        :
        <div className='score'>
            <p>Score {score.rightCount}/{score.totalQuestions}</p>
            <div className='score-stats'>
                <p title={`Category ${decodedCategory}`}>{editCategory}</p>
                <p title={`Difficulty ${editDifficulty}`}>{editDifficulty}</p>
            </div>
        </div>
    );
}

export default Score;