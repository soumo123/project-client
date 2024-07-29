import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { noteRefs } from '../../redux/actions/userAction'

const Checkout = () => {


    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [address, setAddress] = useState("");
    const [state, setState] = useState("")
    const [pin, setPin] = useState("")
    const [phone, setPhone] = useState("")
    const [appartMent, setAppartment] = useState("")
    const [shopId, setShopId] = useState("")
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [error4, setError4] = useState(false)
    const [modalls, setModalss] = useState("")
    const [adressData, setSAddressData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const userId = localStorage.getItem("userId")
    const type = localStorage.getItem("type")
    const [adressSelection, setAdressSelection] = useState("")
    const [partPrice, setPartPrice] = useState([100, 150, 200])
    const [ptPrice, setPtPrice] = useState(0)
    const [sgst, setSgst] = useState(0)
    const [cgst, setCgst] = useState(0)
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)
    // let cgst = 2.5;
    // let sgst = 2.5;
    const location = useLocation();
    const receivedData = location.state?.data; // using optional chaining to handle undefined state



    console.log("receivedDatareceivedData", receivedData)
    let totalPrice = receivedData && receivedData.reduce((sum, item) => sum + item.totalPrice, 0)

    const addAddress = async (e) => {
        e.preventDefault();
        if (address.length === 0) {
            setError1(true)
            return
        }
        if (!phone) {
            setError2(true)
            return
        }
        if (!state) {
            setError4(true)
            return
        }
        if (!pin) {
            setError3(true)
            return
        }


        try {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }
            let json = {
                address: address,
                phone: phone,
                state: state,
                pin: pin,
                appratment: appartMent
            }

            const respopnse = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/checkout/addAdddress?type=${type}&userId=${userId}&shop_id=${shopId}`, json, config)
            if (respopnse.status === 201) {
                alert.success("Adress Added")
                setModalss("modal")
                setRefresh(new Date().getSeconds())
                setAddress("")
                setState("")
                setPin("")
                setPhone("")
                setAppartment("")
                setError1(false)
                setError2(false)
                setError3(false)
                setError4(false)
            } else {
                alert.error("Adress Not Added")
                setAddress("")
                setState("")
                setPin("")
                setPhone("")
                setAppartment("")
                setError1(false)
                setError2(false)
                setError3(false)
                setError4(false)
            }

        } catch (error) {
            console.log(error)
            alert.error("Adress Not Added")
            setAddress("")
            setState("")
            setPin("")
            setPhone("")
            setAppartment("")
            setError1(false)
            setError2(false)
            setError3(false)
            setError4(false)
        }
    }


    const getTax = async () => {

        try {
          const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/get_tax`);
          if (response.status === 200) {
            setSgst(response.data.data.sgst)
            setCgst(response.data.data.cgst)
            setValue1(response.data.data.sgstvalue)
            setValue2(response.data.data.cgstvalue)
          }
    
        } catch (error) {
          console.log(error)
          setSgst(0)
          setCgst(0)
          setValue1(0)
          setValue2(0)
        }
    
    
      }
    
      useEffect(() => {
        getTax()
      }, [])
      

    const getShopId = async () => {

        try {
            const respopnse = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/checkout/getshopid?type=${type}`)

            if (respopnse.status === 200) {
                setShopId(respopnse.data.data)
            } else {
                setShopId("")
            }
        } catch (error) {
            console.log(error)
            setShopId("")
        }
    }

    const getAllAdresses = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/checkout/getAdress?type=${type}&userId=${userId}&shop_id=${shopId}`)
            if (response.status === 200) {
                setSAddressData(response.data.data)
                setAdressSelection(response.data.data.length)
            } else {
                setSAddressData([])
            }

        } catch (error) {
            console.log(error)
            setSAddressData([])
        }
    }

    const handlePartPrice = (e) => {
        setPtPrice(e)
    }

    const handleCreateOrder = async () => {

        try {

            let json = {
                receivedData: receivedData,
                cgst: (totalPrice * Number(value2)),
                sgst: (totalPrice * Number(value1)),
                initialDeposit: ptPrice,
                orderedPrice: (totalPrice + ((totalPrice * Number(value2))) + ((totalPrice * Number(value1)))),
            }
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }

            const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/orders/create?type=${type}&userId=${userId}&shop_id=${shopId}`, json, config)
            if (response.status === 201) {
                alert.success("order created")
                dispatch(noteRefs(new Date().getSeconds()))
                setTimeout(() => {
                    navigate("/account")
                }, 2000);
            } else {
                alert.error("Something went wrong")
            }

        } catch (error) {
            console.log(error)
            alert.error("!Ooops , something error")
        }

    }

    useEffect(() => {
        getShopId()
        if (receivedData === undefined) {
            navigate("/")
        }
    }, [receivedData])

    useEffect(() => {
        if (shopId) {
            getAllAdresses()
        }
    }, [shopId, refresh])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    console.log("adressSelection", adressSelection)

    return (
        <>
            <div className="main-wrapper">
                <div className="checkout-section ptb-120">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-xl-8">
                                <div className="checkout-steps">
                                    <div className="d-flex justify-content-between">
                                        <h4 className="mb-5">Shipment Address</h4>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#addAddressModal" className="fw-semibold"><i className="fas fa-plus me-1"></i> Add Address</a>
                                    </div>
                                    <div className="row g-4">
                                        {
                                            adressData && adressData.length === 0 ? (
                                                <div className="">
                                                    No Adress Added
                                                </div>
                                            ) : (
                                                <>
                                                    {
                                                        adressData && adressData.map((ele) => (
                                                            <div className="col-lg-6 col-sm-6">
                                                                <div className="tt-address-content" onClick={(e) => setAdressSelection(ele.id)}>
                                                                    <input type="radio" className="tt-custom-radio" checked name="tt-radio" id={ele.address} />
                                                                    <label for={ele.address} className="tt-address-info bg-white rounded p-4 position-relative">
                                                                        <strong>{ele.state}</strong>
                                                                        <address className="fs-sm mb-0">
                                                                            {ele.address}<br />
                                                                            {ele.state} {ele.pin}
                                                                        </address>
                                                                        <span className="tt-edit-address checkout-radio-link position-absolute">Edit</span>

                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            )
                                        }



                                        {/* <div className="col-lg-6 col-sm-6">
                                            <div className="tt-address-content">
                                                <input type="radio" className="tt-custom-radio" name="tt-radio" id="tt-radio-2" />
                                                <label for="tt-radio-2" className="tt-address-info bg-white rounded p-4 position-relative">
                                                    <strong>Los Angeles </strong>
                                                    <address className="fs-sm mb-0">
                                                        76 Ferny Avenue <br />
                                                        Oakwood Qld 4670
                                                    </address>
                                                    <a href="#" className="tt-edit-address checkout-radio-link position-absolute">Edit</a>
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>


                                    {/* <h4 className="mb-5 mt-8">Billing Address</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-4 col-sm-6">
                                            <div className="tt-address-content">/
                                                <input type="radio" className="tt-custom-radio" name="tt-radio-billing" checked id="tt-radio-3" />
                                                <label for="tt-radio-3" className="tt-address-info bg-white rounded p-4 position-relative">
                                                    <strong>Los Angeles </strong>
                                                    <address className="fs-sm mb-0">
                                                        76 Ferny Avenue <br />
                                                        Oakwood Qld 4670
                                                    </address>
                                                    <a href="#" className="tt-edit-address checkout-radio-link position-absolute">Edit</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <div className="tt-address-content">
                                                <input type="radio" className="tt-custom-radio" name="tt-radio-billing" id="tt-radio-4" />
                                                <label for="tt-radio-4" className="tt-address-info bg-white rounded p-4 position-relative">
                                                    <strong>Los Angeles </strong>
                                                    <address className="fs-sm mb-0">
                                                        76 Ferny Avenue <br />
                                                        Oakwood Qld 4670
                                                    </address>
                                                    <a href="#" className="tt-edit-address checkout-radio-link position-absolute">Edit</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-sm-6">
                                            <div className="tt-address-content">
                                                <input type="radio" className="tt-custom-radio" name="tt-radio-billing" id="tt-radio-5" />
                                                <label for="tt-radio-5" className="tt-address-info bg-white rounded p-4 position-relative">
                                                    <strong>Los Angeles </strong>
                                                    <address className="fs-sm mb-0">
                                                        76 Ferny Avenue <br />
                                                        Oakwood Qld 4670
                                                    </address>
                                                    <a href="#" className="tt-edit-address checkout-radio-link position-absolute">Edit</a>
                                                </label>
                                            </div>
                                        </div>

                                    </div> */}

                                    {/* <h4 className="mt-8">Payment Method</h4>
                                    <div className="checkout-form mt-4 py-7 px-5 bg-white rounded-2">
                                        <div className="form-title d-flex align-items-center mb-5">
                                            <div className="theme-radio">
                                                <input type="radio" id="shipment" checked />
                                                <span className="custom-radio"></span>
                                            </div>
                                            <label className="h6 mb-0 ms-2" for="shipment">Credit Card or Debit Card</label>
                                        </div>
                                        <form>
                                            <div className="row g-4">
                                                <div className="col-sm-12">
                                                    <div className="label-input-field mt-0">
                                                        <input type="text" placeholder="****  **** **** 7898" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="label-input-field mt-0">
                                                        <input type="text" placeholder="12 / 24" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="label-input-field mt-0">
                                                        <input type="text" placeholder="****" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="label-input-field mt-0">
                                                        <input type="tel" placeholder="478958" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="label-input-field">
                                                        <label>City</label>
                                                        <input type="text" placeholder="City" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="label-input-field">
                                                        <label>State</label>
                                                        <input type="text" placeholder="State" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="label-input-field">
                                                        <label>Zip Code</label>
                                                        <input type="text" placeholder="Dhaka-1230" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mt-4 flex-wrap">
                                                <div className="checkbox d-flex align-items-center gap-2 me-3">
                                                    <div className="theme-checkbox flex-shrink-0">
                                                        <input type="checkbox" id="save-card" />
                                                        <span className="checkbox-field"><i className="fa-solid fa-check"></i></span>
                                                    </div>
                                                    <label for="save-card">Save this Credit Card for later use</label>
                                                </div>
                                                <div className="checkbox d-flex align-items-center gap-2">
                                                    <div className="theme-checkbox flex-shrink-0">
                                                        <input type="checkbox" id="billing-info" />
                                                        <span className="checkbox-field"><i className="fa-solid fa-check"></i></span>
                                                    </div>
                                                    <label for="billing-info">Billing same as Shipping address</label>
                                                </div>
                                            </div>
                                            <div className="mt-6 d-flex">
                                                <button type="submit" className="btn btn-secondary btn-md me-3">Use this Card</button>
                                                <button type="button" className="btn btn-outline-secondary border-secondary btn-md">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="checkout-radio d-flex align-items-center justify-content-between gap-3 bg-white rounded p-4 mt-4">
                                        <div className="radio-left d-inline-flex align-items-center">
                                            <div className="theme-radio">
                                                <input type="radio" id="paypal" />
                                                <span className="custom-radio"></span>
                                            </div>
                                            <label for="paypal" className="ms-2 h6 mb-0">Paypal</label>
                                        </div>
                                        <div className="radio-right text-end">
                                            <img src="assets/img/brands/paypal-black.png" alt="paypal" className="img-fluid" />
                                        </div>
                                    </div> */}
                                </div>




                                <div className="modal fade" id="addAddressModal">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                                                <div className="gstore-product-quick-view bg-white rounded-3 py-6 px-4">
                                                    <h2 className="modal-title fs-5 mb-3">Add New Address</h2>
                                                    <div className="row align-items-center g-4 mt-3">
                                                        <form action="#">
                                                            <div className="row g-4">
                                                                {/* <div className="col-sm-6">
                                                            <div className="label-input-field">
                                                                <label>First Name</label>
                                                                <input type="text" placeholder="Saiful"/>
                                                            </div>
                                                        </div> */}
                                                                {/* <div className="col-sm-6">
                                                            <div className="label-input-field">
                                                                <label>Last Name</label>
                                                                <input type="text" placeholder="Talukdar"/>
                                                            </div>
                                                        </div> */}
                                                                <div className="col-sm-12">
                                                                    <div className="label-input-field">
                                                                        <label>Street Address</label>
                                                                        <input type="text" placeholder="Enter your street adress or home adress" value={address} onChange={(e) => setAddress(e.target.value)} />

                                                                    </div>

                                                                    {
                                                                        address.length === 0 ? (
                                                                            <>
                                                                                {
                                                                                    error1 ? (
                                                                                        <p className="validation-error">This Field is required</p>
                                                                                    ) : (
                                                                                        ""
                                                                                    )
                                                                                }

                                                                            </>
                                                                        ) : ("")
                                                                    }
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="label-input-field">
                                                                        <label>Mobile</label>
                                                                        <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                                    </div>

                                                                    {
                                                                        phone.length === 0 ? (
                                                                            <>
                                                                                {
                                                                                    error2 ? (
                                                                                        <p className="validation-error">This Field is required</p>
                                                                                    ) : (
                                                                                        ""
                                                                                    )
                                                                                }

                                                                            </>
                                                                        ) : ("")
                                                                    }
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="label-input-field">
                                                                        <label>Apt Number</label>
                                                                        <input type="text" placeholder="Apart Number" value={appartMent} onChange={(e) => setAppartment(e.target.value)} />
                                                                    </div>

                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="label-input-field">
                                                                        <label>State</label>
                                                                        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                                                                    </div>
                                                                    {
                                                                        state.length === 0 ? (
                                                                            <>
                                                                                {
                                                                                    error4 ? (
                                                                                        <p className="validation-error">This Field is required</p>
                                                                                    ) : (
                                                                                        ""
                                                                                    )
                                                                                }

                                                                            </>
                                                                        ) : ("")
                                                                    }
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <div className="label-input-field">
                                                                        <label>Zip Code</label>
                                                                        <input type="text" placeholder="Pin code" value={pin} onChange={(e) => setPin(e.target.value)} />
                                                                    </div>
                                                                    {
                                                                        pin.length === 0 ? (
                                                                            <>
                                                                                {
                                                                                    error3 ? (
                                                                                        <p className="validation-error">This Field is required</p>
                                                                                    ) : (
                                                                                        ""
                                                                                    )
                                                                                }

                                                                            </>
                                                                        ) : ("")
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="mt-6 d-flex">
                                                                <button type="submit" className="btn btn-secondary btn-md me-3" data-bs-dismiss={modalls} aria-label="Close" onClick={addAddress}>Use this Address</button>
                                                                <button type="submit" className="btn btn-outline-secondary border-secondary btn-md" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-xl-4">
                                <div className="checkout-sidebar">
                                    <div className="sidebar-widget checkout-sidebar py-6 px-4 bg-white rounded-2">
                                        <div className="widget-title d-flex">
                                            <h5 className="mb-0 flex-shrink-0">Order Summery</h5>
                                            <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                                        </div>
                                        <table className="sidebar-table w-100 mt-5">
                                            <tr>
                                                <td>Items({receivedData?.length}):</td>
                                                <td className="text-end">
                                                    {
                                                        receivedData && receivedData.map((ele) => (
                                                            <p>
                                                                {ele.itemCount} x ₹{ele.price} = ₹{ele.totalPrice}
                                                            </p>
                                                        ))
                                                    }
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>CGST:</td>
                                                <td className="text-end">{Number(cgst)} %</td>
                                            </tr>
                                            <tr>
                                                <td>SGST:</td>
                                                <td className="text-end">{Number(sgst)}%</td>
                                            </tr>
                                            <tr>
                                                <td class="text-dark fw-semibold">* Initial Payment (You have to select some amount while you order )</td>
                                                <td>
                                                    {partPrice?.map((ele) => (
                                                        <ul class="product-radio-btn mb-4 d-flex align-items-center gap-2">
                                                            <li>
                                                                <input type="radio" name="weight" value={ele} onChange={(e) => handlePartPrice(ele)} />
                                                                <label>₹ {ele}</label>
                                                            </li>
                                                        </ul>

                                                    ))}
                                                </td>
                                            </tr>
                                        </table>
                                        <span className="sidebar-spacer d-block my-4 opacity-50"></span>
                                        {
                                            ptPrice === 0 ? ("") : (
                                                <>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6 className="mb-0 fs-md">Total</h6>
                                                        <h6 className="mb-0 fs-md">₹ {((totalPrice + (totalPrice * Number(value1)) + (totalPrice * Number(value2))) - (ptPrice)).toFixed(2)}</h6>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-md rounded mt-6 w-100" onClick={handleCreateOrder}>Place Order</button>
                                                    <p className="mt-3 mb-0 fs-xs">By Placing your order your agree to our company <a href="#">Privacy-policy</a></p>
                                                </>

                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Checkout