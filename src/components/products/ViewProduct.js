import React, { useState ,useRef,useEffect} from 'react'
import Modal from "react-bootstrap/Modal";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import addToCart from '../../utils/addToCart';
import { noteRefs } from '../../redux/actions/userAction'
import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Slider from "react-slick";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



const ViewProduct = ({ open, viewData, setOpen }) => {

    const [selectedImage, setSelectedImage] = useState(""); // State to hold the selected image
    const [count,setCount] = useState(1)
    const alert = useAlert();
    const dispatch = useDispatch();
    console.log("viewData", viewData);

    const handleCloseModal = () => {
        setOpen(!open);
    }

    const handleCart = async (id, data) => {
        try {
            let json = {
                name: data.name,
                description: data.description,
                price: data.actualpricebydiscount,
                itemCount: Number(count),
                discount: data.discount,
                thumbImage: data.thumbnailimage,
                totalPrice: data.actualpricebydiscount * Number(count)
            }
            console.log("json", json)

            const response = await addToCart(id, json)

            if (response) {
                alert.success("Product added in cart")
                dispatch(noteRefs(new Date().getSeconds()))

            } else {
                alert.error("Product already in cart")

            }

        } catch (error) {
            alert.error("Product not added in cart")

        }
    }

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl); // Update selected image when clicked
    };

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
    };
console.log("selectedImage",selectedImage)

useEffect(() => {
    setSelectedImage(viewData && viewData?.thumbnailimage)
}, [viewData])


const handleDecrement = ()=>{
    if (count > 1) {
        setCount(count - 1);
    }
}

const handleIncrement = ()=>{
    setCount(count+1)

}

    return (

        <>

            <Modal
                show={open}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                dialogclassNameNameName="modal-md patient_notes_popup"
            >
                <Modal.Header closeButton>
                    <Modal.Title classNameNameName="text-center">Add Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body classNameNameName="">

                    <div className="gstore-product-quick-view bg-white rounded-3 py-6 px-4">
                        <div className="row align-items-center g-4">
                            <div className="col-xl-6 align-self-end">
                                <div className="quickview-double-slider">
                                    <div className="quickview-product-slider swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide text-center">
                                            <InnerImageZoom zoomScale={2} zoomType="hover" src={selectedImage && selectedImage} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="product-thumbnail-slider swiper mt-80">
                                        <Slider {...settings} className='zoomSlider'>
                                            {viewData?.otherimages && viewData?.otherimages.map((ele, index) => (
                                                <div
                                                    key={index}
                                                    className='swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center'
                                                    onClick={() => handleImageClick(ele)} // Call handleImageClick when image is clicked
                                                >
                                                    <img src={ele} className="w-100" />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="product-info">
                                    <h4 className="mt-1 mb-3">{viewData?.name}</h4>
                                    <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                                        <ul className="d-flex align-items-center me-2">
                                            <Rating name="size-small" defaultValue={viewData?.ratings} precision={0.5} readOnly size="small" />

                                        </ul>
                                        <span className="flex-shrink-0">({viewData?.numOfReviews} Reviews)</span>
                                    </div>
                                    <div className="pricing mt-2">
                                        <span className="fw-bold fs-xs text-danger">₹ {viewData?.actualpricebydiscount}</span>
                                        <span className="fw-bold fs-xs deleted ms-1">₹ {viewData?.price}</span>
                                    </div>
                                    <div className="widget-title d-flex mt-4">
                                        <h6 className="mb-1 flex-shrink-0">Description</h6>
                                        <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                                    </div>
                                    <p className="mb-3">{viewData?.description}</p>
                                    {/* <ul className="d-flex flex-column gap-2">
                                        <li><span className="me-2 text-primary"><i className="fa-solid fa-circle-check"></i></span>Natural ingredients</li>
                                        <li><span className="me-2 text-primary"><i className="fa-solid fa-circle-check"></i></span>Tastes better with milk</li>
                                        <li><span className="me-2 text-primary"><i className="fa-solid fa-circle-check"></i></span>Vitamins B2, B3, B5 and B6</li>
                                        <li><span className="me-2 text-primary"><i className="fa-solid fa-circle-check"></i></span>Refrigerate for freshness</li>
                                    </ul> */}
                                    <h6 className="fs-md mb-2 mt-3">Weight:</h6>
                                    <ul className="product-radio-btn mb-4 d-flex align-items-center gap-2">
                                        <li>
                                            <input type="radio" name="weight" value="250g" checked />
                                            <label>150g</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="weight" value="250g" />
                                            <label>500g</label>
                                        </li>
                                        <li>
                                            <input type="radio" name="weight" value="250g" />
                                            <label>1kg</label>
                                        </li>
                                    </ul>
                                    <div className="d-flex align-items-center gap-4 flex-wrap">
                                        <div className="product-qty d-flex align-items-center">
                                            <button className="decrese" onClick={handleDecrement}>-</button>
                                            <input type="text" value={count} />
                                            <button className="increase" onClick={handleIncrement}>+</button>
                                        </div>
                                        <span className="btn btn-secondary btn-md" onClick={() => handleCart(viewData?.productId, viewData)}><span className="me-2"><AddShoppingCartIcon/></span>Add to Cart</span>
                                    </div>
                                    <div className="categories mt-4">
                                        <a href="#" className="btn btn-outline btn-sm">Vegetable</a>
                                        <a href="#" className="btn btn-outline btn-sm">Healthy</a>
                                        <a href="#" className="btn btn-outline btn-sm">Organic</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </Modal.Body>

            </Modal >


        </>
    )
}

export default ViewProduct