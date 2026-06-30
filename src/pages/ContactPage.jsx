import { useState } from 'react';
import {
  Container, Typography, Grid, Card, Box, TextField, Button, Avatar, Divider,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import {
  FiPhone, FiMail, FiMapPin, FiSend, FiClock, FiMessageCircle, FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useThemeMode } from '../context/ThemeContext';

const MAROON = '#7B1A2D';
const MAROON_DARK = '#5C0F1E';
const GOLD = '#C9A844';

const contactInfo = [
  { icon: <FiPhone size={20} />, label: 'Phone', value: '+91 73395 01438', color: MAROON, href: 'tel:+917339501438' },
  { icon: <FiMail size={20} />, label: 'Email', value: 'karisanathargiftshop@gmail.com', color: MAROON, href: 'mailto:karisanathargiftshop@gmail.com' },
  { icon: <FiMapPin size={20} />, label: 'Address', value: '16/14, Husain Complex, Near Old Bus Stand, Arni - 632301', color: MAROON, href: null },
  { icon: <BsWhatsapp size={20} />, label: 'WhatsApp', value: '+91 73395 01438', color: '#25D366', href: 'https://wa.me/917339501438' },
  { icon: <FiClock size={20} />, label: 'Working Hours', value: 'Mon – Sun, 9 AM – 9 PM', color: GOLD, href: null },
  { icon: <FiMessageCircle size={20} />, label: 'Response Time', value: 'Within 1 hour', color: GOLD, href: null },
];

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Most orders are delivered within 24–48 hours in Arni and nearby areas. Pan-India delivery takes 3–5 business days.',
  },
  {
    q: 'Can I customize a gift?',
    a: 'Yes! We offer customization on photo gifts, keychains, mugs, and more. Just mention your requirements when ordering.',
  },
  {
    q: 'Do you offer gift wrapping?',
    a: 'Absolutely! All our gifts come beautifully wrapped at no extra cost. Premium wrapping is available for ₹49.',
  },
  {
    q: 'What is your return policy?',
    a: 'If you receive a damaged or incorrect item, we offer free replacement within 7 days. Contact us with photos of the issue.',
  },
  {
    q: 'Can I order in bulk for events?',
    a: 'Yes! We offer bulk discounts for weddings, corporate events, and parties. WhatsApp us for a custom quote.',
  },
  {
    q: 'Do you deliver on the same day?',
    a: 'Same-day delivery is available in Arni for orders placed before 2 PM. Additional charges may apply.',
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      onClick={() => setOpen((o) => !o)}
      sx={{
        mb: 1.5,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: `0 4px 20px rgba(123,26,45,0.12)` },
        border: open ? `1.5px solid ${MAROON}` : undefined,
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.93rem' }}>
          {faq.q}
        </Typography>
        <Box sx={{ color: MAROON, flexShrink: 0 }}>
          {open ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </Box>
      </Box>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <Box sx={{ px: 2.5, pb: 2.5 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {faq.a}
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

const GoldDivider = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 5 }}>
    <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
    <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
  </Box>
);

export default function ContactPage() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)' },
      '&:hover fieldset': { borderColor: MAROON },
      '&.Mui-focused fieldset': { borderColor: MAROON, borderWidth: 2 },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: MAROON },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      enqueueSnackbar('Message sent! We will get back to you soon.', { variant: 'success' });
      setForm({ name: '', email: '', phone: '', message: '' });
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Karisanathar Gift Shop - Get in Touch, FAQs, Support</title>
        <meta
          name="description"
          content="Contact Karisanathar Gift Shop for queries, custom orders, bulk orders, or support. Call, WhatsApp, or email us. Located in Arni, Tamil Nadu. Pan India delivery."
        />
      </Helmet>

      {/* ── Hero Banner ── */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          background: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_DARK} 50%, #1A0206 100%)`,
          overflow: 'hidden',
          textAlign: 'center',
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
        {/* Decorative elements */}
        <Box sx={{ position: 'absolute', top: -80, right: -80, width: 250, height: 250, borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}15, transparent)` }} />
        <Box sx={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}10, transparent)` }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 5, display: 'block', mb: 2, fontWeight: 700 }}
            >
              GET IN TOUCH
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#fff',
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: GOLD }} />
              <Box sx={{ width: 40, height: 1.5, background: GOLD, borderRadius: 1 }} />
            </Box>
            <Typography
              sx={{ color: 'rgba(255,255,255,0.82)', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}
            >
              Have a question, need a custom gift, or want to place a bulk order?
              We'd love to hear from you!
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* ── Contact Cards ── */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          background: isDark
            ? 'linear-gradient(180deg, #0D0608 0%, #1A0A0D 100%)'
            : 'linear-gradient(180deg, #FFF9F5 0%, #FFF3EC 100%)',
        }}
      >
        {/* Background pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&h=800&fit=crop&q=30)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isDark ? 0.04 : 0.06,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: GOLD, letterSpacing: 4, fontWeight: 700, display: 'block', mb: 1 }}>
              REACH US
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', fontFamily: "'Playfair Display', serif", fontSize: { xs: '1.5rem', md: '2rem' } }}>
              We&apos;re Here to Help
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {contactInfo.map((item, i) => (
              <Grid key={item.label} size={{ xs: 6, sm: 4, md: 4, lg: 2 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <Card
                    component={item.href ? 'a' : 'div'}
                    href={item.href}
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      height: '100%',
                      minHeight: 180,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      cursor: item.href ? 'pointer' : 'default',
                      borderRadius: 3,
                      border: `1px solid ${isDark ? 'rgba(201,168,68,0.1)' : 'rgba(123,26,45,0.08)'}`,
                      background: isDark ? 'rgba(26,10,13,0.8)' : 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 12px 40px rgba(123,26,45,0.15)`,
                        borderColor: item.color,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 52,
                        height: 52,
                        mb: 2,
                        background: `linear-gradient(135deg, ${item.color}18, ${item.color}08)`,
                        border: `2px solid ${item.color}30`,
                        color: item.color,
                        fontSize: 22,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Typography
                      variant="caption"
                      sx={{
                        color: item.color,
                        display: 'block',
                        mb: 0.8,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        fontSize: '0.68rem',
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.82rem', lineHeight: 1.5 }}
                    >
                      {item.value}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Form + Map ── */}
      <Box sx={{ py: { xs: 5, md: 8 }, background: isDark ? '#0D0608' : '#FFFBF5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <Box
                      sx={{
                        width: 4,
                        height: 28,
                        background: `linear-gradient(180deg, ${MAROON}, ${GOLD})`,
                        borderRadius: 2,
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Send us a Message
                    </Typography>
                  </Box>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                  >
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Your Name *"
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          sx={inputSx}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Email Address *"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          sx={inputSx}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      sx={inputSx}
                    />
                    <TextField
                      fullWidth
                      label="Your Message *"
                      multiline
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      sx={inputSx}
                    />
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<FiSend />}
                        disabled={loading}
                        sx={{ fontWeight: 700, px: 4 }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<BsWhatsapp />}
                        onClick={() =>
                          window.open(
                            `https://wa.me/${
                              import.meta.env.VITE_WHATSAPP_NUMBER || '917339501438'
                            }`,
                            '_blank'
                          )
                        }
                        sx={{
                          borderColor: '#25D366',
                          color: '#25D366',
                          '&:hover': {
                            borderColor: '#128C7E',
                            background: 'rgba(37,211,102,0.06)',
                          },
                        }}
                      >
                        Chat on WhatsApp
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            {/* Map */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card sx={{ p: 0, overflow: 'hidden', height: '100%', minHeight: 380 }}>
                  <iframe
                    title="Karisanathar Gift Shop Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31174.037567917285!2d79.27!3d12.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4c0d4fc5e3e8f1%3A0x8f7e27c5d85ae1e!2sArni%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 380, display: 'block' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── FAQs ── */}
      <Box sx={{ py: { xs: 7, md: 10 }, background: isDark ? '#1A0A0D' : '#FFFFFF' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1, fontWeight: 700 }}
            >
              FAQS
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
              Frequently Asked Questions
            </Typography>
            <GoldDivider />
          </motion.div>

          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <FAQItem faq={faq} />
            </motion.div>
          ))}
        </Container>
      </Box>
    </>
  );
}
