import React from 'react';


const Score = ({ toRender, toRenderRef, resQuestions, finish }) => {
    const initialState = {
        totalQuestions: resQuestions.length,
        rightCount: 0
    }

    const reset = () => initialState;

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
                    totalQuestions: state.totalQuestions + resQuestions.length
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
// console.log(score)
    return (
        <React.Fragment>
            {
                finish === 'end game' ?
                <div
                    className='score'
                    style={{flexDirection: 'column', paddingTop: '0'}}
                >
                    {
                        score.rightCount >= 1 ?
                        <React.Fragment>
                            <p>Congrats!!</p>
                            <p>You got {score.rightCount} {score.rightCount > 1 ? 'questions' : 'question'} right!</p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <p>Fighting!!</p>
                            <p>You can do better next time!</p>
                        </React.Fragment>
                    }
                </div>
                :
                <div className='score'>
                    <p>Score {score.rightCount}/{score.totalQuestions}</p>
                    <p title={`Category ${decodedCategory}`}>{editCategory}</p>
                    <p title={`Difficulty ${editDifficulty}`}>{editDifficulty}</p>
                </div>
            }

            {/* Dev 
            <button onClick={
                () => dispatch({type: 'reset', payload: initialState})
            }
            >
                dev
            </button>
            {/* Dev */}
        </React.Fragment>
    );
}

export default Score;