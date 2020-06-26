import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import ProductsTable from './components/products-table/products-table.component';
import { Product } from './common/types';

interface AppState {
  products: Product[];
}

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
          products={this.state.products}
        />
      </div>
    )
  }
}

export default App;
