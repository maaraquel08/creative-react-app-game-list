import React from "react";

//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";

//Image resizer
import { smallImage } from "../util";

const Game = ({ game }) => {
  //Deconstruct props
  const { name, released, background_image, id, key, clip } = game;
  const stringPathId = id.toString();
  //Load Details Handler
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetail(id));
  };

  //Sub Media Component
  const SubMedia = () => {
    //functions
    const playPreview = (e) => {
      e.target.play();
    };

    const stopPreview = (e) => {
      e.target.pause();
      e.target.currentTime = 0;
      e.target.load();
    };

    if (game.clip) {
      return (
        <motion.video
          loop
          muted
          playsInline
          preload="auto"
          poster={background_image}
          src={clip.clip}
          onMouseOver={playPreview}
          onMouseOut={stopPreview}
          onClick={stopPreview}
          layoudId={`video ${stringPathId}`}
        />
      );
    } else {
      return (
        <motion.img
          layoudId={`image ${stringPathId}`}
          alt={game.name}
          src={smallImage(game.background_image, 640)}
        />
      );
    }
  };

  return (
    <StyledGame layoutId={stringPathId} onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <h3>{name}</h3>
        <p>{released}</p>
        <SubMedia />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  img,
  video {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  overflow: hidden;
`;

export default Game;
