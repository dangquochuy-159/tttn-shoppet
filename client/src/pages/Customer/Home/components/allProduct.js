import { Fragment, useEffect, useState } from "react";
import _ from 'lodash';
import { Link } from "react-router-dom";
import CardProduct from "~/components/CardProduct";
import ConnectError from "~/components/ConnectError";
import Flickity from 'react-flickity-component'
import { CheckBadgeIcon } from "~/components/Icons";

function AllProduct() {
    const [connectServer, setConnectServer] = useState(false)
    const [products, setProducts] = useState([])
    const [groupProducts, setGroupProducts] = useState([])
    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categorys`).then(res => res.json()).then(data => {
            setCategorys(data.data)
            setConnectServer(true)
        }).catch(err => setConnectServer(false))

        fetch(`${process.env.REACT_APP_API_URL}/api/products`).then(res => res.json()).then(data => {
            setProducts(data.data)
            setGroupProducts(_.groupBy(data.data, 'category'))
            setConnectServer(true)
        }).catch(err => setConnectServer(false))
    }, [])
    const flickityOptions = {
        initialIndex: 0,
        pageDots: false,
        prevNextButtons: true,
        wrapAround: false, // cuộn vô hạn
        autoPlay: false,
        pauseAutoPlayOnHover: true,
    }


    const renderProductDektop = (array) => {
        const slideItem = [];
        for (let i = 0; i < array.length; i += 5) {
            const itemsInDiv = array.slice(i, i + 5);
            const div = (
                <div className="grid grid-cols-5 gap-2 mr-2">
                    {itemsInDiv.map((product, index) => (
                        <CardProduct key={product.slug} product={product} className="" />
                    ))}
                </div>
            );
            slideItem.push(div);
        }
        return slideItem;
    }
    const renderProductTablet = (array) => {
        const slideItem = [];
        for (let i = 0; i < array.length; i += 3) {
            const itemsInDiv = array.slice(i, i + 3);
            const div = (
                <div className="grid grid-cols-3 gap-2 mr-2">
                    {itemsInDiv.map((product, index) => (
                        <CardProduct key={product.slug} product={product} className="" />
                    ))}
                </div>
            );
            slideItem.push(div);
        }
        return slideItem;
    }
    const renderProductMobile = (array) => {
        const slideItem = [];
        for (let i = 0; i < array.length; i += 2) {
            const itemsInDiv = array.slice(i, i + 2);
            const div = (
                <div className="grid grid-cols-2 gap-2 mr-2">
                    {itemsInDiv.map((product, index) => (
                        <CardProduct key={product.slug} product={product} className="" />
                    ))}
                </div>
            );
            slideItem.push(div);
        }
        return slideItem;
    }

    return (
        <>
            <section id='sec-home_all_product' className="grid_layout wide mt-16">
                <h2 className="w-full title style-title sm:!text-xl md:!text-3xl text-4xl text-white bg-blue-500">
                    <span className="flex">
                        <CheckBadgeIcon width="36px" height="36px" />
                        <CheckBadgeIcon width="36px" height="36px" />
                    </span>
                    Tất cả sản  phẩm
                    <span className="flex">
                        <CheckBadgeIcon width="36px" height="36px" />
                        <CheckBadgeIcon width="36px" height="36px" />
                    </span>
                </h2>
                {
                    !connectServer ? <ConnectError /> :
                        products.length > 0 &&
                        <>
                            {
                                categorys.map((category, index) => (
                                    <>
                                        <div className="sm:!hidden md:!hidden slide-product w-full h-full overflow-hidden sm:!mt-4 mt-16 ">
                                            <h2 className="w-full title sm:!text-xl md:!text-3xl text-4xl text-black underline">{category.name}</h2>
                                            <Flickity
                                                className={'carousel w-full h-full focus-visible:outline-none sm:!mt-4 mt-16 pb-16'} // default ''
                                                elementType={'div'} // default 'div'
                                                options={flickityOptions} // takes flickity options {}
                                                disableImagesLoaded={false} // default false
                                                reloadOnUpdate // default false
                                                static // default false

                                            >
                                                {renderProductDektop(groupProducts[category.name])}
                                            </Flickity>
                                        </div>
                                        <div className="hidden md:!block slide-product w-full h-full overflow-hidden sm:!mt-4 mt-16 ">
                                            <h2 className="w-full title sm:!text-xl md:!text-3xl text-4xl text-black underline">{category.name}</h2>
                                            <Flickity
                                                className={'carousel w-full h-full focus-visible:outline-none sm:!mt-4 mt-16 pb-16'} // default ''
                                                elementType={'div'} // default 'div'
                                                options={flickityOptions} // takes flickity options {}
                                                disableImagesLoaded={false} // default false
                                                reloadOnUpdate // default false
                                                static // default false

                                            >
                                                {renderProductTablet(groupProducts[category.name])}
                                            </Flickity>
                                        </div>
                                        <div className="hidden sm:!block slide-product w-full h-full overflow-hidden sm:!mt-4 mt-16 ">
                                            <h2 className="w-full title sm:!text-xl md:!text-3xl text-4xl text-black underline">{category.name}</h2>
                                            <Flickity
                                                className={'carousel w-full h-full focus-visible:outline-none sm:!mt-4 mt-16 pb-16'} // default ''
                                                elementType={'div'} // default 'div'
                                                options={flickityOptions} // takes flickity options {}
                                                disableImagesLoaded={false} // default false
                                                reloadOnUpdate // default false
                                                static // default false

                                            >
                                                {renderProductMobile(groupProducts[category.name])}
                                            </Flickity>
                                        </div>
                                    </>
                                ))
                            }
                        </>
                }
            </section >
        </>
    );
}

export default AllProduct;