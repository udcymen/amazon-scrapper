import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Product, TableState } from './common/types';

class App extends Component {
  state: TableState = {
    products: [],
    columns:[
      "Asin","Price","Brand","Rank","Display","Ram","CPU","SSD","HHD","Model","Keyboard","DVD","Note","Office","OS","Security","UPC",
    "SKU","Type","Version","Video Card"]
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

  renderTableHeader(){
    return (
      <tr>
        {this.state.columns.map((column: string, index: number) => {
          return <th key={index}>{column}</th>
        })}
      </tr>
    )
  }

  renderTableData(){
    return this.state.products.map((product: Product, index: number) => {
      return (
        <tr key={index}>
          {this.state.columns.map((column: string) => {
            switch(column){
              case "Asin":{
                return <td><a href={product.link}>{product.asin}</a></td>
              }
              case "Price":{
                return <td>{product.price}</td>
              }
              case "Brand":{
                return <td>{product.brand}</td>
              }
              case "Rank":{
                return <td>{product.rank}</td>
              }
              case "Display":{
                return <td>{product.screen}</td>
              }
              case "Ram":{
                return <td>{product.ram}</td>
              }
              case "CPU":{
                return <td>{product.cpu}</td>
              }
              case "SSD":{
                return <td>{product.ssd}</td>
              }
              case "HHD":{
                return <td>{product.hhd}</td>
              }
              case "Model":{
                return <td>{product.model}</td>
              }
              case "Keyboard":{
                return <td>{product.backlit}</td>
              }
              case "DVD":{
                return <td>{product.dvd}</td>
              }
              case "Note":{
                return <td>{product.note}</td>
              }
              case "Office":{
                return <td>{product.office}</td>
              }
              case "OS":{
                return <td>{product.os}</td>
              }
              case "Security":{
                return <td>{product.security}</td>
              }
              case "UPC":{
                return <td>{product.upc}</td>
              }
              case "SKU":{
                return <td>{product.sku}</td>
              }
              case "Type":{
                return <td>{product.type}</td>
              }
              case "Video Card":{
                return <td>{product.vc}</td>
              }
              case "Version":{
                return <td>{product.version}</td>
              }
              deafult: {
                return <td></td>
              }
            }
          })}
        </tr>
      )
    })
  }

  render(){
    return (
      <div>
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            {this.renderTableHeader()}
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
