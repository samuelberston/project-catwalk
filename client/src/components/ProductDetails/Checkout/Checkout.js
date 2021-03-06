import React from 'react';
import PropTypes from 'prop-types';

import SizeSelector from './SizeSelector';
import QtySelector from './QtySelector';
import AddToCart from './AddToCart';
import AddToWishList from './AddToWishList';

import css from './Checkout.css';

const Checkout = ({
  productId, style, addToCart, skuSelector, sku,
}) => {
  const { skus } = style;
  let qty = null;
  if (sku !== null && sku !== 'SELECT SIZE') {
    qty = skus[sku].quantity;
  }
  return (
    <div id="checkout" className={css.checkout}>
      <form onSubmit={addToCart} className={css.form}>
        <SizeSelector skus={skus} onChange={skuSelector} />
        <QtySelector qty={qty} />
        <div className={css.addToCartContainer}>
          <AddToCart sku={sku} css={css} />
        </div>
        <AddToWishList productId={productId} />
      </form>
    </div>
  );
};

Checkout.propTypes = {
  productId: PropTypes.number.isRequired,
  style: PropTypes.shape({
    style_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    original_price: PropTypes.string.isRequired,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool.isRequired,
    photos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    skus: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
  skuSelector: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  sku: PropTypes.string,
};

Checkout.defaultProps = {
  sku: null,
};

export default Checkout;
