export default function TxnList({ txs }) {
  if (txs.length === 0) return null;
  return (
    <>
      {txs.map((item) => (
        <div key={item.txHash} className="alert alert-success">
          <div className="container text-center">
            <div className="row">
              <h5>{item.txHash}</h5>
            </div>
            <div className="row">
              <div className="col">From: {item.from}</div>
              <div className="col">Amount: {item.amount}</div>
            </div>
            <div className="row">
              <div className="col">To: {item.to}</div>
              <div className="col">
                <a href={`https://goerli.etherscan.io/tx/${item.txHash}`}>
                  block explorer
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
