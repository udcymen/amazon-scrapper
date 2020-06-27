import React, { Component } from 'react';
import { Product } from '../../common/types';
import axios from 'axios';
import ColumnOption from './column-option.component';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'

interface ProductTableState {
    products: Product[]
    columns: Column[];
    activePage: number;
    totalPages: number;
    totalItemsCount: number;
    itemsCountPerPage: number;
    showColumnOptions: boolean;
}

interface Column {
    id: string;
    label: string;
    hidden: boolean;
    minWidth: number;
    align?: "left" | "center" | "right" | "justify";
    format?: (value: any) => string;
}

class ProductTable extends Component {
    state: ProductTableState = {
        products: [],
        columns: [
            {
                id: 'id',
                label: 'ID',
                hidden: false,
                minWidth: 50
            },
            {
                id: 'price',
                label: 'Price',
                hidden: false,
                minWidth: 50,
                format: (value: number) => value.toFixed(2),
            },
            {
                id: 'asin',
                label: 'ASIN',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'rank',
                label: 'Rank',
                hidden: false,
                minWidth: 50
            },
            {
                id: 'brand',
                label: 'Brand',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'model',
                label: 'Model',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'cpu',
                label: 'CPU',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'screen',
                label: 'Screen',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'vc',
                label: 'Video Card',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'ram',
                label: 'RAM',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'hhd',
                label: 'HHD',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'ssd',
                label: 'SSD',
                hidden: false,
                minWidth: 100
            },
            {
                id: 'type',
                label: 'Type',
                hidden: true,
                minWidth: 100
            },
            {
                id: 'dvd',
                label: 'DVD',
                hidden: true,
                minWidth: 30
            },
            {
                id: 'backlit',
                label: 'Backlit',
                hidden: true,
                minWidth: 30
            },
            {
                id: 'security',
                label: 'Security',
                hidden: true,
                minWidth: 30
            },
            {
                id: 'office',
                label: 'Office',
                hidden: true,
                minWidth: 30
            },
            {
                id: 'upc',
                label: 'UPC',
                hidden: true,
                minWidth: 200
            },
            {
                id: 'sku',
                label: 'SKU',
                hidden: true,
                minWidth: 200
            },
            {
                id: 'note',
                label: 'Note',
                hidden: true,
                minWidth: 200
            },
            {
                id: 'version',
                label: 'Version',
                hidden: true,
                minWidth: 50
            }
        ],
        activePage: 0,
        totalPages: 0,
        totalItemsCount: 0,
        itemsCountPerPage: 50,
        showColumnOptions: false
    }

    fetchProducts(page: number, size: number) {
        axios.get(`http://localhost:8080/products?page=${page}&size=${size}`)
            .then(response =>  this.setState({
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

    getValueFromProduct(product: Product, prop: string): any {
        let result = null;
        switch (prop) {
            case "ID": {
                result = product.id;
                break;
            }
            case "ASIN": {
                result = product.asin;
                break;
            }
            case "Price": {
                result = product.price;
                break;
            }
            case "Brand": {
                result = product.brand;
                break;
            }
            case "Rank": {
                result = product.rank;
                break;
            }
            case "Display": {
                result = product.screen;
                break;
            }
            case "Ram": {
                result = product.ram;
                break;
            }
            case "CPU": {
                result = product.cpu;
                break;
            }
            case "SSD": {
                result = product.ssd;
                break;
            }
            case "HHD": {
                result = product.hhd;
                break;
            }
            case "Model": {
                result = product.model;
                break;
            }
            case "Keyboard": {
                result = product.backlit;
                break;
            }
            case "DVD": {
                result = product.dvd;
                break;
            }
            case "Note": {
                result = product.note;
                break;
            }
            case "Office": {
                result = product.office;
                break;
            }
            case "OS": {
                result = product.os;
                break;
            }
            case "Security": {
                result = product.security;
                break;
            }
            case "UPC": {
                result = product.upc;
                break;
            }
            case "SKU": {
                result = product.sku;
                break;
            }
            case "Type": {
                result = product.type;
                break;
            }
            case "Video Card": {
                result = product.vc;
                break;
            }
            case "Version": {
                result = product.version;
                break;
            }
            default: {
                result = "";
                break;
            }
        }
        return result;
    }

    handleCheckBoxToggle(column: string): void {
        // const displayColumns = this.state.displayColumns;
        // const columnIndex = this.state.displayColumns.indexOf(column);
        // console.log(displayColumns, column);
        // if (columnIndex === -1) {
        //     displayColumns.push(column);
        // }
        // else {
        //     displayColumns.splice(columnIndex, 1);
        // }
        // this.setState({
        //     displayColumns: displayColumns
        // })
    }

    render() {
        return (
            <div>
                {/* <ColumnOption 
                    displayColumns={this.state.displayColumns}
                    handleCheckBoxToggle={this.handleCheckBoxToggle.bind(this)}
                /> */}
                <TableContainer className="container">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {this.state.columns
                                    .filter((column: Column) => !column.hidden)
                                    .map((column: Column) => {
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        )
                                    })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.products
                                .map((product: Product) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={product.asin}>
                                            {this.state.columns
                                                .filter((column: Column) => !column.hidden)
                                                .map((column: Column) => {
                                                    const value = this.getValueFromProduct(product, column.label);
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && value
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        )
    }
}

export default ProductTable;