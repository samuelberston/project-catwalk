import React from 'react';
import propTypes from 'prop-types';
import Drop from './Drop';
import style from './css/card.css';

const CardOutfit = ({ item, dropHandler }) => (
  <div className={style.card} id={`card${item.id.toString()}`}>
    <Drop id={item.id} dropHandler={dropHandler} />
    <img className={style.cardImg} src={item.thumbnail_url} alt={item.name} />
    <h3 className="cardName">
      {item.name}
    </h3>
    <h5>
      {item.default_price}
    </h5>
  </div>
);

CardOutfit.propTypes = {
  item: propTypes.shape({
    name: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    default_price: propTypes.string.isRequired,
    thumbnail_url: propTypes.string.isRequired,
  }).isRequired,
  dropHandler: propTypes.func.isRequired,
};

export default CardOutfit;
