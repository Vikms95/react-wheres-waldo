import React from 'react';
import { Link } from 'react-router-dom';

interface Props{
  content: string
  link: string
  className?: string
}

ModalButton.defaultProps = {
  className: '',
};

function ModalButton(props: Props) {
  const { content, className = '', link } = props;
  return (
    <Link to={`${link}`}>
      <button type="button" className={`${className}`}>
        {' '}
        {content}
      </button>
    </Link>
  );
}

export default ModalButton;
