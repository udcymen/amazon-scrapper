import './App.css';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ProductTable from './components/products-table/product-table.component';

interface AppState {
  
}

class App extends Component {

  render(){
    return (
      <Paper>
        <ProductTable/>
      </Paper>
    )
  }
}

export default App;
