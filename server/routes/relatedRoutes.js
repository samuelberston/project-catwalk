const router = require('express').Router();
const axios = require('axios');
const config = require('../../config.js');
const outfitList = require('../models/outfitList');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/';
const headers = {
  headers: {
    'User-Agent': 'request',
    Authorization: `${config.TOKEN}`,
  },
};

const average = (ratings) => {
  const rates = Object.keys(ratings);
  let totalReviews = 0;
  let totalRatings = 0;
  if (rates.length === 0) { return null; }
  for (let i = 0; i < rates.length; i += 1) {
    totalRatings += rates[i] * parseInt(ratings[rates[i]], 10);
    totalReviews += parseInt(ratings[rates[i]], 10);
  }
  return totalRatings / totalReviews;
};

const requestProductInfo = (productId) => axios.get(`${url}products/${productId}`, headers);
const requestProductReviewsMeta = (productId) => axios.get(`${url}reviews/meta?product_id=${productId}`, headers);
const requestProductStyle = (productId) => axios.get(`${url}products/${productId}/styles`, headers);
const requestData = (productId) => Promise.all([
  requestProductInfo(productId),
  requestProductStyle(productId),
  requestProductReviewsMeta(productId),
]).then((results) => {
  const productInfo = results[0].data;
  productInfo.sale_price = results[1].data.results[0].sale_price;
  productInfo.thumbnail_url = results[1].data.results[0].photos[0].url;
  productInfo.average_ratings = average(results[2].data.ratings);
  return productInfo;
});

router.get('/relatedProducts', (req, res) => {
  axios
    .get(`${url}products/${req.query.product_id}/related`, headers)
    .then((response) => {
      // store current product info in the first element
      const wait = [requestData(req.query.product_id)];
      const related = [...(new Set(response.data))];
      for (let i = 0; i < related.length; i += 1) {
        wait.push(requestData(related[i]));
      }
      Promise.all(wait)
        .then((dataList) => {
          res.status(200).send(dataList);
        });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/outfitList', (req, res) => {

});

module.exports = router;
