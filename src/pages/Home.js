import React, { useEffect } from "react";
import GameDetail from "../components/GameDetail";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";

//Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useLocation } from "react-router-dom";
import { fadeIn } from "../animation";

//Components
import Game from "../components/Game";

const Home = () => {
  //get the current Location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //Get the data back from storage state?
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );

  //FETCH Games
  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      {/* <AnimateSharedLayout type="crossfade">
        <AnimatePresence> */}
      {pathId && <GameDetail pathId={pathId} />}
      {/* </AnimatePresence> */}
      {searched.length ? (
        <div className="searched">
          <h2>Searched Games</h2>
          <Games>
            {searched.map((game) => {
              return <Game game={game} key={game.id} />;
            })}
          </Games>
        </div>
      ) : (
        ""
      )}
      <h2>Upcoming Games</h2>
      <Games>
        {upcoming.map((game) => {
          return <Game game={game} key={game.id} />;
        })}
      </Games>
      <h2>Popular Games</h2>
      <Games>
        {popular.map((game) => {
          return <Game game={game} key={game.id} />;
        })}
      </Games>
      <h2>New Games</h2>
      <Games>
        {newGames.map((game) => {
          return <Game game={game} key={game.id} />;
        })}
      </Games>
      {/* </AnimateSharedLayout> */}
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Home;
