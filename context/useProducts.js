import axios from "axios";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState, useEffect } from "react";
export const API_URL = 'https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6';

/**
 * Hook para obtener una referencia a productos de mercado libre
 * y para obtener metodos para agregar compradores y categorías
 * a esos productos
 * 
 * @typedef {{
 *  id: string
 *  price: string
 *  title: string
 *  categorias: string[]
 *  compradores: string[]
 *  thumbnail: string
 *  condition: string
 *  installments: {
 *      amount: string
 *      quantity: number
 *      rate: number
 *  }
 * }} Producto
 * 
 * @returns {{
 *  list: Producto[], 
 *  loading: boolean, 
 *  addCategoryToProduct: (productId: string, categoryId: string) => void,
 *  removeCategoryFromProduct: (productId: string, categoryId: string) => void,
 *  addBuyerToProduct: (productId: string, buyer: string) => void,
 *  removeBuyerFromProduct: (productId: string, buyer: string) => void
 * }}
 */
const useProductos = () => {
    /**@type {[Producto[], import("react").Dispatch<import("react").SetStateAction<Producto[]>>} */
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                setProductos(response.data.results.map(result => ({...result, compradores: [], categorias: []})));
                setLoading(false);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        })();
    },[]);

    /**
     * @type {(productId: string, category: string) => void}
     */
    const addCategoryToProduct = useCallback((productId,category) => {
        setProductos(prev => prev.map(producto => producto.id === productId ? 
            {...producto, categorias: [...producto.categorias, category]} 
                :
            producto
        ));
    },[]);

    /**
     * @type {(productId: string, category: string) => void}
     */
    const removeCategoryFromProduct = useCallback((productId,category) => {
        setProductos(prev => prev.map(producto => producto.id === productId ? 
            {...producto, categorias: producto.categorias.filter(prevCategory => prevCategory !== category)}
                :
            producto
        ));
    },[]);

    /**
     * @type {(productId: string, buyer: string) => void}
     */
    const addBuyerToProduct = useCallback((productId,buyer) => {
        setProductos(prev => prev.map(producto => producto.id === productId ? 
            {...producto, compradores: [...producto.compradores, buyer]} 
                :
            producto
        ));
    },[]);

    /**
     * @type {(productId: string, buyer: string) => void}
     */
    const removeBuyerFromProduct = useCallback((productId,buyer) => {
        setProductos(prev => prev.map(producto => producto.id === productId ? 
            {...producto, compradores: producto.compradores.filter(prevBuyer => prevBuyer !== buyer)}
                :
            producto
        ));
    },[]);

    return useMemo(() => ({
        list: productos,
        loading, 
        addCategoryToProduct,
        removeCategoryFromProduct,
        addBuyerToProduct,
        removeBuyerFromProduct
    }),[
        productos, 
        loading, 
        addCategoryToProduct,
        removeCategoryFromProduct,
        addBuyerToProduct,
        removeBuyerFromProduct
    ]);
};

export default useProductos;