import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
} from '@mui/material';
import ProductService from 'services/product-service';

const ProductForm = ({
  onSubmit,
  formTitle,
  submitText,
  color,
  initValues,
}) => {
  const [categories, setCategories] = React.useState([]);
  const [title, setTitle] = React.useState(initValues?.title ?? '');
  const [category, setCategory] = React.useState(initValues?.categoryId ?? '');
  const [price, setPrice] = React.useState(initValues?.price ?? '');
  const [img, setImg] = React.useState(initValues?.img ?? '');
  const [description, setDescription] = React.useState(initValues?.description ?? '');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      categoryId: category,
      price: Number(price),
      img,
      description,
    });
  };

  React.useEffect(() => {
    (async () => {
      const fethedCategories = await ProductService.fetchCategories();
      setCategories(fethedCategories);
    })();
  }, []);

  return (
    <Paper component="form" sx={{ p: 3 }} onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ textAlign: 'center', pb: 2 }}>{formTitle}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 3 }}>
        <Box>
          <TextField
            label="Pavadinimas"
            fullWidth
            variant="filled"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            label="Kategorija"
            fullWidth
            select
            variant="filled"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map(({ id, title: categoryTitle }) => (
              <MenuItem key={id} value={id}>{categoryTitle}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Kaina €"
            type="number"
            fullWidth
            variant="filled"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </Box>
        <Box>
          <TextField
            label="Nuotraukos kelias"
            fullWidth
            variant="filled"
            value={img}
            onChange={(event) => setImg(event.target.value)}
          />
          <TextField
            label="Aprašymas"
            fullWidth
            variant="filled"
            multiline
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Button
          type="submit"
          variant="outlined"
          color={color}
          size="large"
        >
          {submitText}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductForm;
