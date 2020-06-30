import React, { useState, useEffect, useRef, createRef } from 'react';
import { Product, Column } from '../../common/types';
import axios from 'axios';
import { ColumnDialog } from './column-dialog.component';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Modal, Button, makeStyles, createStyles, Theme } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
  }),
);

export const ProductTable: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [columns, setColumns] = useState<Column[]>(
        [
            {
                id: 'id',
                label: 'ID',
                hidden: false,
                minWidth: 150,
                order: 'desc'
            },
            {
                id: 'price',
                label: 'Price',
                hidden: false,
                minWidth: 100,
                order: false,
                format: (value: number) => value.toFixed(2),
            },
            {
                id: 'asin',
                label: 'ASIN',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'rank',
                label: 'Rank',
                hidden: false,
                minWidth: 100,
                order: false,
            },
            {
                id: 'brand',
                label: 'Brand',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'model',
                label: 'Model',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'cpu',
                label: 'CPU',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'vc',
                label: 'Video Card',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'ram',
                label: 'RAM',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'hhd',
                label: 'HHD',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'ssd',
                label: 'SSD',
                hidden: false,
                minWidth: 150,
                order: false,
            },
            {
                id: 'type',
                label: 'Type',
                hidden: true,
                minWidth: 150,
                order: false,
            },
            {
                id: 'screen',
                label: 'Screen',
                hidden: true,
                minWidth: 150,
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
                minWidth: 100,
                order: false,
            }
        ]
    )
    const [activePage, setActivePage] = useState<number>(0);
    const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
    const [itemsCountPerPage, setItemsCountPerPage] = useState<number>(10);
    const [showColumnOptions, setShowColumnOptions] = useState<boolean>(false);

    const ItemsCountPerPage = [10, 25, 50, 100];

    const classes = useStyles();

    useEffect(() => {
        function fetchProducts() {
        
            let sortString: string = "";
    
            columns.forEach((column: Column) => {
                if (column.order !== false) {
                    sortString += `&sort=${column.id},${column.order}`
                }
            });
    
            let requestUrl: string = `http://localhost:8080/products?page=${activePage}&size=${itemsCountPerPage}${sortString}`;
    
            console.log(requestUrl);
    
            axios.get(requestUrl)
                .then(response => {
                    setProducts(response.data.content);
                    setTotalItemsCount(response.data.totalElements);
                })
                .catch(err => console.log(err))
        };

        fetchProducts();

    }, [activePage, itemsCountPerPage, columns]);



    function getValueFromProduct(product: Product, prop: string): any {
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

    function handleCheckBoxToggle(column: Column): void {
        column.hidden = !column.hidden;
        console.log(column);
        console.log(columns);
    }

    function handleChangePage(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) {
        setActivePage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setItemsCountPerPage(+event.target.value);
    }

    function handleOpenColumnOption() {
        setShowColumnOptions(true);
    }

    function handleCloseColumnOption() {
        setShowColumnOptions(false);
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpenColumnOption}>
                Columns
                </Button>
            <Modal
                className={classes.modal}
                open={showColumnOptions}
                onClose={handleCloseColumnOption}
            >
                <ColumnDialog
                    columns={columns}
                    handleCheckBoxToggle={handleCheckBoxToggle}
                />
            </Modal>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns
                                .filter((column: Column) => !column.hidden)
                                .map((column: Column) => {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            <>
                                                {column.label}
                                                {column.order 
                                                    ?   (<a href="">
                                                            {column.order === "asc" 
                                                                ? <KeyboardArrowUp /> 
                                                                : <KeyboardArrowDown />}
                                                        </a>)
                                                    : null
                                                }
                                            </>
                                        </TableCell>
                                    )
                                })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .map((product: Product) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={product.asin}>
                                        {columns
                                            .filter((column: Column) => !column.hidden)
                                            .map((column: Column) => {
                                                const value = getValueFromProduct(product, column.label);
                                                return (
                                                    <TableCell key={product.asin + column.id} align={column.align}>
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
                rowsPerPageOptions={ItemsCountPerPage}
                component="div"
                count={totalItemsCount}
                rowsPerPage={itemsCountPerPage}
                page={activePage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );

}

export default ProductTable;