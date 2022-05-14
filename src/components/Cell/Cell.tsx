import React from 'react';
import { Result } from '../../types';
import './cell.scss';

function Cell({ name, image, status, species }: Result) {
  return (
    <div className='cell'>
      <div className='cell__image'>
        <img src={image} alt={name} loading='lazy' />
      </div>
      <div className='cell__info'>
        <h3 className='cell__name'>
          <strong>Name:</strong> {name}
        </h3>
        <p className='cell__status'>
          <strong>Status:</strong>
          {status}
        </p>
        <p className='cell__species'>
          <strong>Species:</strong>
          {species}
        </p>
      </div>
    </div>
  );
}

export default Cell;
