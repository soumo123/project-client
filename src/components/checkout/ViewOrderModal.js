import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const ViewOrderModal = ({ show, setModalShow, viewData, setViewData, setLoad }) => {

    console.log("viewData",viewData)

    const dispatch = useDispatch()
    const alert = useAlert()
    const userId = localStorage.getItem("userId")
    const type = localStorage.getItem("type")
    const steps = [
        { label: 'Pending', icon: AccessTimeIcon },
        { label: 'Accept', icon: CheckCircleOutlineIcon },
        { label: 'Processing', icon: LocalShippingIcon },
        { label: 'Complete', icon: StorefrontIcon }
    ];
    const activeStep = viewData?.status;
    const handleCloseModal = () => {
        setModalShow(false)
        setViewData([])
    }

    const handleCancel = async (orderId, productId) => {
        try {
            let check;
            console.log("viewData?.products.length", viewData?.products.length)
            if (viewData?.products.length > 1) {
                check = 1
            } else {
                check = 0
            }
            console.log("check", check)
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }

            const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/orders/cancel?userId=${userId}&orderId=${orderId}&productId=${productId}&check=${Number(check)}`, config)
            if (response.status === 200) {
                alert.success("Product removed from Order")
                setModalShow(false)
                setViewData([])
                dispatch(setLoad(new Date().getSeconds()))

            } else {
                alert.error("Product not removed from Order")
            }

        } catch (error) {
            console.log(error)

        }
    }

    const StepIcon = (props) => {
        const { icon, active } = props;
        const step = steps[icon - 1];

        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    border: active ? '2px solid green' : '2px solid gray',
                    borderRadius: '50%',
                }}
            >
                {step.icon ? (
                    <step.icon style={{ width: '100%', height: '100%' }} />
                ) : (
                    <img src={step.img} alt={step.label} style={{ width: '100%', height: '100%' }} />
                )}
            </div>
        );
    };

    // Custom StepConnector with conditional styling
    const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 12,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
               border:"2px solid green"
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                border:"2px solid green"
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: 'gray',
            borderTopWidth: 2,
        },
    }));

    return (

        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        View Order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{viewData?.orderId}</h4>
                    <div class="card card-1">

                        <div class="card-body">
                            <div class="row justify-content-between mb-3">
                                <div class="col-auto"> <h6 class="color-1 mb-0 change-color">Receipt</h6> </div>
                                {/* <div class="col-auto  "> <small>Receipt Voucher : 1KAU9-84UIL</small> </div> */}
                            </div>
                            {
                                viewData && viewData?.products?.map((ele) => (
                                    <div class="row mt-4">
                                        <div class="col">
                                            <div class="card card-2">
                                                <div class="card-body">
                                                    <div class="media">
                                                        <div class="sq align-self-center "> <img class="img-fluid  my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0" src={ele.thumbImage} width="135" height="135" /> </div>
                                                        <div class="media-body my-auto text-right">
                                                            <div class="row  my-auto flex-column flex-md-row">
                                                                <div class="col my-auto"> <h6 class="mb-0">{ele.name}</h6>  </div>
                                                                <div class="col-auto my-auto"> <small>Golden Rim </small></div>
                                                                {/* {ele.weight === "" ? "" : (<div class="col my-auto"> <small>Weight : {ele.weight.map(item=>(item.value))}</small></div>)} */}
                                                                {ele.color === "" ? "" : (<div class="col my-auto"> <small>Color : {ele.color}</small></div>)}

                                                                <div class="col my-auto"> <small>Price : ₹ {ele.price}</small></div>
                                                                <div class="col my-auto"> <small>Qty : {ele.itemCount}</small></div>
                                                                <div class="col my-auto"><h6 class="mb-0">&#8377;{ele.totalPrice}</h6>
                                                                </div>
                                                            </div>
                                                            {viewData?.status === 1 ? ("") : (<button type="button" class="btn btn-primary btn-sm mt-3" onClick={() => handleCancel(viewData?.orderId, ele.productId)}>Cancel order</button>)}
                                                        </div>
                                                    </div>
                                                    <hr class="my-3 " />
                                                    {/* <div class="row">
                                                        <div class="col-md-3 mb-3"> <small> Track Order <span><i class=" ml-2 fa fa-refresh" aria-hidden="true"></i></span></small> </div>
                                                        <div class="col mt-auto">
                                                            <div class="progress my-auto"> <div class="progress-bar progress-bar  rounded" style={{ width: "62%" }} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div> </div>
                                                            <div class="media row justify-content-between ">
                                                                <div class="col-auto text-right"><span> <small class="text-right mr-sm-2"></small> <i class="fa fa-circle active"></i> </span></div>
                                                                <div class="flex-col"> <span> <small class="text-right mr-sm-2">Out for delivary</small><i class="fa fa-circle active"></i></span></div>
                                                                <div class="col-auto flex-col-auto"><small class="text-right mr-sm-2">Delivered</small><span> <i class="fa fa-circle"></i></span></div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                          <div className="row mt-4">
      <h4>Track Order</h4>
      <Box sx={{ width: '100%' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomStepConnector />}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={(props) => <StepIcon {...props} active={index === activeStep - 1} />}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>

                            <div class="row mt-4">
                                <div class="col">
                                    <div class="row justify-content-between">
                                        {/* <div class="col-auto"><p class="mb-1 text-dark"><b>Order Details</b></p></div> */}
                                        <div class="flex-sm-col text-right col"> <p class="mb-1"><b>CGST</b></p> </div>
                                        <div class="flex-sm-col col-auto"> <p class="mb-1">&#8377;{viewData?.cgst?.toFixed(2)}</p> </div>
                                    </div>
                                    <div class="row justify-content-between">
                                        <div class="flex-sm-col text-right col"><p class="mb-1"> <b>SGST</b></p> </div>
                                        <div class="flex-sm-col col-auto"><p class="mb-1">&#8377;{viewData?.sgst?.toFixed(2)}</p></div>
                                    </div>
                                    <div class="row justify-content-between">
                                        <div class="flex-sm-col text-right col"><p class="mb-1"><b>Initial Deposit</b></p></div>
                                        <div class="flex-sm-col col-auto"><p class="mb-1">- {viewData?.initialDeposit}</p></div>
                                    </div>
                                    <div class="row justify-content-between">
                                        <div class="flex-sm-col text-right col"><p class="mb-1"><b>Total</b></p></div>
                                        <div class="flex-sm-col col-auto"><p class="mb-1">₹ {viewData?.orderedPrice?.toFixed(2)}</p></div>
                                    </div>
                                    <div class="row justify-content-between">
                                        <div class="flex-sm-col text-right col"><p class="mb-1"><b>Remaining</b></p></div>
                                        <div class="flex-sm-col col-auto"><p class="mb-1">₹ {viewData?.orderedPrice?.toFixed(2)}</p></div>
                                    </div>
                                    <div class="row justify-content-between">
                                        <div class="flex-sm-col text-right col"><p class="mb-1"><b>Paid</b></p></div>
                                        <div class="flex-sm-col col-auto"><p class="mb-1" style={{ color: `${viewData?.paid === true ? "green" : "red"}` }}>{viewData?.paid === true ? "Paid" : "Not Paid"}</p></div>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="row invoice ">
                                <div class="col"><p class="mb-1"> Invoice Number : 788152</p><p class="mb-1">Invoice Date : 22 Dec,2019</p><p class="mb-1">Recepits Voucher:18KU-62IIK</p></div>
                            </div> */}
                        </div>
                        {/* <div class="card-footer">
                            <div class="jumbotron-fluid">
                                <div class="row justify-content-between ">
                                    <div class="col-sm-auto col-auto my-auto"><img class="img-fluid my-auto align-self-center " src="https://i.imgur.com/7q7gIzR.png" width="115" height="115" /></div>
                                    <div class="col-auto my-auto "><h2 class="mb-0 font-weight-bold">TOTAL PAID</h2></div>
                                    <div class="col-auto my-auto ml-auto"><h1 class="display-3 ">&#8377; 5,528</h1></div>
                                </div>
                                <div class="row mb-3 mt-3 mt-md-0">
                                    <div class="col-auto border-line"> <small class="text-white">PAN:AA02hDW7E</small></div>
                                    <div class="col-auto border-line"> <small class="text-white">CIN:UMMC20PTC </small></div>
                                    <div class="col-auto "><small class="text-white">GSTN:268FD07EXX </small> </div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default ViewOrderModal