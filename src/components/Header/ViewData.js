import React from 'react'
import Slider from "react-slick";
import { useSelector } from 'react-redux'

const ViewData = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
    };
    const images = useSelector((state) => state.imageReducer.images.staticImages)
    const settings1 = useSelector((state) => state.settingReducer.settings)

    return (
        <>
        {
            settings1 && settings1.client ? (
                <section className="ptb-120 bg-shade position-relative overflow-hidden z-1 feedback-section">
                {/* <img src="assets/img/shapes/bg-shape-5.png" alt="bg shape" className="position-absolute start-0 bottom-0 z--1 w-100" />
                <img src="assets/img/shapes/map-bg.png" alt="map" className="position-absolute start-50 top-50 translate-middle z--1" />
                <img src="assets/img/shapes/fd-1.png" alt="shape" className="position-absolute z--1 fd-1" />
                <img src="assets/img/shapes/fd-2.png" alt="shape" className="position-absolute z--1 fd-2" />
                <img src="assets/img/shapes/fd-3.png" alt="shape" className="position-absolute z--1 fd-3" />
                <img src="assets/img/shapes/fd-4.png" alt="shape" className="position-absolute z--1 fd-4" />
                <img src="assets/img/shapes/fd-5.png" alt="shape" className="position-absolute z--1 fd-5" /> */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6">
                            <div className="section-title text-center">
                                <h2 className="mb-6">What Our Clients Say</h2>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="gshop-feedback-slider-wrapper">
                                <div className="swiper gshop-feedback-thumb-slider">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide control-thumb">
                                            {/* <img src="assets/img/authors/client-1.png" alt="clients" className="img-fluid rounded-circle" /> */}
                                        </div>
                                        <div className="swiper-slide control-thumb">
                                            {/* <img src="assets/img/authors/client-2.png" alt="clients" className="img-fluid rounded-circle" /> */}
                                        </div>
                                        <div className="swiper-slide control-thumb">
                                            {/* <img src="assets/img/authors/client-3.png" alt="clients" className="img-fluid rounded-circle" /> */}
                                        </div>
                                        <div className="swiper-slide control-thumb">
                                            {/* <img src="assets/img/authors/client-4.png" alt="clients" className="img-fluid rounded-circle" /> */}
                                        </div>
                                        <div className="swiper-slide control-thumb">
                                            {/* <img src="assets/img/authors/client-5.png" alt="clients" className="img-fluid rounded-circle" /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper gshop-feedback-slider mt-4">
                                    <div className="swiper-wrapper">
                                        <Slider {...settings} className='home_slider_Main'>
                                            <div className="item">
                                                <div className="swiper-slide feedback-single text-center">
                                                    <p className="mb-5">“Distinctively unleash business technologies without backend metrics. Conveniently network distributed core competencies. Continually integrate backward-compatible information and backward-compatible” </p>
                                                    <span className="clients_name text-dark fw-bold d-block mb-1">Rasmus Geisler</span>
                                                    <ul className="star-rating fs-sm d-inline-flex align-items-center text-warning">
                                                        <li><i className="fas fa-star"></i></li>
                                                        <li><i className="fas fa-star"></i></li>
                                                        <li><i className="fas fa-star"></i></li>
                                                        <li><i className="fas fa-star"></i></li>
                                                        <li><i className="fas fa-star"></i></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="swiper-slide feedback-single text-center">
                                                    <p className="mb-5">“Distinctively unleash business technologies without backend metrics. Conveniently network distributed core competencies. Continually integrate backward-compatible information and backward-compatible” </p>
                                                    <span className="clients_name text-dark fw-bold d-block mb-1">Rasmus Geisler</span>
                                                    <ul className="star-rating fs-sm d-inline-flex align-items-center text-warning">
                                                        <li><i className="fas fa-star"></i></li>
                                                        <li><i className="fas fa-star"></i></li>
                                                        <li><i className="fas fa-star"></i></li>
                                                        <li><i className="fas fa-star"></i></li>
                                                        <li><i className="fas fa-star"></i></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="item">
                                            <div className="swiper-slide feedback-single text-center">
                                                <p className="mb-5">“Distinctively unleash business technologies without backend metrics. Conveniently network distributed core competencies. Continually integrate backward-compatible information and backward-compatible” </p>
                                                <span className="clients_name text-dark fw-bold d-block mb-1">Rasmus Geisler</span>
                                                <ul className="star-rating fs-sm d-inline-flex align-items-center text-warning">
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                </ul>
                                            </div>
                                            </div>
                                            <div className="item">
                                            <div className="swiper-slide feedback-single text-center">
                                                <p className="mb-5">“Distinctively unleash business technologies without backend metrics. Conveniently network distributed core competencies. Continually integrate backward-compatible information and backward-compatible” </p>
                                                <span className="clients_name text-dark fw-bold d-block mb-1">Rasmus Geisler</span>
                                                <ul className="star-rating fs-sm d-inline-flex align-items-center text-warning">
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                </ul>
                                            </div>
                                            </div>
                                            <div className="item">

                                            <div className="swiper-slide feedback-single text-center">
                                                <p className="mb-5">“Distinctively unleash business technologies without backend metrics. Conveniently network distributed core competencies. Continually integrate backward-compatible information and backward-compatible” </p>
                                                <span className="clients_name text-dark fw-bold d-block mb-1">Rasmus Geisler</span>
                                                <ul className="star-rating fs-sm d-inline-flex align-items-center text-warning">
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                </ul>
                                            </div>
                                            </div>
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            ):("")
        }
          

        </>
    )
}

export default ViewData