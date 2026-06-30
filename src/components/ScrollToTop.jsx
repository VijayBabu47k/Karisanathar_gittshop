import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Fab } from '@mui/material';
import { FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MAROON = '#7B1A2D';
const GOLD = '#C9A844';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show button after scrolling 400px
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.25 }}
          style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1100 }}
        >
          <Fab
            size="medium"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            sx={{
              background: `linear-gradient(135deg, ${MAROON}, #5C0F1E)`,
              color: GOLD,
              border: `2px solid ${GOLD}40`,
              boxShadow: '0 4px 20px rgba(123,26,45,0.4)',
              '&:hover': {
                background: `linear-gradient(135deg, #9B2940, ${MAROON})`,
                boxShadow: '0 6px 30px rgba(123,26,45,0.5)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <FiArrowUp size={20} />
          </Fab>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
