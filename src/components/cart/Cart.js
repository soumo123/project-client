import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import axios from 'axios'
import { noteRefs } from '../../redux/actions/userAction'

const Cart = () => {

    const dispatch = useDispatch()
    const cartData = useSelector((state) => state.cartDetails.carts)
    const [selectedIds, setSelectedIds] = useState([])
    const [count, setCount] = useState(1)
    const userId = localStorage.getItem("userId")
    const type = localStorage.getItem("type")
    const [loader, setloader] = useState(false);
    const[totalPriceItem,setTotalPriceItem] = useState(0)

    const handleDelete = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }
            const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/deleteCart?type=1&userId=${userId === null ? "" : userId}`, {
                productId: selectedIds
            }, config)

            if (response.status === 200) {
                dispatch(noteRefs(new Date().getSeconds()))
            }


        } catch (error) {

        }

    }

    const handleDecreaseProduct = async(pdId,item,price,totalPrice,weight,color) => {
        if(Number(item)===1){
            return 
        }else{
            let actualPrice = Number(totalPrice) - Number(price);
            setCount(Number(item) - 1)
            await updateCount(pdId,Number(item) - 1,actualPrice,(weight),color)
        }
        
    }


    const handleIncrease = async(pdId,item,price,weight,color) => {
        
        setCount(Number(item)+1)

        await updateCount(pdId,Number(item)+1,price*(Number(item)+1),(weight),color)
    }

    const handleSelectAll = () => {
        if (selectedIds.length === cartData.length) {
            setSelectedIds([]);
        } else {
            const allProductIds = cartData.map(item => item.productId);
            setSelectedIds(allProductIds);
        }
    };

    const updateCount = async(productId,count,price,w,c)=>{
        try {

            console.log("productId , count" , productId , count)
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }
            const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/count_update?type=${type}&userId=${userId}&productId=${productId}&count=${count}`, {
                totalPrice: price,
                weight:w,
                color:c
            }, config)

            if (response.status === 200) {
                dispatch(noteRefs(new Date().getSeconds()))
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (cartData) {
            setloader(true)
        } else {
            setloader(true)

        }
    }, [])

    useEffect(() => {
     setTotalPriceItem(cartData.reduce((total, product) => total + product.totalPrice, 0))
    }, [cartData])
    
console.log("totalPriceitem",totalPriceItem)

    return (

        <>


            <section className="cart-section ptb-120">
                {
                    !loader ? (
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="text-center">
                                        loading....
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {

                                cartData && cartData.length > 0 ? (
                                    <div className="container">
                                        <div className="select-all d-flex align-items-center justify-content-between bg-white rounded p-4">
                                            <div className="d-inline-flex gap-2 align-items-center">
                                                <div className="theme-checkbox">
                                                    <input type="checkbox" id="select-all" onChange={handleSelectAll} />
                                                    <span className="checkbox-field"><DoneOutlinedIcon /></span>
                                                </div>
                                                <label htmlFor="select-all">Select All ({selectedIds.length} ITEMS)</label>
                                            </div>
                                            {selectedIds.length > 0 && <span className="text-gray" style={{ cursor: "pointer" }} onClick={handleDelete}><span className="me-2"><DeleteSweepOutlinedIcon /></span>Delete</span>}
                                        </div>
                                        <div className="rounded-2 overflow-hidden">
                                            <table className="cart-table w-100 mt-4 bg-white">
                                                <thead>
                                                    <th>Image</th>
                                                    <th>Product Name</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Price</th>
                                                    <th>Price</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartData && cartData.length === 0 ? (
                                                            <tr>
                                                                <td>No Data Found</td>
                                                            </tr>
                                                        ) : (
                                                            <>
                                                                {
                                                                    cartData.map((ele) => (
                                                                        <tr>
                                                                            <td>
                                                                                <img src={ele.thumbImage} alt="product-thumb" className="img-fluid" />
                                                                            </td>
                                                                            <td className="text-start product-title">
                                                                                <h6 className="mb-0">{ele.name}</h6>
                                                                            </td>
                                                                            <td>
                                                                                <div className="product-qty d-inline-flex align-items-center">
                                                                                    <button className="decrese" value={ele.itemCount} onClick={(e)=>handleDecreaseProduct(ele.productId,e.target.value,ele.price,ele.totalPrice,ele.weight,ele.color)}>-</button>
                                                                                    <input type="text" name="count" value={ele.itemCount} />
                                                                                    <button className="increase" value={ele.itemCount} onClick={(e)=>handleIncrease(ele.productId,e.target.value,ele.price,ele.weight,ele.color)}>+</button>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <span className="text-dark fw-bold me-2 d-lg-none">Unit Price:</span>
                                                                                <span className="text-dark fw-bold">₹ {ele.price}</span>
                                                                            </td>
                                                                            <td>
                                                                                <span className="text-dark fw-bold me-2 d-lg-none">Total Price:</span>
                                                                                <span className="text-dark fw-bold">₹ {ele.totalPrice}</span>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row g-4">
                                            <div className="col-xl-7">
                                                {/* <div className="voucher-box py-7 px-5 position-relative z-1 overflow-hidden bg-white rounded mt-4">
                                                <img src="assets/img/shapes/circle-half.png" alt="circle shape" className="position-absolute end-0 top-0 z--1" />
                                                <h4 className="mb-3">What would you like to do next?</h4>
                                                <p className="mb-7">Choose if you have a discount code or reward points you want to use<br /> or would like to estimate your delivery cost.</p>
                                                <form className="d-flex align-items-center" action="#">
                                                    <input type="text" placeholder="Enter Your Voucher Cod" className="theme-input w-100" />
                                                    <button type="submit" className="btn btn-secondary flex-shrink-0">Apply Voucher</button>
                                                </form>
                                            </div> */}
                                            </div>
                                            <div className="col-xl-5">
                                                <div className="cart-summery bg-white rounded-2 pt-4 pb-6 px-5 mt-4">
                                                    <table className="w-100">

                                                        <tr className="border-top">
                                                            <td className="py-3">
                                                                <h5 className="mb-0">Total</h5>
                                                            </td>
                                                            <td className="text-end py-3">
                                                                <h5 className="mb-0">₹ {totalPriceItem}</h5>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <p className="mb-5 mt-2">Shipping options will be updated during checkout.</p>
                                                    <div className="btns-group d-flex gap-3">
                                                        <button type="submit" className="btn btn-primary btn-md rounded-1">Confirm Order</button>
                                                        <Link to='/products'><button type="button" className="btn btn-outline-secondary border-secondary btn-md rounded-1">Continue Shopping</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="text-center">
                                                    No Carts
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    )
                }

            </section>


        </>
    )
}

export default Cart