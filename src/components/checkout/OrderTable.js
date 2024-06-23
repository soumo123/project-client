import React, { useState, useEffect } from 'react'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewOrderModal from './ViewOrderModal';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'react-bootstrap/Button';
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux';

const OrderTable = ({ shopId }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const [orders, setOrders] = useState([])
  const userId = localStorage.getItem("userId")
  const type = localStorage.getItem("type")
  const [loader, setloader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [viewData, setViewData] = useState([])
  const [load, setLoad] = useState(false)
  const [show, setShow] = useState(false);
  const [odId, setOdId] = useState("")


  const handleClose = () =>{ 
    setShow(false);
    setOdId("")
  }

  const handleShow = (orderId) => {
    setShow(true);
    setOdId(orderId)
  }

  const getallOrders = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/orders/getorders?type=${type}&userId=${userId}&shopId=${shopId}&key=`)
      if (result.status === 200) {
        setloader(true)
        setOrders(result.data.data)
      }
    } catch (error) {
      setloader(true)
      console.log(error)
      setOrders([])
    }
  }

  const getOrderById = async (id) => {
    try {
      setModalShow(true)
      const result = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/orders/getorder/${id}`)
      if (result.status === 200) {
        setViewData(result.data.data)
      }
    } catch (error) {
      setViewData([])
      console.log(error)
    }
  }

  const cancelOrder = async() => {
    try {
      const config = {
        headers: {
          'Content-Type': "application/json",
        },
        withCredentials: true
      }

      const response  = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/orders/cancel?userId=${userId}&orderId=${odId}&check=${Number(0)}`,config)
      if(response.status===200){
          alert.success("Product removed from Order")
          setShow(false)
          dispatch(setLoad(new Date().getSeconds()))
          setOdId("")
      }else{
          alert.error("Product not removed from Order")
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getallOrders()
  }, [load])

  return (
    <>


      <div class="recent-orders bg-white rounded py-5">
        <h6 class="mb-4 px-4">Recent Orders</h6>
        <div class="table-responsive">
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
                  orders && orders.length > 0 ? (
                    <table class="order-history-table table">
                      <tr>
                        <th>Order Number#</th>
                        <th>Created on</th>
                        <th>Method</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th class="text-center">Action</th>
                      </tr>
                      {
                        orders && orders.map((ele) => (
                          <tr>
                            <td>{ele.orderId}</td>
                            <td>{(new Date(ele.created_at).toISOString().slice(0, 10).split('-').reverse().join('/'))}</td>
                            <td>{ele.paymentmethod}</td>
                            <td class="thumbnail">
                              {ele.products.length}
                            </td>
                            <td class="text-secondary">₹ {ele.orderedPrice}</td>
                            <td>{ele.status === 0 ? ("Pending") : ele.status === 1 ? ("Accepted") : ele.status===2 ? ("Start Processing") : ele.status===3 ? ("Processing...") : ("Complete")}</td>
                            <td class="text-center">
                              <span className="view-invoice fs-xs">
                                <VisibilityIcon
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="View Order"
                                  style={{ color: '#d7783b', cursor: 'pointer' }}
                                  onClick={() => getOrderById(ele.orderId)}
                                />
                                {
                                  ele.status === 1 ? (
                                    ""
                                  ) : (
                                    <CancelIcon
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Cancel Order"
                                      style={{ color: '#68033f', cursor: 'pointer' }}
                                      onClick={() => handleShow(ele.orderId)}
                                    />
                                  )
                                }

                              </span>
                            </td>
                          </tr>
                        ))
                      }

                    </table>
                  ) : (
                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                          <div className="text-center">
                            No Orders Found
                          </div>
                        </div>
                      </div>
                    </div >
                  )
                }

              </>
            )
          }

        </div >
      </div >
      {
        viewData && viewData ? (
          <ViewOrderModal show={modalShow} setModalShow={setModalShow} viewData={viewData} setViewData={setViewData} setLoad={setLoad} />
        ) : ("")
      }


      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: "larger" }}>
            Are you sure to cancel the order ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="submit" onClick={cancelOrder}>Yes</Button>
          <Button className="submi1" onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default OrderTable