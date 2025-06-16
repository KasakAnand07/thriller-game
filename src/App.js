import React, { useState, useRef } from "react";
import "./styles/Scene.css";
import { motion, AnimatePresence } from "framer-motion";

// Import all scenes
import scene1 from "./scenes/scene1.json";
import scene2a from "./scenes/scene2a.json";
import scene2b from "./scenes/scene2b.json";
import scene2c from "./scenes/scene2c.json";
import scene3a from "./scenes/scene3a.json";
import scene3b from "./scenes/scene3b.json";
import scene3c from "./scenes/scene3c.json";
import scene3d from "./scenes/scene3d.json";
import scene3e from "./scenes/scene3e.json";
import scene3f from "./scenes/scene3f.json";
import scene4a from "./scenes/scene4a.json";
import scene4b from "./scenes/scene4b.json";
import scene4c from "./scenes/scene4c.json";
import scene4d from "./scenes/scene4d.json";
import scene4e from "./scenes/scene4e.json";
import scene4f from "./scenes/scene4f.json";
import scene4g from "./scenes/scene4g.json";
import scene4h from "./scenes/scene4h.json";
import scene4i from "./scenes/scene4i.json";
import scene4j from "./scenes/scene4j.json";
import scene4k from "./scenes/scene4k.json";
import scene4l from "./scenes/scene4l.json";
import scene5a from "./scenes/scene5a.json";
import scene5b from "./scenes/scene5b.json";
import scene5c from "./scenes/scene5c.json";
import scene5d from "./scenes/scene5d.json";
import scene5e from "./scenes/scene5e.json";
import scene5f from "./scenes/scene5f.json";
import scene5g from "./scenes/scene5g.json";
import scene5h from "./scenes/scene5h.json";
import scene5i from "./scenes/scene5i.json";
import scene5j from "./scenes/scene5j.json";
import scene5k from "./scenes/scene5k.json";
import scene5l from "./scenes/scene5l.json";
import scene5m from "./scenes/scene5m.json";
import scene5n from "./scenes/scene5n.json";
import scene5o from "./scenes/scene5o.json";
import scene5p from "./scenes/scene5p.json";
import scene5q from "./scenes/scene5q.json";
import scene5r from "./scenes/scene5r.json";
import scene5s from "./scenes/scene5s.json";
import scene5t from "./scenes/scene5t.json";
import scene5u from "./scenes/scene5u.json";
import scene5v from "./scenes/scene5v.json";
import scene5w from "./scenes/scene5w.json";
import scene5x from "./scenes/scene5x.json";

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

const App = () => {
  const [scene, setScene] = useState(null);
  const [showStart, setShowStart] = useState(true);
  //eslint-disable-next-line
  const [history, setHistory] = useState([]);
  const [endingType, setEndingType] = useState(null); // 🏁 Track if ending
  const audioRef = useRef(null);

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
      setEndingType(next.endingType || null); // 🏁 Set ending type if present
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
          src="/assets/thriller_concept.png"
          alt="Thriller Concept"
          className="concept-image"
        />
        {/* <h1>🔦 Thriller Story Game</h1> */}
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
