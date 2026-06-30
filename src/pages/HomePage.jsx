import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container, Grid, Box, Typography, Card, Avatar, Button, Chip,
} from '@mui/material';
import {
  FiHeart, FiStar, FiTruck, FiGift, FiShield, FiClock, FiCheck,
  FiUsers, FiPackage,
} from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { useThemeMode } from '../context/ThemeContext';
import products from '../data/products.json';

const MAROON = '#7B1A2D';
const MAROON_DARK = '#5C0F1E';
const GOLD = '#C9A844';

const occasions = [
  {
    label: 'Birthday',
    sub: 'Make their day extra special',
    icon: '🎂',
    search: 'Birthday',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=750&fit=crop&q=80',
  },
  {
    label: 'Anniversary',
    sub: 'Celebrate your love',
    icon: '💍',
    search: 'Couple',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=750&fit=crop&q=80',
  },
  {
    label: 'Wedding',
    sub: 'Best wishes for the new beginning',
    icon: '💒',
    search: 'Couple Ring',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=750&fit=crop&q=80',
  },
  {
    label: "Valentine's Day",
    sub: 'Express your love',
    icon: '❤️',
    search: 'Heart',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238f939?w=600&h=750&fit=crop&q=80',
  },
  {
    label: 'New Born',
    sub: 'Welcome precious one',
    icon: '👶',
    search: 'Teddy',
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=600&h=750&fit=crop&q=80',
  },
  {
    label: 'Festivals',
    sub: 'Gift the joy of festivals',
    icon: '🪔',
    search: 'Light',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=750&fit=crop&q=80',
  },
];

const topCategories = [
  {
    label: 'Teddys',
    category: 'Teddy Collection',
    image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Photo Frames',
    category: 'Photo Gifts',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Personalized Gifts',
    category: 'Keychains',
    image: 'https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Home Decor',
    category: 'Swami Silai',
    image: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Mugs & Bottles',
    category: 'Message Bottles',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Flowers',
    category: 'Heart Box',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Gift Hampers',
    category: 'Voice Recorder Gifts',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&h=300&fit=crop&q=80',
  },
  {
    label: 'Accessories',
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&q=80',
  },
];

const whyUs = [
  {
    icon: <FiStar />,
    title: 'Quality You Can Trust',
    desc: 'Only premium products for your loved ones.',
  },
  {
    icon: <FiHeart />,
    title: 'Customer First',
    desc: "We're here to make your shopping experience great.",
  },
  {
    icon: <FiTruck />,
    title: 'Fast & Reliable Delivery',
    desc: 'Timely delivery, every time.',
  },
  {
    icon: <FiShield />,
    title: 'Secure Shopping',
    desc: 'Your privacy and security are our priority.',
  },
];

const stats = [
  { icon: <FiUsers />, value: 'Thousands', label: 'Happy Customers' },
  { icon: <FiStar />, value: '4.8/5', label: 'Customer Rating' },
  { icon: <FiPackage />, value: '500+', label: 'Unique Products' },
  { icon: <FiTruck />, value: 'Pan India', label: 'Delivery' },
];

const taglineFeatures = [
  { icon: <FiGift />, title: 'Personalized Gifts', desc: 'Make it truly theirs' },
  { icon: <FiHeart />, title: 'Perfect for Every Occasion', desc: 'Birthday, Anniversary, Festivals & more' },
  { icon: <FiStar />, title: 'Affordable & Premium', desc: 'Best quality at great prices' },
  { icon: <FiCheck />, title: 'Hassle Free Shopping', desc: 'Easy browsing, easy gifting' },
];

const SectionLabel = ({ text, color = MAROON }) => (
  <Typography
    variant="overline"
    sx={{
      color,
      letterSpacing: 4,
      display: 'block',
      textAlign: 'center',
      mb: 1,
      fontSize: '0.72rem',
      fontWeight: 700,
    }}
  >
    {text}
  </Typography>
);

const SectionTitle = ({ children, isDark }) => (
  <Typography
    variant="h4"
    sx={{
      textAlign: 'center',
      fontWeight: 800,
      mb: 1,
      fontSize: { xs: '1.6rem', md: '2.1rem' },
      color: isDark ? '#F5E6E8' : '#1A0A0D',
      fontFamily: "'Playfair Display', serif",
    }}
  >
    {children}
  </Typography>
);

const GoldDivider = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 5 }}>
    <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
    <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
  </Box>
);

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFromUrl = searchParams.get('category') || 'All';
  const searchFromUrl = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [search, setSearch] = useState(searchFromUrl);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  // Sync local state with URL params (React recommended pattern)
  const [prevUrlCategory, setPrevUrlCategory] = useState(categoryFromUrl);
  const [prevUrlSearch, setPrevUrlSearch] = useState(searchFromUrl);
  if (categoryFromUrl !== prevUrlCategory) {
    setSelectedCategory(categoryFromUrl);
    setPrevUrlCategory(categoryFromUrl);
  }
  if (searchFromUrl !== prevUrlSearch) {
    setSearch(searchFromUrl);
    setPrevUrlSearch(searchFromUrl);
  }

  useEffect(() => {
    if (searchFromUrl || categoryFromUrl !== 'All' || filterParam) {
      setTimeout(
        () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }),
        200
      );
    }
  }, [searchFromUrl, categoryFromUrl, filterParam]);

  // New Arrivals & Best Sellers tagging
  const newArrivals = useMemo(() => products.slice(-8), []);
  const bestSellers = useMemo(() => [
    products.find(p => p.id === 90),
    products.find(p => p.id === 40),
    products.find(p => p.id === 60),
    products.find(p => p.id === 71),
    products.find(p => p.id === 51),
    products.find(p => p.id === 12),
    products.find(p => p.id === 100),
    products.find(p => p.id === 20),
  ].filter(Boolean), []);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    if (filterParam === 'new') return newArrivals;
    if (filterParam === 'bestseller') return bestSellers;
    let result = products;
    if (selectedCategory !== 'All')
      result = result.filter((p) => p.category === selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, search, filterParam, newArrivals, bestSellers]);

  const trending = useMemo(() => bestSellers.slice(0, 4), [bestSellers]);

  const handleOccasion = (occ) => {
    setSelectedCategory('All');
    setSearch(occ.search);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sectionBg = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(123,26,45,0.02)';
  const altBg = isDark ? '#0D0608' : '#FFFBF5';

  return (
    <>
      <Helmet>
        <title>
          Karisanathar Gift Shop | Premium Gifts for Every Occasion | KGN
        </title>
        <meta
          name="description"
          content="Karisanathar Gift Shop (KGN) - 500+ handpicked premium gifts for birthdays, anniversaries, weddings & more. Teddys, Photo Frames, Couple Rings, Lighting Gifts & Birthday Decoration. Pan India delivery."
        />
        <meta
          name="keywords"
          content="Karisanathar Gift Shop, KGN, premium gifts, birthday gifts, anniversary gifts, god idols, toys, photo frames, couple gifts, birthday decor combo, party accessories, Arni"
        />
        <meta property="og:title" content="Karisanathar Gift Shop | Premium Gifts for Every Occasion" />
        <meta
          property="og:description"
          content="500+ handpicked premium gifts for every occasion. Quality gifts that speak from the heart."
        />
        <link rel="canonical" href="https://karisanathargiftshop.com" />
      </Helmet>

      <HeroSection />

      {/* ── Shop by Occasion ── */}
      <Box sx={{ py: { xs: 7, md: 10 }, background: altBg }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel text="SHOP BY OCCASION" />
            <SectionTitle isDark={isDark}>Find The Perfect Gift For Every Moment</SectionTitle>
            <GoldDivider />
          </motion.div>

          <Grid container spacing={2}>
            {occasions.map((occ, i) => (
              <Grid key={occ.label} size={{ xs: 6, sm: 4, md: 2 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Box
                    onClick={() => handleOccasion(occ)}
                    sx={{
                      position: 'relative',
                      borderRadius: 3,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      aspectRatio: '3/4',
                      '&:hover .occasion-img': { transform: 'scale(1.08)' },
                      '&:hover .occasion-overlay': { opacity: 0.85 },
                    }}
                  >
                    <Box
                      className="occasion-img"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${occ.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <Box
                      className="occasion-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(91,15,30,0.2) 0%, rgba(91,15,30,0.75) 100%)',
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                    {/* Heart Icon */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(4px)',
                        border: `1px solid rgba(255,255,255,0.4)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                      }}
                    >
                      <FiHeart style={{ color: '#fff', fontSize: 16, fill: '#fff' }} />
                    </Box>
                    {/* Label */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 1.5,
                        textAlign: 'center',
                        zIndex: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: { xs: '0.82rem', md: '0.92rem' },
                          lineHeight: 1.2,
                          mb: 0.3,
                        }}
                      >
                        {occ.label}
                      </Typography>
                      <Typography
                        sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.65rem' }}
                      >
                        {occ.sub}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  background: `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`,
                  px: 5,
                  py: 1.4,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                View All Occasions
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* ── Top Categories ── */}
      <Box sx={{ py: { xs: 7, md: 10 }, background: isDark ? '#1A0A0D' : '#FFFFFF' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel text="SHOP BY CATEGORY" color={GOLD} />
            <SectionTitle isDark={isDark}>Explore Our Top Categories</SectionTitle>
            <GoldDivider />
          </motion.div>

          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            {topCategories.map((cat, i) => (
              <Grid key={cat.label} size={{ xs: 4, sm: 3, md: 'auto' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Box
                    onClick={() => {
                      setSelectedCategory(cat.category);
                      setSearch('');
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    sx={{ textAlign: 'center', cursor: 'pointer', minWidth: { xs: 70, md: 90 } }}
                  >
                    <Box
                      sx={{
                        width: { xs: 70, md: 85 },
                        height: { xs: 70, md: 85 },
                        borderRadius: '50%',
                        overflow: 'hidden',
                        mx: 'auto',
                        mb: 1,
                        border: `3px solid ${isDark ? 'rgba(201,168,68,0.3)' : 'rgba(123,26,45,0.15)'}`,
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          borderColor: GOLD,
                          boxShadow: `0 4px 20px rgba(201,168,68,0.3)`,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={cat.image}
                        alt={cat.label}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: { xs: '0.68rem', md: '0.78rem' },
                        display: 'block',
                        lineHeight: 1.3,
                      }}
                    >
                      {cat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── About + Why Choose Us ── */}
      <Box sx={{ py: { xs: 7, md: 10 }, background: sectionBg }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* About Text */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: MAROON, letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem' }}
                >
                  ABOUT US
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: isDark ? '#F5E6E8' : '#1A0A0D',
                    mb: 2,
                    mt: 0.5,
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: 1.3,
                  }}
                >
                  Spreading Smiles Since Every Day
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}
                >
                  At Karisanathar Gift Shop, we believe every gift carries an emotion. Our
                  carefully curated collection is designed to help you express love, gratitude,
                  and care beautifully.
                </Typography>
                {[
                  'Wide Range of Unique Gifts',
                  'Premium Quality Products',
                  'Trusted by Thousands of Customers',
                ].map((point) => (
                  <Box
                    key={point}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}
                  >
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: `rgba(123,26,45,0.12)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FiCheck style={{ color: MAROON, fontSize: 12, strokeWidth: 3 }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{ mt: 2, px: 3.5, fontWeight: 700 }}
                >
                  Know More About Us
                </Button>
              </motion.div>
            </Grid>

            {/* Store Image */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    boxShadow: `0 20px 60px rgba(123,26,45,0.2)`,
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=750&fit=crop&q=80"
                    alt="Karisanathar Gift Shop Store"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(91,15,30,0.9)',
                      backdropFilter: 'blur(8px)',
                      px: 2.5,
                      py: 1,
                      borderRadius: 20,
                      border: `1px solid ${GOLD}50`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Typography sx={{ color: GOLD, fontWeight: 700, fontSize: '0.85rem' }}>
                      KGN Gift Shop
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Why Choose Us */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: GOLD, letterSpacing: 4, fontWeight: 700, fontSize: '0.72rem' }}
                >
                  WHY CHOOSE US
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: isDark ? '#F5E6E8' : '#1A0A0D',
                    mb: 3,
                    mt: 0.5,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Our Promise to You
                </Typography>
                {whyUs.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                      <Avatar
                        sx={{
                          width: 44,
                          height: 44,
                          background: `rgba(123,26,45,0.1)`,
                          color: MAROON,
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 700, color: 'text.primary', mb: 0.3 }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                          {item.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Stats Bar ── */}
      <Box
        sx={{
          py: 5,
          background: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_DARK} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {stats.map((stat, i) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center', py: 1 }}>
                    <Box
                      sx={{
                        color: GOLD,
                        fontSize: 28,
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 1,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.3rem', md: '1.7rem' },
                        color: '#fff',
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', mt: 0.5 }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Trending Gifts ── */}
      <Box sx={{ py: { xs: 7, md: 10 }, background: isDark ? '#0D0608' : '#FFFBF5' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel text="POPULAR RIGHT NOW" />
            <SectionTitle isDark={isDark}>Trending Gifts</SectionTitle>
            <GoldDivider />
          </motion.div>
          <Grid container spacing={3}>
            {trending.slice(0, 4).map((product, i) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <ProductCard product={product} index={i} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── All Products ── */}
      <Box id="products" sx={{ py: { xs: 6, md: 10 }, background: isDark ? '#1A0A0D' : '#FFFFFF' }}>
        <Container maxWidth="lg">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <SearchBar value={search} onChange={setSearch} />

          {filtered.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography sx={{ fontSize: 60, mb: 2 }}>🎁</Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                No gifts found. Try a different search or category.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2, borderColor: MAROON, color: MAROON }}
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filtered.map((product, i) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ProductCard product={product} index={i} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* ── Thoughtfully Chosen Section ── */}
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          background: sectionBg,
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel text="GIFTS THAT SPEAK FROM THE HEART" />
            <SectionTitle isDark={isDark}>Thoughtfully Chosen. Beautifully Delivered.</SectionTitle>
            <Typography
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                maxWidth: 620,
                mx: 'auto',
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Whether it&apos;s a cute teddy, a personalized frame, or a premium gift hamper -
              we have something for every occasion and every relationship. Make moments memorable
              with Karisanathar Gift Shop.
            </Typography>
            <GoldDivider />
          </motion.div>

          <Grid container spacing={3}>
            {taglineFeatures.map((feat, i) => (
              <Grid key={feat.title} size={{ xs: 6, sm: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2,
                        fontSize: 24,
                        background: `rgba(123,26,45,0.1)`,
                        color: MAROON,
                        border: `2px solid ${isDark ? 'rgba(201,168,68,0.2)' : 'rgba(123,26,45,0.15)'}`,
                      }}
                    >
                      {feat.icon}
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5, fontSize: { xs: '0.85rem', md: '0.95rem' } }}
                    >
                      {feat.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontSize: { xs: '0.72rem', md: '0.82rem' } }}
                    >
                      {feat.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── WhatsApp CTA ── */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: isDark ? '#0D0608' : '#FFFBF5' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                background: isDark
                  ? `rgba(123,26,45,0.12)`
                  : `rgba(123,26,45,0.04)`,
                border: `1.5px solid ${isDark ? 'rgba(201,168,68,0.2)' : 'rgba(123,26,45,0.12)'}`,
              }}
            >
              <Typography sx={{ fontSize: '3rem', mb: 2 }}>🎁</Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  color: 'text.primary',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                Can&apos;t Find the Perfect Gift?
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  maxWidth: 450,
                  mx: 'auto',
                  lineHeight: 1.8,
                }}
              >
                Tell us who it&apos;s for and the occasion - our gift experts will suggest
                the best options for you!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<BsWhatsapp />}
                onClick={() =>
                  window.open(
                    `https://wa.me/${
                      import.meta.env.VITE_WHATSAPP_NUMBER || '917339501438'
                    }?text=${encodeURIComponent(
                      'Hi! I need help finding the perfect gift. Can you suggest something?'
                    )}`,
                    '_blank'
                  )
                }
                sx={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  '&:hover': { background: 'linear-gradient(135deg, #2be06e, #159e8d)' },
                  boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                  px: 4,
                }}
              >
                Ask Our Gift Expert
              </Button>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
