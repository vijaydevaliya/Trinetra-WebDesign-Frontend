export const PARENT_COMPANY = {
  id: 'trinetra',
  name: 'Trinetra Technoworld Pvt Ltd',
  shortName: 'Trinetra Technoworld',
  tagline: 'One Vision. Three Specialisations.',
  subTagline: 'Automation at the core, expertise at the edge.',
  description: 'Trinetra Technoworld Pvt Ltd is a multi-disciplinary technology and engineering group powering modern infrastructure, intelligent living spaces, bespoke architectural interiors, and advanced construction materials.',
  logo: '/logos/trinetra-technoworld.jpg',
  established: 2018,
  stats: [
    { label: 'Subsidiaries', value: 3, suffix: '' },
    { label: 'Projects Delivered', value: 1250, suffix: '+' },
    { label: 'Cities Served', value: 45, suffix: '+' },
    { label: 'Years of Expertise', value: 8, suffix: '+' }
  ]
};

export const SUBSIDIARIES = [
  {
    id: 'vasuki',
    name: 'Vasuki',
    fullName: 'Vasuki by Trinetra',
    tagline: 'Smarter living for every society.',
    positioning: 'End-to-end housing-society and apartment-complex management platform powered by smart automation.',
    route: '/vasuki',
    logo: '/logos/vasuki.jpg',
    color: '#2B9BE0',
    heroBadge: 'Society Management System',
    description: 'Vasuki simplifies gated community operations, automating maintenance collections, digital gate-pass verification, accounting, and resident engagement in one unified mobile and web ecosystem.',
    iconName: 'Building2',
    services: [
      { title: 'Resident & Unit Records', desc: 'Centralised digital directory with ownership, tenant, and vehicle verification.', icon: 'Users' },
      { title: 'Maintenance & Online Collections', desc: 'Automated invoice generation, payment gateway integration, and auto-reconciliation.', icon: 'Receipt' },
      { title: 'Complaint & Ticket Management', desc: 'SLA-tracked helpdesk dispatching technicians with real-time status updates.', icon: 'ShieldCheck' },
      { title: 'Visitor & Gate-Pass Management', desc: 'QR-code verification, staff attendance tracking, and instant resident alerts.', icon: 'Bell' },
      { title: 'Notice Board & Announcements', desc: 'Instant push notifications, SMS alerts, and official society announcements.', icon: 'CalendarCheck' },
      { title: 'Amenity & Facility Booking', desc: 'Slot management for clubhouses, sports courts, and common halls with fee collection.', icon: 'Building2' },
      { title: 'Society Accounting & Audits', desc: 'Double-entry ledger accounting, expense reporting, and auditor-ready export files.', icon: 'Receipt' },
      { title: 'Committee Dashboards', desc: 'Granular analytics on receivables, expenses, vendor contracts, and resident approval queues.', icon: 'Users' }
    ],
    features: [
      'Automated WhatsApp & Email payment reminders',
      'Integrated UPI and NetBanking payment gateway',
      'Guard app with offline sync capability',
      '100% GDPR & data privacy compliant storage'
    ]
  },
  {
    id: 'vishwakarma',
    name: 'Vishwakarma',
    fullName: 'Vishwakarma by Trinetra',
    tagline: 'Spaces designed with intent.',
    positioning: 'Full-service interior design and turnkey execution for residential, commercial, and retail environments.',
    route: '/vishwakarma',
    logo: '/logos/vishwakarma.jpg',
    color: '#1565C0',
    heroBadge: 'Interior Design & Turnkey Execution',
    description: 'Vishwakarma combines architectural precision, 3D spatial visualization, and master craftsmanship to transform raw structures into luxury homes, high-performance office spaces, and boutique retail stores.',
    iconName: 'Sofa',
    services: [
      { title: 'Space Planning & Layouts', desc: 'Ergonomic 2D floorplan optimization for maximum light, workflow, and utility.', icon: 'LayoutGrid' },
      { title: '3D Visualisation & Walkthroughs', desc: 'Photorealistic render previews and immersive VR walkthroughs before construction.', icon: 'Lightbulb' },
      { title: 'Modular Kitchens & Wardrobes', desc: 'Precision engineered factory-finished cabinetry using marine-grade plywood.', icon: 'Ruler' },
      { title: 'False Ceiling & Lighting Design', desc: 'Ambient, task, and architectural lighting layouts with smart dimming integration.', icon: 'Lightbulb' },
      { title: 'Furniture & Custom Carpentry', desc: 'Handcrafted loose furniture, accent panelling, and custom metalwork.', icon: 'Sofa' },
      { title: 'Turnkey Project Execution', desc: 'End-to-end civil, electrical, plumbing, HVAC, and decor management with single point accountability.', icon: 'HardHat' },
      { title: 'Material & Finish Consultation', desc: 'Curated moodboards covering marbles, veneers, laminates, and eco-paints.', icon: 'PaintRoller' },
      { title: 'Commercial & Office Fit-Outs', desc: 'Corporate interiors optimized for acoustic comfort, brand identity, and employee productivity.', icon: 'LayoutGrid' }
    ],
    features: [
      'Fixed-timeline completion guarantee with daily photo updates',
      '10-year warranty on modular woodworks',
      'Transparent itemised BOQ (Bill of Quantities)',
      'In-house team of architects and project managers'
    ]
  },
  {
    id: 'tribond',
    name: 'Tribond',
    fullName: 'Tribond by Trinetra',
    tagline: 'Bonded to last.',
    positioning: 'Manufacturer of high-performance construction-grade tile adhesives, tile grouts, and waterproofing solutions.',
    route: '/tribond',
    logo: '/logos/tribond.jpg',
    color: '#0B3A8C',
    heroBadge: 'Construction Chemicals & Adhesives',
    description: 'Tribond formulates engineered polymer-modified mortars, epoxies, and tile adhesives engineered to withstand thermal expansion, structural vibrations, and moisture in heavy-duty commercial and residential installations.',
    iconName: 'Package',
    products: [
      { title: 'Tribond UltraFix T1', category: 'Wall & Floor Tile Adhesive', specs: 'Open Time: 20 min | Coverage: 50-60 sq ft/20kg', badge: 'Type 1 Standard', desc: 'Polymer-modified cementitious tile adhesive for interior ceramic and small ceramic floor tiles.' },
      { title: 'Tribond ProGrip T2', category: 'Vitrified & Large Format Adhesive', specs: 'Open Time: 30 min | Coverage: 45-55 sq ft/20kg', badge: 'Type 2 High Bond', desc: 'High-strength adhesive designed for vitrified tiles, granite, and exterior wall cladding.' },
      { title: 'Tribond FlexMax T3', category: 'Tile-on-Tile & Marble Adhesive', specs: 'Open Time: 35 min | Coverage: 40-50 sq ft/20kg', badge: 'Type 3 Flexible', desc: 'Deformable polymer adhesive formulated for tile-on-tile applications, glass mosaics, and natural stone.' },
      { title: 'Tribond EpoxyGrout 300', category: 'Stainproof Epoxy Grout', specs: 'Pot Life: 45 min | Chemical Resistant', badge: '100% Solid Epoxy', desc: 'Waterproof, chemical-resistant 3-part epoxy grout for swimming pools, kitchens, and hospitals.' },
      { title: 'Tribond HydroShield WP', category: 'Waterproofing Compound', specs: 'Elongation: >200% | UV Resistant', badge: 'Elastomeric Liquid', desc: 'High-build acrylic waterproofing membrane for terraces, sunken slabs, and wet areas.' },
      { title: 'Tribond WallPutty Smooth', category: 'White Cement Wall Putty', specs: 'Coverage: 18-22 sq ft/kg (2 coats)', badge: 'White Cement Base', desc: 'Water-resistant base coat delivering ultra-smooth finish prior to interior and exterior painting.' }
    ],
    services: [
      { title: 'Wall & Floor Tile Adhesives', desc: 'Zero-sag formulas engineered for high vertical slip resistance.', icon: 'Layers' },
      { title: 'Large Format Vitrified Adhesives', desc: 'Flexibility to absorb substrate thermal stress without tile debonding.', icon: 'Package' },
      { title: 'Epoxy & Cementitious Grouts', desc: 'Anti-bacterial, non-shrink joint fillers in over 24 color shades.', icon: 'Droplets' },
      { title: 'Waterproofing & Mortars', desc: 'Monolithic liquid-applied membranes and dry-mix block mortars.', icon: 'Beaker' }
    ],
    features: [
      'ISO 9001:2015 certified manufacturing plant',
      'Exceeds IS 15477:2019 Type 1, 2 & 3 national standards',
      'Zero-VOC eco-friendly formulations',
      'Dedicated technical field lab support'
    ]
  }
];

export const ALL_COMPANIES = [PARENT_COMPANY, ...SUBSIDIARIES];
