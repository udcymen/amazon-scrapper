export interface Product {
    readonly id: string;
    price: number;
    asin: string;
    rank: number;
    link: string;
    brand: string;
    model: string;
    cpu: string;
    screen: string;
    ram: string;
    vc: string;
    ssd: string;
    hhd: string;
    type: string;
    os: string;
    dvd: boolean;
    backlit: boolean;
    security: boolean;
    office: boolean;
    upc: string;
    sku: string;
    note: string;
    version: number;
}

export interface Column {
    id: string;
    label: string;
    hidden: boolean;
    minWidth: number;
    order: 'asc' | 'desc' | false;
    align?: "left" | "center" | "right" | "justify";
    format?: (value: any) => string;
}
