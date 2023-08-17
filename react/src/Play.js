import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import CreditToken from "./CreditToken.json";

const Play = () => {
  const [gameResult, setgameResult] = useState();

  const PlayGame = () => {
    const randomNumberInRange = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const result = randomNumberInRange(0, 1);
    console.log(result);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Credit Token contract
    const contractAddress = "0x9BFe44B38d32e6d333BBC5082FAFd454Ab6584b3";
    // Contract instance
    const contract = new ethers.Contract(contractAddress, CreditToken, signer);

    if (result === 1) {
      setgameResult("You won!");
      contract.mint(100000);
    } else {
      setgameResult("You lost.");
    }
  };

  return (
    <div className="wrapper">
      <h2>Game result: {gameResult}</h2>
      <button onClick={PlayGame} className="btn btn-primary">
        Play
      </button>
    </div>
  );
};

export default Play;
