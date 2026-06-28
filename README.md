# MN Animat — Animated Interactive 3D Website

Responsive React/Vite website for MN Animat, using the supplied motorcycle model, animated exploded view and sequential component presentation.

## Included

- Responsive desktop, tablet and mobile layout
- Animated hero, sections and service cards
- Interactive motorcycle viewer with orbit, zoom and automatic rotation
- Camera controls: full, front, side, rear and top views
- Interactive motorcycle component hotspots
- **Present parts** animation with synchronized component labels
- **Explode motorcycle** animation
- **Assemble motorcycle** animation
- Spline React integration ready for a published `.splinecode` scene
- Local animated GLB, so the experience works without Spline
- Services with starting prices
- WhatsApp quote form using `+55 (75) 98232-1124`
- Contact email `mnanimat@gmail.com`
- Vercel configuration
- Blender animation helper script

## 3D model used by the website

The browser version uses:

```text
public/assets/moto-funcional4-animada.glb
```

Validated content:

- 281 nodes/objects
- 160 meshes
- 160 nodes containing renderable meshes
- 9 materials
- 4 embedded images
- 3 animations

Animations:

```text
Exploded_View
Assemble_View
Parts_Presentation
```

The original `.blend` file is not loaded directly by the browser. It remains the editable Blender source. The website uses the exported GLB because GLB/GLTF is designed for real-time web delivery.

## Run the website

```bash
npm install
npm run dev
```

Open the local address displayed by Vite.

Production build:

```bash
npm run build
npm run preview
```

## Animation controls

The controls are implemented in:

```text
src/components/InteractiveStage.jsx
```

Main actions:

- **Present parts**: highlights ten major motorcycle component groups in sequence.
- **Explode motorcycle**: separates the individual meshes and keeps the exploded pose.
- **Assemble motorcycle**: returns all pieces to their original positions.
- **Auto rotate**: starts or pauses automatic rotation.

The component presentation timeline is synchronized with the labels shown over the viewer.

## Blender helper script

A Blender Python script is included at:

```text
tools/blender_exploded_animation.py
```

Use it in a copy of the Blender project:

1. Open the `.blend` file.
2. Open **Scripting**.
3. Create a new text block.
4. Paste or open the script.
5. Click **Run Script**.
6. Review the generated timeline.
7. Export as GLB with **Animation** enabled.

The website already includes an animated GLB, so running the Blender script is optional. It is provided for editing and regenerating the animation inside Blender.

## Optional Spline connection

The website can switch from the local GLB to a published Spline scene.

1. Import `public/assets/moto-funcional4-animada.glb` into Spline.
2. Configure the camera, lights and interactions.
3. Select **Export → Code → React**.
4. Copy the production URL ending in `scene.splinecode`.
5. Open `public/config.js` and paste the URL:

```js
window.MN_ANIMAT_CONFIG = {
  splineSceneUrl: "https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode"
};
```

When the URL is empty, the website uses the included animated GLB.

## Optional Spline event bridge

To reproduce the HTML controls inside Spline, create invisible helper objects with these names:

```text
ViewFull
ViewFront
ViewSide
ViewRear
ViewTop
AutoRotateOn
AutoRotateOff
HotspotEngine
HotspotTank
HotspotFrontWheel
HotspotRearWheel
HotspotSuspension
HotspotSeat
ExplodeMotorcycle
AssembleMotorcycle
PresentMotorcycleParts
```

Add a **Mouse Down** event to each object and connect it to the matching state, camera or animation in Spline.

## Edit content

Main page:

```text
src/App.jsx
```

Services, prices, workflow, portfolio and hotspots:

```text
src/data/content.js
```

Design and responsive breakpoints:

```text
src/styles.css
```

3D viewer and animation buttons:

```text
src/components/InteractiveStage.jsx
```

## Contact details

WhatsApp:

```text
+55 (75) 98232-1124
```

Email:

```text
mnanimat@gmail.com
```

Change the WhatsApp number in `src/App.jsx`:

```js
const whatsappNumber = '5575982321124';
```

## Deploy to Vercel

1. Upload the project files to GitHub.
2. In Vercel, choose **Add New → Project**.
3. Import the repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Click **Deploy**.

The Spline environment variable is optional because the animated GLB works locally from the repository.

## Performance notes

The animated GLB is approximately 44 MB. For a faster mobile experience, a future optimization pass should include polygon reduction, Draco or Meshopt geometry compression and KTX2 textures. The current version prioritizes preserving the submitted geometry and materials.

## Main files

```text
public/assets/moto-funcional4-animada.glb  Main animated motorcycle
public/assets/motorcycle-fallback-original.glb  Automatic backup model
public/assets/logo-mn.svg                  Optimized MN logo
public/assets/logo-mn-original.svg         Original supplied SVG
public/config.js                           Runtime Spline URL
src/components/InteractiveStage.jsx       Viewer and animation controls
tools/blender_exploded_animation.py        Blender animation generator
VALIDACAO-MODELO-ANIMADO.txt               Technical validation report
vercel.json                                Vercel configuration
```

## Service starting prices

- 3D Modeling: R$ 900
- 3D Animation: R$ 1,800
- Product Visualization: R$ 800
- Interactive 3D Websites: R$ 2,500
- Rendering: R$ 350 per image
- Rigging: R$ 1,000
- Social Media Animation: R$ 700
- Custom Projects: R$ 1,500

Prices are starting estimates and may vary according to scope, complexity, revisions, licensing and delivery format.
