import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Skeleton, IconButton } from '@mui/material';
import { FiShoppingCart, FiCheck, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const MAROON = '#7B1A2D';
const GOLD = '#C9A844';

export default function ProductCard({ product, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
    >
      <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: `0 12px 40px rgba(123,26,45,0.15), 0 4px 20px rgba(201,168,68,0.08)`,
            },
            '&:hover .product-image': { transform: 'scale(1.08)' },
          }}
        >
          <Box sx={{ position: 'relative', overflow: 'hidden', pt: '100%' }}>
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(123,26,45,0.05)',
                }}
              />
            )}
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              className="product-image"
              onLoad={() => setImageLoaded(true)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                opacity: imageLoaded ? 1 : 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: `linear-gradient(135deg, ${MAROON}, #5C0F1E)`,
                borderRadius: '8px',
                px: 1.5,
                py: 0.4,
                border: `1px solid rgba(201,168,68,0.3)`,
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem' }}>
                ₹{product.price}
              </Typography>
            </Box>
            <IconButton
              onClick={handleWishlist}
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: wishlisted ? MAROON : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(4px)',
                color: wishlisted ? '#fff' : MAROON,
                '&:hover': { background: wishlisted ? '#9B2940' : 'rgba(255,255,255,1)' },
                transition: 'all 0.2s',
              }}
            >
              <FiHeart size={16} style={{ fill: wishlisted ? '#fff' : 'none' }} />
            </IconButton>
          </Box>

          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 1.5, sm: 2.5 } }}>
            <Typography
              variant="caption"
              sx={{ color: MAROON, fontWeight: 600, letterSpacing: 0.8, mb: 0.5, opacity: 0.85, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
            >
              {product.category}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.primary',
                fontSize: { xs: '0.82rem', sm: '0.95rem' },
                fontWeight: 700,
                mb: 1,
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.7rem', sm: '0.78rem' },
                mb: 2,
                flexGrow: 1,
                lineHeight: 1.6,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.description}
            </Typography>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={added ? <FiCheck /> : <FiShoppingCart />}
                onClick={handleAdd}
                sx={{
                  background: added
                    ? 'linear-gradient(135deg, #00c853, #00e676)'
                    : `linear-gradient(135deg, ${MAROON}, #5C0F1E)`,
                  boxShadow: added
                    ? '0 4px 20px rgba(0,200,83,0.3)'
                    : `0 4px 16px rgba(123,26,45,0.25)`,
                  '&:hover': {
                    background: added
                      ? 'linear-gradient(135deg, #00e676, #00c853)'
                      : `linear-gradient(135deg, #9B2940, ${MAROON})`,
                  },
                }}
              >
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
