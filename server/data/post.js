module.exports = (item, description, category) => ({
  author: {
    name: 'Krikor',
    lastname: 'Krikorian',
  },
  item: {
    id: item.data.id,
    title: item.data.title,
    price: {
      currency: item.data.currency_id,
      amount: item.data.price,
      decimals: 0,
    },
    picture: item.data.pictures.length > 0 ? item.data.pictures[0].secure_url : '',
    condition: item.data.condition,
    free_shipping: item.data.shipping.free_shipping,
    sold_quantity: item.data.sold_quantity,
    description: description.data.snapshot.url,
  },
  categories: category.data.path_from_root,
});
