import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';


const Footer = () => (
    <footer id='footer' className='footer-socials'>
        <a
            title='Visit GitHub in a new tab'
            href='https://github.com/jvitoralb'
            rel='noreferrer'
            target={'_blank'}
        >
            <FaGithub
                size={28}
            />
        </a>
        <a
            title='Visit LinkedIn in a new tab'
            href='https://www.linkedin.com/in/jvitor-albuquerque/'
            rel='noreferrer'
            target={'_blank'}
        >
            <FaLinkedinIn
                size={28}
            />
        </a>
    </footer>
);

export default Footer;