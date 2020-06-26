import './App.css';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import ProductsTable from './components/products-table/products-table.component';

interface AppState {
  
}

class App extends Component {

  render(){
    return (
      <Paper>
        <ProductsTable/>
      </Paper>
    )
  }
}

export default App;
