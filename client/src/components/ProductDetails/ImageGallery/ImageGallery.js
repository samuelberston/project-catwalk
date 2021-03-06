/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import DefaultView from './DefaultView';
import Thumbnail from './Thumbnail';
import Up from './Up';
import Down from './Down';
import css from './ImageGallery.css';

class ImageGallery extends React.Component {
  static scrollUp() {
    const scroll = document.getElementById('thumbnailView');
    const currentScroll = scroll.scrollTop;
    if (currentScroll - 485 < 0) {
      scroll.scrollTop = 0;
    } else {
      scroll.scrollTop = Math.floor((currentScroll - (485)) / 121.25) * 121.25;
    }
  }

  static scrollDown() {
    const scroll = document.getElementById('thumbnailView');
    const scrollMax = scroll.scrollHeight - scroll.clientHeight;
    const currentScroll = scroll.scrollTop;
    if (currentScroll + (485) >= scrollMax) {
      scroll.scrollTop = scrollMax;
    } else {
      scroll.scrollTop = Math.floor((currentScroll + (485)) / 121.25) * 121.25;
    }
  }

  constructor(prop) {
    super(prop);
    this.state = {
      thumbnailScroll: 0,
    };
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  scrollHandler() {
    const scroll = document.getElementById('thumbnailView');
    const scrollMax = scroll.scrollHeight - scroll.clientHeight;
    const currentScroll = scroll.scrollTop;
    const { thumbnailScroll } = this.state;
    let index;
    if (currentScroll === scrollMax) {
      index = 1;
    }
    if (currentScroll === 0) {
      index = 0;
    }
    if (index !== thumbnailScroll) {
      this.setState({
        thumbnailScroll: index,
      });
    }
  }

  render() {
    const {
      styleId,
      style,
      id,
      leftClick,
      rightClick,
      renderDefaultView,
    } = this.props;
    const { thumbnailScroll } = this.state;
    return (
      <div id="imageGallery" className={css.imageGallery} styleid={styleId}>
        {style.photos[id].url !== null ? (
          <DefaultView
            id={id}
            max={style.photos.length}
            leftClick={leftClick}
            rightClick={rightClick}
            url={style.photos[id].thumbnail_url}
          />
        ) : ''}
        <div id="ThumbnailViewContainer" className={css.TV}>
          {thumbnailScroll === 0 ? (<div />) : (<Up scrollUp={ImageGallery.scrollUp} />)}
          <div className={css.thumbnailView}>
            <div id="thumbnailView" className={css.thumbnails} onScroll={this.scrollHandler}>
              {style.photos.map((thumbnail, i) => {
                let selected = 'notSelected';
                if (parseInt(id, 10) === i) {
                  selected = 'selected';
                }
                if (thumbnail.url !== null) {
                  return (
                    <div id="thumbnailPhoto" key={`${i} ${thumbnail.url.toString()}`}>
                      <Thumbnail
                        thmbId={i}
                        url={thumbnail.url}
                        onClick={renderDefaultView}
                        selected={selected}
                      />
                    </div>
                  );
                }
                return '';
              })}
            </div>
          </div>
          {(thumbnailScroll === 1 || style.photos.length < 5)
            ? (<div />) : (<Down scrollDown={ImageGallery.scrollDown} />)}
        </div>
      </div>
    );
  }
}

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
