import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, Box, Typography, TextField, Button, Divider,
  Avatar,
} from '@mui/material';
import { BsWhatsapp } from 'react-icons/bs';
import { FiArrowLeft, FiCheckCircle, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useCart } from '../context/CartContext';
import { useThemeMode } from '../context/ThemeContext';
import { openWhatsApp } from '../utils/whatsapp';

const MAROON = '#7B1A2D';
const GOLD = '#C9A844';

function generateInvoiceHTML(customer, items, total, orderId) {
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const itemRows = items.map((item, i) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${i + 1}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.name}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">₹${item.price}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:600;">₹${item.price * item.quantity}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice - ${orderId}</title>
<style>
  body { font-family: 'Inter', sans-serif; margin: 0; padding: 40px; color: #1A0A0D; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #7B1A2D; padding-bottom: 20px; }
  .logo-area h1 { color: #7B1A2D; margin: 0; font-size: 24px; }
  .logo-area p { color: #6B4C53; margin: 4px 0 0; font-size: 12px; letter-spacing: 2px; }
  .invoice-info { text-align: right; }
  .invoice-info h2 { color: #7B1A2D; margin: 0 0 8px; font-size: 28px; }
  .details { display: flex; justify-content: space-between; margin-bottom: 30px; }
  .details-box h4 { color: #7B1A2D; margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
  .details-box p { margin: 3px 0; font-size: 14px; color: #333; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
  th { background: #7B1A2D; color: #fff; padding: 10px 12px; text-align: left; font-size: 13px; }
  th:last-child, th:nth-child(4), th:nth-child(3) { text-align: right; }
  .total-row { background: #FFF5F0; }
  .total-row td { padding: 12px; font-weight: 700; font-size: 16px; }
  .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #6B4C53; font-size: 12px; }
  @media print { body { padding: 20px; } }
</style></head><body>
<div class="header">
  <div class="logo-area">
    <h1>KGN - Karisanathar Gift Shop</h1>
    <p>PREMIUM GIFTS FOR EVERY OCCASION</p>
  </div>
  <div class="invoice-info">
    <h2>INVOICE</h2>
    <p><strong>Invoice No:</strong> ${orderId}</p>
    <p><strong>Date:</strong> ${date}</p>
  </div>
</div>
<div class="details">
  <div class="details-box">
    <h4>Bill To</h4>
    <p><strong>${customer.name}</strong></p>
    <p>${customer.email}</p>
    <p>${customer.phone}</p>
    <p>${customer.address}</p>
  </div>
  <div class="details-box" style="text-align:right;">
    <h4>From</h4>
    <p><strong>Karisanathar Gift Shop</strong></p>
    <p>16/14, Husain Complex</p>
    <p>Near Old Bus Stand, Arni - 632301</p>
    <p>+91 73395 01438</p>
  </div>
</div>
<table>
  <thead><tr><th>#</th><th>Product</th><th style="text-align:center;">Qty</th><th style="text-align:right;">Price</th><th style="text-align:right;">Total</th></tr></thead>
  <tbody>
    ${itemRows}
    <tr><td colspan="4" style="padding:8px 12px;text-align:right;font-weight:600;">Delivery:</td><td style="padding:8px 12px;text-align:right;color:green;">FREE</td></tr>
    <tr class="total-row"><td colspan="4" style="text-align:right;font-size:16px;">Grand Total:</td><td style="text-align:right;color:#7B1A2D;font-size:18px;">₹${total}</td></tr>
  </tbody>
</table>
<div class="footer">
  <p>Thank you for shopping with Karisanathar Gift Shop!</p>
  <p>For queries: karisanathargiftshop@gmail.com | +91 73395 01438</p>
</div>
</body></html>`;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Valid 10-digit phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const orderId = `KGN-${Date.now().toString(36).toUpperCase()}`;
    setOrderData({ customer: { ...form }, items: [...items], total: totalPrice, orderId });
    openWhatsApp(form, items, totalPrice);
    setOrderPlaced(true);
    clearCart();
    enqueueSnackbar('Order sent via WhatsApp!', { variant: 'success' });
  };

  const handleDownloadInvoice = () => {
    if (!orderData) return;
    const html = generateInvoiceHTML(orderData.customer, orderData.items, orderData.total, orderData.orderId);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
        URL.revokeObjectURL(url);
      };
    } else {
      // Fallback: download as file
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${orderData.orderId}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
          <FiCheckCircle style={{ fontSize: 100, color: '#00c853', marginBottom: 24 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary', fontFamily: "'Playfair Display', serif" }}>
            Order Placed Successfully!
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1 }}>
            Order ID: <strong>{orderData?.orderId}</strong>
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            Thank you for your order. We will get back to you shortly on WhatsApp.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<FiDownload />}
              onClick={handleDownloadInvoice}
              sx={{
                background: `linear-gradient(135deg, ${MAROON}, #5C0F1E)`,
                px: 3,
                fontWeight: 700,
                '&:hover': { background: `linear-gradient(135deg, #9B2940, ${MAROON})` },
              }}
            >
              Download Invoice
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')} sx={{ borderColor: MAROON, color: MAROON }}>
              Continue Shopping
            </Button>
          </Box>
        </motion.div>
      </Container>
    );
  }

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)' },
      '&:hover fieldset': { borderColor: MAROON },
      '&.Mui-focused fieldset': { borderColor: MAROON, borderWidth: 2 },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: MAROON },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Box
              onClick={() => navigate('/cart')}
              sx={{
                cursor: 'pointer', p: 1, borderRadius: 2, display: 'flex',
                color: isDark ? '#C4A0A8' : '#6B4C53',
                '&:hover': { background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
              }}
            >
              <FiArrowLeft size={22} />
            </Box>
          </motion.div>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', fontFamily: "'Playfair Display', serif" }}>Checkout</Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 4, height: 28, background: `linear-gradient(180deg, ${MAROON}, ${GOLD})`, borderRadius: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Delivery Details</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Full Name *" value={form.name} onChange={handleChange('name')} error={!!errors.name} helperText={errors.name} sx={inputSx} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Email *" type="email" value={form.email} onChange={handleChange('email')} error={!!errors.email} helperText={errors.email} sx={inputSx} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Phone Number *" value={form.phone} onChange={handleChange('phone')} error={!!errors.phone} helperText={errors.phone} sx={inputSx} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Delivery Address *" multiline rows={3} value={form.address} onChange={handleChange('address')} error={!!errors.address} helperText={errors.address} sx={inputSx} />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>Place Your Order</Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<BsWhatsapp />}
                onClick={handleWhatsApp}
                sx={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  '&:hover': { background: 'linear-gradient(135deg, #2be06e, #159e8d)' },
                  boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                  py: 1.5, fontSize: '1rem',
                }}
              >
                Order via WhatsApp
              </Button>
            </Card>
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card sx={{ p: 3, position: { md: 'sticky' }, top: { md: 100 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Order Summary ({items.length} items)
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
                {items.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                    <Avatar src={item.image} variant="rounded" sx={{ width: 48, height: 48 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>{item.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>₹{item.price} × {item.quantity}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: MAROON }}>₹{item.price * item.quantity}</Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'text.secondary' }}>Subtotal</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>₹{totalPrice}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'text.secondary' }}>Delivery</Typography>
                <Typography sx={{ fontWeight: 600, color: '#00c853' }}>Free</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'text.primary' }}>Total</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: MAROON }}>₹{totalPrice}</Typography>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
