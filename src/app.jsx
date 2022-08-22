import * as React from 'react';
import { Box, Grid, Modal } from '@mui/material';
import ProductService from 'services/product-service';
import { ProductCard, Header, ProductForm } from './components';

const App = () => {
  const [flowers, setFlowers] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [flowerBeingEdited, setflowerBeingEdited] = React.useState(null);

  // UX functions
  const closeModal = () => {
    setModalOpen(false);
    setflowerBeingEdited(null);
  };

  // Data manipulation functions
  const fetchAllFlowers = async () => {
    const fetchedFlowers = await ProductService.fetchAll();
    setFlowers(fetchedFlowers);
  };

  const createFlower = async (flowerProps) => {
    await ProductService.create(flowerProps);
    await fetchAllFlowers();
    closeModal();
  };

  const editFlower = (id) => {
    const findFlower = flowers.find((x) => x.id === id);
    setflowerBeingEdited(findFlower);
    setModalOpen(true);
  };

  const updateFlower = async (flowerProps) => {
    await ProductService.update(flowerBeingEdited.id, flowerProps);
    await fetchAllFlowers();
    closeModal();
  };

  const deleteFlower = async (id) => {
    await ProductService.remove(id);
    fetchAllFlowers();
  };

  React.useEffect(() => {
    fetchAllFlowers();
  }, []);

  return (
    <Box sx={{
      gap: { xs: 4, xxl: 0 },
      pt: 1,
      px: 10,
      mb: 5,
    }}
    >
      <Header openModal={() => setModalOpen(true)} />
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={{
          width: '80%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: 5,
          borderColor: 'ActiveBorder',
        }}
        >
          <ProductForm
            onSubmit={flowerBeingEdited ? updateFlower : createFlower}
            formTitle={flowerBeingEdited ? 'Produkto redagavimas' : 'Pridėk naują gėlę'}
            submitText={flowerBeingEdited ? 'Atnaujinti' : 'Sukurti'}
            color={flowerBeingEdited ? 'success' : 'warning'}
            initValues={flowerBeingEdited}
          />
        </Box>
      </Modal>

      <Grid container spacing={2}>
        {flowers.map(({
          id,
          title,
          description,
          category,
          price,
          img,
        }) => (
          <Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={3}>
            <ProductCard
              title={title}
              description={description}
              img={img}
              category={category}
              price={price}
              onDelete={() => deleteFlower(id)}
              onEdit={() => editFlower(id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;
