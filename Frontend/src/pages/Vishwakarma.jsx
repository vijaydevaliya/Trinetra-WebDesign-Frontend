import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Home,
  Building2,
  Palette,
  HardHat,
  Search,
  Ruler,
  LayoutGrid,
  PenTool,
  Eye,
  ClipboardList,
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
  Layers,
  Gem,
  Settings2,
  Lightbulb,
  Sofa,
} from 'lucide-react';
import { CompanyPage } from '../components/company/CompanyPage';
import { BeforeAfterSlider } from '../components/company/BeforeAfterSlider';
import { MissionVisionValues } from '../components/company/MissionVisionValues';
import { PillList } from '../components/company/PillList';
import { FeatureCategories } from '../components/company/FeatureCategories';
import { ProcessSteps } from '../components/company/ProcessSteps';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SUBSIDIARIES } from '../data/companies';

const VISHWAKARMA_MISSION =
  'To design and deliver interiors that are visually refined, functionally considered, and built around how our clients actually live and work — coordinated from first concept through final handover.';

const VISHWAKARMA_VISION =
  'To be recognised as a dependable interior design and execution partner, trusted for clarity of process, quality of craftsmanship, and consistency from consultation to completion.';

const VISHWAKARMA_VALUES = [
  { title: 'Design Philosophy', desc: 'Every space is planned around function first, then shaped with material, light, and detail.' },
  { title: 'Design + Execution', desc: 'Design and execution are coordinated by one team, reducing handoff gaps and miscommunication.' },
  { title: 'Project Coordination', desc: 'Civil, carpentry, electrical, and finishing trades are scheduled and supervised as one connected plan.' },
  { title: 'Quality Focus', desc: 'Workmanship and materials are checked at each stage of execution, not only at final handover.' },
  { title: 'Client Collaboration', desc: 'Clients stay involved at every key decision point, from moodboards to material selection.' },
];

const WHY_VISHWAKARMA = [
  'One Point of Contact',
  'Design Before Construction',
  'Functional Space Planning',
  'Clear Project Scope',
  'Coordinated Execution',
  'Quality Monitoring',
  'Customized Solutions',
  'End-to-End Support',
];

const WHO_WE_SERVE = [
  'Homeowners',
  'Apartment & Villa Owners',
  'Commercial Property Owners',
  'Office Owners',
  'Retail Businesses',
  'Restaurants & Cafes',
  'Hospitality Businesses',
  'Clinics & Professional Spaces',
  'Property Developers & Builders',
  'Renovation & Remodeling Clients',
];

const FEATURE_CATEGORIES = [
  {
    title: 'Residential Interiors',
    icon: Home,
    items: [
      'Living room, dining, and foyer design',
      'Modular kitchens and bedroom interiors',
      'Wardrobe, storage, and puja room planning',
      'Kids room and home office design',
      'False ceiling and lighting layouts',
      'Custom furniture and TV units',
    ],
  },
  {
    title: 'Commercial Interiors',
    icon: Building2,
    items: [
      'Corporate offices and professional spaces',
      'Retail stores and showrooms',
      'Restaurants, cafes, and hospitality interiors',
      'Clinics and studio interiors',
      'Reception and workstation planning',
      'Brand-aligned interior identity',
    ],
  },
  {
    title: 'Design Services',
    icon: Palette,
    items: [
      'Interior consultation and space planning',
      'Concept development and moodboards',
      'Colour and material planning',
      '2D layouts and 3D visualisation',
      'Working drawings and furniture planning',
      'Lighting, electrical, and ceiling planning',
    ],
  },
  {
    title: 'Turnkey Execution',
    icon: HardHat,
    items: [
      'Civil work, carpentry, and modular furniture',
      'Electrical, plumbing, and false ceiling work',
      'Flooring, painting, and wall finishes',
      'Glass work, metal work, and hardware',
      'Wallpaper, curtains, and decor installation',
      'Final styling and handover',
    ],
  },
];

const MATERIALS_CATEGORIES = [
  {
    title: 'Wood & Boards',
    icon: Layers,
    items: ['Plywood', 'MDF', 'HDHMR', 'Veneer', 'Laminates'],
  },
  {
    title: 'Surface Finishes',
    icon: Sofa,
    items: ['Matte', 'Gloss', 'Textured', 'Wood finish', 'Stone finish'],
  },
  {
    title: 'Countertops',
    icon: Gem,
    items: ['Quartz', 'Granite', 'Marble', 'Solid surface'],
  },
  {
    title: 'Hardware',
    icon: Settings2,
    items: ['Hinges', 'Drawer systems', 'Channels', 'Handles', 'Lift-up mechanisms'],
  },
  {
    title: 'Lighting',
    icon: Lightbulb,
    items: ['Ambient', 'Task', 'Accent', 'Decorative'],
  },
  {
    title: 'Soft Furnishings',
    icon: Palette,
    items: ['Curtains', 'Upholstery', 'Rugs', 'Decorative fabrics'],
  },
];

const CONCEPT_TO_COMPLETION_STEPS = [
  { step: '01', title: 'Discover', desc: 'Understand requirements, lifestyle, business needs, preferences, and budget.', icon: Search },
  { step: '02', title: 'Measure', desc: 'Conduct site measurement and existing-space assessment.', icon: Ruler },
  { step: '03', title: 'Plan', desc: 'Develop functional space planning and layouts.', icon: LayoutGrid },
  { step: '04', title: 'Design', desc: 'Create concepts, moodboards, colours, and materials.', icon: PenTool },
  { step: '05', title: 'Visualize', desc: 'Develop realistic 3D renders and visual presentations.', icon: Eye },
  { step: '06', title: 'Finalize', desc: 'Prepare drawings, specifications, materials, and project scope.', icon: ClipboardList },
  { step: '07', title: 'Execute', desc: 'Coordinate site execution across multiple work categories.', icon: HardHat },
  { step: '08', title: 'Supervise', desc: 'Monitor progress, workmanship, and quality on site.', icon: ShieldCheck },
  { step: '09', title: 'Install', desc: 'Install furniture, lighting, fixtures, and finishing elements.', icon: PackageCheck },
  { step: '10', title: 'Handover', desc: 'Complete final inspection, corrections, and handover.', icon: CheckCircle2 },
];

const VISHWAKARMA_FAQ = [
  {
    question: 'How does the interior design process work?',
    answer: 'The process moves from consultation and space planning through concept design, 3D visualisation, material selection, and detailed drawings, before moving into execution and final handover.'
  },
  {
    question: 'Do you provide 3D designs?',
    answer: 'Yes. 3D visualisation and walkthroughs are used to review layouts, materials, and lighting before any execution work begins.'
  },
  {
    question: 'Do you handle turnkey execution?',
    answer: 'Yes. Civil work, carpentry, electrical, plumbing, false ceiling, flooring, painting, and finishing work are coordinated through one project team.'
  },
  {
    question: 'Can I hire Vishwakarma only for design?',
    answer: 'Yes. Design-only engagements are available, covering space planning, concept design, material selection, and drawings without execution.'
  },
  {
    question: 'Can Vishwakarma handle complete execution?',
    answer: 'Yes. Vishwakarma also takes on execution-only projects where design and drawings are provided by the client or their architect.'
  },
  {
    question: 'Do you work on residential and commercial projects?',
    answer: 'Yes. Projects span homes, offices, retail stores, restaurants and cafes, clinics, and other commercial spaces.'
  },
  {
    question: 'Can you work with an existing architect?',
    answer: 'Yes. Vishwakarma can coordinate directly with an existing architect or design consultant on both design and execution stages.'
  },
  {
    question: 'Can clients select their own materials?',
    answer: 'Yes. Clients are guided through moodboards and material options and can make selections at each stage of material planning.'
  },
  {
    question: 'Do you provide custom furniture?',
    answer: 'Yes. Wardrobes, TV units, beds, storage units, and other furniture are designed and built to fit the specific space and brief.'
  },
  {
    question: 'How is the project budget calculated?',
    answer: 'Budgets are built from the finalised scope, materials, and a detailed bill of quantities, shared with the client before execution begins.'
  },
  {
    question: 'How long does an interior project take?',
    answer: 'Timelines depend on project size, scope, and site conditions, and are communicated once the design and execution plan are finalised.'
  },
  {
    question: 'Do you handle renovation?',
    answer: 'Yes. Renovation and remodeling services cover kitchens, bathrooms, full homes, offices, and retail spaces.'
  },
  {
    question: 'Do you provide site supervision?',
    answer: 'Yes. Site progress, workmanship, and quality are monitored through every stage of execution.'
  },
  {
    question: 'How can I start a project?',
    answer: 'Start by booking a consultation. Requirements, space, and budget are discussed first, followed by site measurement and a proposed design and execution plan.'
  },
];

export const Vishwakarma = () => {
  const company = SUBSIDIARIES.find((s) => s.id === 'vishwakarma');

  if (!company) return null;

  const customWidget = (
    <div className="space-y-20">
      {/* 1. Mission, Vision & Approach */}
      <div>
        <SectionHeading
          badge="About Vishwakarma"
          title="Our Approach"
          subtitle="Design and execution, coordinated as one connected process."
        />
        <div className="mt-12">
          <MissionVisionValues mission={VISHWAKARMA_MISSION} vision={VISHWAKARMA_VISION} values={VISHWAKARMA_VALUES} />
        </div>
      </div>

      {/* 2. Why Vishwakarma */}
      <div>
        <SectionHeading
          badge="Differentiators"
          title="Why Vishwakarma?"
          subtitle="What clients can expect when working with our design and execution team."
        />
        <div className="mt-10">
          <PillList items={WHY_VISHWAKARMA} />
        </div>
      </div>

      {/* 3. Who We Serve */}
      <div>
        <SectionHeading
          badge="Spaces We Design For"
          title="Who We Serve"
          subtitle="Residential, commercial, and hospitality spaces of every scale."
        />
        <div className="mt-10">
          <PillList items={WHO_WE_SERVE} />
        </div>
      </div>

      {/* 4. Capabilities by Category */}
      <div>
        <SectionHeading
          badge="Complete Capabilities"
          title="Interior Design & Turnkey Capabilities"
          subtitle="From individual rooms to complete residential and commercial fit-outs."
        />
        <div className="mt-12">
          <FeatureCategories categories={FEATURE_CATEGORIES} />
        </div>
      </div>

      {/* 5. From Concept to Completion */}
      <div>
        <SectionHeading
          badge="Our Process"
          title="From Concept to Completion"
          subtitle="A structured 10-step journey from first consultation to final handover."
        />
        <div className="mt-10">
          <ProcessSteps steps={CONCEPT_TO_COMPLETION_STEPS} complianceTag={null} />
        </div>
      </div>

      {/* 6. Materials & Finishes */}
      <div>
        <SectionHeading
          badge="Materials & Finishes"
          title="Materials We Work With"
          subtitle="Boards, surfaces, countertops, hardware, lighting, and soft furnishings selected to suit the project."
        />
        <div className="mt-12">
          <FeatureCategories categories={MATERIALS_CATEGORIES} />
        </div>
      </div>

      {/* 7. Before / After Reveal */}
      <div>
        <BeforeAfterSlider />
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Vishwakarma by Trinetra — Interior Design & Turnkey Execution</title>
        <meta
          name="description"
          content="Vishwakarma creates thoughtfully designed residential and commercial interiors with complete turnkey execution, from concept and visualization to final handover."
        />
      </Helmet>

      <CompanyPage
        company={company}
        customWidget={customWidget}
        faqItems={VISHWAKARMA_FAQ}
      />
    </>
  );
};
