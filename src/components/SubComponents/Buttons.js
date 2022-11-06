import React from 'react';
import { IoExitOutline } from 'react-icons/io5'


const Buttons = (props) => {
    let { forceAswr, finish, toRenderRef, resQuestions, util } = props;

    const {
        forceAnswer,
        showAnswer,
        finishGame,
        updateRender,
        quitGame
    } = util;

    const buttonDisplay = {
        resolve: (clickFunc) => {
            let lastIndex = resQuestions.at(-1) === toRenderRef;

            if (clickFunc) {
                return updateRender;
            }
            return lastIndex ? 'Next' : 'Next Question';
        },
        initial: (clickFunc) => {
            if (clickFunc) {
                return showAnswer;
            }
            return 'Show Answer';
        },
        done: (clickFunc) => {
            if (clickFunc) {
                return finishGame;
            }
            return 'Play Again';
        }
    }

    return (
        forceAswr
        ?
        <div className='select-warning'>
            <p>You haven't selected any option!</p>
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
        ['playing', 'end game'].includes(finish) && <div className='btn-wrapper'>
            <button
                className='show-answer-btn'
                onClick={buttonDisplay[toRenderRef.resolve](true)}
            >
                {buttonDisplay[toRenderRef.resolve](false)}
            </button>
            <button
                className='exit-btn'
                onClick={quitGame}
            >
                <IoExitOutline />
            </button>
        </div>
    );
}

export default Buttons;