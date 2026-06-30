import { useEffect, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { BsAward } from 'react-icons/bs';
import { useThemeMode } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const MAROON = '#7B1A2D';
const MAROON_DARK = '#5C0F1E';
const GOLD = '#C9A844';

const slides = [
  {
    title: 'Make Every Occasion',
    titleGold: 'Truly Special',
    subtitle:
      'Discover the perfect gift for your loved ones.\nHandpicked collections for every emotion and celebration.',
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&h=900&fit=crop&q=80',
    cta: 'Shop Now',
  },
  {
    title: 'Gifts That Speak',
    titleGold: 'From The Heart',
    subtitle:
      'Custom photo gifts, personalized keychains, couple rings\nand so much more - curated with love.',
    image:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400&h=900&fit=crop&q=80',
    cta: 'Explore Gifts',
  },
  {
    title: 'Celebrate Love With',
    titleGold: 'Perfect Gifts',
    subtitle:
      'From ₹10 keychains to premium gift hampers -\nevery budget, every occasion, every emotion.',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&h=900&fit=crop&q=80',
    cta: 'View Collection',
  },
];

const trustFeatures = [
  {
    icon: <BsAward size={22} />,
    label: 'Premium Quality',
    sub: 'Handpicked Products',
  },
  {
    icon: <FiTruck size={22} />,
    label: 'Fast Delivery',
    sub: 'Across India',
  },
  {
    icon: <FiShield size={22} />,
    label: 'Secure Payment',
    sub: '100% Safe & Secure',
  },
  {
    icon: <FiRefreshCw size={22} />,
    label: 'Easy Returns',
    sub: 'Hassle Free Returns',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      5500
    );
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <Box>
      {/* ── Main Hero ── */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '72vh', sm: '80vh', md: '88vh' },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${MAROON_DARK} 0%, ${MAROON} 50%, #3D0610 100%)`,
        }}
      >
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#3D0610',
            }}
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, rgba(91,15,30,0.94) 0%, rgba(91,15,30,0.72) 55%, rgba(91,15,30,0.35) 100%)',
            zIndex: 1,
          }}
        />

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '5%',
            width: 2,
            height: 120,
            background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)`,
            opacity: 0.5,
            zIndex: 2,
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '8%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: `1px solid ${GOLD}40`,
            zIndex: 2,
            display: { xs: 'none', md: 'block' },
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Box sx={{ maxWidth: { xs: '100%', md: '58%' } }}>
            {/* Tag line */}
            <motion.div
              key={`tag-${current}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 2.5,
                    background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                    borderRadius: 2,
                  }}
                />
                <Typography
                  sx={{
                    color: GOLD,
                    fontSize: { xs: '0.72rem', md: '0.82rem' },
                    fontWeight: 600,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  Thoughtful Gifts, Beautiful Moments
                </Typography>
              </Box>
            </motion.div>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: '#FFFFFF',
                    mb: 0.5,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem' },
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color: GOLD,
                    mb: 2.5,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {slide.titleGold}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: { xs: '0.95rem', md: '1.1rem' },
                    lineHeight: 1.8,
                    mb: 4,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {slide.subtitle}
                </Typography>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<FiArrowRight />}
                  onClick={() =>
                    document
                      .getElementById('products')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  sx={{
                    background: `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`,
                    border: `2px solid ${GOLD}`,
                    color: '#fff',
                    px: { xs: 3, md: 4.5 },
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    boxShadow: `0 8px 30px rgba(201,168,68,0.25)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${MAROON_DARK}, #3D0610)`,
                      boxShadow: `0 12px 40px rgba(201,168,68,0.4)`,
                    },
                  }}
                >
                  {slide.cta}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/categories')}
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.45)',
                    px: 3,
                    py: 1.5,
                    '&:hover': {
                      borderColor: GOLD,
                      color: GOLD,
                      background: 'transparent',
                    },
                  }}
                >
                  View All Categories
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Container>

        {/* Slide indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 4,
          }}
        >
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrent(i)}
              sx={{
                width: i === current ? 30 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? GOLD : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                '&:hover': { background: i === current ? GOLD : 'rgba(255,255,255,0.6)' },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ── Trust Features Bar ── */}
      <Box
        sx={{
          background: isDark ? '#1A0A0D' : '#FFF5F0',
          borderBottom: `1px solid ${
            isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'
          }`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'space-around', md: 'center' },
            }}
          >
            {trustFeatures.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    px: { xs: 2, md: 5 },
                    py: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    borderRight:
                      i < trustFeatures.length - 1
                        ? `1px solid ${
                            isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                          }`
                        : 'none',
                  }}
                >
                  <Box
                    sx={{
                      color: MAROON,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {feat.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '0.8rem', md: '0.87rem' },
                        color: 'text.primary',
                        lineHeight: 1.2,
                      }}
                    >
                      {feat.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                      {feat.sub}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
