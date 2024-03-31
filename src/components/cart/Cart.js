import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import axios from 'axios'
import { noteRefs } from '../../redux/actions/userAction'

const Cart = () => {

    const dispatch = useDispatch()
    const cartData = useSelector((state) => state.cartDetails.carts)
    const[selectedIds,setSelectedIds]=useState([])
    const[count,setCount] = useState(0)
    const userId = localStorage.getItem("userId")
    

    const handleDelete = async()=>{
        try {
            const config = {
                headers: {
                     'Content-Type': "application/json",
                },
                withCredentials: true
           }
            const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/deleteCart?type=1&userId=${userId === null ? "" : userId}` ,  {
                productId:selectedIds
            }, config)

            if(response.status===200){
                dispatch(noteRefs(new Date().getSeconds()))
            }
            

        } catch (error) {
            
        }

    }

    const handleDecreaseProduct = ()=>{
        
    }

    const handleIncrease = ()=>{

    }


    const handleSelectAll = () => {
        if (selectedIds.length === cartData.length) {
            setSelectedIds([]);
        } else {
            const allProductIds = cartData.map(item => item.productId);
            setSelectedIds(allProductIds);
        }
    };

    console.log("cartData", cartData)

    return (

        <>
            <section className="cart-section ptb-120">
                <div className="container">
                    <div className="select-all d-flex align-items-center justify-content-between bg-white rounded p-4">
                        <div className="d-inline-flex gap-2 align-items-center">
                            <div className="theme-checkbox">
                                <input type="checkbox" id="select-all"  onChange={handleSelectAll} />
                                <span className="checkbox-field"><DoneOutlinedIcon/></span>
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
                                                                <button className="decrese" onChange={handleDecreaseProduct}>-</button>
                                                                <input type="text" name="count" value={ele.itemCount}/>
                                                                <button className="increase" onChange={handleIncrease}>+</button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="text-dark fw-bold me-2 d-lg-none">Unit Price:</span>
                                                            <span className="text-dark fw-bold">₹ {ele.price}</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-dark fw-bold me-2 d-lg-none">Total Price:</span>
                                                            <span className="text-dark fw-bold">$140.00</span>
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
                            <div className="voucher-box py-7 px-5 position-relative z-1 overflow-hidden bg-white rounded mt-4">
                                <img src="assets/img/shapes/circle-half.png" alt="circle shape" className="position-absolute end-0 top-0 z--1" />
                                <h4 className="mb-3">What would you like to do next?</h4>
                                <p className="mb-7">Choose if you have a discount code or reward points you want to use<br /> or would like to estimate your delivery cost.</p>
                                <form className="d-flex align-items-center" action="#">
                                    <input type="text" placeholder="Enter Your Voucher Cod" className="theme-input w-100" />
                                    <button type="submit" className="btn btn-secondary flex-shrink-0">Apply Voucher</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-5">
                            <div className="cart-summery bg-white rounded-2 pt-4 pb-6 px-5 mt-4">
                                <table className="w-100">
                                    {/* <tr>
                                    <td className="py-3">
                                        <h5 className="mb-0 fw-medium">Subtotal</h5>
                                    </td>
                                    <td className="py-3">
                                        <h5 className="mb-0 fw-semibold text-end">$1138,00</h5>
                                    </td>
                                </tr> */}
                                    <tr className="border-top">
                                        <td className="py-3">
                                            <h5 className="mb-0">Total</h5>
                                        </td>
                                        <td className="text-end py-3">
                                            <h5 className="mb-0">$918,00</h5>
                                        </td>
                                    </tr>
                                </table>
                                <p className="mb-5 mt-2">Shipping options will be updated during checkout.</p>
                                <div className="btns-group d-flex gap-3">
                                    <button type="submit" className="btn btn-primary btn-md rounded-1">Confirm Order</button>
                                    <button type="button" className="btn btn-outline-secondary border-secondary btn-md rounded-1">Continue Shopping</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        
        </>
    )
}

export default Cart