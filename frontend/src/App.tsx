import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { AppState } from './common/types';
import ProductsTable from './components/products-table/products-table.component';

class App extends Component {
  state : AppState = {
    products: []
  }

  getProducts(){
    axios.get('http://localhost:8080/products')
      .then(response => this.setState({
        products: response.data.content
        }))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getProducts();
  }

  render(){
    return (
      <div>
        <ProductsTable
          products = {this.state.products}
        />
      </div>
    )
  }
}

export default App;
