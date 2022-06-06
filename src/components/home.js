import React from "react";
import "../app.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      <div className="bg-image">
        <div className="bg-background">
          <p>Play The Game Of Cards</p>
          <div className="game-btn">
            <Link to={"/start"}>Start Game</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
