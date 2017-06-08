const axios = require('axios');
const axiosRetry = require('axios-retry');
const NodeCache = require('node-cache');
const slug = require('slug');
const results = require('./data/results');
const post = require('./data/post');

module.exports = (app) => {
  axiosRetry(axios, { retries: 3 });

  const baseURL = 'https://api.mercadolibre.com';
  const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

  const search = query => axios.get(`${baseURL}/sites/MLC/search?q=${query}&limit=4`);
  const getItem = id => axios.get(`${baseURL}/items/${id}`);
  const getDescription = id => axios.get(`${baseURL}/items/${id}/description`);
  const getCategories = id => axios.get(`${baseURL}/categories/${id}`);

  app.get('/api/items', (req, res) => {
    if (!req.query.q) {
      res.status(400).send('No se ha encontrado el parámetro de búsqueda');
    }
    const key = slug(req.query.q);
    cache.get(`query-${key}`, (err, value) => {
      if (err || value === undefined) {
        search(key)
          .then((response) => {
            const data = results(response.data);
            cache.set(`query-${key}`, data, 0, () => {
              res.json(data);
            });
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      } else {
        res.json(value);
      }
    });
  });

  app.get('/api/items/:id', (req, res) => {
    const key = req.params.id;
    cache.get(`item-${key}`, (err, value) => {
      if (err || value === undefined) {
        axios.all([getItem(key), getDescription(key)])
          .then(axios.spread((item, description) => {
            getCategories(item.data.category_id)
              .then((category) => {
                const data = post(item, description, category);
                cache.set(`item-${key}`, data, 0, () => {
                  res.json(data);
                });
              });
          }))
          .catch((error) => {
            res.status(500).send(error);
          });
      } else {
        res.json(value);
      }
    });
  });
};
