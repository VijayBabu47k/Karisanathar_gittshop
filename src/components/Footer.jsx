import { Box, Container, Typography, IconButton, Grid, Divider, Button } from '@mui/material';
import {
  FiInstagram, FiYoutube, FiPhone, FiMail, FiMapPin, FiFacebook,
} from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MAROON = '#7B1A2D';
const MAROON_DARK = '#5C0F1E';
const GOLD = '#C9A844';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/categories' },
  { label: 'Shop by Occasion', path: '/#products' },
  { label: 'New Arrivals', path: '/?sort=new' },
  { label: 'Best Sellers', path: '/?sort=popular' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
];

const customerService = [
  { label: 'Track Order', path: '#' },
  { label: 'Shipping Policy', path: '#' },
  { label: 'Return & Refund Policy', path: '#' },
  { label: 'Terms & Conditions', path: '#' },
  { label: 'Privacy Policy', path: '#' },
  { label: "FAQ's", path: '/contact' },
];

const socials = [
  { icon: <FiFacebook size={18} />, color: '#1877F2', label: 'Facebook' },
  { icon: <FiInstagram size={18} />, color: '#E1306C', label: 'Instagram' },
  { icon: <BsWhatsapp size={18} />, color: '#25D366', label: 'WhatsApp' },
  { icon: <FiYoutube size={18} />, color: '#FF0000', label: 'YouTube' },
];

const contacts = [
  { icon: <FiPhone size={14} />, text: '+91 73395 01438', href: 'tel:+917339501438' },
  { icon: <FiMail size={14} />, text: 'karisanathargiftshop@gmail.com', href: 'mailto:karisanathargiftshop@gmail.com' },
  { icon: <FiMapPin size={14} />, text: '16/14, Husain Complex, Near Old Bus Stand, Arni - 632301', href: null },
];

export default function Footer() {
  const navigate = useNavigate();

  const linkColor = 'rgba(255,255,255,0.75)';

  return (
    <Box
      component="footer"
      sx={{
        mt: 0,
        background: 'linear-gradient(180deg, #1F0810 0%, #0D0507 100%)',
        color: '#fff',
        pt: { xs: 6, md: 8 },
        pb: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ pb: { xs: 5, md: 6 } }}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box
                  component="img"
                  src="/Logo.png"
                  alt="Karisanathar Gift Shop"
                  sx={{ height: 44, width: 'auto', borderRadius: 1 }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: '#fff',
                      fontFamily: "'Playfair Display', serif",
                      lineHeight: 1.1,
                    }}
                  >
                    KARISANATHAR
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.6rem', color: GOLD, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    Gift Shop
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, maxWidth: 300, mb: 3 }}
              >
                Your one-stop destination for unique and thoughtful gifts. Because every emotion
                deserves the perfect gift.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socials.map((social) => (
                  <motion.div key={social.label} whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      aria-label={social.label}
                      sx={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.7)',
                        width: 36,
                        height: 36,
                        '&:hover': { background: social.color, color: '#fff', border: `1px solid ${social.color}` },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Typography
                sx={{
                  color: GOLD,
                  fontWeight: 700,
                  mb: 2.5,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {quickLinks.map((link) => (
                  <Typography
                    key={link.label}
                    variant="body2"
                    onClick={() => navigate(link.path)}
                    sx={{
                      color: linkColor,
                      cursor: 'pointer',
                      fontSize: '0.83rem',
                      '&:hover': { color: GOLD },
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Customer Service */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <Typography
                sx={{
                  color: GOLD,
                  fontWeight: 700,
                  mb: 2.5,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                }}
              >
                Customer Service
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {customerService.map((item) => (
                  <Typography
                    key={item.label}
                    variant="body2"
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: linkColor,
                      cursor: 'pointer',
                      fontSize: '0.83rem',
                      '&:hover': { color: GOLD },
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Typography
                sx={{
                  color: GOLD,
                  fontWeight: 700,
                  mb: 2.5,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                }}
              >
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {contacts.map((item) => (
                  <Box
                    key={item.text}
                    component={item.href ? 'a' : 'div'}
                    href={item.href}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      textDecoration: 'none',
                      '&:hover > .contact-text': item.href ? { color: GOLD } : {},
                    }}
                  >
                    <Box
                      sx={{
                        color: GOLD,
                        display: 'flex',
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      className="contact-text"
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.65)',
                        fontSize: '0.82rem',
                        lineHeight: 1.6,
                        transition: 'color 0.2s',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            py: 2.5,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>
            © 2025 Karisanathar Gift Shop. All rights reserved.
          </Typography>

          {/* Payment Icons */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {['VISA', 'MC', 'UPI', 'GPay'].map((label) => (
              <Box
                key={label}
                sx={{
                  px: 1.2,
                  py: 0.4,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
