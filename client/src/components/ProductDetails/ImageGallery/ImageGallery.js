/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import DefaultView from './DefaultView';
import Thumbnail from './Thumbnail';
import css from './ImageGallery.css';

const ImageGallery = ({
  styleId, style, id, leftClick, rightClick, renderDefaultView,
}) => {
  const [photo, photos] = [style.photos[0], style.photos.slice(1)];
  console.log('id', id, 'style', style);
  return (
    <div className={css.imageGallery} styleid={styleId}>
      <DefaultView
        id={id}
        max={style.photos.length}
        leftClick={leftClick}
        rightClick={rightClick}
        url={style.photos[id].url}
      />
      <div className={css.thumbnailView}>
        <div className={css.thumbnails}>
          <div key={`first ${photo.url.toString()}`}>
            <Thumbnail id={0} url={photo.url} onClick={renderDefaultView} defaultChecked />
          </div>
          {photos.map((thumbnail, i) => (
            <div key={`${i} ${thumbnail.url.toString()}`}>
              <Thumbnail id={i + 1} url={thumbnail.url} onClick={renderDefaultView} />
            </div>
          ))}
        </div>
        <div className={css.arrow}>
          <span className="fa fa-chevron-down" />
        </div>
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
  id: PropTypes.number.isRequired,
  leftClick: PropTypes.func.isRequired,
  rightClick: PropTypes.func.isRequired,
  renderDefaultView: PropTypes.func.isRequired,
};

export default ImageGallery;
