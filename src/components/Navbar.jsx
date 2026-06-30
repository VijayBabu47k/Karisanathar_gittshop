import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  InputBase,
  Paper,
  Chip,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiHome,
  FiGrid,
  FiInfo,
  FiPhone,
  FiSearch,
  FiHeart,
  FiChevronDown,
  FiTag,
} from "react-icons/fi";
import {
  BsKey,
  BsDiamond,
  BsEnvelope,
  BsHeart,
  BsLightbulb,
  BsCamera,
  BsJoystick,
  BsBalloon,
  BsStars,
  BsMic,
  BsGift,
} from "react-icons/bs";
import { GiTempleDoor, GiBearFace } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useThemeMode } from "../context/ThemeContext";
import products from "../data/products.json";

const MAROON = "#7B1A2D";
const MAROON_DARK = "#5C0F1E";
const GOLD = "#C9A844";

const navLinks = [
  { label: "Home", path: "/", icon: <FiHome /> },
  { label: "Shop", path: "/categories", icon: <FiGrid /> },
  { label: "New Arrivals", path: "/?filter=new", icon: <FiTag /> },
  { label: "Best Sellers", path: "/?filter=bestseller", icon: <FiHeart /> },
  { label: "About Us", path: "/about", icon: <FiInfo /> },
  { label: "Contact Us", path: "/contact", icon: <FiPhone /> },
];

const allCategories = [
  { label: "Keychains", icon: <BsKey size={15} /> },
  { label: "Rings", icon: <BsDiamond size={15} /> },
  { label: "Couple Rings", icon: <BsHeart size={15} /> },
  { label: "Message Bottles", icon: <BsEnvelope size={15} /> },
  { label: "Swami Silai", icon: <GiTempleDoor size={15} /> },
  { label: "Voice Recorder Gifts", icon: <BsMic size={15} /> },
  { label: "Heart Box", icon: <BsGift size={15} /> },
  { label: "Lighting Gifts", icon: <BsLightbulb size={15} /> },
  { label: "Photo Gifts", icon: <BsCamera size={15} /> },
  { label: "RC Cars", icon: <BsJoystick size={15} /> },
  { label: "Teddy Collection", icon: <GiBearFace size={15} /> },
  { label: "Birthday Decoration", icon: <BsBalloon size={15} /> },
];

const popularSearches = [
  "Teddys",
  "Frames",
  "Flowers",
  "Mugs",
  "Gifts for Her",
  "Birthday Gifts",
];

const offers = [
  "🙏 Ponniyamman Thunai • Pachaiyamman Thunai",
  "🎉 Flat 20% OFF on Birthday Gifts - Use Code: BDAY20",
  "🚚 FREE Delivery on Orders Above ₹499 - Pan India",
  "💝 Buy 2 Get 1 FREE on Keychains & Photo Gifts",
  "🎁 New Arrivals: Premium Gift Hampers Starting ₹299",
  "⭐ 4.8/5 Rating - Trusted by 2000+ Happy Customers",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [catAnchorEl, setCatAnchorEl] = useState(null);
  const searchRef = useRef(null);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDark = mode === "dark";

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      return products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q),
        )
        .slice(0, 5);
    }
    return [];
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    const q = (query || searchQuery).trim();
    if (q) {
      navigate(`/?search=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
      setTimeout(
        () =>
          document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" }),
        300,
      );
    }
  };

  const handleCategoryClick = (cat) => {
    setCatAnchorEl(null);
    navigate(`/?category=${encodeURIComponent(cat)}`);
    setTimeout(
      () =>
        document
          .getElementById("products")
          ?.scrollIntoView({ behavior: "smooth" }),
      300,
    );
  };

  return (
    <>
      {/* ── Marquee Offers Bar ── */}
      <Box
        sx={{
          background: `linear-gradient(90deg, ${MAROON_DARK}, ${MAROON})`,
          py: 0.6,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            animation: "marquee 40s linear infinite",
            whiteSpace: "nowrap",
            "@keyframes marquee": {
              "0%": { transform: "translateX(0%)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {[...offers, ...offers].map((offer, i) => (
            <Typography
              key={i}
              component="span"
              sx={{
                color: GOLD,
                fontSize: "0.75rem",
                fontWeight: 600,
                mx: 4,
                letterSpacing: 0.3,
              }}
            >
              {offer}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* ── Main AppBar ── */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: isDark
            ? "rgba(26,10,13,0.99)"
            : "rgba(255,255,255,0.995)",
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          boxShadow: isDark
            ? "0 4px 30px rgba(0,0,0,0.5)"
            : "0 2px 24px rgba(0,0,0,0.06)",
          top: 0,
          zIndex: 1200,
        }}
      >
        {/* Middle Row: Logo + Search + Cart */}
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            py: { xs: 0.5, md: 0.8 },
            minHeight: { xs: 64, md: 72 },
          }}
        >
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <Box
                component="img"
                src="/Logo.png"
                alt="Karisanathar Gift Shop"
                sx={{
                  height: isMobile ? 40 : 50,
                  width: isMobile ? 45 : 55,
                  borderRadius: 1,
                }}
              />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { sm: "0.95rem", md: "1.15rem" },
                    color: isDark ? "#F5E6E8" : MAROON,
                    lineHeight: 1.1,
                    letterSpacing: "0.04em",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  KARISANATHAR
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "0.62rem",
                    color: isDark ? "#C4A0A8" : "#6B4C53",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Gift Shop
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Search - Desktop */}
          {!isMobile && (
            <Box
              ref={searchRef}
              sx={{ position: "relative", flex: 1, maxWidth: 540, mx: 3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: `2px solid ${searchOpen ? MAROON : isDark ? "rgba(255,255,255,0.12)" : "rgba(123,26,45,0.25)"}`,
                  borderRadius: "50px",
                  overflow: "hidden",
                  background: isDark ? "rgba(255,255,255,0.04)" : "#FFF8F5",
                  transition: "all 0.25s ease",
                  boxShadow: searchOpen
                    ? `0 4px 20px rgba(123,26,45,0.12)`
                    : "none",
                  height: 44,
                }}
              >
                <Box sx={{ pl: 2.5, display: "flex", alignItems: "center" }}>
                  <FiSearch size={17} color={isDark ? "#C4A0A8" : MAROON} />
                </Box>
                <InputBase
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch(searchQuery);
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  placeholder="Search for gifts, teddys, frames and more..."
                  sx={{
                    flex: 1,
                    pl: 1.5,
                    fontSize: "0.88rem",
                    color: "text.primary",
                  }}
                />
                {searchQuery && (
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    sx={{ mr: 0.5 }}
                  >
                    <FiX size={14} color={isDark ? "#C4A0A8" : "#6B4C53"} />
                  </IconButton>
                )}
                <Box
                  onClick={() => handleSearch(searchQuery)}
                  sx={{
                    width: 55,
                    height: 44,
                    background: `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0 50px 50px 0",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${MAROON_DARK}, #3D0610)`,
                    },
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <FiSearch style={{ color: "#fff", fontSize: 16 }} />
                </Box>
              </Paper>

              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      right: 0,
                      zIndex: 1300,
                    }}
                  >
                    <Paper
                      elevation={16}
                      sx={{
                        padding: 1,
                        borderRadius: 3,
                        overflow: "hidden",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                        background: isDark ? "#1A0A0D" : "#FFFFFF",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                      }}
                    >
                      {searchResults.length === 0 ? (
                        <>
                          <Box sx={{ p: 2, pb: 1.5 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary",
                                fontWeight: 700,
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                fontSize: "0.68rem",
                              }}
                            >
                              Popular Searches
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              px: 2,
                              pb: 2,
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                            }}
                          >
                            {popularSearches.map((s) => (
                              <Chip
                                key={s}
                                label={s}
                                size="small"
                                onClick={() => {
                                  setSearchQuery(s);
                                  handleSearch(s);
                                }}
                                sx={{
                                  borderRadius: "20px",
                                  fontSize: "0.75rem",
                                  padding:0.3,
                                  cursor: "pointer",
                                  border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(123,26,45,0.2)"}`,
                                  background: isDark
                                    ? "rgba(255,255,255,0.04)"
                                    : "rgba(123,26,45,0.04)",
                                  fontWeight: 600,
                                  "&:hover": {
                                    background: MAROON,
                                    color: "#fff",
                                    border: `1px solid ${MAROON}`,
                                  },
                                  transition: "all 0.2s",
                                }}
                              />
                            ))}
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box sx={{ p: 2, pb: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary",
                                fontWeight: 700,
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                fontSize: "0.68rem",
                              }}
                            >
                              Products
                            </Typography>
                          </Box>
                          {searchResults.map((product) => (
                            <Box
                              key={product.id}
                              onClick={() => {
                                navigate(
                                  `/?search=${encodeURIComponent(product.name)}`,
                                );
                                setSearchOpen(false);
                                setSearchQuery("");
                                setTimeout(
                                  () =>
                                    document
                                      .getElementById("products")
                                      ?.scrollIntoView({ behavior: "smooth" }),
                                  300,
                                );
                              }}
                              sx={{
                                px: 2,
                                py: 1.5,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                cursor: "pointer",
                                "&:hover": {
                                  background: isDark
                                    ? "rgba(255,255,255,0.04)"
                                    : "rgba(123,26,45,0.04)",
                                },
                                transition: "background 0.15s",
                              }}
                            >
                              <Avatar
                                src={product.image}
                                alt={product.name}
                                variant="rounded"
                                sx={{ width: 44, height: 44, borderRadius: 2 }}
                              />
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 600,
                                    color: "text.primary",
                                    fontSize: "0.85rem",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {product.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "text.secondary" }}
                                >
                                  {product.category}
                                </Typography>
                              </Box>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color: MAROON,
                                  fontSize: "0.88rem",
                                  flexShrink: 0,
                                }}
                              >
                                ₹{product.price}
                              </Typography>
                            </Box>
                          ))}
                          <Divider />
                          <Box
                            onClick={() => handleSearch(searchQuery)}
                            sx={{
                              p: 1.5,
                              textAlign: "center",
                              cursor: "pointer",
                              "&:hover": {
                                background: isDark
                                  ? "rgba(255,255,255,0.04)"
                                  : "rgba(123,26,45,0.04)",
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: MAROON, fontWeight: 600 }}
                            >
                              View all results for &ldquo;{searchQuery}&rdquo; →
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Paper>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          )}

          {/* Right: Call + Wishlist + Theme + Cart + Hamburger */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.3, md: 0.8 },
            }}
          >
            {/* Call Us - Clickable */}
            {!isMobile && (
              <Box
                component="a"
                href="tel:+917339501438"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mr: 1,
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover .call-text": { color: MAROON },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, rgba(123,26,45,0.12), rgba(201,168,68,0.08))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${isDark ? "rgba(201,168,68,0.2)" : "rgba(123,26,45,0.15)"}`,
                  }}
                >
                  <FiPhone style={{ color: MAROON, fontSize: 15 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      color: "text.secondary",
                      lineHeight: 1,
                    }}
                  >
                    Call Us
                  </Typography>
                  <Typography
                    className="call-text"
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "text.primary",
                      lineHeight: 1.3,
                      transition: "color 0.2s",
                    }}
                  >
                    +91 73395 01438
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Wishlist */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="small"
                onClick={() => navigate("/wishlist")}
                sx={{ color: isDark ? "#C4A0A8" : MAROON }}
              >
                <Badge
                  badgeContent={wishlistItems.length}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.65rem",
                      minWidth: 16,
                      height: 16,
                    },
                  }}
                >
                  <FiHeart size={18} />
                </Badge>
              </IconButton>
            </motion.div>

            <motion.div
              whileTap={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{ color: isDark ? GOLD : MAROON }}
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{ color: isDark ? "#F5E6E8" : "#1A0A0D" }}
              >
                <Badge
                  badgeContent={totalItems}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: MAROON,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                    },
                  }}
                >
                  <FiShoppingCart size={20} />
                </Badge>
              </IconButton>
            </motion.div>

            {isMobile && (
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ color: MAROON }}
              >
                <FiMenu size={22} />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* ── Category Nav Bar - Desktop ── */}
        {!isMobile && (
          <Box
            sx={{
              background: isDark ? "#2D0A10" : MAROON,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Box
              sx={{
                maxWidth: "lg",
                mx: "auto",
                px: 4,
                display: "flex",
                alignItems: "stretch",
              }}
            >
              {/* All Categories Dropdown */}
              <Button
                startIcon={<FiGrid size={14} />}
                endIcon={
                  <FiChevronDown
                    size={12}
                    style={{
                      transform: catAnchorEl ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                }
                onClick={(e) =>
                  setCatAnchorEl(catAnchorEl ? null : e.currentTarget)
                }
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${MAROON_DARK}, #3D0610)`,
                  borderRadius: 0,
                  px: 3,
                  py: 1.3,
                  mr: 0.5,
                  fontSize: "0.82rem",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.03em",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${GOLD}, ${GOLD}80, ${GOLD})`,
                  },
                  "&:hover": {
                    background: `linear-gradient(135deg, #3D0610, #1A0206)`,
                    "& .cat-icon": { transform: "rotate(90deg)" },
                  },
                  "& .MuiButton-startIcon": {
                    transition: "transform 0.3s ease",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  All Categories
                </Box>
              </Button>
              <Menu
                anchorEl={catAnchorEl}
                open={Boolean(catAnchorEl)}
                onClose={() => setCatAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 0,
                      borderRadius: "0 0 12px 12px",
                      minWidth: 260,
                      border: `1px solid ${isDark ? "rgba(201,168,68,0.15)" : "rgba(123,26,45,0.12)"}`,
                      borderTop: `3px solid ${GOLD}`,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                      background: isDark ? "#1A0A0D" : "#FFFFFF",
                      py: 1,
                    },
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1, mb: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "text.secondary",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Browse Categories
                  </Typography>
                </Box>
                <MenuItem
                  onClick={() => handleCategoryClick("All")}
                  sx={{
                    py: 1.2,
                    mx: 1,
                    borderRadius: 1.5,
                    "&:hover": {
                      background: `linear-gradient(135deg, rgba(123,26,45,0.08), rgba(201,168,68,0.05))`,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: GOLD, minWidth: 32 }}>
                    <BsStars size={16} />
                  </ListItemIcon>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "0.88rem", color: MAROON }}
                  >
                    All Products
                  </Typography>
                </MenuItem>
                <Divider sx={{ my: 0.5, mx: 2 }} />
                {allCategories.map((cat) => (
                  <MenuItem
                    key={cat.label}
                    onClick={() => handleCategoryClick(cat.label)}
                    sx={{
                      py: 1,
                      mx: 1,
                      borderRadius: 1.5,
                      "&:hover": {
                        background: `linear-gradient(135deg, rgba(123,26,45,0.06), rgba(201,168,68,0.03))`,
                        "& .cat-label": { color: MAROON },
                      },
                      transition: "all 0.15s",
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: MAROON, minWidth: 32, opacity: 0.8 }}
                    >
                      {cat.icon}
                    </ListItemIcon>
                    <Typography
                      className="cat-label"
                      sx={{
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        transition: "color 0.15s",
                      }}
                    >
                      {cat.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>

             
              {navLinks.map((link) => {
                const active =
                  location.pathname === link.path ||
                  (link.path.includes("?") &&
                    location.search.includes(link.path.split("?")[1]));
                return (
                  <Button
                    key={link.label}
                    onClick={() => navigate(link.path)}
                    sx={{
                      color: active ? GOLD : "rgba(255,255,255,0.92)",
                      fontWeight: active ? 700 : 500,
                      borderRadius: 0,
                      px: 2,
                      py: 1.2,
                      fontSize: "0.82rem",
                      borderBottom: active
                        ? `2.5px solid ${GOLD}`
                        : "2.5px solid transparent",
                      "&:hover": {
                        color: GOLD,
                        background: "rgba(255,255,255,0.06)",
                        borderBottom: `2.5px solid ${GOLD}60`,
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Box>
          </Box>
        )}
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: 290, background: isDark ? "#1A0A0D" : "#FFFFFF" },
        }}
      >
        <Box sx={{ pt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              pb: 2,
              borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                component="img"
                src="/Logo.png"
                alt="Karisanathar Gift Shop"
                sx={{ height: 38, width: "auto", borderRadius: 1 }}
              />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    color: MAROON,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  KARISANATHAR
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.55rem",
                    color: "text.secondary",
                    letterSpacing: "0.2em",
                  }}
                >
                  Gift Shop
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)} size="small">
              <FiX size={20} />
            </IconButton>
          </Box>

          {/* Mobile Search */}
          <Box sx={{ px: 2, py: 2 }}>
            <Paper
              elevation={0}
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchQuery);
                setMobileOpen(false);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                border: `1.5px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(123,26,45,0.25)"}`,
                borderRadius: "50px",
                overflow: "hidden",
              }}
            >
              <InputBase
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gifts..."
                sx={{ flex: 1, pl: 2.5, py: 1, fontSize: "0.875rem" }}
              />
              <Box
                component="button"
                type="submit"
                sx={{
                  px: 2,
                  py: 1.2,
                  background: MAROON,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "0 50px 50px 0",
                }}
              >
                <FiSearch style={{ color: "#fff", fontSize: 16 }} />
              </Box>
            </Paper>
          </Box>

          <List sx={{ px: 1 }}>
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <ListItemButton
                  key={link.label}
                  onClick={() => {
                    navigate(link.path);
                    setMobileOpen(false);
                  }}
                  selected={active}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    "&.Mui-selected": {
                      background: `rgba(123,26,45,0.1)`,
                      color: MAROON,
                    },
                    "&:hover": { background: `rgba(123,26,45,0.07)` },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      color: active ? MAROON : "text.primary",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", fontSize: 16 }}>
                      {link.icon}
                    </Box>
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontWeight: active ? 700 : 500,
                        fontSize: "0.93rem",
                      }}
                    />
                  </Box>
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ mx: 2, my: 1 }} />
          <Box sx={{ px: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => {
                navigate("/cart");
                setMobileOpen(false);
              }}
              sx={{ color: MAROON }}
            >
              <Badge
                badgeContent={totalItems}
                sx={{
                  "& .MuiBadge-badge": { background: MAROON, color: "#fff" },
                }}
              >
                <FiShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("/wishlist");
                setMobileOpen(false);
              }}
              sx={{ color: MAROON }}
            >
              <Badge
                badgeContent={wishlistItems.length}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.6rem",
                    minWidth: 15,
                    height: 15,
                  },
                }}
              >
                <FiHeart />
              </Badge>
            </IconButton>
            <IconButton
              onClick={toggleTheme}
              sx={{ color: isDark ? GOLD : MAROON }}
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </IconButton>
          </Box>

          <Divider sx={{ mx: 2, my: 1 }} />
          <Box sx={{ px: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              CATEGORIES
            </Typography>
            <List dense sx={{ mt: 0.5 }}>
              {allCategories.slice(0, 6).map((cat) => (
                <ListItemButton
                  key={cat.label}
                  onClick={() => {
                    handleCategoryClick(cat.label);
                    setMobileOpen(false);
                  }}
                  sx={{ borderRadius: 1.5, py: 0.8 }}
                >
                  <ListItemIcon sx={{ color: MAROON, minWidth: 28 }}>
                    {cat.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={cat.label}
                    primaryTypographyProps={{ fontSize: "0.82rem" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
