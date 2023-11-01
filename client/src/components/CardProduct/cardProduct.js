import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { Button } from "~/components/Button";
import { CartIcon, SearchIcon, FireIcon } from "../Icons";

import './cardProduct.scss'
import Image from '../Image';
import CustomerContext from '~/context/CustomerContext';
import { useContext } from 'react';
import axios from 'axios';
import { changeNumberToPrice } from '~/utils/SupportFunction/supportFunction';

function CardProduct({ className = '', product }) {
    const [userLogin] = useContext(CustomerContext)

    const handleAddCart = () => {
        if (userLogin) {
            let price = product.sale_price ? product.sale_price : product.price
            axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userLogin._id}/cart/${product._id}?quantity=1&price=${price}`)
                .then(() => {
                    alert('Thêm vào giỏ hàng thành công')
                    window.location.reload()
                })
        } else {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
        }

    }
    return (
        <div className={`rounded-xl shadow-xl shadow-white relative ${className}`}>
            <div className="overflow-hidden rounded-t-xl">
                <Image src={`${process.env.REACT_APP_API_URL}/api/products/${product._id}/${product.photo}`} alt='anh_san_pham'
                    className="transition-all rounded-t-xl hover:scale-125" />
            </div>
            <div className="flex flex-col items-center gap-1 p-4 rounded-b-xl bg-white">
                <Link to='/'
                    className="limit-text sm:!h-[2.5rem] sm:!max-h-[2.5rem] h-[3.5rem] max-h-[3.5rem] sm:!text-sm text-xl text-black text-center font-medium hover:text-[var(--primary-color)]">
                    {product.name}
                </Link>
                <p className="flex min-h-[64px] flex-col items-center justify-start gap-x-4 text-xl">
                    <span className="text-red-600 font-bold">{product.sale_price && changeNumberToPrice(product.sale_price)}</span>
                    <span className={`text-red-600 font-bold ${product.sale_price && 'line-through text-black font-normal text-sm'}`}>{changeNumberToPrice(product.price)}</span>
                </p>
                <div className="sm:!hidden w-full flex justify-center gap-2">
                    <Button type='primary' leftIcon={<CartIcon />} className="w-1/3 text-white bg-red-500 hover:bg-red-400" onClick={handleAddCart} />
                    <Button to='/login' type='primary' leftIcon={<SearchIcon />} className="w-1/3 text-white bg-blue-500 hover:bg-blue-400" />
                </div>
            </div>
            {
                product.outstand &&
                <div className="w-10 h-10 flex justify-center items-center rounded-full absolute top-2 left-2 bg-red-600">
                    <FireIcon className="text-xl text-white" />
                </div>
            }
            {
                product.sale_price &&
                <div className="w-12 h-12 flex justify-center items-start pt-2 absolute top-0 right-2 bg-yellow-400">
                    <p className="percent-reduce text-lg text-red-500 font-bold" >-{(100 - ((product.sale_price / product.price) * 100)).toFixed(0)}%</p>
                </div>
            }
        </div>
    );
}

CardProduct.propTypes = {
    product: PropTypes.object.isRequired,
}

export default CardProduct;