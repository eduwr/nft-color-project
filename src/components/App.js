import React, { useEffect, useState } from "react";
import Web3 from "web3";
import color from "../abis/Color.json";
import "./App.css";

const App = () => {
  const abi = color.abi;

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const [acc] = await web3.eth.getAccounts();
    setAccount(acc);

    const networkId = await web3.eth.net.getId();
    const networkData = color.networks[networkId];

    if (!networkData) {
      window.alert("Smart contract not deployed to detected network");
      return;
    }

    const contractAddress = networkData.address;
    const _contract = new web3.eth.Contract(abi, contractAddress);
    setContract(_contract);
  };

  useEffect(() => {
    (async () => {
      await loadWeb3();
      await loadBlockchainData();
    })();
  }, []);

  useEffect(() => {
    if (!contract) {
      return;
    }
    const fetchContractData = async () => {
      const _colors = await contract.methods.getColors().call();
      setColors(_colors);
      const _totalSupply = await contract.methods.totalSupply().call();
      setTotalSupply(_totalSupply);
    };

    fetchContractData();
  }, [contract]);

  const mint = async (color) => {
    if (!contract || !account) {
      return;
    }
    contract.methods
      .mint(color)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setColors([...colors, color]);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await mint(selectedColor);
  };

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Color Tokens
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">
              <span id="account">{account}</span>
            </small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Issue Token</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="e.g. #FFFFFF"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                />
                <button type="submit" className="btn btn-block btn-primary">
                  MINT
                </button>
              </form>
            </div>
          </main>
        </div>
        <hr />
        <div className="row text-center">
          {colors.map((color, key) => (
            <div key={key} className="col-md-3 mb-3">
              <div
                style={{
                  backgroundColor: color,
                }}
                className="token"
              ></div>
              <p>{color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
