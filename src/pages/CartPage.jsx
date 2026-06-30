import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Card, CardMedia, IconButton, Button, Divider, Grid,
} from '@mui/material';
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useThemeMode } from '../context/ThemeContext';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <FiShoppingCart style={{ fontSize: 80, color: isDark ? '#222' : '#ccc', marginBottom: 24 }} />
          <Typography variant="h5" sx={{ mb: 2, color: 'text.primary' }}>Your cart is empty</Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>Add some amazing gifts to get started!</Typography>
          <Button variant="contained" onClick={() => navigate('/')}>Browse Gifts</Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <IconButton onClick={() => navigate('/')} sx={{ color: 'text.secondary' }}>
            <FiArrowLeft />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>Shopping Cart</Typography>
          <Typography sx={{ color: 'text.secondary', ml: 'auto' }}>
            {totalItems} item{totalItems !== 1 ? 's' : ''}
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30, height: 0 }} layout>
                <Card sx={{ mb: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                    <CardMedia
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 80, height: 80, borderRadius: 2, objectFit: 'cover' }}
                    />
                    <Box sx={{ flex: 1, minWidth: 120 }}>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>{item.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#7B1A2D' }}>{item.category}</Typography>
                      <Typography sx={{ color: '#7B1A2D', fontWeight: 700, mt: 0.5 }}>₹{item.price}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{ border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: 'text.secondary' }}
                      >
                        <FiMinus size={14} />
                      </IconButton>
                      <Typography sx={{ fontWeight: 700, minWidth: 28, textAlign: 'center', color: 'text.primary' }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{ border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: 'text.secondary' }}
                      >
                        <FiPlus size={14} />
                      </IconButton>
                    </Box>
                    <Typography sx={{ fontWeight: 800, color: '#7B1A2D', minWidth: 70, textAlign: 'right' }}>
                      ₹{item.price * item.quantity}
                    </Typography>
                    <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: 'error.main' }}>
                      <FiTrash2 />
                    </IconButton>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          <Button variant="outlined" color="error" size="small" onClick={clearCart} sx={{ mt: 1 }}>
            Clear Cart
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card sx={{ p: 3, position: { md: 'sticky' }, top: { md: 80 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>Order Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'text.secondary' }}>Subtotal</Typography>
                <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>₹{totalPrice}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'text.secondary' }}>Delivery</Typography>
                <Typography sx={{ color: '#00c853', fontWeight: 600 }}>Free</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>Total</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#7B1A2D' }}>₹{totalPrice}</Typography>
              </Box>
              <Button variant="contained" fullWidth size="large" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          background: isDark ? 'rgba(13,6,8,0.95)' : 'rgba(255,251,245,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          zIndex: 1100,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Total</Typography>
          <Typography sx={{ fontWeight: 800, color: '#7B1A2D', fontSize: '1.2rem' }}>₹{totalPrice}</Typography>
        </Box>
        <Button variant="contained" onClick={() => navigate('/checkout')}>Checkout</Button>
      </Box>
    </Container>
  );
}
