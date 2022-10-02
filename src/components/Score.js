import React from 'react';


const Score = ({ toRender, resQuestions, finish }) => {
    const initialState = {
        totalQuestions: resQuestions.length,
        rightCount: 0
    }
    const [score, setScore] = React.useState(initialState);

    /**
     * Score is not resetting when Keep Playing is clicked
     * BUT that can be good
     * You should use this to just figure out how to increase total questions every time
     * Keep Playing is clicked so the score keeps going
     * or just reset everything and create a EndGame page
    **/

    /**
     * Also there's a bug at last question
     * if keep playing is clicked for some reason it adds one more to rightCount
    **/
    React.useEffect(() => {
        console.log('coucou')
        // doesn't need this foreach
        // just add every time questionRef.selected.includes(true)
        // this happen because its a loop
        // gonna add every time it runs and the conditional its met
        resQuestions.forEach(item => {
            if (item.resolve === 'resolve' && item.selected[1]) {
                setScore(prev => ({
                    ...prev,
                    rightCount: prev.rightCount += 1
                }));
            }
        });
    }, [resQuestions, finish]);

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