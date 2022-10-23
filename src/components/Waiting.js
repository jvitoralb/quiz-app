import React from 'react';


const Waiting = ({ status }) => (
    status && <React.Fragment>
        <div className='score'>
            <p className='anim-test'></p>
            <div className='score-stats'>
                <p className='anim-test'></p>
                <p className='anim-test'></p>
            </div>
        </div>
        <p className='anim-test'></p>
        <ul className='list-options'>
            <li className='anim-test'></li>
            <li className='anim-test'></li>
            <li className='anim-test'></li>
            <li className='anim-test'></li>
        </ul>
    </React.Fragment>
);

export default Waiting;