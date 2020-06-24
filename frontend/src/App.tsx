import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { product } from './common/types';

class App extends Component {
  state = {
    items: []
  }

  getItems(){
    axios.get('http://localhost:8080/products')
      .then(response => this.setState({
          items: response.data.content
        }))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getItems();
  }

  render(){
    return (
      <div>
        {this.state.items.map((item: product, index: number) => {
          return <pre key={index}>{JSON.stringify(item, null, 2)}</pre>
        })}
      </div>
    )

  }

}

export default App;
