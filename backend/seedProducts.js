import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

// Function to generate slug from name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with dashes
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
};

const sampleProducts = [
  {
    name: "MacBook Pro 16-inch M3 Pro",
    slug: "macbook-pro-16-inch-m3-pro",
    description: "The most powerful MacBook Pro ever is here. With the M3 Pro chip, this laptop delivers exceptional performance for demanding workloads. Features a stunning 16-inch Liquid Retina XDR display, up to 22 hours of battery life, and advanced connectivity options.",
    price: 2499,
    originalPrice: 2699,
    category: "laptops",
    brand: "Apple",
    model: "MacBook Pro 16",
    sku: "MBP16M3PRO",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
        alt: "MacBook Pro 16-inch front view",
        isPrimary: true
      }
    ],
    specifications: new Map([
      ["Processor", "Apple M3 Pro chip"],
      ["Memory", "18GB unified memory"],
      ["Storage", "512GB SSD"],
      ["Display", "16-inch Liquid Retina XDR"],
      ["Graphics", "18-core GPU"],
      ["Operating System", "macOS Sonoma"]
    ]),
    features: [
      "M3 Pro chip for exceptional performance",
      "16-inch Liquid Retina XDR display",
      "Up to 22 hours battery life",
      "Advanced camera and audio",
      "Multiple Thunderbolt 4 ports"
    ],
    quantity: 25,
    weight: 2.1,
    dimensions: { length: 35.57, width: 24.81, height: 1.68 },
    warranty: { duration: 12, type: "manufacturer" },
    tags: ["laptop", "macbook", "apple", "m3", "professional"],
    isFeatured: true,
    metaTitle: "MacBook Pro 16-inch M3 Pro - Ultimate Performance Laptop",
    metaDescription: "Experience unmatched performance with the MacBook Pro 16-inch featuring M3 Pro chip, stunning display, and all-day battery life."
  },
  {
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    description: "The ultimate iPhone experience with a powerful A17 Pro chip, revolutionary titanium design, and the most advanced camera system ever in an iPhone. Shoot stunning photos and videos with the new Action button for quick access to your favorite features.",
    price: 1199,
    originalPrice: 1299,
    category: "smartphones",
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    sku: "IP15PROMAX",
    images: [
      {
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
        alt: "iPhone 15 Pro Max",
        isPrimary: true
      }
    ],
    specifications: new Map([
      ["Processor", "A17 Pro chip"],
      ["Storage", "256GB"],
      ["Display", "6.7-inch Super Retina XDR"],
      ["Camera", "48MP Main + 12MP Ultra Wide + 12MP Telephoto"],
      ["Operating System", "iOS 17"],
      ["Material", "Titanium"]
    ]),
    features: [
      "A17 Pro chip with 6-core GPU",
      "Titanium design",
      "Advanced triple-camera system",
      "Action Button",
      "USB-C with USB 3 support"
    ],
    quantity: 50,
    weight: 0.221,
    dimensions: { length: 15.99, width: 7.69, height: 0.83 },
    tags: ["smartphone", "iphone", "apple", "pro", "titanium"],
    isFeatured: true,
    metaTitle: "iPhone 15 Pro Max - Advanced Titanium Smartphone",
    metaDescription: "Discover the iPhone 15 Pro Max with titanium design, A17 Pro chip, and professional camera system."
  },
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5-wireless-headphones",
    description: "Industry-leading noise canceling with the new Auto NC Optimizer, exceptional sound quality with new driver unit, and crystal clear hands-free calling. Up to 30 hours battery life with quick charge.",
    price: 399,
    originalPrice: 449,
    category: "headphones",
    brand: "Sony",
    model: "WH-1000XM5",
    sku: "SONYWH1000XM5",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
        alt: "Sony WH-1000XM5 Headphones",
        isPrimary: true
      }
    ],
    specifications: new Map([
      ["Driver", "30mm driver unit"],
      ["Frequency Response", "4Hz-40,000Hz"],
      ["Battery Life", "Up to 30 hours"],
      ["Connectivity", "Bluetooth 5.2, NFC"],
      ["Noise Canceling", "Yes, Industry-leading"],
      ["Voice Assistant", "Alexa, Google Assistant"]
    ]),
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Quick charge (3 min = 3 hours)",
      "Multi-device connection",
      "Touch sensor controls"
    ],
    quantity: 75,
    weight: 0.25,
    tags: ["headphones", "wireless", "noise-canceling", "sony"],
    isFeatured: true,
    metaTitle: "Sony WH-1000XM5 - Premium Noise Canceling Headphones",
    metaDescription: "Experience superior sound quality and industry-leading noise canceling with Sony WH-1000XM5 wireless headphones."
  },
  {
    name: "iPad Pro 12.9-inch M2",
    slug: "ipad-pro-12-9-inch-m2",
    description: "The ultimate iPad experience with the powerful M2 chip, stunning 12.9-inch Liquid Retina XDR display, and advanced features like Face ID, USB-C, and support for Apple Pencil and Magic Keyboard.",
    price: 1099,
    originalPrice: 1199,
    category: "tablets",
    brand: "Apple",
    model: "iPad Pro 12.9",
    sku: "IPADPRO129M2",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        alt: "iPad Pro 12.9-inch",
        isPrimary: true
      }
    ],
    specifications: new Map([
      ["Processor", "Apple M2 chip"],
      ["Memory", "8GB RAM"],
      ["Storage", "128GB"],
      ["Display", "12.9-inch Liquid Retina XDR"],
      ["Camera", "12MP Wide + 10MP Ultra Wide"],
      ["Connectivity", "Wi-Fi 6E, USB-C"]
    ]),
    features: [
      "M2 chip performance",
      "12.9-inch Liquid Retina XDR display",
      "Apple Pencil (2nd gen) support",
      "Magic Keyboard compatibility",
      "All-day battery life"
    ],
    quantity: 40,
    weight: 0.682,
    tags: ["tablet", "ipad", "apple", "m2", "pro"],
    isFeatured: false,
    metaTitle: "iPad Pro 12.9-inch M2 - Professional Tablet",
    metaDescription: "Powerful iPad Pro with M2 chip, stunning display, and professional features for creative work."
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description: "The most advanced Galaxy smartphone with AI-powered features, S Pen built-in, and professional-grade camera system. Features a stunning 6.8-inch Dynamic AMOLED display and titanium frame.",
    price: 1299,
    category: "smartphones",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    sku: "SAMS24ULTRA",
    images: [
      {
        url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
        alt: "Samsung Galaxy S24 Ultra",
        isPrimary: true
      }
    ],
    specifications: new Map([
      ["Processor", "Snapdragon 8 Gen 3"],
      ["Memory", "12GB RAM"],
      ["Storage", "256GB"],
      ["Display", "6.8-inch Dynamic AMOLED 2X"],
      ["Camera", "200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto"],
      ["Battery", "5000mAh"]
    ]),
    features: [
      "Built-in S Pen",
      "AI-powered photography",
      "Titanium frame",
      "200MP camera system",
      "5000mAh battery"
    ],
    quantity: 35,
    weight: 0.232,
    tags: ["smartphone", "samsung", "galaxy", "s-pen", "ultra"],
    isFeatured: true
  },
  {
    name: "Dell XPS 13 Plus",
    slug: "dell-xps-13-plus",
    description: "Premium ultrabook with stunning InfinityEdge display, Intel 12th Gen processors, and sleek design. Perfect for professionals who need power and portability.",
    price: 1199,
    originalPrice: 1399,
    category: "laptops",
    brand: "Dell",
    model: "XPS 13 Plus",
    sku: "DELLXPS13PLUS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        alt: "Dell XPS 13 Plus",
        isPrimary: true
      }
    ],
    specifications: new Map([
      ["Processor", "Intel Core i7-1260P"],
      ["Memory", "16GB LPDDR5"],
      ["Storage", "512GB SSD"],
      ["Display", "13.4-inch InfinityEdge"],
      ["Graphics", "Intel Iris Xe"],
      ["Operating System", "Windows 11"]
    ]),
    features: [
      "InfinityEdge display",
      "12th Gen Intel Core processors",
      "Premium build quality",
      "Fast charging",
      "Thunderbolt 4 ports"
    ],
    quantity: 30,
    weight: 1.26,
    tags: ["laptop", "dell", "xps", "ultrabook", "premium"],
    isFeatured: false
  },
  {
    name: "AirPods Pro (2nd Generation)",
    slug: "airpods-pro-2nd-generation",
    description: "Next-level Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. Up to 2x more noise cancellation than the previous generation.",
    price: 249,
    originalPrice: 279,
    category: "headphones",
    brand: "Apple",
    model: "AirPods Pro 2",
    sku: "AIRPODSPRO2",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500",
        alt: "AirPods Pro 2nd Generation",
        isPrimary: true
      }
    ],
    specifications: new Map([
      ["Chip", "Apple H2 chip"],
      ["Battery Life", "Up to 6 hours (ANC on)"],
      ["Case Battery", "Up to 30 hours total"],
      ["Connectivity", "Bluetooth 5.3"],
      ["Features", "Active Noise Cancellation, Spatial Audio"],
      ["Water Resistance", "IPX4"]
    ]),
    features: [
      "2x more Active Noise Cancellation",
      "Adaptive Transparency",
      "Personalized Spatial Audio",
      "Touch control",
      "MagSafe charging case"
    ],
    quantity: 100,
    weight: 0.0056,
    tags: ["earbuds", "airpods", "apple", "wireless", "noise-canceling"],
    isFeatured: true
  },
  {
    name: "Canon EOS R6 Mark II",
    slug: "canon-eos-r6-mark-ii",
    description: "Full-frame mirrorless camera with exceptional image quality, advanced autofocus, and professional video capabilities. Perfect for photographers and videographers.",
    price: 2499,
    category: "cameras",
    brand: "Canon",
    model: "EOS R6 Mark II",
    sku: "CANONESR6MK2",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
        alt: "Canon EOS R6 Mark II",
        isPrimary: true
      }
    ],
    specifications: new Map([
      ["Sensor", "24.2MP Full-Frame CMOS"],
      ["Processor", "DIGIC X"],
      ["ISO Range", "100-102400"],
      ["Video", "4K UHD at 60p"],
      ["Autofocus", "1053 AF points"],
      ["Stabilization", "In-body 8-stop"]
    ]),
    features: [
      "24.2MP full-frame sensor",
      "8-stop in-body stabilization",
      "4K 60p video recording",
      "Advanced Dual Pixel CMOS AF",
      "Weather sealing"
    ],
    quantity: 15,
    weight: 0.588,
    tags: ["camera", "canon", "mirrorless", "full-frame", "professional"],
    isFeatured: false
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techhub');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedProducts();
