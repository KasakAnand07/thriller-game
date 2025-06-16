import React, { useState, useRef, useEffect } from "react";
import "./styles/Scene.css";
import { motion, AnimatePresence } from "framer-motion";

// Import all scenes
import scene1 from "./scenes/scene1.json";
import scene2a from "./scenes/scene2/scene2a.json";
import scene2b from "./scenes/scene2/scene2b.json";
import scene2c from "./scenes/scene2/scene2c.json";
import scene3a from "./scenes/scene3/scene3a.json";
import scene3b from "./scenes/scene3/scene3b.json";
import scene3c from "./scenes/scene3/scene3c.json";
import scene3d from "./scenes/scene3/scene3d.json";
import scene3e from "./scenes/scene3/scene3e.json";
import scene3f from "./scenes/scene3/scene3f.json";
import scene4a from "./scenes/scene4/scene4a.json";
import scene4b from "./scenes/scene4/scene4b.json";
import scene4c from "./scenes/scene4/scene4c.json";
import scene4d from "./scenes/scene4/scene4d.json";
import scene4e from "./scenes/scene4/scene4e.json";
import scene4f from "./scenes/scene4/scene4f.json";
import scene4g from "./scenes/scene4/scene4g.json";
import scene4h from "./scenes/scene4/scene4h.json";
import scene4i from "./scenes/scene4/scene4i.json";
import scene4j from "./scenes/scene4/scene4j.json";
import scene4k from "./scenes/scene4/scene4k.json";
import scene4l from "./scenes/scene4/scene4l.json";
import scene5a from "./scenes/scene5/scene5a.json";
import scene5b from "./scenes/scene5/scene5b.json";
import scene5c from "./scenes/scene5/scene5c.json";
import scene5d from "./scenes/scene5/scene5d.json";
import scene5e from "./scenes/scene5/scene5e.json";
import scene5f from "./scenes/scene5/scene5f.json";
import scene5g from "./scenes/scene5/scene5g.json";
import scene5h from "./scenes/scene5/scene5h.json";
import scene5i from "./scenes/scene5/scene5i.json";
import scene5j from "./scenes/scene5/scene5j.json";
import scene5k from "./scenes/scene5/scene5k.json";
import scene5l from "./scenes/scene5/scene5l.json";
import scene5m from "./scenes/scene5/scene5m.json";
import scene5n from "./scenes/scene5/scene5n.json";
import scene5o from "./scenes/scene5/scene5o.json";
import scene5p from "./scenes/scene5/scene5p.json";
import scene5q from "./scenes/scene5/scene5q.json";
import scene5r from "./scenes/scene5/scene5r.json";
import scene5s from "./scenes/scene5/scene5s.json";
import scene5t from "./scenes/scene5/scene5t.json";
import scene5u from "./scenes/scene5/scene5u.json";
import scene5v from "./scenes/scene5/scene5v.json";
import scene5w from "./scenes/scene5/scene5w.json";
import scene5x from "./scenes/scene5/scene5x.json";

const scenes = {
  scene1,
  scene2a,
  scene2b,
  scene2c,
  scene3a,
  scene3b,
  scene3c,
  scene3d,
  scene3e,
  scene3f,
  scene4a,
  scene4b,
  scene4c,
  scene4d,
  scene4e,
  scene4f,
  scene4g,
  scene4h,
  scene4i,
  scene4j,
  scene4k,
  scene4l,
  scene5a,
  scene5b,
  scene5c,
  scene5d,
  scene5e,
  scene5f,
  scene5g,
  scene5h,
  scene5i,
  scene5j,
  scene5k,
  scene5l,
  scene5m,
  scene5n,
  scene5o,
  scene5p,
  scene5q,
  scene5r,
  scene5s,
  scene5t,
  scene5u,
  scene5v,
  scene5w,
  scene5x,
};
// ✅ Function to preload all scene background images
const preloadImages = () => {
  Object.values(scenes).forEach((scene) => {
    if (scene.background) {
      const img = new Image();
      img.src = `/assets/${scene.background}`;
    }
  });
};

const App = () => {
  const [scene, setScene] = useState(null);
  const [showStart, setShowStart] = useState(true);
  //eslint-disable-next-line
  const [history, setHistory] = useState([]);
  const [endingType, setEndingType] = useState(null);
  const audioRef = useRef(null);

  // ✅ Preload all images once
  useEffect(() => {
    preloadImages();
  }, []);

  const playSound = (soundFile) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (soundFile) {
      const audio = new Audio(`/sounds/${soundFile}`);
      audio.loop = true;
      audio.play();
      audioRef.current = audio;
    }
  };

  const handleChoice = (nextSceneId) => {
    const next = scenes[nextSceneId];
    if (next) {
      setScene(next);
      setHistory((prev) => [...prev, nextSceneId]);
      playSound(next.sound);
      setEndingType(next.endingType || null);
    } else {
      alert("Scene not found!");
    }
  };

  const handleRestart = () => {
    const firstScene = scenes.scene1;
    setScene(firstScene);
    setShowStart(false);
    setHistory([]);
    setEndingType(null);
    playSound(firstScene.sound);
  };

  if (showStart) {
    return (
      <div className="start-screen">
        <img
          src="/assets/thriller_concept.webp"
          alt="Thriller Concept"
          className="concept-image"
        />
        <h1 className="game-title">🪞 The Other Side</h1>
        <button onClick={handleRestart}>Start Game</button>
      </div>
    );
  }

  if (!scene) return <div>Loading...</div>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene.id}
        className="scene-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(/assets/${scene.background})`,
        }}
      >
        {/* 🏠 Home Button */}
        <button
          onClick={() => {
            setShowStart(true);
            setScene(null);
            setEndingType(null);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current = null;
            }
          }}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          🏠 Home
        </button>

        <div className="scene-text">
          {scene.speaker && <h3 className="speaker-name">{scene.speaker}</h3>}
          {scene.text.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="choices">
          {!endingType ? (
            scene.choices.map((choice, index) => (
              <button key={index} onClick={() => handleChoice(choice.next)}>
                {choice.text}
              </button>
            ))
          ) : (
            <>
              <p className={`ending ${endingType}`}>
                {endingType === "escape" && "✅ You Escaped!"}
                {endingType === "death" && "💀 You Died!"}
                {endingType === "mystery" && "❓ It's Not Over..."}
                {endingType === "suspense" && "🔍 Suspense Lingers..."}
                {endingType === "narrow_escape" && "🚪 Narrow Escape!"}
                {endingType === "open_ending" && "🔓 Open Ending!"}
              </p>
              <button onClick={handleRestart}>Play Again</button>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
