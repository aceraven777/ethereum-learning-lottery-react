import './App.css';
import React from "react";
import web3 from './web3';
import lottery from './lottery';
 
class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',

    bidValue: '',
    message: '',
  };

  componentDidMount() {
    this.setManager();
    this.setPlayers();
    this.setBalance();
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

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.bidValue, 'ether'),
    });

    this.setState({ message: 'You have been entered!' });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.bidValue}
              onChange={event => this.setState({ bidValue: event.target.value }) }
            />
          </div>
          <button>Enter</button>
        </form>
        
        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
