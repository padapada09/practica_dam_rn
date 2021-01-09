import React, {useState, createContext, useEffect} from 'react';
import defaultCategories from './defaultCategories';
import defaultBuyers from './defaultBuyers';
import useProductos from './useProducts';

/**
 * 
 * @typedef {{
 *  id: string
 *  email: string
 *  nombre: string
 * }} Comprador
 * 
 * @typedef {{
 *  id: string
 *  nombre: string
 *  color: string
 * }} Categoria
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
 *    amount: string
 *    quantity: number
 *    rate: number
 *  }
 * }} Producto
 * 
 * @type {React.Context<{
 *  productos: {
 *    list: Producto[],
 *    loading: boolean
 *    addCategoryToProduct: (productId: string, categoryId: string) => void,
 *    removeCategoryFromProduct: (productId: string, categoryId: string) => void,
 *    addBuyerToProduct: (productId: string, buyer: string) => void,
 *    removeBuyerFromProduct: (productId: string, buyer: string) => void
 *  },
 *  compradores: Comprador[],
 *  setCompradores: React.Dispatch<React.SetStateAction<Comprador[]>>,
 *  categorias: Categoria[],
 *  setCategorias: React.Dispatch<React.SetStateAction<Categoria[]>>,
 * }>}
 */
export const StoreContext = createContext(undefined);

export const StoreProvider = ({children}) => {
  const productos = useProductos();
  const [categorias, setCategorias] = useState(defaultCategories);
  const [compradores, setCompradores] = useState(defaultBuyers);

  return (
    <StoreContext.Provider
      value={{
        productos,
        compradores,
        setCompradores,
        categorias,
        setCategorias,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
