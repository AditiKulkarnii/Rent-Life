import React, { createContext } from 'react';
import { db } from '../../../firebase';

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
    state = {
        products: [],
        electronicsProducts: [],
        musicalInstrumentProducts: [],
        vehicleProducts: [],
        housingProducts: [],
        furnitureProducts: [],
    };

    componentDidMount() {
        db.collection('Product').onSnapshot(snapshot => {
            let products = [];
            let electronicsProducts = [];
            let musicalInstrumentProducts = [];
            let vehicleProducts = [];
            let furnitureProducts = [];
            let housingProducts = [];
        
            snapshot.forEach(doc => {
                const product = {
                    ProductID: doc.id,
                    ProductName: doc.data().ProductName,
                    ProductPrice: doc.data().ProductPrice,
                    ProductImgs: doc.data().ProductImgs,
                    ProductType: doc.data().ProductType,
                    ProductDes: doc.data().ProductDes,
                    TransactionType: doc.data().TransactionType,
                    Email: doc.data().Email


                    // Bathrooms: doc.data().Bathrooms || null,
                    // Bedrooms: doc.data().Bedrooms || null,
                    // Furnished: doc.data().Furnished || false,
                };
        
                products.push(product);
        
                if (product.ProductType === 'electronics') {
                    electronicsProducts.push(product);
                } else if (product.ProductType === 'musical instrument') {
                    musicalInstrumentProducts.push(product);
                } else if (product.ProductType === 'vehicle') {
                    vehicleProducts.push(product);
                } else if (product.ProductType === 'housing') {
                    housingProducts.push(product);
                    
                    db.collection('House').doc(doc.id).set({
                        ProductID: product.ProductID,
                        ProductName: product.ProductName,
                        ProductPrice: product.ProductPrice,
                        ProductDes: product.ProductDes,
                        Email: product.Email,
                        ProductImg: product.ProductImg,
                        TransactionType: product.TransactionType,
                        Bathrooms: product.Bathrooms,
                        Bedrooms: product.Bedrooms,
                        Furnished: product.Furnished
                    });
                } else if (product.ProductType === 'furniture') {
                    furnitureProducts.push(product);
                }
                
            });

            this.setState({
                products: products,
                electronicsProducts: electronicsProducts,
                musicalInstrumentProducts: musicalInstrumentProducts,
                vehicleProducts: vehicleProducts,
                housingProducts: housingProducts,
                furnitureProducts: furnitureProducts,
            });
        });
    }

    render() {
        return (
            <ProductsContext.Provider
                value={{
                    products: [...this.state.products],
                    electronicsProducts: [...this.state.electronicsProducts],
                    musicalInstrumentProducts: [...this.state.musicalInstrumentProducts],
                    vehicleProducts: [...this.state.vehicleProducts],
                    housingProducts: [...this.state.housingProducts],
                    furnitureProducts: [...this.state.furnitureProducts],
                }}
            >
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}