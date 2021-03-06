import React from 'react';

import css from './Checkout.css';

const AddToBagButton = () => (
  <button type="submit" value="addToBag" className={css.addToCartButton}>
    <span className="fa fa-shopping-bag" />
    &nbsp;
    ADD TO BAG
  </button>
);

export default AddToBagButton;
