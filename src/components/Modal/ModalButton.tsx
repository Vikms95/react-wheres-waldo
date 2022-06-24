import React from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable react/button-has-type */

interface Props{
  content: string
  link?: string
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
}

ModalButton.defaultProps = {
  className: '',
  link: '',
  type: '',
};

function ModalButton(props: Props) {
  const {
    content, className = '', link, type,
  } = props;
  return (
    <Link to={`${link}`}>
      <button type={type} className={`${className}`}>
        {' '}
        {content}
      </button>
    </Link>
  );
}

export default ModalButton;
