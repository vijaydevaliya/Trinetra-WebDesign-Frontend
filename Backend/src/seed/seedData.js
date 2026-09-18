// One-time migration data: mirrors the original static content that used to
// live in the frontend's src/data/*.js files, plus the original filename each
// product/project image was saved under in the frontend's public/ folders
// (before the admin+database system existed). Used only by seed.js.

export const PRODUCTS_SEED = [
  { title: 'Chrome Glass Touch', category: 'switches', description: 'Elegant tempered glass touch panel with multi-gang control. Compatible with standard wiring and app/voice control.', sourceImage: 'Chrome Glass Touch.webp' },
  { title: 'Curtain Blind Motor', category: 'curtains', description: 'Quiet DC motor for automated curtain & blind control. Supports app, voice, and scheduled scenes.', sourceImage: 'Curtain Blind Motor.webp' },
  { title: 'Gas Sensor Hub', category: 'sensors', description: 'Detects LPG, methane & CO gas leaks instantly. Triggers real-time alerts and auto shut-off routines.', sourceImage: 'Gas Sensor Hub.webp' },
  { title: 'Hidden Smart Lock for Cabinet', category: 'security', description: 'Invisible RFID & app-controlled lock for cabinets and drawers. Slim design fits flush installations.', sourceImage: 'Hidden Smart Lock for Cabinet.webp' },
  { title: 'Metal Touch Switch', category: 'switches', description: 'Brushed metal capacitive touch switch with LED backlight. Supports gang combinations and remote scenes.', sourceImage: 'Metal Touch.webp' },
  { title: 'Microwave Motion Sensor', category: 'sensors', description: 'High-sensitivity microwave radar sensor for through-wall detection. Ideal for corridors and staircases.', sourceImage: 'Microwave Motion Sensor.webp' },
  { title: 'Red Smart Remote', category: 'hub', description: 'Universal IR/RF smart remote controller. Control up to 100+ devices from ACs to TVs in one app.', sourceImage: 'Red Smart Remote.webp' },
  { title: 'Smart Biometric Door Lock', category: 'security', description: 'Advanced fingerprint + PIN + card access with auto-lock. 100 fingerprint capacity and app monitoring.', sourceImage: 'Smart Biometric Door Lock.webp' },
  { title: 'Smart Biometric Door Lock (1)', category: 'security', description: 'Premium biometric lock with face recognition & remote unlock via app. Fire-grade zinc alloy body.', sourceImage: 'Smart Biometric Door Lock(1).webp' },
  { title: 'Smart Biometric Door Lock (2)', category: 'security', description: '5-in-1 access: fingerprint, face, card, PIN & app. Fire-grade zinc alloy body with anti-peep design.', sourceImage: 'Smart Biometric Door Lock(2).webp' },
  { title: 'Smart Biometric Glass Door Lock', category: 'security', description: 'Designed for frameless glass doors with biometric + app access. Sleek tempered-glass compatible housing.', sourceImage: 'Smart Biometric Glass Door Lock.webp' },
  { title: 'Smart CCT Rose Gold Downlight', category: 'lighting', description: 'Tunable white 2700K-6500K LED downlight with rose gold trim. Dimmable via app and voice assistants.', sourceImage: 'Smart CCT Rose Gold COB Light.webp' },
  { title: 'Smart COB Driver', category: 'lighting', description: 'Dimmable COB LED driver with 0-10V control. Compatible with Zigbee and standard lighting circuits.', sourceImage: 'Smart Cob Driver.webp' },
  { title: 'Smart Face Recognition Lock', category: 'security', description: '3D face recognition with liveness detection for accurate, spoof-proof entry access.', sourceImage: 'Smart Face  Recognition Door Lock.webp' },
  { title: 'Smart Face Recognition Lock-1', category: 'security', description: 'Fast 0.3s face unlock with wide-angle infrared camera. Works in complete darkness.', sourceImage: 'Smart Face  Recognition Door Lock(1).webp' },
  { title: 'Smart Face Recognition Lock-2', category: 'security', description: 'AI-powered facial recognition with visitor log and remote access management via app.', sourceImage: 'Smart Face  Recognition Door Lock(2).webp' },
  { title: 'Smart Fan', category: 'fan', description: 'BLDC motor ceiling fan with 6-speed app & voice control. Energy-efficient with scheduling support.', sourceImage: 'Smart Fans.webp' },
  { title: 'Smart Lock for Cabinet', category: 'security', description: 'Compact electromechanical lock for cabinets with RFID & app control.', sourceImage: 'Smart Lock for Cabinet.webp' },
  { title: 'Smart Lock V2 Black', category: 'security', description: 'Fingerprint, PIN, RFID & mobile app-enabled smart lock. Matte black finish for modern doors.', sourceImage: 'Smart Lock V2 Black.webp' },
  { title: 'Smart Panel Light', category: 'lighting', description: 'Ultra-slim 40W smart panel with CCT tuning and dimming. Uniform backlit glow for false ceilings.', sourceImage: 'Smart Panel Light.webp' },
  { title: 'Smart Plug 16A', category: 'switches', description: '240V AC, 50/60Hz smart plug with energy monitoring. Suitable for heavy appliances.', sourceImage: 'Smart Plug 16A.webp' },
  { title: 'Smart Sensor Hub', category: 'hub', description: 'Central Zigbee + Wi-Fi hub supporting 128+ smart devices.', sourceImage: 'Smart Sensor Hub.webp' },
  { title: 'Smart Single Phase Energy Meter', category: 'energy', description: 'Real-time single-phase energy monitoring with app reporting. DIN-rail mount friendly.', sourceImage: 'Smart Single Phase Energy Meter.webp' },
  { title: 'Standard Touch Screen Panel', category: 'hub', description: '4-inch wall-mounted touch panel for scene, lighting & climate control.', sourceImage: 'Standard Touch Screen Panel.webp' },
  { title: 'USB Enabled WiFi Video Doorbell', category: 'security', description: '1080p HD video doorbell with two-way audio & motion alerts. USB-powered for simple installs.', sourceImage: 'USB Enabled WiFi Video Doorbell.webp' },
];

export const PROJECTS_SEED = [
  { title: 'Courtyard Living Atrium', category: 'living', sourceImage: 'living-courtyard-atrium.webp' },
  { title: 'Master Suite with Wave Chandelier', category: 'bedroom', sourceImage: 'bedroom-wave-chandelier-suite.webp' },
  { title: 'Contemporary Bedroom Retreat', category: 'bedroom', sourceImage: 'bedroom-contemporary-retreat.webp' },
  { title: 'Grand Living Room Lounge', category: 'living', sourceImage: 'living-grand-lounge.webp' },
  { title: 'Warm Wood Panel Bedroom', category: 'bedroom', sourceImage: 'bedroom-warm-wood-panel.webp' },
  { title: 'Golden Accent Bedroom', category: 'bedroom', sourceImage: 'bedroom-golden-accent.webp' },
  { title: 'Textured Gold Living Space', category: 'living', sourceImage: 'living-textured-gold.webp' },
  { title: 'Marble Feature Wall Bedroom', category: 'bedroom', sourceImage: 'bedroom-marble-feature-wall.webp' },
  { title: 'Indoor Zen Garden & Staircase', category: 'others', sourceImage: 'others-zen-garden-staircase.webp' },
  { title: 'Elegant White Bedroom Suite', category: 'bedroom', sourceImage: 'bedroom-elegant-white-suite.webp' },
  { title: 'Formal Dining Hall', category: 'dining', sourceImage: 'dining-formal-hall.webp' },
  { title: 'Travertine Wall Bedroom', category: 'bedroom', sourceImage: 'bedroom-travertine-wall.webp' },
];

export const BLOGS_SEED = [
  {
    title: 'Top Smart Home Automation Trends in 2025',
    category: 'Trends',
    excerpt: 'Explore the latest innovations shaping the future of smart homes.',
    featured: true,
    content: [
      'Smart home automation continues to move from novelty to necessity, and 2025 is shaping up to be a pivotal year for how households adopt connected technology.',
      'Matter-based interoperability is finally maturing, letting switches, locks, and sensors from different brands work together on a single app instead of fragmenting into isolated ecosystems.',
      'AI-driven automation is also shifting from simple "if this then that" rules to predictive routines that learn a household\'s patterns - dimming lights, adjusting climate, and securing entry points without a single manual trigger.',
      'Energy awareness is another major theme, with real-time consumption dashboards helping homeowners cut wastage and lower utility bills through smarter scheduling.',
      'For anyone planning an automation upgrade this year, the winning strategy is to invest in a unified hub and open-standard devices rather than chasing single-brand lock-in.',
    ],
  },
  {
    title: 'How Home Automation Improves Energy Efficiency',
    category: 'Energy',
    excerpt: 'Learn how automation helps reduce energy consumption and costs.',
    content: [
      'Every automated device in a home is also, quietly, an energy-saving device - provided it is configured with efficiency in mind.',
      'Smart plugs and energy meters give homeowners visibility into exactly which appliances draw the most power, turning guesswork into data-backed decisions.',
      'Scheduled lighting and climate scenes prevent the most common source of waste: rooms that stay lit or cooled long after they are empty.',
      'Combined with occupancy sensors, automation systems can automatically cut power to unused zones, often reducing monthly electricity bills by a noticeable margin without any change in daily comfort.',
    ],
  },
  {
    title: 'Smart Security Systems Every Home Needs',
    category: 'Security',
    excerpt: 'Protect your home with intelligent security solutions.',
    content: [
      'A modern security setup goes far beyond a single alarm siren - it layers multiple smart devices so that no single point of failure leaves a home exposed.',
      'Smart door locks with biometric or PIN access remove the risk of lost keys while logging every entry and exit for peace of mind.',
      'Video doorbells and motion sensors extend visibility to the front gate, alerting residents in real time whenever someone approaches.',
      'Gas and smoke sensors round out the picture, protecting against hazards that traditional security systems often ignore entirely.',
    ],
  },
  {
    title: 'Voice Assistants vs Automation Panels',
    category: 'Guide',
    excerpt: 'Which control system is better for your smart home?',
    content: [
      'Choosing between a voice assistant and a wall-mounted touch panel often comes down to how a household actually wants to interact with its home.',
      'Voice assistants excel at quick, hands-free commands - perfect for adjusting lights while cooking or checking the weather before leaving the house.',
      'Touch panels shine in shared spaces, offering a visual overview of every connected scene and device without depending on a microphone picking up the right words in a noisy room.',
      'Most well-designed smart homes use both together: a central panel for structured control, and voice for everyday convenience.',
    ],
  },
  {
    title: 'Smart Homes for Apartments: What Works Best',
    category: 'Living',
    excerpt: 'Automation ideas that fit perfectly in apartments.',
    content: [
      'Apartment living comes with constraints that a standalone house rarely faces - limited wiring access, rental restrictions, and smaller footprints.',
      'Plug-in smart switches and battery-powered sensors are ideal here, since they require no rewiring and can move with the resident to their next home.',
      'Compact hubs that bridge Wi-Fi and Zigbee devices let apartment dwellers build a full automation setup without touching a single wall.',
      'The result is a flexible, renter-friendly system that delivers the same convenience as a built-in installation.',
    ],
  },
  {
    title: "AI in Home Automation: What's Next?",
    category: 'AI',
    excerpt: 'How artificial intelligence is changing smart living.',
    content: [
      "Artificial intelligence is quietly becoming the layer that ties every smart device together, turning isolated automations into a system that actually understands a household's routine.",
      'Instead of static schedules, AI-driven hubs analyze patterns - when residents wake up, when they leave for work, when the house is typically empty - and adjust automatically.',
      'Predictive maintenance is another emerging use case, with sensors flagging unusual behavior in appliances before they fail outright.',
      'As on-device AI processing improves, expect more of this intelligence to run locally, reducing both latency and privacy concerns.',
    ],
  },
  {
    title: 'Smart Curtains & Blinds Explained',
    category: 'Comfort',
    excerpt: 'Automated curtains for privacy, comfort, and energy savings.',
    content: [
      'Motorized curtains are one of the most visible upgrades a smart home can make, and also one of the most functional.',
      'Beyond convenience, scheduled curtains help regulate indoor temperature by blocking harsh afternoon sun in summer and letting warmth in during winter mornings.',
      'Privacy scenes let an entire floor close its blinds with a single tap or voice command, especially useful for street-facing rooms.',
      'Retrofitting existing curtain tracks with a smart motor is usually simpler than most homeowners expect, requiring no structural changes.',
    ],
  },
  {
    title: 'Smart Homes & Data Privacy Concerns',
    category: 'Privacy',
    excerpt: 'Understand privacy challenges in connected homes.',
    content: [
      'Every smart device that joins a home network also becomes a potential entry point, making privacy a core design consideration rather than an afterthought.',
      'Choosing devices with local processing and encrypted communication significantly reduces exposure compared to systems that route everything through third-party clouds.',
      'Segmenting smart devices onto their own Wi-Fi network keeps a compromised sensor from ever reaching personal computers or phones.',
      'Regular firmware updates and strong, unique passwords remain the simplest and most effective defense against the vast majority of real-world attacks.',
    ],
  },
  {
    title: 'Is Home Automation Worth the Investment?',
    category: 'Investment',
    excerpt: 'Cost vs value analysis of smart home systems.',
    content: [
      'The upfront cost of automation is often the biggest hesitation for homeowners, but it rarely tells the full story.',
      'Energy savings from smarter lighting, climate, and appliance scheduling typically offset a meaningful portion of the initial investment within a few years.',
      'Security upgrades reduce risk in ways that are hard to price directly, but insurers increasingly recognize monitored smart homes with lower premiums.',
      'For most households, starting with a few high-impact devices - locks, plugs, and a central hub - offers the best return before scaling up to a full installation.',
    ],
  },
];
