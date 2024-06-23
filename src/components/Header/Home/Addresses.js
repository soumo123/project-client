import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Addresses = ({ shopId }) => {
    const [modalShow, setModalShow] = useState(false);
    const userId = localStorage.getItem("userId")
    const type = localStorage.getItem("type")
    const [adressData, setSAddressData] = useState([])

    const getAllAdresses = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/checkout/getAdress?type=${type}&userId=${userId}&shop_id=${shopId}`)
            if (response.status === 200) {
                setSAddressData(response.data.data)
            } else {
                setSAddressData([])
            }

        } catch (error) {
            console.log(error)
            setSAddressData([])
        }
    }

    const handleShow = ()=>{
        setModalShow(true)
    }


    useEffect(() => {
        getAllAdresses()
    }, [])


    return (
        <>
            <div className="tab-pane fade show active" id="dashboard">
                <div className="address-book bg-white rounded p-5">
                    <div className="row g-6">
                        {
                            adressData && adressData.length === 0 ? (
                                <div className="">
                                    No Adress Added
                                </div>
                            ) : (
                                <>
                                    {
                                        adressData && adressData.map((ele) => (
                                            <div className="col-md-6">
                                                <div className="address-book-content pe-md-4 border-right position-relative">
                                                    {/* <div className="d-flex align-items-center gap-5 mb-4">
                                                        <h6 className="mb-0">Address Book</h6>
                                                         
                                                    </div> */}
                                                    <span onClick={handleShow}>Edit</span>
                                                    {/* <p className="text-uppercase fw-medium mb-3">
                                                        Default Shipping Address
                                                    </p> */}
                                                    <div className="address mt-4">
                                                        <p className="text-dark fw-bold mb-1">{ele.state}</p>
                                                        <p className="mb-0">
                                                            {ele.address}
                                                            <br />
                                                            {ele.state} {ele.pin}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>

            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update address
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Centered Modal</h4> */}
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Addresses