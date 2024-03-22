import React from 'react'

const Posts = () => {
  return (
    <>
     <section className="blog-section pb-120 position-relative overflow-hidden z-1">
            <img src="assets/img/shapes/dal.png" alt="shape" className="position-absolute dal-shape z--1"/>
            <img src="assets/img/shapes/frame-circle.svg" alt="frame circle" className="position-absolute frame-circle z--1 d-none d-md-block"/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-md-8">
                        <div className="section-title text-center">
                            <h2 className="mb-3">Browse Recent Post</h2>
                            <p className="mb-0">Interactivel product distinctive paradigms whereas one-to-one intellectual capital. resource sucking services.</p>
                        </div>
                    </div>
                </div>
                <div className="row g-4 justify-content-center mt-3">
                    <div className="col-xl-4 col-md-6">
                        <article className="blog-card rounded-2 overflow-hidden bg-white">
                            <div className="thumbnail overflow-hidden">
                                <a href="blog-details.html"><img src="assets/img/blog/blog-thumb-1.jpg" alt="blog thumb" className="img-fluid"/></a>
                            </div>
                            <div className="blog-card-content">
                                <div className="blog-meta d-flex align-items-center gap-3 mb-1">
                                    <span className="fs-xs fw-medium"><i className="fa-solid fa-tags me-1"></i>Organic Vegetable</span>
                                    <span className="fs-xs fw-medium"><i className="fa-regular fa-clock me-1"></i>May 24, 2022</span>
                                </div>
                                <a href="blog-details.html">
                                    <h4 className="mb-3">Holiday Home Delivery We have Recently Ordered</h4>
                                </a>
                                <p className="mb-0 mb-5">Holisticly exploit equity invested growth strategies whereas enterpris</p>
                                <a href="blog-details.html" className="btn btn-primary-light btn-md">Explore More<span className="ms-2"><i className="fas fa-arrow-right"></i></span></a>
                            </div>
                        </article>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <article className="blog-card rounded-2 overflow-hidden bg-white">
                            <div className="thumbnail overflow-hidden">
                                <a href="blog-details.html"><img src="assets/img/blog/blog-thumb-2.jpg" alt="blog thumb" className="img-fluid"/></a>
                            </div>
                            <div className="blog-card-content">
                                <div className="blog-meta d-flex align-items-center gap-3 mb-1">
                                    <span className="fs-xs fw-medium"><i className="fa-solid fa-tags me-1"></i>Organic Vegetable</span>
                                    <span className="fs-xs fw-medium"><i className="fa-regular fa-clock me-1"></i>May 24, 2022</span>
                                </div>
                                <a href="blog-details.html">
                                    <h4 className="mb-3">Holiday Home Delivery We have Recently Ordered</h4>
                                </a>
                                <p className="mb-0 mb-5">Holisticly exploit equity invested growth strategies whereas enterpris</p>
                                <a href="blog-details.html" className="btn btn-primary-light btn-md">Explore More<span className="ms-2"><i className="fas fa-arrow-right"></i></span></a>
                            </div>
                        </article>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <article className="blog-card rounded-2 overflow-hidden bg-white">
                            <div className="thumbnail overflow-hidden">
                                <a href="blog-details.html"><img src="assets/img/blog/blog-thumb-3.jpg" alt="blog thumb" className="img-fluid"/></a>
                            </div>
                            <div className="blog-card-content">
                                <div className="blog-meta d-flex align-items-center gap-3 mb-1">
                                    <span className="fs-xs fw-medium"><i className="fa-solid fa-tags me-1"></i>Organic Vegetable</span>
                                    <span className="fs-xs fw-medium"><i className="fa-regular fa-clock me-1"></i>May 24, 2022</span>
                                </div>
                                <a href="blog-details.html">
                                    <h4 className="mb-3">Holiday Home Delivery We have Recently Ordered</h4>
                                </a>
                                <p className="mb-0 mb-5">Holisticly exploit equity invested growth strategies whereas enterpris</p>
                                <a href="blog-details.html" className="btn btn-primary-light btn-md">Explore More<span className="ms-2"><i className="fas fa-arrow-right"></i></span></a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    
    </>
  )
}

export default Posts