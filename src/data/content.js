import {
  Box,
  Clapperboard,
  Cuboid,
  Film,
  Globe2,
  Layers3,
  Move3D,
  Sparkles,
  Wrench,
} from 'lucide-react';

export const services = [
  {
    icon: Cuboid,
    title: '3D Modeling',
    text: 'Characters, products, vehicles, environments, technical objects and custom assets built for your project.',
    price: 'Starting at R$ 900',
  },
  {
    icon: Film,
    title: '3D Animation',
    text: 'Dynamic animation for advertising, social media, presentations, films, games and product demonstrations.',
    price: 'Starting at R$ 1,800',
  },
  {
    icon: Box,
    title: 'Product Visualization',
    text: 'High-impact 360° product experiences with materials, lighting, colors and interactive details.',
    price: 'Starting at R$ 800',
  },
  {
    icon: Globe2,
    title: 'Interactive 3D Websites',
    text: 'Immersive 3D models integrated into landing pages, portfolios, catalogs and institutional websites.',
    price: 'Starting at R$ 2,500',
  },
  {
    icon: Sparkles,
    title: 'Rendering',
    text: 'Realistic or stylized images and videos designed for presentations, campaigns and commercial promotion.',
    price: 'Starting at R$ 350 per image',
  },
  {
    icon: Move3D,
    title: 'Rigging',
    text: 'Characters, vehicles, machines and objects prepared for expressive, reliable movement and animation.',
    price: 'Starting at R$ 1,000',
  },
  {
    icon: Clapperboard,
    title: 'Social Media Animation',
    text: 'Promotional content, Reels, Shorts, ads and product reveals made to capture attention quickly.',
    price: 'Starting at R$ 700',
  },
  {
    icon: Wrench,
    title: 'Custom Projects',
    text: 'Tailored 3D solutions developed around the specific goals, audience and technical needs of each client.',
    price: 'Starting at R$ 1,500',
  },
];

export const processSteps = [
  ['01', 'Planning', 'Idea analysis, references, dimensions, technical requirements and project goals.'],
  ['02', '3D Modeling', 'Digital construction of shapes, parts, details and the complete structure.'],
  ['03', 'Materials & Textures', 'Colors, surfaces, reflections, textures and visual finishes.'],
  ['04', 'Rigging & Animation', 'Preparation of moving parts and creation of realistic or stylized motion.'],
  ['05', 'Rendering', 'Professional images and videos using lighting, cameras and visual effects.'],
  ['06', 'Interactive Experience', 'Integration into websites, portfolios, presentations and product experiences.'],
];

export const motorcycleParts = [
  {
    id: 'engine',
    label: 'Engine',
    x: 48,
    y: 58,
    orbit: '35deg 72deg 70%',
    splineEvent: 'HotspotEngine',
    description: 'The mechanical core responsible for generating the power required to move the motorcycle.',
  },
  {
    id: 'tank',
    label: 'Fuel Tank',
    x: 49,
    y: 39,
    orbit: '25deg 68deg 72%',
    splineEvent: 'HotspotTank',
    description: 'A defining structural element that contributes to both function and the motorcycle’s visual identity.',
  },
  {
    id: 'front-wheel',
    label: 'Front Wheel',
    x: 73,
    y: 67,
    orbit: '-30deg 78deg 78%',
    splineEvent: 'HotspotFrontWheel',
    description: 'The front contact point, engineered for direction, stability and precise road response.',
  },
  {
    id: 'rear-wheel',
    label: 'Rear Wheel',
    x: 25,
    y: 68,
    orbit: '120deg 78deg 78%',
    splineEvent: 'HotspotRearWheel',
    description: 'The driven wheel that transfers the motorcycle’s power to the road surface.',
  },
  {
    id: 'suspension',
    label: 'Front Suspension',
    x: 69,
    y: 45,
    orbit: '-20deg 70deg 72%',
    splineEvent: 'HotspotSuspension',
    description: 'A system designed to absorb impacts and improve control, comfort and stability.',
  },
  {
    id: 'seat',
    label: 'Seat',
    x: 35,
    y: 36,
    orbit: '75deg 65deg 72%',
    splineEvent: 'HotspotSeat',
    description: 'The ergonomic support area designed for rider comfort and visual continuity.',
  },
];

export const views = [
  { id: 'full', label: 'Full View', orbit: '35deg 72deg 105%', splineEvent: 'ViewFull' },
  { id: 'front', label: 'Front', orbit: '0deg 75deg 105%', splineEvent: 'ViewFront' },
  { id: 'side', label: 'Side', orbit: '90deg 75deg 105%', splineEvent: 'ViewSide' },
  { id: 'rear', label: 'Rear', orbit: '180deg 75deg 105%', splineEvent: 'ViewRear' },
  { id: 'top', label: 'Top', orbit: '0deg 5deg 120%', splineEvent: 'ViewTop' },
];

export const portfolio = [
  ['Character Animation', 'Animation', 'Expressive motion and cinematic character performance.'],
  ['Product Visualization', 'Commercial 3D', 'Premium presentation focused on materials and product value.'],
  ['Vehicle Modeling', 'Hard Surface', 'Detailed vehicles created for visualization and animation.'],
  ['3D Advertising', 'Campaign', 'Short-form visual experiences designed to stop the scroll.'],
  ['Interactive Environment', 'Web 3D', 'Explorable digital spaces that invite audience participation.'],
  ['Custom 3D Project', 'Tailored Solution', 'A flexible production pipeline shaped around your objective.'],
];
