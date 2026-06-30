import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, Typography, Box, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';
import products from '../data/products.json';

const MAROON = '#7B1A2D';
const MAROON_DARK = '#5C0F1E';
const GOLD = '#C9A844';

const GoldDivider = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 5 }}>
    <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
    <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
  </Box>
);

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const categoryData = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      if (!map[p.category]) {
        map[p.category] = { name: p.category, image: p.image, count: 0, minPrice: p.price };
      }
      map[p.category].count++;
      if (p.price < map[p.category].minPrice) map[p.category].minPrice = p.price;
    });
    return Object.values(map);
  }, []);

  return (
    <>
      <Helmet>
        <title>All Categories | Karisanathar Gift Shop - Browse All Gift Collections</title>
        <meta
          name="description"
          content="Browse all gift categories at Karisanathar Gift Shop: Teddys, Keychains, Rings, Photo Gifts, Lighting Gifts, Teddy Collection, Birthday Decoration and more."
        />
      </Helmet>

      {/* Hero */}
      <Box
        sx={{
          py: { xs: 8, md: 11 },
          background: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_DARK} 100%)`,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1547005327-b97cce04aa44?w=1400&h=400&fit=crop&q=40)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 5, display: 'block', mb: 2, fontWeight: 700 }}
            >
              BROWSE
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#fff',
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '1.8rem', md: '2.8rem' },
                fontFamily: "'Playfair Display', serif",
              }}
            >
              All Categories
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}>
              Explore our wide range of handpicked gift categories for every occasion and budget.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, background: isDark ? '#0D0608' : '#FFFBF5' }}>
        <Container maxWidth="lg">
          <GoldDivider />
          <Grid container spacing={3}>
            {categoryData.map((cat, i) => (
              <Grid key={cat.name} size={{ xs: 6, sm: 4, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    onClick={() => navigate(`/?category=${encodeURIComponent(cat.name)}`)}
                    sx={{
                      cursor: 'pointer',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.3s',
                      '&:hover': { boxShadow: `0 12px 40px rgba(123,26,45,0.2)` },
                      '&:hover .cat-img': { transform: 'scale(1.08)' },
                    }}
                  >
                    <Box sx={{ position: 'relative', pt: '100%', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={cat.image}
                        alt={cat.name}
                        className="cat-img"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(180deg, transparent 40%, rgba(91,15,30,0.85) 100%)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 2,
                        }}
                      >
                        <Typography
                          sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: 1.2 }}
                        >
                          {cat.name}
                        </Typography>
                        <Typography sx={{ color: GOLD, fontSize: '0.72rem', mt: 0.3 }}>
                          {cat.count} products · From ₹{cat.minPrice}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
              sx={{ px: 5, fontWeight: 700 }}
            >
              Browse All Products
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
