import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addCartItems } from '../../redux/actions/productAction';
import { useAlert } from 'react-alert'
import { useLocation } from 'react-router-dom';


const Qrproducts = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    console.log()
    // Initial states for limit, offset, products, and loading more data
    const dispatch = useDispatch()
    const alert = useAlert()
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [selectProduct, setSelectedProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = React.useState(false);


    // Fetch products from API



    // Function to fetch more data when scrolling
    const fetchMoreData = () => {
        // Increase offset by 10 on scroll to fetch the next set of products
        setOffset((prevOffset) => prevOffset + 5);
    };



    const handleClickOpen = (ele) => {
        setOpen(true);
        setSelectedProduct(ele)
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct({})
        setQuantity(1)

    };

    const handleQuantityChange = (e) => {
        if (e <= 0) {
            setQuantity(1)
        } else {
            setQuantity(e)
        }
    }

    const handleAddToCart = () => {
        dispatch(addCartItems({ ...selectProduct, quantity: Number(quantity) }))
        setOpen(false);
        alert.success("Product added to cart")
    }

    useEffect(() => {
        if (type) {
            localStorage.setItem("type",1)
        }
    }, [type])

    const exactType = localStorage.getItem("type")

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/qr-products?type=${exactType}&limit=${limit}&offset=${offset}`);

            const fetchedProducts = response.data.data;

            // Append new products to the existing products array
            setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);

            // If the number of fetched products is less than the limit, stop loading more
            if (fetchedProducts.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Effect to initially load products and when offset changes
    useEffect(() => {
        fetchProducts();
    }, [offset]);

    return (
        <>
            <div className="main-wrapper">
                <section className="gshop-gshop-grid ptb-120">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-xl-12">
                                <div className="shop-grid">
                                    <InfiniteScroll
                                        dataLength={products.length}
                                        next={fetchMoreData}
                                        hasMore={hasMore}
                                        loader={<h4 style={{ marginTop: "30px", textAlign: "center" }}>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>You have seen it all!</b>
                                            </p>
                                        }
                                    >
                                        <div className="row g-4 justify-content-center">
                                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                                {products.map((product, index) => (
                                                    <div className="col" key={index}>
                                                        <div className="card h-100">
                                                            <img
                                                                src={product.image || '...'}
                                                                className="card-img-top"
                                                                alt={product.name || 'Product Image'}
                                                            />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{product.name} {`(${product.weight} ${product.unit})`}</h5>
                                                                <h5 className="card-title">
                                                                    Price : ₹ {product.price}
                                                                </h5>
                                                                <p className="card-text">
                                                                    Product Type: {product.product_type === 1 ? "Non-veg" : product.product_type === 0 ? "Veg" : ""}
                                                                </p>

                                                            </div>
                                                            <div class="card-footer">
                                                                <div className='row'>
                                                                    <div className="col">
                                                                        <small class="text-muted">Only {product.stock} items left</small>
                                                                    </div>
                                                                    <div className="col">
                                                                        <button typ="button" class="btn btn-primary" onClick={() => handleClickOpen(product)}>+ Add Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </InfiniteScroll>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Make Order of {selectProduct.name} {selectProduct.weight} {selectProduct.unit}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <div className="row">

                            <div class="col">
                                <label for="inputEmail4" class="form-label">Quantity</label>
                                <input type="text" class="form-control" placeholder="Quantity" aria-label="Quantity" aria-describedby="basic-addon1" value={quantity} onChange={(e) => handleQuantityChange(e.target.value)} />
                            </div>
                            <div class="col">
                                <label for="inputEmail4" class="form-label">Total Price (₹)</label>
                                <input type="text" class="form-control" placeholder="Total Price" aria-label="Total Price" aria-describedby="basic-addon1" value={quantity * selectProduct.price} readOnly />
                            </div>
                        </div>


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleAddToCart} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Qrproducts;
