import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import CreditToken from "./CreditToken.json";
import Transactions from "./Transactions";
import TxnList from "./TxnList";

const Wallet = () => {
  // Credit Token contract
  let contractAddress = "0x9BFe44B38d32e6d333BBC5082FAFd454Ab6584b3";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [tokenName, setTokenName] = useState("Token");
  const [tokenShort, setTokenShort] = useState(0);
  const [balance, setBalance] = useState(null);

  const [txs, setTxs] = useState([]);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log(result);
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const updateBalance = async () => {
    let balanceBigN = await contract.balanceOf(defaultAccount);
    let tokenDecimals = await contract.decimals();
    let tokenBalance = balanceBigN / Math.pow(10, tokenDecimals);

    setBalance(tokenBalance);
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(provider);
    console.log(signer);
    setProvider(provider);
    setSigner(signer);

    const tempContract = new ethers.Contract(
      contractAddress,
      CreditToken,
      signer
    );
    setContract(tempContract);
  };

  useEffect(() => {
    if (contract != null) {
      updateBalance();
      updateTokenName();
      updateTokenShort();
      listenContract();
    }
  }, [contract]);

  const listenContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Contract instance
    const contract = new ethers.Contract(contractAddress, CreditToken, signer);
    contract.on("Transfer", (from, to, amount, event) => {
      console.log({ from, to, amount, event });

      setTxs((currentTxs) => [
        ...currentTxs,
        {
          txHash: event.transactionHash,
          from,
          to,
          amount: String(amount)
        }
      ]);
    });
  };

  const updateTokenName = async () => {
    setTokenName(await contract.name());
  };

  const updateTokenShort = async () => {
    setTokenShort(await contract.symbol());
  };

  return (
    <div className="container text-center">
      <div className="row">
        <h2> {" Dashboard " + tokenName} </h2>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Address</h5>
              <p className="card-text">{defaultAccount}</p>
              <button
                onClick={connectWalletHandler}
                className="btn btn-primary"
              >
                {connButtonText}
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              {tokenName} balance: {balance} {tokenShort}
            </div>
          </div>
        </div>
      </div>
      <div>{errorMessage}</div>
      <div className="row">
        <Transactions contract={contract} />
      </div>
      <div>
        <TxnList txs={txs} />
      </div>
    </div>
  );
};

export default Wallet;
