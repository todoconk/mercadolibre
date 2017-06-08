module.exports = (data) => {
  let categories = [];

  if (data.filters.length > 0) {
    if (data.filters[0].id === 'category') {
      if (data.filters[0].values.length > 0) {
        categories = data.filters[0].values[0].path_from_root;
      }
    }
  }

  const results = data.results.map(el => ({
    id: el.id,
    title: el.title,
    price: {
      currency: el.currency_id,
      amount: el.price,
      decimals: 0,
    },
    state_name: el.address.state_name,
    picture: el.thumbnail,
    condition: el.condition,
    free_shipping: el.shipping.free_shipping,
  }));

  return {
    author: {
      name: 'Krikor',
      lastname: 'Krikorian',
    },
    categories,
    items: results,
  };
};
