import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { TribondProduct } from '../models/TribondProduct.js';

const TRIBOND_PRODUCTS = [
  {
    name: 'TRI T1',
    type: 'Type 1 / C1T',
    standard: 'IS 15477:2019 & EN 12004',
    areaOfApplication: [
      'Designed for tiles with higher porosity levels (>3%)',
      'Perfect for ceramic & porcelain wall and floor tiles',
    ],
    benefits: [
      'Ready-to-use mix — simply add water on-site',
      'Advanced waterproofing protection',
      'Crack-resistant with minimal shrinkage',
      'Stronger bonding than traditional cement mortar',
      'Flexible performance to handle temperature variations',
      'Faster application, boosting productivity',
    ],
    compliance: [
      'ANSI A118.4 shear bond strength EN/ISO with a C1T classification',
      'Exceeds IS 15477:2019 – Type 1 TS1 Adhesive standards',
    ],
    precautions: [
      'Always add the powder to water; do not add water to the powder',
      'Not suitable for wall tiling or tile-on-tile applications',
      'Do not exceed the recommended water quantity',
      'Ensure the substrate is strong and in sound condition for floor tiling',
      'Avoid application in damp conditions',
      'Not recommended for use on painted surfaces, wood, metal, or gypsum substrates',
    ],
    coverage: '25-30 sq. ft. for a 20 kg bag at 3-5 mm thickness. Coverage may vary upon notch trowel size and site condition.',
  },
  {
    name: 'TRI T2',
    type: 'Type 2 / C2T',
    standard: 'IS 15477:2019 & EN 12004',
    areaOfApplication: [
      'Ideal for fixing medium to large format ceramic tiles, vitrified tiles, marble, and natural stones on both floors and walls',
      'Suitable for tiles with water absorption (porosity) up to 3% or less',
      'Recommended for tile-on-tile applications, including vitrified tiles for both interior and exterior surfaces',
    ],
    benefits: [
      'Smooth and easy application with excellent workability',
      'Strong bonding strength with non-shrink characteristics',
      'Superior water resistance for durable performance',
    ],
    compliance: [
      'ANSI A118.4 shear bond strength EN/ISO with a C2T classification',
      'Exceeds IS 15477:2019 – Type 2 TS1 Adhesive standards',
    ],
    precautions: [
      'Always add powder to water; do not add water into the powder',
      'Avoid adding more water than the recommended quantity',
      'Ensure the substrate is strong and stable before tiling',
      'Do not apply in damp or wet conditions',
      'Not suitable for application on painted surfaces, wood, metal, or gypsum boards',
    ],
    coverage: '25-30 sq. ft. per 20 kg bag at 3-5 mm thickness. Coverage may vary depending on notch trowel size and site condition.',
  },
  {
    name: 'TRI T3',
    type: 'Type 3 / C2TE',
    standard: 'IS 15477:2019 & EN 12004',
    areaOfApplication: [
      'Suitable for fixing tiles with apparent porosity of 3% or less in both indoor and outdoor areas',
      'Can be used for over-tiling on existing tiles in indoor applications',
      'Recommended for high-performance areas such as swimming pools, industrial zones, and wall and floor facades',
    ],
    benefits: [
      'Excellent performance with no vertical slipping',
      'Can be applied in thicknesses ranging from 10 to 12 mm',
      'Frost-resistant',
    ],
    compliance: [
      'Meets ANSI A118.4 shear bond strength requirements and EN/ISO standards with a C2TE classification',
      'Surpasses IS 15477:2019 Type 3 TS1 adhesive specifications',
    ],
    precautions: [
      'Always add powder to water, never the reverse',
      'Not recommended for wall tiling and tile-on-tile applications',
      'Do not add excess water beyond the recommended quantity',
      'Ensure the surface is strong and stable before application',
      'Avoid use in damp conditions',
      'Do not apply on substrates such as paint, wood, metal, or gypsum',
    ],
    coverage: '25-30 sq. ft. per 20 kg bag at 3-5 mm thickness, depending on the surface condition and the notch trowel size used during application.',
  },
  {
    name: 'TRI T4',
    type: 'Type 4 / C2TES1',
    standard: 'IS 15477:2019 & EN 12004',
    areaOfApplication: [
      'Ideal for fixing a wide range of tiles including mosaic and large format elevation tiles on walls and floors in both indoor and outdoor environments',
      'Suitable for use in wet areas such as swimming pools and other high-moisture zones',
    ],
    benefits: [
      'Simple and convenient application',
      'Suitable for mosaic tiles and large format elevation tiles',
      'Non-shrink formulation ensures stability',
    ],
    compliance: [
      'Complies with ANSI A118.4 shear bond strength and EN/ISO standards with a C2TES1 classification',
      'Exceeds the requirements of IS 15477:2019 Type 4 TS1 adhesive standards',
    ],
    precautions: [
      'Always pour powder into water; do not add water to the powder',
      'Not suitable for wall tiling and tile-on-tile applications',
      'Avoid adding more water than recommended',
      'Ensure the surface is strong and stable before application',
      'Do not apply in wet or damp conditions',
      'Not recommended for application on painted surfaces, wood, metal, or gypsum boards',
    ],
    coverage: '25-30 sq. ft. per 20 kg bag at 3-5 mm thickness, though actual coverage can differ based on the substrate condition and the trowel size used during application.',
  },
];

const run = async () => {
  await connectDB();

  const count = await TribondProduct.countDocuments();
  if (count > 0) {
    console.log(`Tribond products already seeded (${count} found), skipping.`);
  } else {
    await TribondProduct.insertMany(TRIBOND_PRODUCTS);
    console.log(`Seeded ${TRIBOND_PRODUCTS.length} Tribond products.`);
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
