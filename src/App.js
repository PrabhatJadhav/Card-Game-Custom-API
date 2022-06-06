import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header/header.component";
import NewGameApi from "./components/start-game/customApi.component";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="App"
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="start" element={<NewGameApi />} />
      </Routes>
    </motion.div>
  );
}

export default App;

// One button simulation
// dont use API for cards, use own logic
// can use for images
// number of rounds
// give up btn
