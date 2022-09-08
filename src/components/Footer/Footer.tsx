import React, { FC } from 'react';
import { AiFillGithub } from 'react-icons/ai';

const getCurrentYear = () => new Date().getFullYear();

const Footer: FC = () => {
  return (
    <footer
      className={
        'flex flex-col justify-center items-center absolute bottom-0 py-5'
      }
    >
      <span>© {getCurrentYear()} Domen Perko Web Development, Inc.</span>
      <a
        href={'https://github.com/perkzen/finanzo'}
        className={'flex flex-row justify-center items-center gap-2'}
      >
        <AiFillGithub />
        Github
      </a>
    </footer>
  );
};

export default Footer;
