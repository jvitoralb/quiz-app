import React from 'react';


const Score = ({ toRender, resQuestions }) => {
    const initialState = {
        totalQuestions: resQuestions.length,
        rightCount: 0
    }
    const [score, setScore] = React.useState(initialState);

    /**
     * Decide what to do with Score when Keep Playing is selected
    **/

    React.useEffect(() => {
        resQuestions.forEach(item => {
            if (item.resolve === 'resolve' && item.selected[1]) {
                setScore(prev => ({
                    ...prev,
                    rightCount: prev.rightCount += 1
                }));
            }
        });
    }, [resQuestions]);

    const decodedCategory = decodeURIComponent(toRender.category);

    const editedCategory = ((category) => {
        return category.replace('Entertainment: ', '');
    })(decodedCategory);

// console.log(score)
    return (
        <React.Fragment>
            <div className='score'>
                <p>Score {score.rightCount}/{score.totalQuestions}</p>
                <p title={`Category ${decodedCategory}`}>{editedCategory}</p>
            </div>

            {/* Dev */}
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