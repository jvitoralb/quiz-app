import React from 'react';


const Options = (props) => {
    const { obj, select, finish } = props;

    const getClassName = (aswr) => {
        let { selected, correct_answer } = obj;

        if (!finish) {
            return obj.selected.includes(aswr) ? 'selected' : '';
        }

        if (selected.includes(aswr)) {
            return selected[1] ? 'selected-right' : 'selected-wrong';
        }

        return correct_answer === aswr ? 'selected-right' : undefined;
    }

    return (
        <React.Fragment>
            {
                obj.answers.map((aswr, aIdx) => (
                    <li
                        key={aIdx}
                        onClick={() => select(aswr, obj.id)}
                        className={`default-items ${getClassName(aswr)}`}
                    >
                        {decodeURIComponent(aswr)}
                    </li>
                ))
            }
        </React.Fragment>
    );
}

export default Options;