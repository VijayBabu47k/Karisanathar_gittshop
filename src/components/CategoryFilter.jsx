import { Box, Chip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  BsKey, BsDiamond, BsEnvelope, BsHeart, BsLightbulb, BsCamera,
  BsJoystick, BsBalloon, BsStars, BsMic, BsGift,
} from 'react-icons/bs';
import { GiTempleDoor, GiBearFace } from 'react-icons/gi';
import { useThemeMode } from '../context/ThemeContext';

const MAROON = '#7B1A2D';
const GOLD = '#C9A844';

const categoryIcons = {
  All: BsStars,
  Keychains: BsKey,
  Rings: BsDiamond,
  'Couple Rings': BsHeart,
  'Message Bottles': BsEnvelope,
  'Swami Silai': GiTempleDoor,
  'Voice Recorder Gifts': BsMic,
  'Heart Box': BsGift,
  'Lighting Gifts': BsLightbulb,
  'Photo Gifts': BsCamera,
  'RC Cars': BsJoystick,
  'Teddy Collection': GiBearFace,
  'Birthday Decoration': BsBalloon,
};

export default function CategoryFilter({ categories, selected, onSelect }) {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Box sx={{ mb: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="overline"
          sx={{ color: MAROON, letterSpacing: 4, display: 'block', mb: 1, textAlign: 'center', fontWeight: 700 }}
        >
          Browse by Category
        </Typography>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 800,
            fontSize: { xs: '1.6rem', md: '2.1rem' },
            color: isDark ? '#F5E6E8' : '#1A0A0D',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Our Collection
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, px: 2 }}>
        {['All', ...categories].map((cat, index) => {
          const Icon = categoryIcons[cat] || BsStars;
          const isSelected = selected === cat;
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                icon={<Icon style={{ fontSize: 15 }} />}
                label={cat}
                onClick={() => onSelect(cat)}
                sx={{
                  px: 0.8,
                  py: 2.5,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  background: isSelected
                    ? `linear-gradient(135deg, ${MAROON}, #5C0F1E)`
                    : isDark
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.04)',
                  color: isSelected ? '#fff' : 'text.secondary',
                  border: isSelected
                    ? `1px solid rgba(201,168,68,0.4)`
                    : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  boxShadow: isSelected ? `0 4px 16px rgba(123,26,45,0.3)` : 'none',
                  '& .MuiChip-icon': { color: isSelected ? GOLD : 'inherit' },
                  '&:hover': {
                    background: isSelected
                      ? `linear-gradient(135deg, ${MAROON}, #5C0F1E)`
                      : isDark
                      ? 'rgba(255,255,255,0.09)'
                      : 'rgba(123,26,45,0.08)',
                    color: isSelected ? '#fff' : MAROON,
                  },
                  transition: 'all 0.25s ease',
                }}
              />
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}
