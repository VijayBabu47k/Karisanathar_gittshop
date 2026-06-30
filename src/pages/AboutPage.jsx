import { Container, Typography, Grid, Card, Box, Avatar, Button, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import {
  FiHeart, FiTruck, FiShield, FiHeadphones, FiStar, FiGift, FiClock, FiUsers,
  FiCheck, FiAward,
} from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const MAROON = '#7B1A2D';
const MAROON_DARK = '#5C0F1E';
const GOLD = '#C9A844';

const features = [
  {
    icon: <FiHeart size={22} />,
    title: 'Handpicked with Love',
    desc: 'Every gift is carefully curated by our team to bring joy and create lasting memories for your loved ones.',
  },
  {
    icon: <FiTruck size={22} />,
    title: 'Pan India Delivery',
    desc: 'We deliver across India with free shipping on all orders. Your gift arrives safely and beautifully packaged.',
  },
  {
    icon: <FiShield size={22} />,
    title: 'Quality Assured',
    desc: 'Premium materials and craftsmanship. Each gift undergoes rigorous quality checks before shipping to you.',
  },
  {
    icon: <FiHeadphones size={22} />,
    title: '7-Day Support',
    desc: 'Our friendly team is available 7 days a week to help you pick the perfect gift or resolve any concerns.',
  },
];

const stats = [
  { icon: <FiGift />, value: '5,000+', label: 'Gifts Delivered' },
  { icon: <FiStar />, value: '4.8/5', label: 'Customer Rating' },
  { icon: <FiUsers />, value: '2,000+', label: 'Happy Customers' },
  { icon: <FiClock />, value: '24hrs', label: 'Avg Delivery Time' },
];

const testimonials = [
  {
    name: 'Priya S.',
    initials: 'PS',
    text: 'Ordered a couple ring set for our anniversary - the quality was amazing and packaging was so beautiful! My partner loved it.',
    rating: 5,
    location: 'Chennai',
  },
  {
    name: 'Rahul M.',
    initials: 'RM',
    text: "The photo mug I ordered for my mom's birthday turned out perfectly. She was in tears! Great quality and fast delivery.",
    rating: 5,
    location: 'Bangalore',
  },
  {
    name: 'Sneha K.',
    initials: 'SK',
    text: "I've ordered keychains and message bottles multiple times. Always impressed with the attention to detail. Best gift shop ever!",
    rating: 5,
    location: 'Hyderabad',
  },
  {
    name: 'Arjun D.',
    initials: 'AD',
    text: "The breathing teddy for my girlfriend was a hit! She absolutely loved the soft glow feature. Worth every rupee.",
    rating: 5,
    location: 'Mumbai',
  },
];

const story = [
  {
    year: '2020',
    title: 'Our Beginning',
    desc: 'Karisanathar Gift Shop was born from a passion for meaningful gifting - starting with a small curated collection and a dream to make every occasion unforgettable.',
  },
  {
    year: '2022',
    title: 'Our Mission',
    desc: 'We believe the right gift can express what words sometimes cannot. Our mission is to help you celebrate every relationship and occasion with the perfect present.',
  },
  {
    year: 'Today',
    title: 'Our Promise',
    desc: 'From keychains at ₹10 to premium photo gifts, every item is chosen with care, tested for quality, and delivered with love. If you are not happy, we will make it right.',
  },
];

const GoldDivider = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 5 }}>
    <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
    <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
  </Box>
);

export default function AboutPage() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About Us | Karisanathar Gift Shop - Our Story, Mission & Promise</title>
        <meta
          name="description"
          content="Learn about Karisanathar Gift Shop (KGN) - Arni's trusted destination for premium, handpicked gifts. 5,000+ gifts delivered, 4.8/5 rating. Quality assured, pan India delivery."
        />
        <meta property="og:title" content="About Karisanathar Gift Shop | KGN" />
        <meta
          property="og:description"
          content="5,000+ gifts delivered with love. Quality assured, pan India delivery. Our story, mission and promise."
        />
      </Helmet>

      {/* ── Hero Banner ── */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          background: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_DARK} 100%)`,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400&h=600&fit=crop&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 5, display: 'block', mb: 2, fontWeight: 700 }}
            >
              OUR STORY
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#FFFFFF',
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                fontFamily: "'Playfair Display', serif",
              }}
            >
              About Karisanathar Gift Shop
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
              <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
            </Box>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.82)',
                maxWidth: 650,
                mx: 'auto',
                lineHeight: 1.9,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
              }}
            >
              At Karisanathar Gift Shop, we believe that the right gift can express what words
              sometimes cannot. Whether it is a birthday, anniversary, friendship day, or just a
              random act of love - we have the perfect gift waiting for you.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* ── Stats ── */}
      <Box
        sx={{
          py: 4,
          background: isDark ? '#1A0A0D' : '#FFFFFF',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {stats.map((stat, i) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Box sx={{ color: MAROON, fontSize: 28, display: 'flex', justifyContent: 'center', mb: 1 }}>
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.5rem', md: '2rem' } }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Our Journey / Timeline ── */}
      <Box sx={{ py: { xs: 7, md: 10 }, background: isDark ? '#0D0608' : '#FFFBF5' }}>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography
              variant="overline"
              sx={{ color: MAROON, letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1, fontWeight: 700 }}
            >
              HOW IT STARTED
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 800,
                mb: 1,
                color: isDark ? '#F5E6E8' : '#1A0A0D',
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: '1.6rem', md: '2.1rem' },
              }}
            >
              From a Small Dream to Your Doorstep
            </Typography>
            <GoldDivider />
          </motion.div>

          <Grid container spacing={3}>
            {story.map((item, i) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Card
                    sx={{
                      p: 3.5,
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${MAROON}, ${GOLD})`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        background: `rgba(123,26,45,0.1)`,
                        borderRadius: 20,
                        mb: 2,
                      }}
                    >
                      <Typography sx={{ color: MAROON, fontWeight: 700, fontSize: '0.82rem' }}>
                        {item.year}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary', fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                      {item.desc}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Why Choose Us ── */}
      <Box sx={{ py: { xs: 7, md: 10 }, background: isDark ? '#1A0A0D' : '#FFFFFF' }}>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1, fontWeight: 700 }}
            >
              WHY CHOOSE US
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 800,
                mb: 1,
                color: isDark ? '#F5E6E8' : '#1A0A0D',
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: '1.6rem', md: '2.1rem' },
              }}
            >
              What Makes Us Special
            </Typography>
            <GoldDivider />
          </motion.div>

          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid key={f.title} size={{ xs: 12, sm: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card sx={{ p: 3.5, height: '100%', display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        background: `rgba(123,26,45,0.1)`,
                        color: MAROON,
                        fontSize: 22,
                        flexShrink: 0,
                        border: `2px solid ${isDark ? 'rgba(201,168,68,0.2)' : 'rgba(123,26,45,0.12)'}`,
                      }}
                    >
                      {f.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 1, color: 'text.primary', fontFamily: "'Playfair Display', serif" }}
                      >
                        {f.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                        {f.desc}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Testimonials ── */}
      <Box sx={{ py: { xs: 7, md: 10 }, background: isDark ? '#0D0608' : '#FFFBF5' }}>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography
              variant="overline"
              sx={{ color: MAROON, letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1, fontWeight: 700 }}
            >
              TESTIMONIALS
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 800,
                mb: 1,
                color: isDark ? '#F5E6E8' : '#1A0A0D',
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: '1.6rem', md: '2.1rem' },
              }}
            >
              What Our Customers Say
            </Typography>
            <GoldDivider />
          </motion.div>

          <Grid container spacing={3}>
            {testimonials.map((t, i) => (
              <Grid key={t.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                      {[...Array(t.rating)].map((_, j) => (
                        <FiStar key={j} style={{ color: GOLD, fill: GOLD, fontSize: 16 }} />
                      ))}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        flexGrow: 1,
                        fontStyle: 'italic',
                        mb: 2.5,
                      }}
                    >
                      &ldquo;{t.text}&rdquo;
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          background: `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {t.initials}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: MAROON, fontWeight: 700 }}>
                          {t.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {t.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── CTA ── */}
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          background: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_DARK} 100%)`,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography
              variant="h4"
              sx={{
                color: '#fff',
                fontWeight: 800,
                mb: 2,
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: '1.6rem', md: '2rem' },
              }}
            >
              Ready to Make Someone Smile?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.82)', mb: 4, lineHeight: 1.8 }}>
              Browse our curated collection of 500+ premium gifts for every occasion.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  background: GOLD,
                  color: '#1A0A0D',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': { background: '#DEC06E' },
                }}
              >
                Shop Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<BsWhatsapp />}
                onClick={() =>
                  window.open(
                    `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '917339501438'}`,
                    '_blank'
                  )
                }
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.5)',
                  px: 4,
                  '&:hover': { borderColor: '#25D366', color: '#25D366', background: 'transparent' },
                }}
              >
                WhatsApp Us
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
