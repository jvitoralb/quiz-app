import React from 'react';


const Questions = ({ obj, idx, finish}) => {

    const getClass = () => {
        const { selected } = obj;

        if (!finish || !selected.length) {
            return ''
        }

        return selected[1] ? 'q-right' : 'q-wrong';
    }

    return (
        <div className='question-stats'>
            <p className={`question ${getClass()}`}>
                {idx + 1}. {decodeURIComponent(obj.question)}
            </p>
            <p className='stats'>{decodeURIComponent(obj.category)}</p>
        </div>
    );
}

export default Questions;