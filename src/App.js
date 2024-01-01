import './App.css';
import React from "react";
import lottery from './lottery';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: '',
    };
  }

  componentDidMount() {
    this.setManagerName();
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }

  async setManagerName() {
    const manager = await lottery.methods.manager().call();
    this.setState({ manager });
  }
}
export default App;
