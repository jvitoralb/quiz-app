import React, { useReducer } from 'react';


const Score = ({ toRender, resQuestions, finish }) => {
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
                    totalQuestions: resQuestions.length + resQuestions.length
                }
            default:
                throw new Error('something went wrong switch');
        }
    }

    const initialState = {
        totalQuestions: resQuestions.length,
        rightCount: 0
    }

    const [score, dispatch] = useReducer(reducer, initialState);

    React.useEffect(() => {
        if (finish === 'play again') {
            dispatch({type: 'play again'});
        }
    }, [finish]);

    React.useEffect(() => {
        resQuestions.forEach(item => {
            if (item.resolve === 'resolve' && item.selected[1]) {
                dispatch({type: 'increment'});
            }
        });
    }, [resQuestions]);

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
            <div className='score'>
                <p>Score {score.rightCount}/{score.totalQuestions}</p>
                <p title={`Category ${decodedCategory}`}>{editCategory}</p>
                <p title={`Difficulty ${editDifficulty}`}>{editDifficulty}</p>
            </div>

            {/* Dev 
            <button onClick={
                () => setScore(initialState)}
            >
                dev
            </button>
            {/* Dev */}
        </React.Fragment>
    );
}

export default Score;