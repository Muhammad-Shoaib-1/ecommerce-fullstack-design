require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const Category = require('./models/Category')
const Product = require('./models/Product')
const User = require('./models/User')

// ─── CATEGORIES ───────────────────────────────────────────────
const categories = [
  { name: 'Automobiles',        slug: 'automobiles',       image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200' },
  { name: 'Clothes & Wear',     slug: 'clothes-and-wear',  image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200' },
  { name: 'Home & Interiors',   slug: 'home-interiors',    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200' },
  { name: 'Electronics',        slug: 'electronics',       image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200' },
  { name: 'Tools & Equipment',  slug: 'tools-equipment',   image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200' },
  { name: 'Sports & Outdoor',   slug: 'sports-and-outdoor',image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200' },
  { name: 'Animals & Pets',     slug: 'animals-and-pets',  image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200' },
  { name: 'Computers & Tech',   slug: 'computers-and-tech',image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200' },
]

// ─── SEED FUNCTION ────────────────────────────────────────────
const seedDB = async () => {
  await connectDB()

  console.log('🗑️  Clearing old data...')
  await Product.deleteMany()
  await Category.deleteMany()
  await User.deleteMany()

  console.log('📂 Seeding categories...')
  const cats = await Category.insertMany(categories)

  const C = {}
  cats.forEach(c => { C[c.slug] = c._id })

  console.log('📦 Seeding products...')
  const products = [

    // ── ELECTRONICS ──────────────────────────────────────────
    {
      name: 'Canon EOS 2000D DSLR Camera + 18-55mm Lens',
      description: 'Perfect entry-level DSLR with a 24.1 MP APS-C sensor, built-in Wi-Fi, and NFC. Capture stunning photos and Full HD videos with ease.',
      price: 579.00,
      oldPrice: 749.00,
      category: C['electronics'],
      images: [
        { url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500', isMain: true },
        { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500', isMain: false },
      ],
      rating: 5, numReviews: 214, orders: 520, stock: 30,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: true, discount: '-23%',
      specs: [
        { label: 'Sensor', value: '24.1 MP APS-C CMOS' },
        { label: 'ISO Range', value: '100 – 6400' },
        { label: 'Video', value: 'Full HD 1080p' },
        { label: 'Connectivity', value: 'Wi-Fi, NFC' },
        { label: 'Battery Life', value: '500 shots' },
        { label: 'Warranty', value: '2 Years' },
      ],
      features: ['24.1 MP APS-C sensor for sharp images', 'Built-in Wi-Fi & NFC sharing', 'Full HD video recording', 'Scene Intelligent Auto mode', 'Includes 18-55mm kit lens'],
      seller: { name: 'Ray', company: 'Canon Official Store', country: 'Japan', verified: true },
    },
    {
      name: 'GoPro HERO11 Black Action Camera',
      description: 'The most powerful GoPro ever. Shoots 5.3K video and 27 MP photos. HyperSmooth 5.0 stabilization. Waterproof to 33ft.',
      price: 349.00,
      oldPrice: 449.00,
      category: C['electronics'],
      images: [
        { url: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500', isMain: true },
        { url: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=500', isMain: false },
      ],
      rating: 5, numReviews: 312, orders: 870, stock: 45,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: true, discount: '-22%',
      specs: [
        { label: 'Video', value: '5.3K60 + 4K120' },
        { label: 'Photo', value: '27 MP' },
        { label: 'Stabilization', value: 'HyperSmooth 5.0' },
        { label: 'Waterproof', value: '10m (33ft)' },
        { label: 'Battery', value: '1720 mAh' },
      ],
      features: ['5.3K video resolution', 'HyperSmooth 5.0 stabilization', 'Waterproof without housing', 'Live streaming capability', 'Voice control'],
      seller: { name: 'Mike', company: 'GoPro Official', country: 'USA', verified: true },
    },
    {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      description: 'Industry-leading noise cancelling headphones with 30-hour battery life and crystal clear hands-free calling.',
      price: 279.00,
      oldPrice: 350.00,
      category: C['electronics'],
      images: [
        { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', isMain: true },
        { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500', isMain: false },
      ],
      rating: 5, numReviews: 189, orders: 430, stock: 60,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: false, discount: null,
      specs: [
        { label: 'Battery Life', value: '30 hours' },
        { label: 'Noise Cancelling', value: 'Yes (8 mics)' },
        { label: 'Connectivity', value: 'Bluetooth 5.2' },
        { label: 'Weight', value: '250g' },
        { label: 'Foldable', value: 'Yes' },
      ],
      features: ['Industry-leading noise cancellation', '30-hour battery life', 'Multipoint connection (2 devices)', 'Speak-to-chat technology', 'Quick Charge (3 min = 3 hrs)'],
      seller: { name: 'Sara', company: 'Sony Electronics', country: 'Japan', verified: true },
    },
    {
      name: 'Apple Watch Series 9 - 45mm Midnight',
      description: 'The most capable Apple Watch yet. Features Double Tap gesture, brighter Always-On display, and faster chip.',
      price: 429.00,
      oldPrice: null,
      category: C['electronics'],
      images: [
        { url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500', isMain: true },
      ],
      rating: 5, numReviews: 501, orders: 1200, stock: 80,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: false, discount: null,
      specs: [
        { label: 'Display', value: '45mm Always-On Retina' },
        { label: 'Chip', value: 'S9 SiP' },
        { label: 'Battery', value: '18 hours' },
        { label: 'Water Resistance', value: '50m' },
        { label: 'Connectivity', value: 'GPS + Cellular' },
      ],
      features: ['Double Tap gesture control', '2000 nit Always-On display', 'Blood oxygen & ECG sensors', 'Crash detection', 'Carbon neutral'],
      seller: { name: 'Ali', company: 'Apple Premium Reseller', country: 'USA', verified: true },
    },
    {
      name: 'Samsung 65" QLED 4K Smart TV',
      description: 'Quantum Dot technology delivers 100% Color Volume with Quantum HDR. Neo QLED for stunning picture quality.',
      price: 899.00,
      oldPrice: 1199.00,
      category: C['electronics'],
      images: [
        { url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500', isMain: true },
      ],
      rating: 4, numReviews: 98, orders: 215, stock: 20,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: true, discount: '-25%',
      specs: [
        { label: 'Screen Size', value: '65 inches' },
        { label: 'Resolution', value: '4K UHD (3840x2160)' },
        { label: 'HDR', value: 'Quantum HDR 12x' },
        { label: 'Refresh Rate', value: '120Hz' },
        { label: 'Smart Platform', value: 'Tizen OS' },
      ],
      features: ['Quantum Dot 100% Color Volume', 'Motion Xcelerator Turbo+', 'Object Tracking Sound+', 'Gaming Hub built-in', 'Works with Alexa & Google'],
      seller: { name: 'Hassan', company: 'Samsung Store', country: 'South Korea', verified: true },
    },

    // ── COMPUTERS & TECH ────────────────────────────────────
    {
      name: 'MacBook Air M2 - 13" 8GB 256GB Space Gray',
      description: 'Supercharged by the next-generation M2 chip, MacBook Air is strikingly thin and incredibly capable.',
      price: 1099.00,
      oldPrice: 1299.00,
      category: C['computers-and-tech'],
      images: [
        { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', isMain: true },
        { url: 'https://images.unsplash.com/photo-1611186871525-9b68a0d7d3c9?w=500', isMain: false },
      ],
      rating: 5, numReviews: 342, orders: 780, stock: 35,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: true, discount: '-15%',
      specs: [
        { label: 'Chip', value: 'Apple M2' },
        { label: 'RAM', value: '8GB Unified Memory' },
        { label: 'Storage', value: '256GB SSD' },
        { label: 'Display', value: '13.6" Liquid Retina' },
        { label: 'Battery', value: 'Up to 18 hours' },
        { label: 'Weight', value: '1.24 kg' },
      ],
      features: ['Apple M2 chip with 8-core CPU', 'Up to 18 hours battery life', 'MagSafe charging', 'Fanless silent design', '1080p FaceTime HD camera'],
      seller: { name: 'Zara', company: 'Apple Premium Reseller', country: 'USA', verified: true },
    },
    {
      name: 'Logitech MX Master 3S Wireless Mouse',
      description: 'The master of mice. 8K DPI sensor, ultra-fast MagSpeed scroll, works on any surface including glass.',
      price: 99.00,
      oldPrice: 119.00,
      category: C['computers-and-tech'],
      images: [
        { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', isMain: true },
      ],
      rating: 5, numReviews: 512, orders: 1450, stock: 120,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-17%',
      specs: [
        { label: 'DPI', value: '200 – 8000' },
        { label: 'Battery', value: '70 days' },
        { label: 'Connectivity', value: 'Bluetooth + USB-C' },
        { label: 'Buttons', value: '7 programmable' },
        { label: 'Compatible', value: 'Windows, Mac, Linux' },
      ],
      features: ['8K DPI on any surface including glass', 'MagSpeed electromagnetic scroll', 'Connect up to 3 devices', 'USB-C quick charge', 'App-specific customizations'],
      seller: { name: 'Omar', company: 'Logitech Official', country: 'Switzerland', verified: true },
    },
    {
      name: 'Samsung 27" Curved Gaming Monitor 144Hz',
      description: '1000R curved screen, 144Hz refresh rate, 1ms response time. The ultimate gaming display experience.',
      price: 249.00,
      oldPrice: 320.00,
      category: C['computers-and-tech'],
      images: [
        { url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', isMain: true },
      ],
      rating: 4, numReviews: 178, orders: 390, stock: 28,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-22%',
      specs: [
        { label: 'Size', value: '27 inches' },
        { label: 'Resolution', value: '1920 x 1080 FHD' },
        { label: 'Refresh Rate', value: '144Hz' },
        { label: 'Response Time', value: '1ms' },
        { label: 'Curve', value: '1000R' },
      ],
      features: ['1000R curved immersive display', '144Hz smooth gameplay', 'AMD FreeSync Premium', 'Eye Saver Mode', 'Height & tilt adjustable stand'],
      seller: { name: 'Hassan', company: 'Samsung Store', country: 'South Korea', verified: true },
    },

    // ── CLOTHES & WEAR ────────────────────────────────────────
    {
      name: "Men's Premium Cotton Long Sleeve T-Shirt",
      description: 'Classic slim-fit long sleeve t-shirt made from 100% premium cotton. Breathable, soft and perfect for everyday wear.',
      price: 19.99,
      oldPrice: 29.99,
      category: C['clothes-and-wear'],
      images: [
        { url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500', isMain: true },
        { url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500', isMain: false },
      ],
      rating: 4, numReviews: 320, orders: 1100, stock: 200,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-33%',
      specs: [
        { label: 'Material', value: '100% Premium Cotton' },
        { label: 'Fit', value: 'Slim Fit' },
        { label: 'Sizes', value: 'XS, S, M, L, XL, XXL' },
        { label: 'Colors', value: 'White, Black, Navy, Grey' },
        { label: 'Care', value: 'Machine washable' },
      ],
      features: ['100% premium cotton', 'Slim fit cut', 'Reinforced stitching', 'Tagless comfort label', 'Pre-shrunk fabric'],
      seller: { name: 'Fatima', company: 'FashionHub BD', country: 'Bangladesh', verified: true },
    },
    {
      name: "Women's Running Sports Jacket - Windproof",
      description: 'Lightweight windproof running jacket with reflective details. Perfect for outdoor runs in any weather.',
      price: 49.99,
      oldPrice: 79.99,
      category: C['clothes-and-wear'],
      images: [
        { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500', isMain: true },
      ],
      rating: 4, numReviews: 145, orders: 430, stock: 80,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-38%',
      specs: [
        { label: 'Material', value: 'Polyester + Spandex' },
        { label: 'Features', value: 'Windproof, Water-resistant' },
        { label: 'Sizes', value: 'XS – XL' },
        { label: 'Pockets', value: '2 zip pockets' },
        { label: 'Reflective', value: 'Yes' },
      ],
      features: ['Windproof & water-resistant', 'Reflective details for safety', 'Packable into own pocket', 'Mesh ventilation panels', 'Thumb loops for cuff coverage'],
      seller: { name: 'Nadia', company: 'ActiveWear Co.', country: 'Germany', verified: true },
    },
    {
      name: 'Classic Slim Fit Chino Pants - Khaki',
      description: 'Versatile chino pants crafted from stretch cotton twill. Goes from office to weekend effortlessly.',
      price: 39.99,
      oldPrice: 59.99,
      category: C['clothes-and-wear'],
      images: [
        { url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500', isMain: true },
      ],
      rating: 4, numReviews: 210, orders: 680, stock: 150,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: false, discount: null,
      specs: [
        { label: 'Material', value: '98% Cotton, 2% Elastane' },
        { label: 'Fit', value: 'Slim Fit' },
        { label: 'Sizes', value: '28W – 38W' },
        { label: 'Colors', value: 'Khaki, Navy, Black, Olive' },
        { label: 'Rise', value: 'Mid Rise' },
      ],
      features: ['Stretch cotton twill fabric', 'Slim straight leg', '5-pocket design', 'Button & zip fly closure', 'Machine washable'],
      seller: { name: 'Fatima', company: 'FashionHub BD', country: 'Bangladesh', verified: true },
    },
    {
      name: 'Leather Bifold Wallet - Slim RFID Blocking',
      description: 'Genuine leather slim bifold wallet with RFID blocking technology. Holds up to 8 cards and cash.',
      price: 24.99,
      oldPrice: 39.99,
      category: C['clothes-and-wear'],
      images: [
        { url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500', isMain: true },
      ],
      rating: 5, numReviews: 430, orders: 1800, stock: 300,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-38%',
      specs: [
        { label: 'Material', value: 'Genuine Leather' },
        { label: 'Card Slots', value: '8 slots' },
        { label: 'RFID', value: 'Blocking' },
        { label: 'Dimensions', value: '11 x 9 x 1.2 cm' },
        { label: 'Colors', value: 'Brown, Black, Tan' },
      ],
      features: ['RFID blocking protection', 'Genuine leather construction', 'Ultra slim 1.2cm profile', '8 card slots + cash pocket', 'Gift box included'],
      seller: { name: 'Bilal', company: 'LeatherCraft Co.', country: 'Italy', verified: true },
    },

    // ── HOME & INTERIORS ──────────────────────────────────────
    {
      name: 'Nordic Minimalist Desk Lamp - USB Charging',
      description: 'Elegant LED desk lamp with 3 color modes and 10 brightness levels. Built-in USB-A and USB-C charging ports.',
      price: 34.99,
      oldPrice: 49.99,
      category: C['home-interiors'],
      images: [
        { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500', isMain: true },
      ],
      rating: 5, numReviews: 267, orders: 920, stock: 100,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: true, discount: '-30%',
      specs: [
        { label: 'Light Source', value: 'LED' },
        { label: 'Color Modes', value: '3 (Warm/Natural/Cool)' },
        { label: 'Brightness', value: '10 levels' },
        { label: 'Charging', value: 'USB-A + USB-C' },
        { label: 'Arm', value: 'Flexible 360°' },
      ],
      features: ['10 brightness levels', '3 color temperature modes', 'USB-A + USB-C charging', 'Touch-sensitive controls', 'Memory function'],
      seller: { name: 'Layla', company: 'HomeStyle DE', country: 'Germany', verified: true },
    },
    {
      name: 'Luxury Velvet Throw Pillow Set of 4 - Teal',
      description: 'Soft velvet decorative cushions for your sofa, bed or chair. Adds instant color and texture to any room.',
      price: 42.00,
      oldPrice: 60.00,
      category: C['home-interiors'],
      images: [
        { url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500', isMain: true },
      ],
      rating: 4, numReviews: 156, orders: 540, stock: 75,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: false, discount: null,
      specs: [
        { label: 'Material', value: 'Premium Velvet' },
        { label: 'Size', value: '45 x 45 cm' },
        { label: 'Set of', value: '4 Cushion Covers' },
        { label: 'Closure', value: 'Hidden Zipper' },
        { label: 'Care', value: 'Machine washable' },
      ],
      features: ['Premium velvet fabric', 'Hidden zipper closure', 'Machine washable covers', 'Available in 8 colors', 'Inserts not included'],
      seller: { name: 'Layla', company: 'HomeStyle DE', country: 'Germany', verified: true },
    },
    {
      name: 'Stainless Steel 5-Piece Cookware Set',
      description: 'Professional-grade stainless steel cookware. Compatible with all cooktops including induction. Dishwasher safe.',
      price: 89.99,
      oldPrice: 129.99,
      category: C['home-interiors'],
      images: [
        { url: 'https://images.unsplash.com/photo-1584990347449-39ce4f29cce5?w=500', isMain: true },
      ],
      rating: 5, numReviews: 312, orders: 760, stock: 45,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: true, discount: '-31%',
      specs: [
        { label: 'Material', value: '18/10 Stainless Steel' },
        { label: 'Pieces', value: '5 (1.5L, 2.5L, 4L pots + lids + pan)' },
        { label: 'Induction', value: 'Compatible' },
        { label: 'Oven Safe', value: 'Up to 260°C' },
        { label: 'Dishwasher', value: 'Safe' },
      ],
      features: ['18/10 stainless steel construction', 'Works on all cooktops', 'Oven safe up to 260°C', 'Drip-free rims', 'Stay-cool handles'],
      seller: { name: 'Ahmed', company: 'KitchenPro UAE', country: 'UAE', verified: true },
    },

    // ── SPORTS & OUTDOOR ─────────────────────────────────────
    {
      name: 'Adjustable Dumbbell Set 5-52.5 lbs',
      description: 'Replace 15 sets of weights. Dial system adjusts from 5 to 52.5 lbs in 2.5 lb increments. Space-efficient design.',
      price: 299.00,
      oldPrice: 399.00,
      category: C['sports-and-outdoor'],
      images: [
        { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500', isMain: true },
      ],
      rating: 5, numReviews: 289, orders: 620, stock: 30,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: true, discount: '-25%',
      specs: [
        { label: 'Weight Range', value: '5 – 52.5 lbs' },
        { label: 'Increments', value: '2.5 lbs' },
        { label: 'Replaces', value: '15 sets of weights' },
        { label: 'Material', value: 'Steel + Rubber' },
        { label: 'Tray included', value: 'Yes' },
      ],
      features: ['Replaces 15 sets of weights', 'Dial-a-weight system', '2.5 lb increment precision', 'Storage tray included', 'Compact footprint'],
      seller: { name: 'Khalid', company: 'FitGear Pro', country: 'USA', verified: true },
    },
    {
      name: 'Yoga Mat Non-Slip 6mm - Eco Friendly',
      description: 'Extra thick 6mm eco-friendly yoga mat with alignment lines and carrying strap. Non-slip on both sides.',
      price: 29.99,
      oldPrice: 44.99,
      category: C['sports-and-outdoor'],
      images: [
        { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', isMain: true },
      ],
      rating: 4, numReviews: 510, orders: 1900, stock: 200,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-33%',
      specs: [
        { label: 'Thickness', value: '6mm' },
        { label: 'Size', value: '183 x 61 cm' },
        { label: 'Material', value: 'Eco-friendly TPE' },
        { label: 'Non-slip', value: 'Both sides' },
        { label: 'Strap', value: 'Included' },
      ],
      features: ['6mm extra thick cushioning', 'Alignment line guides', 'Non-slip both sides', 'Eco-friendly TPE material', 'Carrying strap included'],
      seller: { name: 'Nadia', company: 'ActiveWear Co.', country: 'Germany', verified: true },
    },
    {
      name: 'Mountain Bike 29" - 21 Speed Shimano',
      description: 'Full-suspension mountain bike with 21-speed Shimano gears and hydraulic disc brakes. Ready for any trail.',
      price: 549.00,
      oldPrice: 699.00,
      category: C['sports-and-outdoor'],
      images: [
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', isMain: true },
      ],
      rating: 4, numReviews: 134, orders: 280, stock: 18,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: true, isDeals: true, discount: '-21%',
      specs: [
        { label: 'Wheel Size', value: '29 inches' },
        { label: 'Gears', value: '21-speed Shimano' },
        { label: 'Brakes', value: 'Hydraulic Disc' },
        { label: 'Frame', value: 'Aluminum Alloy' },
        { label: 'Suspension', value: 'Full Suspension' },
      ],
      features: ['21-speed Shimano drivetrain', 'Hydraulic disc brakes', 'Aluminum alloy frame', 'Front & rear suspension', 'Ergonomic handlebar grip'],
      seller: { name: 'Khalid', company: 'FitGear Pro', country: 'USA', verified: true },
    },

    // ── TOOLS & EQUIPMENT ────────────────────────────────────
    {
      name: 'DeWalt 20V MAX Cordless Drill Driver Kit',
      description: 'Compact and lightweight design fits into tight areas. 2-speed transmission for versatile applications.',
      price: 129.00,
      oldPrice: 169.00,
      category: C['tools-equipment'],
      images: [
        { url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500', isMain: true },
      ],
      rating: 5, numReviews: 390, orders: 870, stock: 55,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-24%',
      specs: [
        { label: 'Voltage', value: '20V MAX' },
        { label: 'Speed', value: '0-450 / 0-1500 RPM' },
        { label: 'Torque', value: '300 UWO' },
        { label: 'Chuck', value: '1/2 inch' },
        { label: 'Battery', value: '2 x 1.3Ah included' },
      ],
      features: ['Compact lightweight design', '2-speed transmission', '16-position clutch', 'LED work light', '2 batteries + charger included'],
      seller: { name: 'Tariq', company: 'ToolMaster PK', country: 'Pakistan', verified: false },
    },
    {
      name: 'Stanley Hand Tool Set - 65 Piece',
      description: 'Complete 65-piece hand tool set in a durable blow-molded case. Essential tools for any home or workshop.',
      price: 59.99,
      oldPrice: 89.99,
      category: C['tools-equipment'],
      images: [
        { url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500', isMain: true },
      ],
      rating: 4, numReviews: 621, orders: 1540, stock: 90,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-33%',
      specs: [
        { label: 'Pieces', value: '65' },
        { label: 'Case', value: 'Blow-molded hard case' },
        { label: 'Includes', value: 'Hammers, Screwdrivers, Pliers, Wrenches, Bits' },
        { label: 'Material', value: 'Hardened Chrome Vanadium Steel' },
        { label: 'Warranty', value: 'Lifetime' },
      ],
      features: ['65 essential tools', 'Hardened chrome vanadium steel', 'Lifetime warranty', 'Durable blow-molded case', 'Organized storage tray'],
      seller: { name: 'Tariq', company: 'ToolMaster PK', country: 'Pakistan', verified: false },
    },

    // ── AUTOMOBILES ──────────────────────────────────────────
    {
      name: 'Car Dash Cam 4K Front + Rear Dual Camera',
      description: '4K UHD front + 1080P rear dual dash cam with built-in GPS, WiFi, night vision and 24-hour parking mode.',
      price: 89.99,
      oldPrice: 129.99,
      category: C['automobiles'],
      images: [
        { url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500', isMain: true },
      ],
      rating: 4, numReviews: 214, orders: 560, stock: 70,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-31%',
      specs: [
        { label: 'Front Camera', value: '4K UHD 30fps' },
        { label: 'Rear Camera', value: '1080P FHD' },
        { label: 'GPS', value: 'Built-in' },
        { label: 'WiFi', value: 'Yes (app control)' },
        { label: 'Night Vision', value: 'Sony STARVIS sensor' },
      ],
      features: ['4K front + 1080P rear recording', 'Built-in GPS speed tracking', 'WiFi app control', 'Sony STARVIS night vision', '24-hour parking mode'],
      seller: { name: 'Faisal', company: 'AutoTech Store', country: 'UAE', verified: true },
    },
    {
      name: 'Universal Car Phone Mount - Dashboard & Vent',
      description: 'Strong suction cup + air vent mount combo. Fits all smartphones 4"-7". 360° rotation for perfect angles.',
      price: 15.99,
      oldPrice: 24.99,
      category: C['automobiles'],
      images: [
        { url: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=500', isMain: true },
      ],
      rating: 4, numReviews: 890, orders: 3200, stock: 500,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: false, discount: null,
      specs: [
        { label: 'Mount Type', value: 'Dashboard + Air Vent' },
        { label: 'Compatibility', value: '4" – 7" phones' },
        { label: 'Rotation', value: '360°' },
        { label: 'Attachment', value: 'Suction cup + clip' },
        { label: 'Material', value: 'ABS + Silicone' },
      ],
      features: ['2-in-1 dashboard & vent mount', 'One-hand operation', '360° rotation', 'Strong suction cup', 'Non-scratch silicone pads'],
      seller: { name: 'Faisal', company: 'AutoTech Store', country: 'UAE', verified: true },
    },
    {
      name: 'Portable Car Jump Starter 2000A Peak',
      description: 'Jump start your car up to 30 times on a single charge. Works on all 12V vehicles. Built-in LED flashlight.',
      price: 69.99,
      oldPrice: 99.99,
      category: C['automobiles'],
      images: [
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', isMain: true },
      ],
      rating: 5, numReviews: 176, orders: 390, stock: 40,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-30%',
      specs: [
        { label: 'Peak Current', value: '2000A' },
        { label: 'Battery Capacity', value: '20000mAh' },
        { label: 'Compatible', value: 'All 12V vehicles' },
        { label: 'USB Ports', value: '2 x USB + 1 x USB-C' },
        { label: 'Safety', value: '12 protection features' },
      ],
      features: ['2000A peak current', 'Jump starts up to 30 times', 'Works on all 12V vehicles', 'USB power bank function', 'Built-in LED SOS flashlight'],
      seller: { name: 'Faisal', company: 'AutoTech Store', country: 'UAE', verified: true },
    },

    // ── ANIMALS & PETS ───────────────────────────────────────
    {
      name: 'Orthopedic Memory Foam Dog Bed - Large',
      description: 'Premium memory foam base supports joints and eases arthritis pain. Removable, washable waterproof cover.',
      price: 54.99,
      oldPrice: 79.99,
      category: C['animals-and-pets'],
      images: [
        { url: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=500', isMain: true },
      ],
      rating: 5, numReviews: 340, orders: 820, stock: 60,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-31%',
      specs: [
        { label: 'Size', value: 'Large (90 x 70 cm)' },
        { label: 'Foam', value: '10cm Memory Foam' },
        { label: 'Cover', value: 'Removable & washable' },
        { label: 'Waterproof', value: 'Yes (inner lining)' },
        { label: 'For', value: 'Dogs up to 40kg' },
      ],
      features: ['Premium memory foam base', 'Waterproof inner cover', 'Machine washable outer cover', 'Non-slip bottom', 'Raised edges for head support'],
      seller: { name: 'Sara', company: 'PetParadise UK', country: 'UK', verified: true },
    },
    {
      name: 'Automatic Cat Water Fountain 2.5L',
      description: 'Ultra-quiet pump keeps water fresh and oxygenated. 3 water flow modes. Encourages cats to drink more water.',
      price: 29.99,
      oldPrice: 44.99,
      category: C['animals-and-pets'],
      images: [
        { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500', isMain: true },
      ],
      rating: 5, numReviews: 510, orders: 1400, stock: 120,
      condition: 'Brand new', shipping: 'Free Shipping',
      isFeatured: false, isDeals: true, discount: '-33%',
      specs: [
        { label: 'Capacity', value: '2.5 Liters' },
        { label: 'Flow Modes', value: '3' },
        { label: 'Filter', value: 'Triple filtration' },
        { label: 'Noise Level', value: '< 25dB (ultra quiet)' },
        { label: 'Material', value: 'BPA-free plastic' },
      ],
      features: ['2.5L large capacity', '3 water flow settings', 'Triple filtration system', 'Ultra-quiet motor <25dB', 'LED indicator light'],
      seller: { name: 'Sara', company: 'PetParadise UK', country: 'UK', verified: true },
    },
  ]

  await Product.insertMany(products)

  // ─── ADMIN USER ──────────────────────────────────────────
  console.log('👤 Seeding admin user...')
  await User.create({
    name: 'Admin',
    email: 'admin@ecommerce.com',
    password: 'admin123',
    role: 'admin',
  })

  console.log(`\n✅ Seed complete!`)
  console.log(`   Categories : ${cats.length}`)
  console.log(`   Products   : ${products.length}`)
  console.log(`   Admin      : admin@ecommerce.com / admin123`)
  process.exit(0)
}

seedDB().catch(err => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
