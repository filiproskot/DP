import Wallet from "./Wallet";
import LuckyGame from "./LuckyGame";
import Play from "./Play";

function App() {
  return (
    <div className="App">
      <Wallet />
      <div className="container text-center">
        <div className="row">
          <hr />
        </div>
        <div className="row">
          <div className="col">
            <LuckyGame />
          </div>
        </div>
        <div className="row">
          <hr />
        </div>
        <div className="row">
          <div className="col">
            <Play />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
