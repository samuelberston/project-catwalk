/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import DefaultView from './DefaultView';
import Thumbnail from './Thumbnail';
import css from './ImageGallery.css';

const ImageGallery = ({
  styleId, style, defaultView, renderDefaultView,
}) => {
  const [photo, photos] = [style.photos[0], style.photos.slice(1)];
  return (
    <div className={css.imageGallery} styleid={styleId}>
      <DefaultView url={defaultView} />
      <div className={css.thumbnailView}>
        <div className={css.thumbnails}>
          <div key={`first ${photo.url.toString()}`}>
            <Thumbnail url={photo.url} onClick={renderDefaultView} defaultChecked />
          </div>
          {photos.map((thumbnail, i) => (
            <div key={`${i} ${thumbnail.url.toString()}`}>
              <Thumbnail url={thumbnail.url} onClick={renderDefaultView} />
            </div>
          ))}
        </div>
        <span className={`fa fa-chevron-down ${css.arrow}`} />
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  style: PropTypes.shape({
    style_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    original_price: PropTypes.string.isRequired,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool.isRequired,
    photos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    skus: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
  styleId: PropTypes.number.isRequired,
  defaultView: PropTypes.string.isRequired,
  renderDefaultView: PropTypes.func.isRequired,
};

export default ImageGallery;
