import React, { Component } from 'react';
import { Product, Column } from '../../common/types';
import axios from 'axios';
import ColumnOption from './column-option.component';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Modal, Button } from '@material-ui/core';


interface ProductTableState {
    products: Product[]
    columns: Column[];
    activePage: number;
    totalPages: number;
    totalItemsCount: number;
    itemsCountPerPage: number;
    showColumnOptions: boolean;
}

class ProductTable extends Component {
    state: ProductTableState = {
        products: [],
        columns: [
            {
                id: 'id',
                label: 'ID',
                hidden: false,
                minWidth: 50,
                order: 'desc'
            },
            {
                id: 'price',
                label: 'Price',
                hidden: false,
                minWidth: 50,
                order: false,
                format: (value: number) => value.toFixed(2),
            },
            {
                id: 'asin',
                label: 'ASIN',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'rank',
                label: 'Rank',
                hidden: false,
                minWidth: 50,
                order: false,
            },
            {
                id: 'brand',
                label: 'Brand',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'model',
                label: 'Model',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'cpu',
                label: 'CPU',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'vc',
                label: 'Video Card',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'ram',
                label: 'RAM',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'hhd',
                label: 'HHD',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'ssd',
                label: 'SSD',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'type',
                label: 'Type',
                hidden: true,
                minWidth: 100,
                order: false,
            },
            {
                id: 'screen',
                label: 'Screen',
                hidden: true,
                minWidth: 100,
                order: false,
            },
            {
                id: 'dvd',
                label: 'DVD',
                hidden: true,
                minWidth: 30,
                order: false,
            },
            {
                id: 'backlit',
                label: 'Backlit',
                hidden: true,
                minWidth: 30,
                order: false,
            },
            {
                id: 'security',
                label: 'Security',
                hidden: true,
                minWidth: 30,
                order: false,
            },
            {
                id: 'office',
                label: 'Office',
                hidden: true,
                minWidth: 30,
                order: false,
            },
            {
                id: 'upc',
                label: 'UPC',
                hidden: true,
                minWidth: 200,
                order: false,
            },
            {
                id: 'sku',
                label: 'SKU',
                hidden: true,
                minWidth: 200,
                order: false,
            },
            {
                id: 'note',
                label: 'Note',
                hidden: true,
                minWidth: 200,
                order: false,
            },
            {
                id: 'version',
                label: 'Version',
                hidden: true,
                minWidth: 50,
                order: false,
            }
        ],
        activePage: 0,
        totalPages: 0,
        totalItemsCount: 0,
        itemsCountPerPage: 10,
        showColumnOptions: false
    }

    fetchProducts(page: number, size: number) {
        let sortString: string = "";

        this.state.columns.map((column: Column) => {
            if (column.order !== false){
                sortString += `&sort=${column.id},${column.order}`
            }
        });

        let requestUrl: string = `http://localhost:8080/products?page=${page}&size=${size}${sortString}`;

        console.log(requestUrl);

        axios.get(requestUrl)
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

    handleCheckBoxToggle(column: Column): void {
        const columns = this.state.columns;
        const columnIndex = columns.indexOf(column);
        column.hidden = !column.hidden;
        columns[columnIndex] = column;
        this.setState({
            columns: columns
        })
    }

    handleChangePage(event: unknown, newPage: number){
        this.fetchProducts(newPage, this.state.itemsCountPerPage);
    }

    handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>){
        this.fetchProducts(this.state.activePage, +event.target.value);
    }

    handleOpenColumnOption(){
        this.setState({
            showColumnOptions: true
        })
    }

    handleCloseColumnOption(){
        this.setState({
            showColumnOptions: false
        })
    }

    render() {
        return (
            <div className="container">
                <Button variant="contained" color="primary" onClick={this.handleOpenColumnOption.bind(this)}>
                    Columns
                </Button>
                <Modal 
                    open={this.state.showColumnOptions} 
                    onClose={this.handleCloseColumnOption.bind(this)}
                    style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        margin: 'auto'
                    }}
                >
                    <ColumnOption 
                        columns={this.state.columns}
                        handleCheckBoxToggle={this.handleCheckBoxToggle.bind(this)}
                    />
                </Modal>
                <TableContainer>
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
                                                style={{ minWidth: column.minWidth}}
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
                                                        <TableCell key={product.asin+column.id} align={column.align}>
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={this.state.totalItemsCount}
                    rowsPerPage={this.state.itemsCountPerPage}
                    page={this.state.activePage}
                    onChangePage={this.handleChangePage.bind(this)}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                />
            </div>
        )
    }
}

export default ProductTable;