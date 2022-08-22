const serverAddress = 'http://localhost:8000';

const formatProduct = ({
  id,
  title,
  description,
  price,
  img,
  categoryId,
  category,
}) => ({
  id,
  title,
  description,
  price,
  img,
  categoryId,
  category: category.title,
});

const fetchAll = async () => {
  const response = await fetch(`${serverAddress}/flowers?_expand=category`);
  const flowers = await response.json();

  return flowers.map(formatProduct);
};

const create = async (flowersProps) => {
  const response = await fetch(`${serverAddress}/flowers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flowersProps),
  });

  const flowers = await response.json();

  return flowers;
};

const update = async (id, flowersProps) => {
  const response = await fetch(`${serverAddress}/flowers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flowersProps),
  });

  const flowers = await response.json();

  return flowers;
};

const remove = async (id) => {
  await fetch(`${serverAddress}/flowers/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const fetchCategories = async () => {
  const response = await fetch(`${serverAddress}/categories`);
  const categories = await response.json();

  return categories;
};

const ProductService = {
  fetchAll,
  create,
  update,
  remove,
  fetchCategories,
};

export default ProductService;
