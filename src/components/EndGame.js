import React from 'react';


const EndGame = ({ allQuestions, resQuestions }) => {
    const initialReport = {
        id: ''
    }
    const [report, setReport] = React.useState(initialReport);

    const showStats = (questionID) => setReport(prev =>
        questionID === prev.id ? ({
            id: ''
        }) : ({
            id: questionID
        })
    );

    const getClass = (correctAswr, selectedID) => {
        let classVal = (correctAswr ? 'q-right' : 'q-wrong');

        if (correctAswr === null) {
            classVal = '';
        }

        if (report.id === selectedID) {
            return `quest-selected ${classVal}`;
        }

        return `quest-default ${classVal}`;
    }

    const getUserAnswer = (questionIdx, valueIdx) => {
        let refObject = resQuestions[questionIdx];

        if (refObject.selected[valueIdx] === `force${refObject.ref}`) {
            return;
        }
        return refObject.selected[valueIdx];
    };

    const editDifficulty = (level) => level.slice(0, 1).toUpperCase() + level.slice(1);

    const EndInterface = allQuestions.map((obj, idx) => {
        let userRight = getUserAnswer(idx, 1);
        let userString = getUserAnswer(idx, 0);
        let editCategory = decodeURIComponent(obj.category).replace(':', ' -');

        return (
            <React.Fragment key={obj.id}>
                <p
                    onClick={() => showStats(obj.id)}
                    className={`end-quest ${getClass(userRight, obj.id)}`}
                >
                    {idx + 1}. {decodeURIComponent(obj.question)}
                </p>
                {
                    report.id === obj.id && <ul className='end-list'>
                        <li>{editCategory}</li>
                        <li>Difficulty: {editDifficulty(obj.difficulty)}</li>
                        {userString && <li>Your Answer: {decodeURIComponent(userString)}</li>}
                        {!userRight && <li>Correct Answer: {decodeURIComponent(obj.correct_answer)}</li>}
                    </ul>
                }
            </React.Fragment>
        );
    });
// console.log(report)
    return (
        <div className='end-game'>
            {EndInterface}
        </div>
    );
}

export default EndGame;