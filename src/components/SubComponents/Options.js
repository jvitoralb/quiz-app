import React from 'react';
import { LoadingOptions } from '../Waiting';


const Options = ({ toRender, toRenderRef, select, forceAnswer, finish }) => {

    const getClass = (aswr) => {

        if (finish === 'play again') {
            return 'loading-anim';
        }

        if (toRenderRef.selected.includes(aswr)) {
            return 'selected';
        }

        if (toRenderRef.resolve === 'resolve') {
            return toRender.correct_answer === aswr ? 'selected-right' : '';
        }

        return '';
    }

    const canSelect = (toRenderRef.resolve === 'initial' && !forceAnswer);

    return (
        <ul className='list-options'>
            {
                toRender.answers.map((aswr, aIdx) => (
                    <li
                        key={aIdx}
                        onClick={() => (canSelect && select(aswr, toRender.id))}
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