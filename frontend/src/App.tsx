import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Product, TableState } from './common/types';
import Button from '@material-ui/core/Button';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

class App extends Component {
  state: TableState = {
    displayProducts: [],
    products: [],
    displayColumns: ["Asin", "Price", "Rank", "Brand", "Model"],
    columns: ["Asin", "Price", "Brand", "Rank", "Display", "Ram", "CPU", "SSD", "HHD", "Model", "Keyboard", "DVD", 
    "Note", "Office", "OS", "Security", "UPC", "SKU", "Type", "Version", "Video Card"]
  }

  getProducts(){
    axios.get('http://localhost:8080/products')
      .then(response => this.setState({
        products: response.data.content,
        displayProducts: response.data.content
        }))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getProducts();
  }

  renderTableHeader(){
    return (
      <tr>
        {this.state.displayColumns.map((column: string, index: number) => {
          return <th data-align="center" key={index}>{column}</th>
        })}
      </tr>
    )
  }

  renderTableData(){
    return this.state.products.map((product: Product) => {
      return (
        <tr key={product.id}>
          {this.state.displayColumns.map((column: string) => {
            switch(column){
              case "Asin":{
                return <td key={column}><a href={product.link}>{product.asin}</a></td>
              }
              case "Price":{
                return <td key={column}>{product.price}</td>
              }
              case "Brand":{
                return <td key={column}>{product.brand}</td>
              }
              case "Rank":{
                return <td key={column}>{product.rank}</td>
              }
              case "Display":{
                return <td key={column}>{product.screen}</td>
              }
              case "Ram":{
                return <td key={column}>{product.ram}</td>
              }
              case "CPU":{
                return <td key={column}>{product.cpu}</td>
              }
              case "SSD":{
                return <td key={column}>{product.ssd}</td>
              }
              case "HHD":{
                return <td key={column}>{product.hhd}</td>
              }
              case "Model":{
                return <td key={column}>{product.model}</td>
              }
              case "Keyboard":{
                return <td key={column}>{product.backlit}</td>
              }
              case "DVD":{
                return <td key={column}>{product.dvd}</td>
              }
              case "Note":{
                return <td key={column}>{product.note}</td>
              }
              case "Office":{
                return <td key={column}>{product.office}</td>
              }
              case "OS":{
                return <td key={column}>{product.os}</td>
              }
              case "Security":{
                return <td key={column}>{product.security}</td>
              }
              case "UPC":{
                return <td key={column}>{product.upc}</td>
              }
              case "SKU":{
                return <td key={column}>{product.sku}</td>
              }
              case "Type":{
                return <td key={column}>{product.type}</td>
              }
              case "Video Card":{
                return <td key={column}>{product.vc}</td>
              }
              case "Version":{
                return <td key={column}>{product.version}</td>
              }
            }
          })}
        </tr>
      )
    })
  }

  render(){
    return (
      <Paper component="form" className="root">
        <div>
        <Button variant="outlined" color="primary">
          <DehazeIcon/>
          Columns Options
        </Button>
        </div>
        <div>
          <table className="table table-hover table-striped tableFixHead">
            <thead className="thead-dark">
              {this.renderTableHeader()}
            </thead>
            <tbody className="table-bordered scrollit">
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </Paper>
    )
  }
}

export default App;
