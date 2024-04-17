import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Filter from './Filter';
import SideContents from './SideContents';
import Contents from './Contents';
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/actions/productAction'
import addToCart from '../../utils/addToCart';
import { noteRefs } from '../../redux/actions/userAction'
import ViewProduct from './ViewProduct';


const AllProduct = () => {



    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('');
    const [productData, setProductData] = useState([])
    const [limit, setLimit] = useState(12);
    const [offset, setOffset] = useState(0)
    const [totalPages, setTotalPages] = useState(0);
    const [totalData, setTotalData] = useState("")
    const [lastTypingTime, setLastTypingTime] = useState(null);
    const [price, setPrice] = useState("");
    const [tagss, setTagss] = useState("")

    const products = useSelector((state) => state.productDetails.products.allData)

    const [viewData, setViewData] = useState([])
    const[open,setOpen]= useState(false)

    const handleSearch = (query) => {
        setLastTypingTime(new Date().getTime())
        setSearchQuery(query);
        setOffset(0)
    };

    const handlePriceChange = (price) => {
        setLastTypingTime(new Date().getTime())
        setPrice(price)
    }

    const handleTagsChange = (tags) => {

        setTagss(tags)
    }
    console.log("tagss", tagss)

    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getAllProducts?limit=${limit}&offset=${offset}&type=1&key=${searchQuery}&tags=${tagss}&startprice=${price[0] === undefined ? 0 : price[0]}&lastprice=${price[1] === undefined ? 10000 : price[1]}`)
            if (response.status === 200) {
                setTotalPages(Math.ceil(response.data.totalData / limit));
                setTotalData(response.data.totalData)
                dispatch(fetchProducts(response.data))
            }
        } catch (error) {
            dispatch(fetchProducts([]))

        }
    }

    useEffect(() => {
        getAllProducts();
    }, [offset, limit, tagss]);

    const handlePageChange = (event, value) => {
        setOffset((value - 1) * limit);
    };


    useEffect(() => {
        if (lastTypingTime) {
            const timer = setTimeout(() => {
                const getAllProducts = async () => {
                    try {
                        const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getAllProducts?limit=${limit}&offset=0&type=1&key=${searchQuery}&tags=${tagss}&startprice=${price[0] === undefined ? 0 : price[0]}&lastprice=${price[1] === undefined ? 10000 : price[1]}`)
                        if (response.status === 200) {
                            setTotalPages(Math.ceil(response.data.totalData / limit));
                            setTotalData(response.data.totalData)
                            dispatch(fetchProducts(response.data))
                        }
                    } catch (error) {
                        setProductData([])
                    }
                };

                getAllProducts();

            }, 1000);
            return () => clearTimeout(timer)
        }
    }, [searchQuery, price])


    const handleCart = async (id, data) => {
        try {
            let json = {
                name: data.name,
                description: data.description,
                price: data.actualpricebydiscount,
                itemCount: 1,
                discount: data.discount,
                thumbImage: data.thumbnailimage,
                totalPrice: data.actualpricebydiscount * 1
            }
            console.log("json", json)

            const response = await addToCart(id, json)

            if (response) {
                alert("Product added in cart")
                dispatch(noteRefs(new Date().getSeconds()))

            } else {
                alert("Product alreday in cart")

            }

        } catch (error) {
            alert("Product not added in cart")

        }
    }


    const handleModalOpen = (e)=>{
        setViewData(e)
        setOpen(true)
    }



    return (
        <>
            <div className="main-wrapper">
                <section className="gshop-gshop-grid ptb-120">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-xl-3">
                                <Sidebar onSearch={handleSearch} />
                                <Filter onChange={handlePriceChange} />
                                <SideContents onChange={handleTagsChange} />
                                <Contents />
                            </div>
                            <div class="col-xl-9">
                                <div class="shop-grid">
                                    <div class="listing-top d-flex align-items-center justify-content-between flex-wrap gap-3 bg-white rounded-2 px-4 py-5 mb-6">
                                        <p class="mb-0 fw-bold">Showing 1-{products && products.length} of {totalData} results</p>
                                        <div class="listing-top-right text-end d-inline-flex align-items-center gap-3 flex-wrap">
                                            <div class="select-filter d-inline-flex align-items-center gap-3">
                                                <label class="fw-bold fs-xs text-dark flex-shrink-0">Show:</label>
                                                <select class="form-select fs-xxs fw-medium theme-select select-sm" onChange={(e) => setLimit(e.target.value)}>
                                                    <option value={20}>20</option>
                                                    <option value={40}>40</option>
                                                    <option value={60}>60</option>
                                                </select>
                                            </div>
                                            <div class="select-filter d-inline-flex align-items-center gap-3">
                                                <label class="fw-bold fs-xs text-dark flex-shrink-0">Sort by:</label>
                                                <select class="form-select fs-xxs fw-medium theme-select select-sm">
                                                    <option>News First</option>
                                                    <option>Best Selling</option>
                                                    <option>Best Rated</option>
                                                </select>
                                            </div>
                                            <a href="#" class="grid-btn active">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.97196 0H1.37831C0.706579 0 0.160156 0.546422 0.160156 1.21815V5.8118C0.160156 6.48353 0.706579 7.02996 1.37831 7.02996H5.97196C6.64369 7.02996 7.19011 6.48353 7.19011 5.8118V1.21815C7.19 0.546422 6.64369 0 5.97196 0Z" fill="#FF7C08" />
                                                    <path d="M14.9407 0H10.3471C9.67533 0 9.12891 0.546422 9.12891 1.21815V5.8118C9.12891 6.48353 9.67533 7.02996 10.3471 7.02996H14.9407C15.6124 7.02996 16.1589 6.48353 16.1589 5.8118V1.21815C16.1589 0.546422 15.6124 0 14.9407 0Z" fill="#FF7C08" />
                                                    <path d="M5.97196 8.96973H1.37831C0.706579 8.96973 0.160156 9.51609 0.160156 10.1878V14.7815C0.160156 15.4532 0.706579 15.9996 1.37831 15.9996H5.97196C6.64369 15.9996 7.19011 15.4532 7.19011 14.7815V10.1878C7.19 9.51609 6.64369 8.96973 5.97196 8.96973Z" fill="#FF7C08" />
                                                    <path d="M14.9407 8.96973H10.3471C9.67533 8.96973 9.12891 9.51615 9.12891 10.1879V14.7815C9.12891 15.4533 9.67533 15.9997 10.3471 15.9997H14.9407C15.6124 15.9996 16.1589 15.4532 16.1589 14.7815V10.1878C16.1589 9.51609 15.6124 8.96973 14.9407 8.96973Z" fill="#FF7C08" />
                                                </svg>
                                            </a>
                                            <a href="#" class="grid-btn">
                                                <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.31378 0C1.12426 0 0.160156 0.9641 0.160156 2.15359C0.160156 3.34309 1.12426 4.30722 2.31378 4.30722C3.50328 4.30722 4.46738 3.34312 4.46738 2.15359C4.46738 0.964066 3.50328 0 2.31378 0ZM2.31378 5.74293C1.12426 5.74293 0.160156 6.70706 0.160156 7.89656C0.160156 9.08608 1.12426 10.0502 2.31378 10.0502C3.50328 10.0502 4.46738 9.08608 4.46738 7.89656C4.46738 6.70706 3.50328 5.74293 2.31378 5.74293ZM2.31378 11.4859C1.12426 11.4859 0.160156 12.45 0.160156 13.6395C0.160156 14.829 1.12426 15.7931 2.31378 15.7931C3.50328 15.7931 4.46738 14.829 4.46738 13.6395C4.46738 12.45 3.50328 11.4859 2.31378 11.4859ZM8.05671 3.58933H19.5426C20.3358 3.58933 20.9783 2.94683 20.9783 2.15359C20.9783 1.36036 20.3358 0.717853 19.5426 0.717853H8.05671C7.26348 0.717853 6.62097 1.36036 6.62097 2.15359C6.62097 2.94683 7.26348 3.58933 8.05671 3.58933ZM19.5426 6.46082H8.05671C7.26348 6.46082 6.62097 7.10332 6.62097 7.89656C6.62097 8.68979 7.26348 9.3323 8.05671 9.3323H19.5426C20.3358 9.3323 20.9783 8.68979 20.9783 7.89656C20.9783 7.10332 20.3358 6.46082 19.5426 6.46082ZM19.5426 12.2038H8.05671C7.26348 12.2038 6.62097 12.8463 6.62097 13.6395C6.62097 14.4327 7.26348 15.0752 8.05671 15.0752H19.5426C20.3358 15.0752 20.9783 14.4327 20.9783 13.6395C20.9783 12.8463 20.3358 12.2038 19.5426 12.2038Z" fill="#5D6374" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row g-4 justify-content-center">
                                        {
                                            products && products.length === 0 ? (
                                                <div>No Product Found</div>
                                            ) : (
                                                <>
                                                    {
                                                        products?.map((ele) => (
                                                            <div class="col-lg-4 col-md-6 col-sm-10">
                                                                <div class="vertical-product-card rounded-2 position-relative border-0 bg-white bg-white">
                                                                    {ele.discount === 0 ? ("") : (<span class="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">{ele.discount}% OFF</span>)}
                                                                    <div class="thumbnail position-relative text-center p-4">
                                                                        <img src={ele.thumbnailimage} alt="" class="img-fluid" />
                                                                        <div class="product-btns position-absolute d-flex gap-2 flex-column">
                                                                            <a href="#" class="rounded-btn"><FavoriteBorderIcon /></a>
                                                                            <a href="#" class="rounded-btn">
                                                                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.705 0.201222C10.4317 0.469526 10.4317 0.904522 10.705 1.17283L11.6101 2.06107H7.70001C6.15364 2.06107 4.90001 3.29144 4.90001 4.80917V5.49619C4.90001 5.87564 5.21341 6.18322 5.60001 6.18322C5.98662 6.18322 6.30001 5.87564 6.30001 5.49619V4.80917C6.30001 4.0503 6.92679 3.43512 7.70001 3.43512H11.6101L10.705 4.32337C10.4317 4.59166 10.4317 5.02668 10.705 5.29496C10.9784 5.56325 11.4216 5.56325 11.695 5.29496L13.795 3.2339C14.0683 2.96559 14.0683 2.5306 13.795 2.26229L11.695 0.201222C11.4216 -0.0670741 10.9784 -0.0670741 10.705 0.201222ZM8.40001 4.80917C8.0134 4.80917 7.70001 5.11675 7.70001 5.49619V6.18322C7.70001 6.9421 7.07323 7.55726 6.30001 7.55726H2.38995L3.29498 6.66901C3.56835 6.40073 3.56835 5.9657 3.29498 5.69742C3.02161 5.42914 2.5784 5.42914 2.30503 5.69742L0.205023 7.75849C-0.0683411 8.02678 -0.0683411 8.4618 0.205023 8.73008L2.30503 10.7912C2.5784 11.0594 3.02161 11.0594 3.29498 10.7912C3.56835 10.5229 3.56835 10.0878 3.29498 9.81957L2.38995 8.93131H6.30001C7.84638 8.93131 9.10001 7.70092 9.10001 6.18322V5.49619C9.10001 5.11675 8.78662 4.80917 8.40001 4.80917Z" fill="#AEB1B9"></path>
                                                                                </svg>
                                                                            </a>
                                                                            <span  style={{cursor: 'pointer'}}class="rounded-btn" onClick={()=>handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card-content">
                                                                        <div class="mb-2 tt-category tt-line-clamp tt-clamp-1">
                                                                            <a href="#" class="d-inline-block text-muted fs-xxs">Fresh Organic</a>
                                                                            <a href="#" class="d-inline-block text-muted fs-xxs">Fresh Organic</a>
                                                                            <a href="#" class="d-inline-block text-muted fs-xxs">Fresh Organic</a>
                                                                            <a href="#" class="d-inline-block text-muted fs-xxs">Fresh Organic</a>
                                                                            <a href="#" class="d-inline-block text-muted fs-xxs">Fresh Organic</a>
                                                                        </div>
                                                                        <a href="#" class="card-title fw-bold d-block mb-2 tt-line-clamp tt-clamp-2">{ele.name}</a>
                                                                        <div class="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                                                                            <ul class="d-flex align-items-center me-2">
                                                                                <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />

                                                                            </ul>
                                                                            <span class="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                                                        </div>
                                                                        <h6 class="price text-danger mb-4"> ₹ {ele.actualpricebydiscount}</h6>
                                                                        <span href="#" class="btn btn-outline-secondary d-block btn-md" onClick={() => handleCart(ele.productId, ele)}>Add to Cart</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }


                                                </>
                                            )
                                        }


                                    </div>
                                    <ul className="template-pagination d-flex align-items-center mt-6">


                                        <Pagination count={totalPages} color="primary" onChange={handlePageChange} />

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>



            <ViewProduct setOpen={setOpen} open={open} viewData={viewData}/>

        </>
    )
}

export default AllProduct