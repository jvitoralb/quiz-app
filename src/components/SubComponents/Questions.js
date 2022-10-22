import React from 'react';


const Questions = ({ toRender, toRenderIndex, toRenderRef }) => {

    const getClass = () => {
        let classVal = '';

        if (toRenderRef.resolve === 'resolve') {
            classVal = (toRenderRef.selected[1] ? 'q-right' : 'q-wrong');
        }

        return toRenderRef.selected[1] === null ? '' : classVal;
    }

    const decodedQuestion = decodeURIComponent(toRender.question);

    return (
        <React.Fragment>
            <p
                title={decodedQuestion}
                className={`question ${getClass()}`}
            >
                {toRenderIndex + 1}. {decodedQuestion}
            </p>
        </React.Fragment>
    );
}

export default Questions;