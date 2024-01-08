import React, { useState } from "react";
import Web3 from "web3";
import { ABI, SC_ADDRESS } from "./Helpers";

function App() {
  const [account, setAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [tokenContract, setTokenContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [supplyUser, setSupplyUser] = useState(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();

        const networkId = await window.web3.eth.net.getId();
        setNetwork(networkId.toString());

        // if (networkId !== 11155111n) {
        //   alert(
        //     "Kliknij 'Rozłącz portfel', zmień sieć na Sepolię oraz podłącz się ponownie."
        //   );
        // }

        const accounts = await window.web3.eth.getAccounts();
        setAccount(accounts[0]);

        const contract = new window.web3.eth.Contract(ABI, SC_ADDRESS);
        setTokenContract(contract);

        const supply = await contract.methods.totalSupply().call();
        setTotalSupply(supply);

        const userTokens = await contract.methods.balanceOf(accounts[0]).call();
        setSupplyUser(userTokens);
      } catch (error) {
        console.error("Błąd:", error);
      }
    } else {
      alert("Zainstaluj Metamask by używać tej aplikacji.");
    }
  };

  const disconnectWallet = async () => {
    window.location.reload(false);
  };

  const handleTransfer = async () => {
    if (tokenContract && account) {
      try {
        const value = window.web3.utils.toWei(amount, "ether");
        const receipt = await tokenContract.methods.transfer(recipient, value).send({
          from: account,
        });
        console.log('Szczegóły wysłanej transakcji: ', receipt);
        const userTokens = await tokenContract.methods.balanceOf(account).call();
        setSupplyUser(userTokens);
        if (receipt.status) {
          alert("Sukces transferu!");
        } else {
          alert("Błąd transferu! Sprawdź szczegóły na etherscan.com");
        }
      } catch (error) {
        console.error("Błąd przy transferze:", error);
      }
    }
  };

  const handleMint = async () => {
    if (tokenContract && account) {
      try {
        const value = window.web3.utils.toWei(amount, "ether");
        const receipt = await tokenContract.methods.mint(account, value).send({
          from: account, gas: 50000, gasPrice: 3151654540
        });
        console.log('Szczegóły wysłanej transakcji: ', receipt);
        const supply = await tokenContract.methods.totalSupply().call();
        setTotalSupply(supply);
        const userTokens = await tokenContract.methods.balanceOf(account).call();
        setSupplyUser(userTokens);
        if (receipt.status) {
          alert("Sukces mintowania!");
        } else {
          alert("Błąd mintowania! Sprawdź szczegóły na etherscan.com");
        }
      } catch (error) {
        console.error("Błąd przy mintowaniu:", error);
      }
    }
  };

  return (
    <div className="App">
      {account ? (
        <>
          <button onClick={disconnectWallet}>Rozłącz portfel</button>

          <h2> Szczegóły połączenia </h2>
          <span>
            <b>Sieć: </b>
            {network}
          </span>
          <br />
          <span>
            <b>Adres smartcontractu: </b>
            {SC_ADDRESS}
          </span>
          <br />
          <span>
            <b>Ilość łączna tokenów: </b>
            {totalSupply.toString()}
          </span>
          <br /><br />
          <span>
            <b>Adres konta: </b>
            {account}
          </span>
          <br />
          <span>
            <b>Ilość tokenów bieżącego użytkownika: </b>
            {supplyUser.toString()}
          </span>
          <br />
          <h2> Wymintuj tokeny </h2>
          <input
            placeholder="Ilość"
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <button onClick={handleMint}> Mintuj </button>
          <h2> Przetransferuj tokeny </h2>
          <input
            placeholder="Adres odbiorcy"
            onChange={(e) => setRecipient(e.target.value)}
          />
          <br />
          <input
            placeholder="Ilość"
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <button onClick={handleTransfer}> Prześlij tokeny </button>
        </>
      ) : (
        <button onClick={connectWallet}> Podłącz portfel </button>
      )}
    </div>
  );
}

export default App;
