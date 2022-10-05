import React from 'react';


const Buttons = ({ force, toRenderRef, resQuestions, util }) => {
    const {
        forceAnswer,
        showAnswer,
        finishGame,
        updateRender
    } = util;

    const buttonDisplay = {
        resolve: (clickFunc) => {
            let lastIndex = resQuestions.at(-1) === toRenderRef;

            if (clickFunc) {
                return lastIndex ? finishGame : updateRender;
            }
            return lastIndex ? 'Keep Playing' : 'Next Question';
        },
        initial: (clickFunc) => {
            if (clickFunc) {
                return showAnswer;
            }
            return 'Show Answer';
        }
    }

    return (
        <React.Fragment>
            {
                force
                ?
                <div className='select-warning'>
                    <p>You haven't selected any answer</p>
                    <button
                        className='warning-btn'
                        onClick={() => forceAnswer(true)}
                    >
                        Show Anyway
                    </button>
                    <button
                        className='warning-btn'
                        onClick={() => forceAnswer(false)}
                    >
                        Cancel
                    </button>
                </div>
                :
                <button
                    className='show-reset-btn'
                    onClick={buttonDisplay[toRenderRef.resolve](true)}
                >
                    {buttonDisplay[toRenderRef.resolve](false)}
                </button>
            }
        </React.Fragment>
    );
}

export default Buttons;