// ShopLens Product Catalog — ~40 products, reviews, deals

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  tags: string[];
  inStock: boolean;
}

export interface Review {
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

export interface Deal {
  code: string;
  description: string;
  discountPercent: number;
  minPurchase: number;
  applicableCategories: string[];
}

export const CATEGORIES = [
  "Laptops",
  "Headphones",
  "Cameras",
  "Smart Home",
  "Accessories",
] as const;

export const products: Product[] = [
  // ── Laptops ──
  {
    id: "lap-01",
    name: 'ProBook 14" Ultrabook',
    brand: "TechNova",
    category: "Laptops",
    price: 999,
    originalPrice: 1199,
    rating: 4.5,
    reviewCount: 234,
    image: "💻",
    description:
      "Ultra-thin 14-inch laptop with all-day battery life. Perfect for professionals on the go.",
    specs: {
      Processor: "Intel Core i7-13700H",
      RAM: "16 GB DDR5",
      Storage: "512 GB NVMe SSD",
      Display: '14" 2560×1600 IPS',
      Battery: "72 Wh (up to 14 hrs)",
      Weight: "1.3 kg",
    },
    tags: ["ultrabook", "lightweight", "business"],
    inStock: true,
  },
  {
    id: "lap-02",
    name: "StudioMax 16 Creator",
    brand: "TechNova",
    category: "Laptops",
    price: 1799,
    rating: 4.7,
    reviewCount: 189,
    image: "💻",
    description:
      "Powerhouse creator laptop with dedicated GPU and stunning OLED display for content creators.",
    specs: {
      Processor: "Intel Core i9-13900H",
      RAM: "32 GB DDR5",
      Storage: "1 TB NVMe SSD",
      Display: '16" 3200×2000 OLED',
      GPU: "NVIDIA RTX 4070 8GB",
      Weight: "2.1 kg",
    },
    tags: ["creator", "oled", "high-performance"],
    inStock: true,
  },
  {
    id: "lap-03",
    name: "SwiftBook Air 13",
    brand: "Aerion",
    category: "Laptops",
    price: 699,
    originalPrice: 849,
    rating: 4.3,
    reviewCount: 412,
    image: "💻",
    description:
      "Lightweight everyday laptop with great battery life and a vibrant display.",
    specs: {
      Processor: "AMD Ryzen 5 7535U",
      RAM: "8 GB DDR5",
      Storage: "256 GB NVMe SSD",
      Display: '13.3" 1920×1080 IPS',
      Battery: "54 Wh (up to 11 hrs)",
      Weight: "1.15 kg",
    },
    tags: ["budget", "lightweight", "student"],
    inStock: true,
  },
  {
    id: "lap-04",
    name: "GameForce X15",
    brand: "Vortex",
    category: "Laptops",
    price: 1499,
    originalPrice: 1699,
    rating: 4.6,
    reviewCount: 321,
    image: "🎮",
    description:
      "High-refresh gaming laptop with RTX graphics and advanced cooling system.",
    specs: {
      Processor: "AMD Ryzen 9 7945HX",
      RAM: "32 GB DDR5",
      Storage: "1 TB NVMe SSD",
      Display: '15.6" 2560×1440 240Hz',
      GPU: "NVIDIA RTX 4080 12GB",
      Weight: "2.5 kg",
    },
    tags: ["gaming", "high-refresh", "rgb"],
    inStock: true,
  },
  {
    id: "lap-05",
    name: "EduBook 11 Chromebook",
    brand: "Aerion",
    category: "Laptops",
    price: 299,
    rating: 4.0,
    reviewCount: 567,
    image: "💻",
    description:
      "Durable Chromebook for students and everyday browsing. All-day battery.",
    specs: {
      Processor: "MediaTek Kompanio 520",
      RAM: "4 GB LPDDR4X",
      Storage: "64 GB eMMC",
      Display: '11.6" 1366×768 IPS',
      Battery: "42 Wh (up to 12 hrs)",
      Weight: "1.05 kg",
    },
    tags: ["chromebook", "budget", "education"],
    inStock: true,
  },
  {
    id: "lap-06",
    name: "ZenBook Pro 15 OLED",
    brand: "TechNova",
    category: "Laptops",
    price: 1349,
    originalPrice: 1499,
    rating: 4.4,
    reviewCount: 156,
    image: "💻",
    description:
      "Premium all-rounder with stunning OLED display and balanced performance.",
    specs: {
      Processor: "Intel Core i7-13700H",
      RAM: "16 GB DDR5",
      Storage: "512 GB NVMe SSD",
      Display: '15.6" 2880×1620 OLED',
      GPU: "NVIDIA RTX 4060 6GB",
      Weight: "1.8 kg",
    },
    tags: ["oled", "premium", "all-rounder"],
    inStock: true,
  },
  {
    id: "lap-07",
    name: "WorkStation W17",
    brand: "Vortex",
    category: "Laptops",
    price: 2499,
    rating: 4.8,
    reviewCount: 87,
    image: "💻",
    description:
      "Mobile workstation with ISV-certified GPU for CAD, 3D modeling, and engineering.",
    specs: {
      Processor: "Intel Xeon W-13955M",
      RAM: "64 GB DDR5 ECC",
      Storage: "2 TB NVMe SSD",
      Display: '17.3" 3840×2160 IPS',
      GPU: "NVIDIA RTX A3000 12GB",
      Weight: "3.1 kg",
    },
    tags: ["workstation", "professional", "cad"],
    inStock: false,
  },
  {
    id: "lap-08",
    name: "FlexBook 360 14",
    brand: "Aerion",
    category: "Laptops",
    price: 879,
    rating: 4.2,
    reviewCount: 198,
    image: "💻",
    description:
      "2-in-1 convertible laptop with touchscreen and stylus support.",
    specs: {
      Processor: "Intel Core i5-1340P",
      RAM: "16 GB LPDDR5",
      Storage: "512 GB NVMe SSD",
      Display: '14" 1920×1200 IPS Touch',
      Battery: "65 Wh (up to 13 hrs)",
      Weight: "1.5 kg",
    },
    tags: ["2-in-1", "touchscreen", "convertible"],
    inStock: true,
  },

  // ── Headphones ──
  {
    id: "hp-01",
    name: "QuietMax ANC Pro",
    brand: "SoundWave",
    category: "Headphones",
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 1023,
    image: "🎧",
    description:
      "Premium over-ear headphones with industry-leading noise cancellation and 30-hour battery.",
    specs: {
      Type: "Over-ear, Closed-back",
      Driver: "40mm Custom",
      ANC: "Adaptive Active Noise Cancellation",
      Battery: "30 hours (ANC on)",
      Connectivity: "Bluetooth 5.3, 3.5mm",
      Weight: "250 g",
    },
    tags: ["anc", "premium", "wireless"],
    inStock: true,
  },
  {
    id: "hp-02",
    name: "BassX Wireless",
    brand: "BeatPulse",
    category: "Headphones",
    price: 129,
    originalPrice: 179,
    rating: 4.3,
    reviewCount: 876,
    image: "🎧",
    description:
      "Bass-heavy wireless headphones with deep low-end and comfortable fit.",
    specs: {
      Type: "Over-ear, Closed-back",
      Driver: "50mm Bass-enhanced",
      ANC: "Basic Noise Isolation",
      Battery: "24 hours",
      Connectivity: "Bluetooth 5.2",
      Weight: "275 g",
    },
    tags: ["bass", "wireless", "affordable"],
    inStock: true,
  },
  {
    id: "hp-03",
    name: "StudioPro Reference",
    brand: "SoundWave",
    category: "Headphones",
    price: 249,
    rating: 4.6,
    reviewCount: 432,
    image: "🎧",
    description:
      "Flat-response studio reference headphones for mixing and mastering.",
    specs: {
      Type: "Over-ear, Open-back",
      Driver: "45mm Planar Magnetic",
      "Frequency Response": "10Hz – 50kHz",
      Impedance: "64 Ohm",
      Connectivity: "Wired (6.3mm + 3.5mm)",
      Weight: "310 g",
    },
    tags: ["studio", "reference", "wired", "audiophile"],
    inStock: true,
  },
  {
    id: "hp-04",
    name: "FitPods Pro TWS",
    brand: "BeatPulse",
    category: "Headphones",
    price: 179,
    originalPrice: 219,
    rating: 4.4,
    reviewCount: 654,
    image: "🎵",
    description:
      "True wireless earbuds with ANC, transparency mode, and IPX5 water resistance.",
    specs: {
      Type: "In-ear TWS",
      Driver: "11mm Dynamic",
      ANC: "Hybrid Active Noise Cancellation",
      Battery: "7h (buds) + 28h (case)",
      Connectivity: "Bluetooth 5.3",
      Weight: "5.4 g per bud",
    },
    tags: ["tws", "anc", "sport", "wireless"],
    inStock: true,
  },
  {
    id: "hp-05",
    name: "KidSafe Volume-Limited",
    brand: "Aerion",
    category: "Headphones",
    price: 39,
    rating: 4.5,
    reviewCount: 312,
    image: "🎧",
    description:
      "Volume-limited wired headphones for kids with durable build and fun colors.",
    specs: {
      Type: "On-ear, Closed-back",
      Driver: "30mm",
      "Volume Limit": "85 dB max",
      Connectivity: "Wired 3.5mm",
      Weight: "150 g",
      Material: "BPA-free plastic",
    },
    tags: ["kids", "safe", "wired", "durable"],
    inStock: true,
  },
  {
    id: "hp-06",
    name: "SportElite Neckband",
    brand: "BeatPulse",
    category: "Headphones",
    price: 79,
    originalPrice: 99,
    rating: 4.1,
    reviewCount: 543,
    image: "🎵",
    description:
      "Flexible neckband earphones with IPX7 waterproofing for workouts.",
    specs: {
      Type: "In-ear Neckband",
      Driver: "10mm Dynamic",
      Battery: "18 hours",
      "Water Resistance": "IPX7",
      Connectivity: "Bluetooth 5.1",
      Weight: "30 g",
    },
    tags: ["sport", "waterproof", "neckband"],
    inStock: true,
  },
  {
    id: "hp-07",
    name: "AeroMax Open-ear",
    brand: "SoundWave",
    category: "Headphones",
    price: 199,
    rating: 4.3,
    reviewCount: 267,
    image: "🎵",
    description:
      "Open-ear wireless headphones for situational awareness during outdoor activities.",
    specs: {
      Type: "Open-ear, Bone Conduction",
      Driver: "Bone Conduction Transducer",
      Battery: "10 hours",
      "Water Resistance": "IP67",
      Connectivity: "Bluetooth 5.3",
      Weight: "28 g",
    },
    tags: ["open-ear", "sport", "outdoor", "bone-conduction"],
    inStock: true,
  },
  {
    id: "hp-08",
    name: "GamerX 7.1 Headset",
    brand: "Vortex",
    category: "Headphones",
    price: 109,
    originalPrice: 139,
    rating: 4.2,
    reviewCount: 789,
    image: "🎧",
    description:
      "Virtual 7.1 surround sound gaming headset with detachable mic and RGB lighting.",
    specs: {
      Type: "Over-ear, Closed-back",
      Driver: "50mm Neodymium",
      "Surround Sound": "Virtual 7.1",
      Mic: "Detachable Boom (cardioid)",
      Connectivity: "USB-A / 3.5mm",
      Weight: "320 g",
    },
    tags: ["gaming", "surround", "rgb", "mic"],
    inStock: true,
  },

  // ── Cameras ──
  {
    id: "cam-01",
    name: "SnapPro Mirrorless R7",
    brand: "OptiVision",
    category: "Cameras",
    price: 1299,
    originalPrice: 1499,
    rating: 4.7,
    reviewCount: 345,
    image: "📷",
    description:
      "32.5 MP APS-C mirrorless camera with blazing autofocus and 4K 60fps video.",
    specs: {
      Sensor: "32.5 MP APS-C CMOS",
      "ISO Range": "100 – 51200",
      Autofocus: "651-point Dual Pixel AF",
      Video: "4K 60fps, 1080p 120fps",
      Stabilization: "5-axis IBIS",
      Weight: "612 g (body)",
    },
    tags: ["mirrorless", "aps-c", "4k", "fast-af"],
    inStock: true,
  },
  {
    id: "cam-02",
    name: "FrameMaster Full Frame",
    brand: "OptiVision",
    category: "Cameras",
    price: 2199,
    rating: 4.8,
    reviewCount: 201,
    image: "📷",
    description:
      "Full-frame mirrorless camera with 45 MP sensor, ideal for landscape and portrait photography.",
    specs: {
      Sensor: "45 MP Full-Frame BSI CMOS",
      "ISO Range": "64 – 102400",
      Autofocus: "1053-point Phase Detection",
      Video: "8K 30fps, 4K 120fps",
      Stabilization: "5-axis IBIS (7 stops)",
      Weight: "735 g (body)",
    },
    tags: ["full-frame", "high-resolution", "8k", "professional"],
    inStock: true,
  },
  {
    id: "cam-03",
    name: "ActionCam X5",
    brand: "Vortex",
    category: "Cameras",
    price: 349,
    originalPrice: 429,
    rating: 4.4,
    reviewCount: 876,
    image: "📹",
    description:
      "Rugged action camera with 5.3K video, waterproof to 10m, and HyperSmooth stabilization.",
    specs: {
      Sensor: "1/1.9\" CMOS",
      Video: "5.3K 60fps, 4K 120fps",
      Waterproof: "10m without housing",
      Stabilization: "HyperSmooth 5.0",
      Battery: "1720 mAh",
      Weight: "154 g",
    },
    tags: ["action", "waterproof", "5k", "adventure"],
    inStock: true,
  },
  {
    id: "cam-04",
    name: "VlogStar Compact",
    brand: "OptiVision",
    category: "Cameras",
    price: 749,
    rating: 4.5,
    reviewCount: 432,
    image: "📷",
    description:
      "Pocket-sized vlogging camera with flip screen, fast AF, and excellent low-light.",
    specs: {
      Sensor: "20 MP 1-inch CMOS",
      "ISO Range": "125 – 25600",
      Autofocus: "315-point Phase Detection",
      Video: "4K 30fps, 1080p 120fps",
      Screen: '3" flip-out touchscreen',
      Weight: "292 g",
    },
    tags: ["vlogging", "compact", "flip-screen"],
    inStock: true,
  },
  {
    id: "cam-05",
    name: "DroneView Aerial Pro",
    brand: "Vortex",
    category: "Cameras",
    price: 1099,
    originalPrice: 1299,
    rating: 4.6,
    reviewCount: 267,
    image: "🚁",
    description:
      "Professional drone with Hasselblad camera, 46-min flight time, and omnidirectional obstacle sensing.",
    specs: {
      Sensor: "20 MP 1-inch CMOS (Hasselblad)",
      Video: "5.1K 50fps, 4K 120fps",
      "Flight Time": "46 minutes",
      Range: "15 km",
      "Obstacle Sensing": "Omnidirectional",
      Weight: "895 g",
    },
    tags: ["drone", "aerial", "professional", "long-range"],
    inStock: true,
  },
  {
    id: "cam-06",
    name: "InstaPrint Instant Camera",
    brand: "Aerion",
    category: "Cameras",
    price: 89,
    rating: 4.2,
    reviewCount: 654,
    image: "📸",
    description:
      "Fun instant camera that prints photos on the spot. Retro design, modern tech.",
    specs: {
      Film: "Instax Mini compatible",
      Lens: "60mm f/12.7",
      Flash: "Built-in auto flash",
      "Print Size": "62 × 46 mm",
      Battery: "Lithium (100 shots/charge)",
      Weight: "293 g",
    },
    tags: ["instant", "retro", "fun", "gift"],
    inStock: true,
  },

  // ── Smart Home ──
  {
    id: "sh-01",
    name: "HomeSphere Hub Max",
    brand: "NexaHome",
    category: "Smart Home",
    price: 229,
    originalPrice: 279,
    rating: 4.5,
    reviewCount: 876,
    image: "🏠",
    description:
      '10-inch smart display with built-in speaker, camera, and whole-home hub functionality.',
    specs: {
      Display: '10.1" 1920×1200 IPS',
      Speaker: "2× 10W full-range",
      Camera: "13 MP wide-angle",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3, Zigbee, Thread",
      "Voice Assistant": "Built-in AI assistant",
      Weight: "680 g",
    },
    tags: ["smart-display", "hub", "voice-assistant"],
    inStock: true,
  },
  {
    id: "sh-02",
    name: "BrightBulb RGBW 4-Pack",
    brand: "NexaHome",
    category: "Smart Home",
    price: 49,
    originalPrice: 69,
    rating: 4.3,
    reviewCount: 1543,
    image: "💡",
    description:
      "Set of 4 smart LED bulbs with 16 million colors, schedules, and voice control.",
    specs: {
      Lumens: "800 lm each",
      Wattage: "9W (60W equivalent)",
      "Color Temperature": "2700K – 6500K + RGBW",
      Connectivity: "Wi-Fi (no hub needed)",
      Lifespan: "25,000 hours",
      Base: "E26/E27",
    },
    tags: ["smart-bulb", "rgb", "voice-control", "pack"],
    inStock: true,
  },
  {
    id: "sh-03",
    name: "GuardCam Outdoor Pro",
    brand: "NexaHome",
    category: "Smart Home",
    price: 179,
    rating: 4.4,
    reviewCount: 432,
    image: "📹",
    description:
      "Outdoor security camera with 2K HDR, color night vision, and AI person detection.",
    specs: {
      Resolution: "2K QHD (2560×1440)",
      "Night Vision": "Color night vision (spotlight)",
      "Field of View": "160° wide-angle",
      Storage: "microSD + Cloud",
      "Power": "Wired or Battery (6 months)",
      "Weather Rating": "IP66",
    },
    tags: ["security", "outdoor", "night-vision", "ai-detection"],
    inStock: true,
  },
  {
    id: "sh-04",
    name: "ThermoSmart Learning",
    brand: "NexaHome",
    category: "Smart Home",
    price: 249,
    rating: 4.6,
    reviewCount: 312,
    image: "🌡️",
    description:
      "Learning thermostat that adapts to your schedule and saves energy automatically.",
    specs: {
      Display: '2.08" LCD touchscreen',
      Sensors: "Temperature, Humidity, Occupancy, Ambient light",
      Compatibility: "Most 24V HVAC systems",
      Connectivity: "Wi-Fi, Bluetooth",
      "Energy Savings": "Up to 23% on HVAC",
      Installation: "DIY (20 min)",
    },
    tags: ["thermostat", "energy-saving", "learning", "eco"],
    inStock: true,
  },
  {
    id: "sh-05",
    name: "RoboVac S9 Ultra",
    brand: "NexaHome",
    category: "Smart Home",
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 567,
    image: "🤖",
    description:
      "Self-emptying robot vacuum with LiDAR mapping, mopping, and obstacle avoidance.",
    specs: {
      Suction: "6000 Pa",
      Navigation: "LiDAR + 3D structured light",
      "Dust Bin": "Auto-empty station (60 days)",
      Mopping: "Sonic vibration mop (auto-lift)",
      Battery: "5200 mAh (up to 180 min)",
      Noise: "55 dB (quiet mode)",
    },
    tags: ["robot-vacuum", "auto-empty", "lidar", "mopping"],
    inStock: true,
  },
  {
    id: "sh-06",
    name: "SmartLock Deadbolt",
    brand: "NexaHome",
    category: "Smart Home",
    price: 199,
    originalPrice: 249,
    rating: 4.3,
    reviewCount: 234,
    image: "🔒",
    description:
      "Keyless smart deadbolt with fingerprint, code, key, and app unlock options.",
    specs: {
      "Unlock Methods": "Fingerprint, PIN, Key, App, Voice",
      "Fingerprint Capacity": "100 prints",
      Battery: "CR123A × 4 (1 year)",
      Connectivity: "Wi-Fi + Bluetooth",
      Compatibility: "Standard US deadbolt prep",
      "Weather Rating": "IP65",
    },
    tags: ["smart-lock", "fingerprint", "keyless", "security"],
    inStock: true,
  },
  {
    id: "sh-07",
    name: "AirPure 360 Purifier",
    brand: "Aerion",
    category: "Smart Home",
    price: 299,
    rating: 4.5,
    reviewCount: 189,
    image: "🌬️",
    description:
      "Smart air purifier with 360° filtration, real-time AQI display, and auto mode.",
    specs: {
      Coverage: "Up to 500 sq ft",
      Filter: "True HEPA H13 + Activated Carbon",
      CADR: "300 CFM",
      Sensors: "PM2.5, VOC, Temperature, Humidity",
      Noise: "24 dB (sleep mode)",
      "Filter Life": "6-12 months",
    },
    tags: ["air-purifier", "hepa", "smart", "allergen"],
    inStock: true,
  },
  {
    id: "sh-08",
    name: "MeshWifi 6E 3-Pack",
    brand: "NexaHome",
    category: "Smart Home",
    price: 349,
    originalPrice: 429,
    rating: 4.4,
    reviewCount: 321,
    image: "📶",
    description:
      "Tri-band Wi-Fi 6E mesh system covering up to 7,500 sq ft with blazing speeds.",
    specs: {
      Standard: "Wi-Fi 6E (802.11ax)",
      Bands: "Tri-band (2.4 + 5 + 6 GHz)",
      Speed: "Up to 5.4 Gbps",
      Coverage: "7,500 sq ft (3-pack)",
      Ports: "2× Gigabit Ethernet per node",
      "Connected Devices": "200+",
    },
    tags: ["wifi", "mesh", "wifi-6e", "whole-home"],
    inStock: true,
  },

  // ── Accessories ──
  {
    id: "acc-01",
    name: "ErgoDesk Standing Desk Converter",
    brand: "WorkZen",
    category: "Accessories",
    price: 279,
    originalPrice: 349,
    rating: 4.4,
    reviewCount: 543,
    image: "🖥️",
    description:
      "Sit-stand desk converter with gas spring lift and dual-monitor support.",
    specs: {
      "Surface Area": '32" × 22"',
      "Height Range": '6.5" – 17"',
      "Weight Capacity": "35 lbs",
      Lift: "Gas spring (single handle)",
      Levels: "Keyboard tray + Monitor surface",
      Weight: "27 lbs",
    },
    tags: ["standing-desk", "ergonomic", "office"],
    inStock: true,
  },
  {
    id: "acc-02",
    name: "MechKeys 75% Keyboard",
    brand: "WorkZen",
    category: "Accessories",
    price: 139,
    rating: 4.6,
    reviewCount: 876,
    image: "⌨️",
    description:
      "Compact 75% mechanical keyboard with hot-swappable switches and RGB backlighting.",
    specs: {
      Layout: "75% (84 keys)",
      Switches: "Gateron Pro (hot-swappable)",
      Keycaps: "PBT double-shot",
      Connectivity: "USB-C + Bluetooth 5.1 + 2.4GHz",
      Battery: "4000 mAh (200 hrs)",
      Weight: "820 g",
    },
    tags: ["mechanical", "keyboard", "hot-swap", "rgb"],
    inStock: true,
  },
  {
    id: "acc-03",
    name: "GlideX Ergonomic Mouse",
    brand: "WorkZen",
    category: "Accessories",
    price: 69,
    originalPrice: 89,
    rating: 4.5,
    reviewCount: 654,
    image: "🖱️",
    description:
      "Ergonomic vertical mouse with programmable buttons and multi-device switching.",
    specs: {
      Sensor: "16000 DPI optical",
      Buttons: "6 programmable",
      Connectivity: "USB-C + Bluetooth (3 devices)",
      Battery: "Rechargeable (90 days)",
      "Tilt Angle": "57° vertical",
      Weight: "78 g",
    },
    tags: ["ergonomic", "mouse", "wireless", "vertical"],
    inStock: true,
  },
  {
    id: "acc-04",
    name: "PowerBank 26800 PD",
    brand: "Aerion",
    category: "Accessories",
    price: 49,
    rating: 4.3,
    reviewCount: 1234,
    image: "🔋",
    description:
      "High-capacity portable charger with 65W PD for laptops, tablets, and phones.",
    specs: {
      Capacity: "26800 mAh",
      Output: "USB-C PD 65W + USB-A 18W",
      Input: "USB-C PD 65W",
      Ports: "2× USB-C, 1× USB-A",
      "Charge Time": "~2 hours (65W input)",
      Weight: "480 g",
    },
    tags: ["power-bank", "pd", "laptop-charging", "travel"],
    inStock: true,
  },
  {
    id: "acc-05",
    name: "UltraWide 34\" Monitor",
    brand: "TechNova",
    category: "Accessories",
    price: 449,
    originalPrice: 549,
    rating: 4.6,
    reviewCount: 345,
    image: "🖥️",
    description:
      "34-inch ultrawide IPS monitor with USB-C hub and 100Hz refresh rate.",
    specs: {
      Size: '34" (21:9 Ultrawide)',
      Resolution: "3440×1440 UWQHD",
      Panel: "IPS, HDR400",
      "Refresh Rate": "100 Hz",
      Ports: "USB-C 90W PD, HDMI 2.0, DP 1.4",
      "VESA Mount": "100×100mm",
    },
    tags: ["monitor", "ultrawide", "usb-c", "productivity"],
    inStock: true,
  },
  {
    id: "acc-06",
    name: "USB-C Hub 11-in-1",
    brand: "Aerion",
    category: "Accessories",
    price: 59,
    originalPrice: 79,
    rating: 4.2,
    reviewCount: 987,
    image: "🔌",
    description:
      "All-in-one USB-C hub with HDMI, SD card reader, Ethernet, and 100W passthrough charging.",
    specs: {
      Ports:
        "HDMI 4K60, 3× USB-A 3.0, USB-C PD 100W, SD/microSD, Ethernet, 3.5mm",
      "HDMI Output": "4K @ 60Hz",
      Ethernet: "Gigabit RJ45",
      "PD Passthrough": "100W",
      Material: "Aluminum alloy",
      Weight: "95 g",
    },
    tags: ["hub", "usb-c", "dock", "travel"],
    inStock: true,
  },
  {
    id: "acc-07",
    name: "LaptopStand Aluminum",
    brand: "WorkZen",
    category: "Accessories",
    price: 39,
    rating: 4.4,
    reviewCount: 765,
    image: "💻",
    description:
      "Adjustable aluminum laptop stand with ventilation holes and cable management.",
    specs: {
      Material: "Aluminum alloy",
      "Height Adjustment": "6 levels",
      Compatibility: "10\" – 17\" laptops",
      Ventilation: "Open-air design",
      "Fold Flat": "Yes (portable)",
      Weight: "240 g",
    },
    tags: ["laptop-stand", "aluminum", "portable", "ergonomic"],
    inStock: true,
  },
  {
    id: "acc-08",
    name: "WebCam 4K AutoFocus",
    brand: "OptiVision",
    category: "Accessories",
    price: 129,
    originalPrice: 159,
    rating: 4.5,
    reviewCount: 432,
    image: "📹",
    description:
      "4K webcam with autofocus, dual stereo mics, and adjustable field of view.",
    specs: {
      Resolution: "4K 30fps / 1080p 60fps",
      Autofocus: "Fast hybrid AF",
      "Field of View": "65° / 78° / 90° adjustable",
      Microphone: "Dual stereo (noise-cancelling)",
      Mount: "Universal clip + tripod thread",
      Connectivity: "USB-C",
    },
    tags: ["webcam", "4k", "streaming", "wfh"],
    inStock: true,
  },
];

// ── Reviews ──

export const reviews: Review[] = [
  // ProBook 14
  { productId: "lap-01", author: "Alex T.", rating: 5, text: "Best ultrabook I've owned. Battery easily lasts a full work day, and the display is gorgeous.", date: "2024-11-15", helpful: 42 },
  { productId: "lap-01", author: "Maria S.", rating: 4, text: "Great laptop overall. Wish it had a dedicated GPU option, but for office work it's perfect.", date: "2024-10-28", helpful: 18 },
  { productId: "lap-01", author: "James K.", rating: 5, text: "Incredibly light and the keyboard feel is excellent. The screen is sharp and bright.", date: "2024-09-12", helpful: 31 },
  { productId: "lap-01", author: "Priya R.", rating: 4, text: "Solid build quality. Runs cool and quiet. Only downside is the limited port selection.", date: "2024-08-05", helpful: 12 },

  // StudioMax 16
  { productId: "lap-02", author: "Chris D.", rating: 5, text: "The OLED display is stunning for video editing. Colors are incredibly accurate.", date: "2024-11-20", helpful: 56 },
  { productId: "lap-02", author: "Yuki M.", rating: 5, text: "Handles Premiere Pro and After Effects without breaking a sweat. Worth every penny.", date: "2024-10-15", helpful: 38 },
  { productId: "lap-02", author: "Sam L.", rating: 4, text: "Powerful machine. Fan noise can be noticeable under heavy load but nothing extreme.", date: "2024-09-22", helpful: 22 },

  // SwiftBook Air 13
  { productId: "lap-03", author: "Taylor W.", rating: 4, text: "Great value for a student laptop. Handles everyday tasks well.", date: "2024-11-01", helpful: 28 },
  { productId: "lap-03", author: "Jordan P.", rating: 5, text: "Super portable and the battery life is impressive for this price range.", date: "2024-10-10", helpful: 15 },
  { productId: "lap-03", author: "Casey R.", rating: 4, text: "Good build quality for the price. Display is decent but not the brightest outdoors.", date: "2024-09-05", helpful: 9 },

  // GameForce X15
  { productId: "lap-04", author: "Ryan G.", rating: 5, text: "Beast of a gaming laptop. Runs everything at ultra settings. The 240Hz screen is buttery smooth.", date: "2024-11-18", helpful: 67 },
  { productId: "lap-04", author: "Ava T.", rating: 4, text: "Incredible performance but it gets hot and heavy. Not great for lap use.", date: "2024-10-22", helpful: 34 },
  { productId: "lap-04", author: "Mike Z.", rating: 5, text: "The cooling system actually works well. Much better thermals than my previous gaming laptop.", date: "2024-09-15", helpful: 45 },

  // EduBook 11
  { productId: "lap-05", author: "Parent2024", rating: 4, text: "Perfect for my kid's schoolwork. Simple, fast boot, and durable.", date: "2024-10-30", helpful: 23 },
  { productId: "lap-05", author: "Teacher_M", rating: 4, text: "We use these in our classroom. Reliable and easy to manage.", date: "2024-09-20", helpful: 31 },
  { productId: "lap-05", author: "Dana S.", rating: 4, text: "Does what it needs to do. Can't ask for more at this price.", date: "2024-08-15", helpful: 8 },

  // ZenBook Pro 15
  { productId: "lap-06", author: "Nina F.", rating: 5, text: "The OLED display makes everything look amazing. Great all-around laptop.", date: "2024-11-10", helpful: 29 },
  { productId: "lap-06", author: "Derek H.", rating: 4, text: "Good balance of performance and portability. The trackpad is huge and responsive.", date: "2024-10-05", helpful: 16 },
  { productId: "lap-06", author: "Lena W.", rating: 4, text: "Solid choice if you want OLED without breaking the bank. Battery could be better though.", date: "2024-09-18", helpful: 11 },

  // WorkStation W17
  { productId: "lap-07", author: "EngPro99", rating: 5, text: "Runs SolidWorks and AutoCAD flawlessly. The ECC memory gives me confidence in large projects.", date: "2024-11-22", helpful: 41 },
  { productId: "lap-07", author: "Arch_Julia", rating: 5, text: "Replaced my desktop workstation. The display is massive and color-accurate.", date: "2024-10-18", helpful: 35 },
  { productId: "lap-07", author: "Carlos M.", rating: 4, text: "Expensive but you get what you pay for. Heavy to carry but that's expected.", date: "2024-09-08", helpful: 19 },

  // FlexBook 360
  { productId: "lap-08", author: "Sophie L.", rating: 4, text: "Love the 2-in-1 form factor. Great for sketching and note-taking with a stylus.", date: "2024-11-05", helpful: 22 },
  { productId: "lap-08", author: "Ben R.", rating: 4, text: "Versatile laptop. The hinge is solid and the touch screen is responsive.", date: "2024-10-12", helpful: 14 },
  { productId: "lap-08", author: "Kelsey T.", rating: 5, text: "Perfect for my workflow — laptop mode for coding, tablet mode for reading.", date: "2024-09-25", helpful: 27 },

  // QuietMax ANC Pro
  { productId: "hp-01", author: "Commuter_Jay", rating: 5, text: "The noise cancellation is unreal. Can't hear anything on the subway. Absolute game changer.", date: "2024-11-12", helpful: 89 },
  { productId: "hp-01", author: "WFH_Lisa", rating: 5, text: "30 hours of battery is no joke. I charge these once a week. Sound quality is excellent.", date: "2024-10-25", helpful: 62 },
  { productId: "hp-01", author: "AudioFan", rating: 4, text: "Great ANC and comfort. Sound is slightly warm but detailed enough for most listeners.", date: "2024-09-30", helpful: 34 },
  { productId: "hp-01", author: "Peter K.", rating: 5, text: "Comfortable for hours of wear. The ear cups are soft and don't get hot.", date: "2024-08-20", helpful: 45 },

  // BassX Wireless
  { productId: "hp-02", author: "BassHead", rating: 5, text: "These thump! Exactly what I wanted for hip-hop and EDM. Great value.", date: "2024-11-08", helpful: 41 },
  { productId: "hp-02", author: "Maya J.", rating: 4, text: "Bass is powerful but can overwhelm other frequencies. Good for the price though.", date: "2024-10-15", helpful: 18 },
  { productId: "hp-02", author: "Raj P.", rating: 4, text: "Comfortable and loud. Battery lasts for days of casual listening.", date: "2024-09-22", helpful: 12 },

  // StudioPro Reference
  { productId: "hp-03", author: "MixMaster", rating: 5, text: "Incredibly flat response. Perfect for mixing. The planar magnetic drivers are fantastic.", date: "2024-11-14", helpful: 53 },
  { productId: "hp-03", author: "Producer_K", rating: 5, text: "Best reference headphones under $300. The detail retrieval is impressive.", date: "2024-10-08", helpful: 39 },
  { productId: "hp-03", author: "Steve W.", rating: 4, text: "Excellent for studio work. Open-back design leaks sound so not ideal for public use.", date: "2024-09-15", helpful: 21 },

  // FitPods Pro
  { productId: "hp-04", author: "GymRat22", rating: 4, text: "Solid ANC in earbuds. Stay in place during workouts. Good sound.", date: "2024-11-06", helpful: 33 },
  { productId: "hp-04", author: "Anna C.", rating: 5, text: "Transparency mode is great for awareness while running. Battery life is impressive.", date: "2024-10-20", helpful: 25 },
  { productId: "hp-04", author: "Tom B.", rating: 4, text: "Good all-around TWS earbuds. ANC isn't as strong as over-ear options but very capable.", date: "2024-09-10", helpful: 17 },

  // KidSafe
  { productId: "hp-05", author: "Mom_of_3", rating: 5, text: "Peace of mind knowing the volume is limited. My kids love the colors.", date: "2024-10-28", helpful: 44 },
  { productId: "hp-05", author: "DadLife", rating: 4, text: "Durable enough for my 6-year-old. Sound quality is surprisingly decent.", date: "2024-09-18", helpful: 19 },
  { productId: "hp-05", author: "Teacher_B", rating: 5, text: "Recommended for all parents. Safe volume, comfortable fit, and affordable.", date: "2024-08-25", helpful: 36 },

  // SportElite
  { productId: "hp-06", author: "Runner_K", rating: 4, text: "Stays secure during runs. IPX7 means I don't worry about rain or sweat.", date: "2024-11-02", helpful: 21 },
  { productId: "hp-06", author: "Cyclist_J", rating: 4, text: "Good battery life for the price. Sound is decent, not audiophile-grade.", date: "2024-10-10", helpful: 9 },
  { productId: "hp-06", author: "Yara S.", rating: 4, text: "Neckband design is comfortable for long workouts. Magnetic tips are a nice touch.", date: "2024-09-05", helpful: 14 },

  // AeroMax
  { productId: "hp-07", author: "Trail_Runner", rating: 5, text: "Finally can listen to music while staying aware of my surroundings on trails.", date: "2024-11-16", helpful: 32 },
  { productId: "hp-07", author: "Cyclist_M", rating: 4, text: "Sound quality isn't like traditional headphones but the safety factor is worth it.", date: "2024-10-08", helpful: 18 },
  { productId: "hp-07", author: "Pat D.", rating: 4, text: "Lightweight and comfortable for hours. Bass is limited but expected for bone conduction.", date: "2024-09-20", helpful: 11 },

  // GamerX 7.1
  { productId: "hp-08", author: "PCGamer", rating: 4, text: "Good positional audio in games. The mic is clear for team chat. RGB is a nice bonus.", date: "2024-11-09", helpful: 38 },
  { productId: "hp-08", author: "StreamerFX", rating: 4, text: "Comfortable for long gaming sessions. Virtual surround works well in FPS games.", date: "2024-10-14", helpful: 22 },
  { productId: "hp-08", author: "Nate G.", rating: 5, text: "Best gaming headset under $150. Build quality is solid and sound is impressive.", date: "2024-09-28", helpful: 29 },

  // SnapPro Mirrorless R7
  { productId: "cam-01", author: "PhotoPro", rating: 5, text: "The autofocus tracking is incredible. Never misses. Perfect for sports and wildlife.", date: "2024-11-18", helpful: 48 },
  { productId: "cam-01", author: "Weekend_Shooter", rating: 4, text: "Great all-around camera. 4K 60fps video is a nice bonus for hybrid shooters.", date: "2024-10-22", helpful: 26 },
  { productId: "cam-01", author: "Sara P.", rating: 5, text: "Upgraded from a DSLR and the difference is night and day. Love the IBIS.", date: "2024-09-15", helpful: 35 },

  // FrameMaster Full Frame
  { productId: "cam-02", author: "LandscapeLens", rating: 5, text: "45 megapixels of pure detail. Landscape prints look phenomenal at large sizes.", date: "2024-11-20", helpful: 62 },
  { productId: "cam-02", author: "PortraitPro", rating: 5, text: "Dynamic range is outstanding. Recovery from shadows is impressive.", date: "2024-10-15", helpful: 44 },
  { productId: "cam-02", author: "Kai J.", rating: 4, text: "Professional-grade camera. File sizes are huge but the quality justifies it.", date: "2024-09-10", helpful: 28 },

  // ActionCam X5
  { productId: "cam-03", author: "AdventureMax", rating: 5, text: "Survived a mountain bike crash and underwater snorkeling. Footage looks amazing.", date: "2024-11-05", helpful: 54 },
  { productId: "cam-03", author: "SkiPro", rating: 4, text: "HyperSmooth stabilization is genuinely impressive. Makes POV footage watchable.", date: "2024-10-18", helpful: 31 },
  { productId: "cam-03", author: "Luna K.", rating: 4, text: "Great action camera. Battery life could be better in cold weather though.", date: "2024-09-08", helpful: 16 },

  // VlogStar Compact
  { productId: "cam-04", author: "VlogDaily", rating: 5, text: "The flip screen is essential for solo vlogging. Autofocus is fast and reliable.", date: "2024-11-12", helpful: 42 },
  { productId: "cam-04", author: "TravelVlog", rating: 4, text: "Fits in my pocket and produces great content. Low-light is better than expected.", date: "2024-10-05", helpful: 23 },
  { productId: "cam-04", author: "Dana M.", rating: 5, text: "Best vlogging camera at this price. The 1-inch sensor makes a real difference.", date: "2024-09-22", helpful: 34 },

  // DroneView Aerial Pro
  { productId: "cam-05", author: "DroneAce", rating: 5, text: "46-minute flight time is class-leading. The Hasselblad colors are beautiful.", date: "2024-11-16", helpful: 51 },
  { productId: "cam-05", author: "RealEstate_Photo", rating: 5, text: "Perfect for real estate work. Obstacle avoidance gives confidence flying near buildings.", date: "2024-10-10", helpful: 38 },
  { productId: "cam-05", author: "Hiker_Tom", rating: 4, text: "Incredible footage of mountain trails. Wind can be an issue at high altitude.", date: "2024-09-15", helpful: 22 },

  // InstaPrint
  { productId: "cam-06", author: "PartyHost", rating: 5, text: "Such a hit at parties! Everyone loves getting instant prints.", date: "2024-11-01", helpful: 36 },
  { productId: "cam-06", author: "Nostalgic_K", rating: 4, text: "Fun camera with a retro feel. Film packs add up in cost but the experience is worth it.", date: "2024-10-15", helpful: 19 },
  { productId: "cam-06", author: "Gift_Buyer", rating: 4, text: "Bought as a gift and they loved it. Simple to use and photos look charming.", date: "2024-09-08", helpful: 25 },

  // HomeSphere Hub Max
  { productId: "sh-01", author: "SmartHome_Fan", rating: 5, text: "Controls everything in my home. The display is great for recipes and video calls.", date: "2024-11-14", helpful: 43 },
  { productId: "sh-01", author: "Rachel M.", rating: 4, text: "Works with all my smart devices. Sound quality is good for a smart display.", date: "2024-10-20", helpful: 21 },
  { productId: "sh-01", author: "Tech_Dad", rating: 5, text: "The whole family uses it daily. Calendar, music, smart home controls — it does it all.", date: "2024-09-12", helpful: 37 },

  // BrightBulb RGBW
  { productId: "sh-02", author: "Ambiance_Pro", rating: 4, text: "Easy setup, no hub needed. Colors are vivid. Great value for a 4-pack.", date: "2024-11-08", helpful: 28 },
  { productId: "sh-02", author: "Party_Lights", rating: 5, text: "Transform any room instantly. The app controls are intuitive.", date: "2024-10-12", helpful: 15 },
  { productId: "sh-02", author: "Energy_Saver", rating: 4, text: "Love the scheduling feature. Lights turn on at sunset automatically.", date: "2024-09-05", helpful: 19 },

  // GuardCam Outdoor
  { productId: "sh-03", author: "Security_First", rating: 5, text: "Color night vision is impressive. Can clearly identify people at night.", date: "2024-11-10", helpful: 39 },
  { productId: "sh-03", author: "Homeowner_J", rating: 4, text: "Easy install and the AI detection reduces false alerts significantly.", date: "2024-10-18", helpful: 24 },
  { productId: "sh-03", author: "Neighbor_Watch", rating: 4, text: "Wide angle covers the entire front yard. Push notifications are fast.", date: "2024-09-15", helpful: 16 },

  // ThermoSmart
  { productId: "sh-04", author: "Green_Home", rating: 5, text: "Noticed a real drop in energy bills. It learns your schedule within a week.", date: "2024-11-06", helpful: 47 },
  { productId: "sh-04", author: "DIY_Install", rating: 4, text: "Installed myself in 15 minutes. The app is well-designed and responsive.", date: "2024-10-08", helpful: 22 },
  { productId: "sh-04", author: "Comfort_K", rating: 5, text: "Love the occupancy detection. House is warm when I arrive, saves energy when I leave.", date: "2024-09-20", helpful: 33 },

  // RoboVac S9
  { productId: "sh-05", author: "CleanFreak", rating: 5, text: "This thing is a miracle. Maps my whole house perfectly and the auto-empty is amazing.", date: "2024-11-18", helpful: 63 },
  { productId: "sh-05", author: "Pet_Owner", rating: 5, text: "Handles pet hair like a champ. The mopping feature is a nice bonus.", date: "2024-10-22", helpful: 48 },
  { productId: "sh-05", author: "Lazy_Sunday", rating: 4, text: "Set it and forget it. Only maintenance is emptying the auto-empty bag every 2 months.", date: "2024-09-10", helpful: 29 },

  // SmartLock Deadbolt
  { productId: "sh-06", author: "KeyFree", rating: 4, text: "No more fumbling for keys. Fingerprint unlock is fast and reliable.", date: "2024-11-02", helpful: 31 },
  { productId: "sh-06", author: "AirBnB_Host", rating: 5, text: "Perfect for rental properties. Can create temporary codes for guests remotely.", date: "2024-10-12", helpful: 42 },
  { productId: "sh-06", author: "Secure_Home", rating: 4, text: "Solid construction. The backup key option is reassuring. Battery lasts about a year.", date: "2024-09-08", helpful: 18 },

  // AirPure 360
  { productId: "sh-07", author: "Allergy_Free", rating: 5, text: "Noticed a huge difference in my allergies within the first week. Quiet in sleep mode.", date: "2024-11-15", helpful: 38 },
  { productId: "sh-07", author: "City_Dweller", rating: 4, text: "Real-time AQI display is helpful. Filter replacement is easy.", date: "2024-10-05", helpful: 20 },
  { productId: "sh-07", author: "New_Parent", rating: 5, text: "Runs 24/7 in the nursery. Peace of mind knowing the air is clean.", date: "2024-09-18", helpful: 33 },

  // MeshWifi 6E
  { productId: "sh-08", author: "WFH_Pro", rating: 5, text: "Dead zones are gone. 6GHz band is blazing fast for my home office.", date: "2024-11-08", helpful: 35 },
  { productId: "sh-08", author: "Big_House", rating: 4, text: "Covers my 3-story house perfectly. Setup was straightforward with the app.", date: "2024-10-14", helpful: 22 },
  { productId: "sh-08", author: "Streamer_S", rating: 4, text: "Multiple 4K streams without buffering. Huge upgrade from my old router.", date: "2024-09-22", helpful: 17 },

  // ErgoDesk Standing
  { productId: "acc-01", author: "BackPain_No_More", rating: 5, text: "My back thanks me. Easy to adjust height and holds two monitors stable.", date: "2024-11-12", helpful: 44 },
  { productId: "acc-01", author: "Office_Worker", rating: 4, text: "Sturdy and smooth gas spring mechanism. Takes up less space than a full standing desk.", date: "2024-10-08", helpful: 23 },
  { productId: "acc-01", author: "Remote_Dev", rating: 4, text: "Good quality for the price. Keyboard tray could be a bit wider.", date: "2024-09-15", helpful: 15 },

  // MechKeys 75%
  { productId: "acc-02", author: "TypeWriter", rating: 5, text: "Hot-swap switches are a game changer. Sound profile is excellent with Gateron Pros.", date: "2024-11-16", helpful: 52 },
  { productId: "acc-02", author: "Coder_X", rating: 5, text: "Triple connectivity is flawless. Switch between laptop and desktop instantly.", date: "2024-10-20", helpful: 38 },
  { productId: "acc-02", author: "KB_Enthusiast", rating: 4, text: "Great entry into mechanical keyboards. PBT keycaps feel premium.", date: "2024-09-10", helpful: 27 },

  // GlideX Mouse
  { productId: "acc-03", author: "RSI_Recovery", rating: 5, text: "Vertical design eliminated my wrist pain. Should have switched years ago.", date: "2024-11-04", helpful: 56 },
  { productId: "acc-03", author: "Multi_Device", rating: 4, text: "Switching between 3 devices with a button press is super convenient.", date: "2024-10-15", helpful: 21 },
  { productId: "acc-03", author: "Dev_Sarah", rating: 4, text: "Takes a day to adjust to vertical grip but worth it for the ergonomic benefit.", date: "2024-09-08", helpful: 18 },

  // PowerBank 26800
  { productId: "acc-04", author: "Digital_Nomad", rating: 5, text: "Charges my laptop AND phone. Essential for working from coffee shops and airports.", date: "2024-11-10", helpful: 47 },
  { productId: "acc-04", author: "Traveler_M", rating: 4, text: "Heavy but the capacity is incredible. 65W PD output is a standout feature.", date: "2024-10-05", helpful: 25 },
  { productId: "acc-04", author: "Festival_Goer", rating: 4, text: "Lasted an entire 3-day festival charging phones for our whole group.", date: "2024-09-12", helpful: 32 },

  // UltraWide Monitor
  { productId: "acc-05", author: "Productivity_King", rating: 5, text: "Replaced dual monitors. More immersive and cleaner desk setup.", date: "2024-11-14", helpful: 41 },
  { productId: "acc-05", author: "Dev_Workspace", rating: 5, text: "USB-C single cable setup with my laptop. 90W power delivery is clutch.", date: "2024-10-18", helpful: 33 },
  { productId: "acc-05", author: "Designer_L", rating: 4, text: "Great color accuracy for the price. Would love if it were 144Hz but 100Hz is fine.", date: "2024-09-22", helpful: 19 },

  // USB-C Hub
  { productId: "acc-06", author: "MacUser", rating: 4, text: "Gives my MacBook all the ports it's missing. HDMI 4K60 works flawlessly.", date: "2024-11-06", helpful: 29 },
  { productId: "acc-06", author: "Road_Warrior", rating: 4, text: "Compact and works reliably. The Ethernet port is great for hotel rooms.", date: "2024-10-12", helpful: 16 },
  { productId: "acc-06", author: "Student_C", rating: 5, text: "Affordable and does everything I need. SD card reader is a nice bonus for photography class.", date: "2024-09-05", helpful: 22 },

  // LaptopStand
  { productId: "acc-07", author: "Ergo_Setup", rating: 5, text: "Lightweight, portable, and keeps my laptop at eye level. Perfect travel companion.", date: "2024-11-01", helpful: 26 },
  { productId: "acc-07", author: "WFH_Mom", rating: 4, text: "Simple but effective. Helps with ventilation too — laptop runs cooler.", date: "2024-10-08", helpful: 13 },
  { productId: "acc-07", author: "Minimalist", rating: 4, text: "Clean aluminum look matches my setup. Folds flat for easy storage.", date: "2024-09-15", helpful: 17 },

  // WebCam 4K
  { productId: "acc-08", author: "Zoom_Pro", rating: 5, text: "Massive upgrade from my laptop webcam. Colleagues noticed the quality immediately.", date: "2024-11-08", helpful: 38 },
  { productId: "acc-08", author: "Streamer_Dev", rating: 4, text: "4K is overkill for meetings but great for streaming. Autofocus is snappy.", date: "2024-10-14", helpful: 22 },
  { productId: "acc-08", author: "Remote_Manager", rating: 5, text: "Built-in mics are surprisingly good. One less thing on my desk.", date: "2024-09-20", helpful: 31 },
];

// ── Deals / Coupons ──

export const deals: Deal[] = [
  {
    code: "TECH20",
    description: "20% off all Laptops",
    discountPercent: 20,
    minPurchase: 500,
    applicableCategories: ["Laptops"],
  },
  {
    code: "AUDIO15",
    description: "15% off Headphones",
    discountPercent: 15,
    minPurchase: 50,
    applicableCategories: ["Headphones"],
  },
  {
    code: "SMARTHOME10",
    description: "10% off Smart Home products",
    discountPercent: 10,
    minPurchase: 100,
    applicableCategories: ["Smart Home"],
  },
  {
    code: "BUNDLE25",
    description: "25% off when you buy from 3+ categories",
    discountPercent: 25,
    minPurchase: 200,
    applicableCategories: ["Laptops", "Headphones", "Cameras", "Smart Home", "Accessories"],
  },
  {
    code: "SAVE10",
    description: "10% off any order over $300",
    discountPercent: 10,
    minPurchase: 300,
    applicableCategories: ["Laptops", "Headphones", "Cameras", "Smart Home", "Accessories"],
  },
  {
    code: "CAMERA20",
    description: "20% off Cameras & Drones",
    discountPercent: 20,
    minPurchase: 200,
    applicableCategories: ["Cameras"],
  },
  {
    code: "ACCESSORY5",
    description: "$5 flat — 5% off Accessories",
    discountPercent: 5,
    minPurchase: 0,
    applicableCategories: ["Accessories"],
  },
  {
    code: "WELCOME15",
    description: "15% off your first order (any category)",
    discountPercent: 15,
    minPurchase: 50,
    applicableCategories: ["Laptops", "Headphones", "Cameras", "Smart Home", "Accessories"],
  },
];
