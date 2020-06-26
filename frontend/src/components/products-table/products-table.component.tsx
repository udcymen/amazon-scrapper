import React, { Component } from 'react';
import { Product } from '../../common/types';
import axios from 'axios';
import ColumnOption from './column-option.component';


interface ProductTableState {
    products: Product[]
    displayColumns: string[];
    activePage: number;
    totalPages: number;
    totalItemsCount: number;
    itemsCountPerPage: number;
    showColumnOptions: boolean;
}

class ProductsTable extends Component {
    state: ProductTableState = {
        products: [],
        displayColumns: ["ASIN", "Price", "Rank", "Brand", "Model"],
        activePage: 0,
        totalPages: 0,
        totalItemsCount: 0,
        itemsCountPerPage: 20,
        showColumnOptions: false
    }

    fetchProducts(page: number, size: number){
        axios.get(`http://localhost:8080/products?page=${page}&size=${size}`)
            .then(response => this.setState({
                products: response.data.content,
                totalPages: response.data.totalPages,
                totalItemsCount: response.data.totalElements,
                activePage: response.data.number + 1,
                itemsCountPerPage: response.data.size
            }))
            .catch(err => console.log(err))
    }


    componentDidMount() {
        this.fetchProducts(this.state.activePage, this.state.itemsCountPerPage);
    }

    renderTableHeader() {
        return (
            <tr>
                {this.state.displayColumns.map((column: string, index: number) => {
                    return <th data-align="center" key={index}>{column}</th>
                })}
            </tr>
        )
    }

    renderTableData() {
        return this.state.products.map((product: Product) => {
            return (
                <tr key={product.id}>
                    {this.state.displayColumns.map((column: string) => {
                        switch (column) {
                            case "ASIN": {
                                return <td key={column}><a href={product.link}>{product.asin}</a></td>
                            }
                            case "Price": {
                                return <td key={column}>{product.price}</td>
                            }
                            case "Brand": {
                                return <td key={column}>{product.brand}</td>
                            }
                            case "Rank": {
                                return <td key={column}>{product.rank}</td>
                            }
                            case "Display": {
                                return <td key={column}>{product.screen}</td>
                            }
                            case "Ram": {
                                return <td key={column}>{product.ram}</td>
                            }
                            case "CPU": {
                                return <td key={column}>{product.cpu}</td>
                            }
                            case "SSD": {
                                return <td key={column}>{product.ssd}</td>
                            }
                            case "HHD": {
                                return <td key={column}>{product.hhd}</td>
                            }
                            case "Model": {
                                return <td key={column}>{product.model}</td>
                            }
                            case "Keyboard": {
                                return <td key={column}>{product.backlit}</td>
                            }
                            case "DVD": {
                                return <td key={column}>{product.dvd}</td>
                            }
                            case "Note": {
                                return <td key={column}>{product.note}</td>
                            }
                            case "Office": {
                                return <td key={column}>{product.office}</td>
                            }
                            case "OS": {
                                return <td key={column}>{product.os}</td>
                            }
                            case "Security": {
                                return <td key={column}>{product.security}</td>
                            }
                            case "UPC": {
                                return <td key={column}>{product.upc}</td>
                            }
                            case "SKU": {
                                return <td key={column}>{product.sku}</td>
                            }
                            case "Type": {
                                return <td key={column}>{product.type}</td>
                            }
                            case "Video Card": {
                                return <td key={column}>{product.vc}</td>
                            }
                            case "Version": {
                                return <td key={column}>{product.version}</td>
                            }
                        }
                    })}
                </tr>
            )
        })
    }

    handleCheckBoxToggle(column: string) {
        const displayColumns = this.state.displayColumns;
        const columnIndex = this.state.displayColumns.indexOf(column);
        console.log(displayColumns, column);
        if (columnIndex === -1){
            displayColumns.push(column);
        }
        else{
            displayColumns.splice(columnIndex, 1);
        }
        this.setState({
            displayColumns: displayColumns
        })
    }

    render() {
        return (
            <div>
                <ColumnOption 
                    displayColumns={this.state.displayColumns}
                    handleCheckBoxToggle={this.handleCheckBoxToggle.bind(this)}
                />
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
            </div>

        )
    }
}

export default ProductsTable;