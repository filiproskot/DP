import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import LuckyGameAbi from "./LuckyGame.json";

const LuckyGame = () => {
  const [playStatus, setPlayStatus] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // LuckyGame contract
  const contractAddress = "0x56ec007E477035aF0030D0AcAFa92804E4497022";
  // Contract instance
  const contract = new ethers.Contract(contractAddress, LuckyGameAbi, signer);

  // handle event from contract
  contract.on("LotteryEvent", function (event) {
    console.log(`Result is ${event}`);
    if (event) {
      setPlayStatus("Congratulations. You guessed the right number!");
    } else {
      setPlayStatus("Your guess result is incorrect.");
    }
  });

  const LuckyGameHandler = async (e) => {
    e.preventDefault();
    let thenumber = e.target.guessNumber.value;
    let result = await contract.guessNumber(thenumber);
    console.log(result);
    setPlayStatus("Guessing...");
  };

  return (
    <form onSubmit={LuckyGameHandler} className="row g-3">
      <div className="col-auto">
        <input
          type="text"
          readOnly
          className="form-control-plaintext"
          value="Guess a number"
        />
      </div>
      <div className="col-auto">
        <input
          type="number"
          id="guessNumber"
          className="form-control"
          placeholder="1-10"
          min="0"
          step="1"
        />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">
          Guess
        </button>
      </div>
      <div className="col-auto">{playStatus}</div>
    </form>
  );
};

export default LuckyGame;
