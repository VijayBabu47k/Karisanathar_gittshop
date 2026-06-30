import { TextField, InputAdornment, Box, IconButton } from '@mui/material';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';

const MAROON = '#7B1A2D';

export default function SearchBar({ value, onChange }) {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Box sx={{ maxWidth: 520, mx: 'auto', mb: 4, px: 2 }}>
        <TextField
          fullWidth
          placeholder="Search gifts by name, category or keyword..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch style={{ color: MAROON, fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: value ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onChange('')}>
                    <FiX size={16} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              backdropFilter: 'blur(10px)',
              '& fieldset': {
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)',
              },
              '&:hover fieldset': { borderColor: `rgba(123,26,45,0.4)` },
              '&.Mui-focused fieldset': { borderColor: MAROON, borderWidth: 2 },
            },
          }}
        />
      </Box>
    </motion.div>
  );
}
