import './App.css';
import React from "react";
import web3 from './web3';
import lottery from './lottery';
 
class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
  };

  componentDidMount() {
    this.setManager();
    this.setPlayers();
    this.setBalance();
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
      </div>
    );
  }

  async setManager() {
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }

  async setPlayers() {
    const players = await lottery.methods.getPlayers().call();
    this.setState({ players });
  }

  async setBalance() {
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ balance });
  }
}
export default App;
