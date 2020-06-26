import React, { Component } from 'react';
import { Product, ProductTableState } from '../../common/types';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Paper from '@material-ui/core/Paper';
import ColumnOptions from './column-options-component';
import { Button, Modal } from 'react-bootstrap';


class ProductsTable extends Component<{ products: Product[] }, ProductTableState> {

    state: ProductTableState = {
        displayProducts: [],
        displayColumns: ["Asin", "Price", "Rank", "Brand", "Model"],
        activePage: 1,
        totalPages: null,
        totalItemsCount: null,
        itemsCountPerPage: null,
        showColumnOptions: false
    }

    onChangeColumns(newColumns: string[]){
        this.setState({
            displayColumns: newColumns
        })
    }

    onOpenModal(){
        this.setState({
            showColumnOptions: !this.state.showColumnOptions
        })
    }

    onCloseModal(){
        this.setState({
            showColumnOptions: !this.state.showColumnOptions
        })
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
        return this.props.products.map((product: Product) => {
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
                <Button variant="primary" onClick = {() => this.onOpenModal()}>
                    Columns Options
                </Button>
                <Modal show = {this.state.showColumnOptions} onHide = {() => this.onCloseModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick = {() => this.onCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick = {() => this.onCloseModal()}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <ColumnOptions
                    displayColumns = {this.state.displayColumns}
                />
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

export default ProductsTable;