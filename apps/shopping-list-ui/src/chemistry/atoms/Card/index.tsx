import React from 'react';
import cardStyles from './Card.module.scss';
import classNames from 'classnames';

interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactFragment;
}

const Card = ({ className = '', style, children }: CardProps) => (
  <div className={classNames(cardStyles.c, className)} style={style}>
    {children}
  </div>
);

export default Card;
