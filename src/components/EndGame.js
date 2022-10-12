import React from 'react';


const EndGame = ({ allQuestions, resQuestions }) => {
    const initialReport = {
        show: false,
        id: ''
    }
    const [report, setReport] = React.useState(initialReport);

    const showStats = (questionID) => setReport(prev =>
        questionID === prev.id ? ({
            show: false,
            id: ''
        }) : ({
            show: true,
            id: questionID
        })
    );

    const getClass = (correctAswr, selectedID) => {
        let questRight = (correctAswr ? 'q-right' : 'q-wrong');

        if (report.id === selectedID) {
            return `quest-selected ${questRight}`;
        }

        return `quest-default ${questRight}`;
    }

    const editDifficulty = (level) => level.slice(0, 1).toUpperCase() + level.slice(1);
    const getUserAnswer = (questionIdx, valueIdx) => resQuestions[questionIdx].selected[valueIdx];

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
                    report.show && report.id === obj.id && <ul className='end-list'>
                        <li>{editCategory}</li>
                        <li>Difficulty: {editDifficulty(obj.difficulty)}</li>
                        <li>Your Answer: {decodeURIComponent(userString)}</li>
                        {
                            !userRight && <li>
                                Correct Answer: {decodeURIComponent(obj.correct_answer)}
                            </li>
                        }
                    </ul>
                }
            </React.Fragment>
        );
    });

    return (
        <div className='end-game'>
            {EndInterface}
        </div>
    );
}

export default EndGame;