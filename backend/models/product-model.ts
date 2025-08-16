
// backend/models/product-model.ts

import db from "../utils/database.ts"
import * as authModule from "../utils/auth.ts";

export interface Product {
    id: number,
    name: string,
    price: number,
    category: string,
    description: string,
    stock_quantity: number
}

// Create a new product
export function createProduct(
    product: {
        name: string;
        price: number;
        category: string;
        description?: string;
        stock_quantity?: number;
    }
): number {
    const description = product.description ?? "";
    const stock_quantity = product.stock_quantity ?? 0;

    db.query(
        "INSERT INTO products (name, price, category, description, stock_quantity) VALUES (?, ?, ?, ?, ?)",
        [product.name, product.price, product.category, description, stock_quantity]
    );

    return db.lastInsertRowId
}

// Get product by id
export function getProductbyId(id: number): Product | null {

    const foundProducts = [...db.queryEntries<Product>(
        "SELECT * FROM products WHERE id = ?",
        [id]
    )]

    return foundProducts.length > 0 ? foundProducts[0] : null;
}

// Get products by category
export function getProductByCategory(category: string): Product[] {

    const result = [...db.queryEntries<Product>(
        "SELECT * FROM products WHERE category = ?",
        [category],
    )];

    return result;
}

// Update a product
export function updateProduct( id: number, updates: {
        name?: string;
        price?: number;
        category?: string;
        description?: string;
        stock_quantity?: number;
    }) {
    
        if (
        updates.name === undefined &&
        updates.price === undefined &&
        updates.category === undefined &&
        updates.description === undefined &&
        updates.stock_quantity === undefined
    ) {
        return;
    }

    if (updates.name) {
        db.query("UPDATE products SET name = ? WHERE id = ?", [updates.name, id]);
    }

    if (updates.price) {
        db.query("UPDATE products SET price = ? WHERE id = ?", [updates.price, id]);
    }

    if (updates.category) {
        db.query("UPDATE products SET category = ? WHERE id = ?", [updates.category, id]);
    }

    if (updates.description) {
        db.query("UPDATE products SET description = ? WHERE id = ?", [updates.description, id]);
    }

    if (updates.stock_quantity) {
        db.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [updates.stock_quantity, id]);
    }
}




