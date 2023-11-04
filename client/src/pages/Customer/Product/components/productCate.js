import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import CardProduct from "~/components/CardProduct";

function ProductCategory({ products, valueParams, priceFilter }) {
    const [productsFilter, setProductsFilter] = useState(products)


    useEffect(() => {
        let dataProduct = []
        products.map(product => {
            (product.sale_price < priceFilter || product.price < priceFilter) &&
                dataProduct.push(product)
        })
        setProductsFilter(dataProduct)

    }, [priceFilter])

    return (
        <section id='sec-product_category'>
            <h2 className='py-2 text-xl font-bold'>{valueParams}</h2>
            <div className="grid sm:!grid-cols-2 md:!grid-cols-3 grid-cols-4 gap-6 py-4">
                {
                    productsFilter.length > 0 ?
                        productsFilter.map((product, index) => <CardProduct key={index} product={product} />) :
                        <div className='col-span-4 p-4 bg-white'><p>Không có sản phẩm tương ứng trong danh mục này </p></div>
                }
            </div>

        </section>
    );
}

ProductCategory.propTypes = {
    products: PropTypes.array.isRequired,
    valueParams: PropTypes.string.isRequired,
    priceFilter: PropTypes.string.isRequired,
}

export default ProductCategory