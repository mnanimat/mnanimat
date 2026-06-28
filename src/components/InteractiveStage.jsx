import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  Box,
  Expand,
  LoaderCircle,
  Move3D,
  Pause,
  Play,
  RotateCcw,
  X,
} from 'lucide-react';
import { motorcycleParts, views } from '../data/content';

const Spline = lazy(() => import('@splinetool/react-spline'));
const runtimeSplineSceneUrl = typeof window !== 'undefined'
  ? (window.MN_ANIMAT_CONFIG?.splineSceneUrl || '').trim()
  : '';
const splineSceneUrl = runtimeSplineSceneUrl || (import.meta.env.VITE_SPLINE_SCENE_URL || '').trim();

const presentationTimeline = [
  { label: 'Chassis, fuel tank and seat', start: 0.45, end: 1.60 },
  { label: 'Wiring, spring and mechanical components', start: 1.80, end: 2.95 },
  { label: 'Front suspension and handlebars', start: 3.15, end: 4.30 },
  { label: 'Brake system and controls', start: 4.50, end: 5.65 },
  { label: 'Headlight and lighting', start: 5.85, end: 7.00 },
  { label: 'Rear suspension', start: 7.20, end: 8.35 },
  { label: 'Wheels and tires', start: 8.55, end: 9.70 },
  { label: 'Rims and brake discs', start: 9.90, end: 11.05 },
  { label: 'Fenders and plates', start: 11.25, end: 12.40 },
  { label: 'MN logo and fasteners', start: 12.60, end: 13.75 },
];

export default function InteractiveStage({ compact = false }) {
  const disable3D = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('no3d');
  const stageRef = useRef(null);
  const modelRef = useRef(null);
  const splineRef = useRef(null);
  const activeAnimationRef = useRef('');
  const [loaded, setLoaded] = useState(disable3D);
  const [loadError, setLoadError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(compact && !disable3D);
  const [selectedPart, setSelectedPart] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeView, setActiveView] = useState('full');
  const [modelSource, setModelSource] = useState('/assets/moto-funcional4-animada.glb');
  const [usingFallbackModel, setUsingFallbackModel] = useState(false);
  const [availableAnimations, setAvailableAnimations] = useState([]);
  const [activeAnimation, setActiveAnimation] = useState('');
  const [presentationLabel, setPresentationLabel] = useState('');
  const [modelExploded, setModelExploded] = useState(false);

  const usingSpline = Boolean(splineSceneUrl);

  useEffect(() => {
    if (disable3D || compact || shouldLoad || !stageRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [compact, disable3D, shouldLoad]);

  useEffect(() => {
    if (shouldLoad && !usingSpline) {
      import('@google/model-viewer');
    }
  }, [shouldLoad, usingSpline]);

  useEffect(() => {
    if (!shouldLoad || usingSpline || !modelRef.current) return undefined;
    const model = modelRef.current;
    let active = true;

    const activateFallbackModel = (reason) => {
      if (usingFallbackModel) {
        setLoadError(true);
        setLoaded(true);
        return;
      }
      console.warn(`${reason} Loading the original motorcycle backup.`);
      setLoadError(false);
      setLoaded(false);
      setUsingFallbackModel(true);
      setModelSource('/assets/motorcycle-fallback-original.glb');
      setAvailableAnimations([]);
    };

    const handleLoad = () => {
      let dimensions;
      try {
        dimensions = model.getDimensions?.();
      } catch {
        dimensions = undefined;
      }

      const values = dimensions ? [dimensions.x, dimensions.y, dimensions.z] : [];
      const hasRenderableGeometry = values.length === 0
        || values.some((value) => Number.isFinite(value) && Math.abs(value) > 0.0001);

      if (!hasRenderableGeometry) {
        activateFallbackModel('The uploaded GLB has no renderable geometry.');
        return;
      }

      setLoadError(false);
      setAvailableAnimations(Array.from(model.availableAnimations || []));
      setLoaded(true);
    };

    const handleError = () => {
      activateFallbackModel('The uploaded GLB could not be loaded.');
    };

    const handleTimeUpdate = () => {
      if (activeAnimationRef.current !== 'Parts_Presentation') return;
      const currentTime = Number(model.currentTime || 0);
      const currentPart = presentationTimeline.find(
        (item) => currentTime >= item.start && currentTime <= item.end,
      );
      setPresentationLabel(currentPart?.label || 'Preparing the next component');
    };

    const handleFinished = () => {
      const finishedAnimation = activeAnimationRef.current;
      activeAnimationRef.current = '';
      setActiveAnimation('');
      setPresentationLabel('');

      if (finishedAnimation === 'Exploded_View') {
        setModelExploded(true);
        return;
      }

      if (finishedAnimation === 'Assemble_View' || finishedAnimation === 'Parts_Presentation') {
        setModelExploded(false);
        setAutoRotate(true);
        model.autoRotate = true;
      }
    };

    model.addEventListener('load', handleLoad);
    model.addEventListener('error', handleError);
    model.addEventListener('timeupdate', handleTimeUpdate);
    model.addEventListener('finished', handleFinished);

    customElements.whenDefined('model-viewer').then(() => {
      if (!active) return;
      model.autoRotate = autoRotate;
      model.cameraControls = true;
      if (model.loaded) handleLoad();
    });

    return () => {
      active = false;
      model.removeEventListener('load', handleLoad);
      model.removeEventListener('error', handleError);
      model.removeEventListener('timeupdate', handleTimeUpdate);
      model.removeEventListener('finished', handleFinished);
    };
  }, [autoRotate, usingSpline, shouldLoad, usingFallbackModel, modelSource]);

  useEffect(() => {
    if (!usingSpline && modelRef.current) {
      const model = modelRef.current;
      customElements.whenDefined('model-viewer').then(() => {
        model.autoRotate = autoRotate;
      });
    }
    if (usingSpline && splineRef.current) {
      const eventName = autoRotate ? 'AutoRotateOn' : 'AutoRotateOff';
      try {
        splineRef.current.emitEvent('mouseDown', eventName);
      } catch {
        // The scene remains usable before optional event bridge objects are added.
      }
    }
  }, [autoRotate, usingSpline]);

  const hasAnimation = (name) => usingSpline || availableAnimations.includes(name);

  const playAnimation = async (name) => {
    setSelectedPart(null);
    setAutoRotate(false);
    setPresentationLabel(name === 'Parts_Presentation' ? 'Preparing the first component' : '');
    setActiveAnimation(name);
    activeAnimationRef.current = name;

    if (usingSpline && splineRef.current) {
      const splineEvents = {
        Exploded_View: 'ExplodeMotorcycle',
        Assemble_View: 'AssembleMotorcycle',
        Parts_Presentation: 'PresentMotorcycleParts',
      };
      try {
        splineRef.current.emitEvent('mouseDown', splineEvents[name]);
      } catch {
        setActiveAnimation('');
        activeAnimationRef.current = '';
      }
      return;
    }

    const model = modelRef.current;
    if (!model || !availableAnimations.includes(name)) {
      setActiveAnimation('');
      activeAnimationRef.current = '';
      return;
    }

    try {
      model.autoRotate = false;
      model.pause?.();
      model.animationName = name;
      await model.updateComplete;
      model.currentTime = 0;
      model.play({ repetitions: 1 });
    } catch (error) {
      console.warn(`Could not play ${name}.`, error);
      setActiveAnimation('');
      activeAnimationRef.current = '';
      setPresentationLabel('');
    }
  };

  const moveCamera = (view) => {
    setActiveView(view.id);
    setSelectedPart(null);
    if (usingSpline && splineRef.current) {
      try {
        splineRef.current.emitEvent('mouseDown', view.splineEvent);
      } catch {
        // Optional Spline event bridge; documented in README.
      }
      return;
    }
    if (modelRef.current) {
      modelRef.current.cameraOrbit = view.orbit;
      modelRef.current.jumpCameraToGoal?.();
    }
  };

  const selectPart = (part) => {
    setSelectedPart(part);
    setAutoRotate(false);
    if (usingSpline && splineRef.current) {
      try {
        splineRef.current.emitEvent('mouseDown', part.splineEvent);
      } catch {
        // Optional Spline event bridge; documented in README.
      }
      return;
    }
    if (modelRef.current) {
      modelRef.current.cameraOrbit = part.orbit;
      modelRef.current.jumpCameraToGoal?.();
    }
  };

  const resetView = () => {
    moveCamera(views[0]);
    if (modelExploded || activeAnimationRef.current) {
      playAnimation('Assemble_View');
    } else {
      setAutoRotate(true);
    }
  };

  const enterFullscreen = async () => {
    try {
      await stageRef.current?.requestFullscreen?.();
    } catch {
      // Fullscreen can be blocked by browser policy; the stage remains usable.
    }
  };

  const handleSplineLoad = (app) => {
    splineRef.current = app;
    setLoaded(true);
  };

  return (
    <div ref={stageRef} className={`interactive-stage ${compact ? 'interactive-stage--compact' : ''}`}>
      <div className="stage-glow stage-glow--one" />
      <div className="stage-glow stage-glow--two" />
      <div className="stage-grid" />

      <div className="stage-canvas" aria-label="Interactive 3D motorcycle viewer">
        {disable3D && (
          <div className="stage-static-preview">
            <img src="/assets/logo-mn.svg" alt="MN Animat" />
            <span>Interactive 3D Experience</span>
          </div>
        )}
        {shouldLoad && (usingSpline ? (
          <Suspense fallback={null}>
            <Spline scene={splineSceneUrl} onLoad={handleSplineLoad} />
          </Suspense>
        ) : (
          <model-viewer
            key={modelSource}
            ref={modelRef}
            src={modelSource}
            alt="Interactive animated 3D motorcycle created by MN Animat"
            camera-controls="true"
            touch-action="pan-y"
            interaction-prompt="auto"
            camera-orbit="35deg 72deg 105%"
            min-camera-orbit="auto 5deg 55%"
            max-camera-orbit="auto 175deg 260%"
            shadow-intensity="1.1"
            shadow-softness="0.8"
            exposure="1.12"
            environment-image="neutral"
            auto-rotate-delay="800"
            rotation-per-second="18deg"
            animation-crossfade-duration="0"
            ar-status="not-presenting"
          />
        ))}
      </div>

      {loadError && (
        <div className="stage-error" role="status">
          <img src="/assets/logo-mn.svg" alt="" />
          <strong>3D preview unavailable</strong>
          <span>The rest of the website remains available.</span>
        </div>
      )}

      {!loaded && (
        <div className="stage-loader" aria-live="polite">
          <div className="loader-logo">
            <img src="/assets/logo-mn.svg" alt="" />
          </div>
          <LoaderCircle size={22} className="spin" />
          <span>Loading the animated 3D motorcycle</span>
        </div>
      )}

      {!compact && loaded && motorcycleParts.map((part, index) => (
        <button
          key={part.id}
          type="button"
          className={`hotspot ${selectedPart?.id === part.id ? 'is-active' : ''}`}
          style={{ left: `${part.x}%`, top: `${part.y}%`, '--delay': `${index * 0.15}s` }}
          onClick={() => selectPart(part)}
          aria-label={`Explore ${part.label}`}
        >
          <span className="hotspot-ring" />
          <span className="hotspot-dot" />
          <span className="hotspot-label">{part.label}</span>
        </button>
      ))}

      {selectedPart && (
        <div className="part-panel" role="dialog" aria-label={`${selectedPart.label} details`}>
          <button className="part-panel-close" type="button" onClick={() => setSelectedPart(null)} aria-label="Close details">
            <X size={18} />
          </button>
          <span className="part-kicker">Selected component</span>
          <h3>{selectedPart.label}</h3>
          <p>{selectedPart.description}</p>
          <button type="button" className="text-button" onClick={resetView}>Return to full view</button>
        </div>
      )}

      {activeAnimation === 'Parts_Presentation' && presentationLabel && (
        <div className="animation-caption" role="status" aria-live="polite">
          <span>Component presentation</span>
          <strong>{presentationLabel}</strong>
        </div>
      )}

      <div className="stage-topbar">
        <span className="live-badge"><i /> Animated 3D</span>
        <div className="stage-icon-actions">
          <button type="button" onClick={resetView} aria-label="Reset motorcycle and camera"><RotateCcw size={17} /></button>
          <button type="button" onClick={enterFullscreen} aria-label="Open 3D view in fullscreen"><Expand size={17} /></button>
        </div>
      </div>

      {!compact && (
        <div className="view-controls" aria-label="Motorcycle interaction controls">
          <div className="animation-buttons" aria-label="Motorcycle animations">
            <button
              type="button"
              className={activeAnimation === 'Parts_Presentation' ? 'is-active' : ''}
              onClick={() => playAnimation('Parts_Presentation')}
              disabled={!hasAnimation('Parts_Presentation') || Boolean(activeAnimation)}
            >
              <Move3D size={15} />
              Present parts
            </button>
            <button
              type="button"
              className={modelExploded || activeAnimation === 'Exploded_View' ? 'is-active' : ''}
              onClick={() => playAnimation(modelExploded ? 'Assemble_View' : 'Exploded_View')}
              disabled={Boolean(activeAnimation) || !hasAnimation(modelExploded ? 'Assemble_View' : 'Exploded_View')}
            >
              <Box size={15} />
              {modelExploded ? 'Assemble motorcycle' : 'Explode motorcycle'}
            </button>
          </div>

          <div className="camera-control-row">
            <div className="view-buttons">
              {views.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className={activeView === view.id ? 'is-active' : ''}
                  onClick={() => moveCamera(view)}
                >
                  {view.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`rotate-toggle ${autoRotate ? 'is-active' : ''}`}
              onClick={() => setAutoRotate((value) => !value)}
              aria-pressed={autoRotate}
            >
              {autoRotate ? <Pause size={15} /> : <Play size={15} />}
              {autoRotate ? 'Pause rotation' : 'Auto rotate'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
