import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import { FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useSnackbar } from 'notistack';

const MAROON = '#7B1A2D';
const GOLD = '#C9A844';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    enqueueSnackbar(`${item.name} moved to cart!`, { variant: 'success' });
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography sx={{ fontSize: 80, mb: 2 }}>💝</Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary', fontFamily: "'Playfair Display', serif" }}>
            Your Wishlist is Empty
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            Save your favourite items here for later
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              background: `linear-gradient(135deg, ${MAROON}, #5C0F1E)`,
              px: 4, py: 1.5, fontWeight: 700,
              '&:hover': { background: `linear-gradient(135deg, #9B2940, ${MAROON})` },
            }}
          >
            Browse Products
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: MAROON }}>
            <FiArrowLeft />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', fontFamily: "'Playfair Display', serif", flex: 1 }}>
            My Wishlist
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{items.length} item{items.length !== 1 ? 's' : ''}</Typography>
          <Button size="small" onClick={clearWishlist} sx={{ color: MAROON }}>Clear All</Button>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid key={item.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', '&:hover': { boxShadow: `0 8px 30px rgba(123,26,45,0.12)` } }}>
                <Box sx={{ position: 'relative', pt: '100%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <IconButton
                    onClick={() => removeFromWishlist(item.id)}
                    sx={{
                      position: 'absolute', top: 8, right: 8,
                      background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
                      '&:hover': { background: '#fee', color: '#c00' },
                    }}
                    size="small"
                  >
                    <FiTrash2 size={16} />
                  </IconButton>
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                  <Typography variant="caption" sx={{ color: MAROON, fontWeight: 600, letterSpacing: 0.5 }}>
                    {item.category}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5, lineHeight: 1.3 }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 800, color: MAROON, mb: 1.5 }}>₹{item.price}</Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    startIcon={<FiShoppingCart />}
                    onClick={() => handleMoveToCart(item)}
                    sx={{
                      mt: 'auto',
                      background: `linear-gradient(135deg, ${MAROON}, #5C0F1E)`,
                      fontSize: '0.75rem',
                      '&:hover': { background: `linear-gradient(135deg, #9B2940, ${MAROON})` },
                    }}
                  >
                    Move to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
