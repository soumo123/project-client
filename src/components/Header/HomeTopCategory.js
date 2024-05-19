import React, { useState, useEffect } from 'react'
import BgShape from '../../images/shapes/bg-shape.png'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const HomeTopCategory = () => {

    const navigate = useNavigate()
    const images = useSelector((state) => state.imageReducer.images.staticImages)
    const categories = useSelector((state) => state.categoryDetails.categories)

    const [category, setCategory] = useState([])


    const handleClickTagChange = (e)=>{
        navigate(`/products?tags=${e}`)
    }

    useEffect(() => {
        setCategory(categories.filter(ele => ele.topCategory === 1))
    }, [categories])

    console.log("categorycategorycategory", category)

    return (
        <>

            <section className="gshop-category-section bg-white pt-120 position-relative z-1 overflow-hidden">
                <img src={BgShape} alt="bg shape" className="position-absolute bottom-0 start-0 w-100 z--1" />
                <div className="container">
                    <div className="gshop-category-box border-secondary rounded-3 bg-white">
                        <div className="text-center section-title">
                            <h4 className="d-inline-block px-2 bg-white mb-4">Our Top Category</h4>
                        </div>
                        <div className="row justify-content-center g-4">
                            {
                                category && category.map((ele) => (
                                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                        <div className="gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden">
                                            <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                                                <img src={ele?.thumbnailImage} alt="flower" className="img-fluid" />
                                            </div>
                                            <span className="text-dark fs-sm fw-bold d-block mt-3" style={{cursor:"pointer"}} value={ele.value} onClick={(e)=>handleClickTagChange(ele.value)}>{ele.label}</span>
                                            {/* <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">25 Items</span> */}
                                            <span  className="explore-btn position-absolute" style={{cursor:"pointer"}} value={ele.value} onClick={(e)=>handleClickTagChange(ele.value)}><ArrowOutwardIcon /></span>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default HomeTopCategory