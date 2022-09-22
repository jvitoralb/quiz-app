import React from 'react';


const Options = ({ obj, select, finish }) => {

    const getClass = (aswr) => {
        let { selected, correct_answer } = obj;

        if (selected.includes(aswr)) {
            return 'selected';
        }

        if (finish) {
            return correct_answer === aswr ? 'selected-right' : '';
        }

        return '';
    }

    return (
        <ul className='list-options'>
            {
                obj.answers.map((aswr, aIdx) => (
                    <li
                        key={aIdx}
                        onClick={() => !finish && select(aswr, obj.id)}
                        className={`default-items ${getClass(aswr)}`}
                    >
                        {decodeURIComponent(aswr)}
                    </li>
                ))
            }
        </ul>
    );
}

export default Options;