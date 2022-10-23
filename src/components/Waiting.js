import React from 'react';


export const LoadingScore = () => (
    <React.Fragment>
        <p className='loading-anim'></p>
        <div className='score-stats'>
            <p className='loading-anim'></p>
            <p className='loading-anim'></p>
        </div>
    </React.Fragment>
);

export const LoadingOptions = () => (
    <React.Fragment>
        <li className='loading-anim'></li>
        <li className='loading-anim'></li>
        <li className='loading-anim'></li>
        <li className='loading-anim'></li>
    </React.Fragment>
);

const Waiting = ({ status }) => (
    status && <React.Fragment>
        <div className='score'>
            <LoadingScore />
        </div>
        <p className='loading-anim'></p>
        <ul className='list-options'>
            <LoadingOptions />
        </ul>
    </React.Fragment>
);

export default Waiting;