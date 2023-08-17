import { React, useState } from "react";

const Transactions = (props) => {
  const [transferHash, setTransferHash] = useState();

  const transferHandler = async (e) => {
    e.preventDefault();
    let transferAmount = e.target.sendAmount.value;
    let receiverAddress = e.target.receiverAddress.value;

    let txt = await props.contract.transfer(receiverAddress, transferAmount);
    console.log(txt);
    setTransferHash("Transfer confirmation hash: " + txt.hash);
  };

  return (
    <form
      className="row gy-2 gx-3 align-items-center"
      onSubmit={transferHandler}
    >
      <div className="col-6">
        <input
          type="text"
          className="form-control"
          placeholder="Receiver address"
          id="receiverAddress"
        />
      </div>
      <div className="col-auto">
        <div className="input-group">
          <div className="input-group-text">CRE</div>
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            id="sendAmount"
            min="0"
            step="1"
          />
        </div>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </div>
      <div>{transferHash}</div>
    </form>
  );
};

export default Transactions;
