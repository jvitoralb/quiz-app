import React from 'react';


const Questions = ({ obj, idx, finish}) => {

    const getClass = () => {
        const { selected } = obj;

        if (!finish || !selected.length) {
            return ''
        }

        return selected[1] ? 'q-right' : 'q-wrong';
    }

    const editCategory = (category) => category.replace('Entertainment: ', '');

    return (
        <div className='question-stats'>
            <p className={`question ${getClass()}`}>
                {/* it might be a good idea to add titles */}
                {idx + 1}. {decodeURIComponent(obj.question)}
            </p>
            <p className='stats'>
                {editCategory(decodeURIComponent(obj.category))}
            </p>
        </div>
    );
}

export default Questions;