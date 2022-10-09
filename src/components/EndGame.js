import React from 'react';


const EndGame = ({ allQuestions, resQuestions }) => {
    const [report, setReport] = React.useState({
        show: false,
        id: ''
    });

    const showStats = (questionID) => setReport(prev =>
        questionID === prev.id ? ({
            show: false,
            id:''
        }) : ({
            show: true,
            id: questionID
        })
    );

    const getClass = (correctAswr, selectedID) => {
        let correctQuest = (correctAswr ? 'q-right' : 'q-wrong');

        if (report.id === selectedID) {
            return `quest-selected ${correctQuest}`;
        }

        return `quest-default ${correctQuest}`;
    }

    return (
        allQuestions.map((obj, idx) => (
            <div key={obj.id} className='end-game'>
                <p
                    onClick={() => showStats(obj.id)}
                    className={`end-quest ${getClass(resQuestions[idx].selected[1], obj.id)}`}
                >
                    {idx + 1}. {decodeURIComponent(obj.question)}
                </p>
                {
                    (report.show && report.id === obj.id) && <ul className='end-list'>
                        <li>
                            Category: {decodeURIComponent(obj.category).replace(':', ' -')}
                        </li>
                        <li>
                            Difficulty: {decodeURIComponent(obj.difficulty)}
                        </li>
                        {
                            !resQuestions[idx].selected[1] &&
                            <li>
                                Correct Answer: {decodeURIComponent(obj.correct_answer)}
                            </li>
                        }
                        <li>
                            Your Answer: {decodeURIComponent(resQuestions[idx].selected[0])}
                        </li>
                    </ul>
                }
            </div>
        ))
    );
}

export default EndGame;