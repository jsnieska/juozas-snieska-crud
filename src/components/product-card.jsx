import * as React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Button,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Image from './image';

const ProductCard = ({
  title,
  img,
  description,
  category,
  price,
  onDelete,
  onEdit,
}) => (
  <Card sx={{
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    border: 2,
    borderColor: 'ActiveBorder',
    borderRadius: 10,
  }}
  >
    <Box sx={{ position: 'relative', width: '100%', pt: '95%' }}>
      <Image src={img} sx={{ position: 'absolute', top: 0, left: 0 }} />
    </Box>

    <Box sx={{
      position: 'absolute',
      top: 10,
      left: 20,
      display: 'flex',
      gap: 1,
    }}
    >

      <IconButton
        sx={{
          border: 1,
          borderColor: 'error.main',
          color: 'error.main',
        }}
        size="small"
        onClick={onDelete}
      >
        <ClearIcon />
      </IconButton>
    </Box>

    <CardContent sx={{ p: 2, flexGrow: 1 }}>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Typography variant="h5" component="div">{title}</Typography>
        <Typography variant="h6" component="div" color="red" sx={{ p: 0.5 }}>{`${price} €`}</Typography>
        <Typography variant="subtitle" component="div" sx={{ mb: 2 }}>{`Kategorija: ${category}`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Button
          sx={{
            border: 1,
            borderColor: 'success.main',
            color: 'success.main',
            mt: 2,
          }}
          size="small"
          onClick={onEdit}
        >
          Pakeisti produkto informaciją
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default ProductCard;
