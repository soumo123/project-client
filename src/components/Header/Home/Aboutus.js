import React,{useEffect} from 'react'
import Fruits from '../../../images/home1/fruits.png'
import HandIcon from '../../../images/hand-icon.svg'

const Aboutus = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
  return (
    <>
    
    <div class="main-wrapper">

        <section class="pt-120 ab-about-section position-relative z-1 overflow-hidden">
            {/* <img src="assets/img/shapes/mango.png" alt="mango" class="position-absolute mango z--1"/> */}
            <div class="container">
                <div class="row g-5 g-xl-4 align-items-center">
                    <div class="col-xl-6">
                        <div class="ab-left position-relative">
                            <img src={Fruits} alt="image" class="img-fluid"/>
                            {/* <div class="text-end">
                                <div class="ab-quote p-4 text-start">
                                    <h4 class="mb-0 fw-normal text-white">“Assertively target market Lorem ipsum is simply free consectetur notted elit sed do eiusmod” <span class="fs-md fw-medium position-relative">George Scholll</span></h4>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="ab-about-right">
                            <div class="subtitle d-flex align-items-center gap-3 flex-wrap">
                                <span class="gshop-subtitle">100% Pure and Tasty Cake Provide</span>
                                <span>
                                  {/* <svg width="78" height="16" viewBox="0 0 78 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <line x1="0.0138875" y1="7.0001" x2="72.0139" y2="8.0001" stroke="#FF7C08" stroke-width="2"/>
                                      <path d="M78 8L66 14.9282L66 1.0718L78 8Z" fill="#FF7C08"/>
                                  </svg>     */}
                              </span>
                            </div>
                            <h2 class="mb-4">Be healthy & eat fresh<br/> Cakes</h2>
                            <p class="mb-8">Creamy Affairs introduces its exclusive handcrafted range of momos, offering a delectable fusion of flavors and fillings to tantalize your taste buds. Our meticulously crafted momos are available in both vegetarian and non-vegetarian options, ensuring there's something for everyone to enjoy. From classic vegetable fillings bursting with freshness to succulent meat options packed with savory goodness, each bite of our momos is a culinary delight. Whether you prefer traditional steamed momos or crave the crispy texture of fried ones, Creamy Affairs has a variety of options to satisfy your cravings. Indulge in the ultimate comfort food experience with our special handcrafted momos, crafted with love and care to bring you joy with every bite.</p>
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <div class="image-box py-6 px-4 image-box-border">
                                        <div class="icon position-relative">
                                            <img src={HandIcon} alt="hand icon" class="img-fluid" />
                                        </div>
                                        <h4 class="mt-3">Our Mission</h4>
                                        <p class="mb-0">Welcome to Creamy Affairs, where we quench your thirst with a delightful array of beverages. Our specialty drinks are crafted with precision and creativity, promising a unique flavor experience with every sip.</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="image-box py-6 px-4 image-box-border">
                                        <div class="icon position-relative">
                                            <img src={HandIcon} alt="hand icon" class="img-fluid" />
                                        </div>
                                        <h4 class="mt-3">Our Vision</h4>
                                        <p class="mb-0">From creamy milkshakes to refreshing fruit smoothies, our special beverages are designed to tantalize your taste buds and uplift your spirits. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> <br/><br/>
      
        <section class="about-section bg-shade position-relative z-1">
            {/* <img src="assets/img/shapes/bg-shape-5.png" alt="bg shape" class="position-absolute start-0 bottom-0 z--1 w-100"/>
            <img src="assets/img/shapes/roll-color.png" alt="roll" class="position-absolute roll-color z--1" data-parallax='{"y": -50}'/>
            <img src="assets/img/shapes/roll-color-curve.png" alt="roll" class="position-absolute roll-color-curve z--1" data-parallax='{"y": 50}'/>
            <img src="assets/img/shapes/onion-color.png" alt="onion" class="position-absolute onion-color z--1" data-parallax='{"x": -30}'/> */}
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-6">
                        <div class="section-title text-center">
                            <h2 class="mb-3">Our Working Ability</h2>
                            <p class="mb-0">Creamy Affairs proudly presents our premium branded chocolates, meticulously crafted to captivate your senses and elevate your chocolate experience. Made with the finest ingredients sourced from around the globe, our chocolates embody the perfect balance of richness, indulgence, and sophistication. Each piece is a masterpiece of flavor, meticulously designed to delight chocolate enthusiasts of all kinds. From smooth and creamy milk chocolates to intense and decadent dark varieties, Creamy Affairs offers a tantalizing selection to satisfy every craving. Indulge in luxury with our exquisite chocolates, and let Creamy Affairs be your ultimate destination for unparalleled chocolate bliss.</p><br/>
                            <p  class="mb-0">
                            In addition to our signature creations, we also offer a selection of other branded cold drinks, ensuring there's something for everyone to enjoy. For those seeking a healthier option, we provide fresh milk and curd, sourced from trusted suppliers to guarantee quality and freshness. At Creamy Affairs, we believe that every beverage should be a celebration of flavor and quality, making us your ultimate destination for satisfying your thirst and indulging in delicious refreshments.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section> 
        {/* <section class="feedback-section pt-100 pb-120 position-relative z-1 overflow-hidden service-section">
            <img src="assets/img/shapes/bg-shape-4.png" alt="bg shape" class="position-absolute start-0 bottom-0 w-100 z--1 bg-shape"/>
            <div class="container">
                <div class="row align-items-center g-4">
                    <div class="col-xl-7">
                        <div class="clients_thumb">
                            <img src="assets/img/about/clients.png" alt="clients" class="img-fluid"/>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="swiper feedback-slider-2">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide feedback-card bg-white rounded py-6 px-4">
                                    <div class="d-flex align-items-center gap-4 flex-wrap mb-4">
                                        <img src="assets/img/authors/client-1.png" alt="client" class="img-fluid rounded-circle flex-shrink-0"/>
                                        <div class="clients-info">
                                            <h5 class="mb-1">George Nakashima</h5>
                                            <ul class="d-flex align-items-center fs-xs text-warning">
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p class="mb-0">“Conveniently synergize premium collaboration and idea-sharing with compelling "outside the box" thinking. Interactivel product distinctive paradigms whereas one-to-one intellectual capital. resource sucking services. Objectively customize vertical.”</p>
                                </div>
                                <div class="swiper-slide feedback-card bg-white rounded py-6 px-4">
                                    <div class="d-flex align-items-center gap-4 flex-wrap mb-4">
                                        <img src="assets/img/authors/client-2.png" alt="client" class="img-fluid rounded-circle flex-shrink-0"/>
                                        <div class="clients-info">
                                            <h5 class="mb-1">George Nakashima</h5>
                                            <ul class="d-flex align-items-center fs-xs text-warning">
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p class="mb-0">“Conveniently synergize premium collaboration and idea-sharing with compelling "outside the box" thinking. Interactivel product distinctive paradigms whereas one-to-one intellectual capital. resource sucking services. Objectively customize vertical.”</p>
                                </div>
                                <div class="swiper-slide feedback-card bg-white rounded py-6 px-4">
                                    <div class="d-flex align-items-center gap-4 flex-wrap mb-4">
                                        <img src="assets/img/authors/client-3.png" alt="client" class="img-fluid rounded-circle flex-shrink-0"/>
                                        <div class="clients-info">
                                            <h5 class="mb-1">George Nakashima</h5>
                                            <ul class="d-flex align-items-center fs-xs text-warning">
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                                <li><i class="fas fa-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p class="mb-0">“Conveniently synergize premium collaboration and idea-sharing with compelling "outside the box" thinking. Interactivel product distinctive paradigms whereas one-to-one intellectual capital. resource sucking services. Objectively customize vertical.”</p>
                                </div>
                            </div>
                            <div class="slider-arrows text-end mt-5">
                                <button type="button" class="fd2-arrow-left"><i class="fas fa-angle-left"></i></button>
                                <button type="button" class="fd2-arrow-right"><i class="fas fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        <section class="grostore-team-section pt-6 bg-shade position-relative z-1 overflow-hidden">
            <img src="assets/img/shapes/bg-shape-5.png" alt="bg shape" class="position-absolute start-0 bottom-0 z--1 w-100"/>
            <div class="container">
                <div class="row align-items-center g-3">
                    <div class="col-xl-3">
                        <div class="section-title">
                            <div class="d-flex align-items-center gap-2 flex-wrap">
                                <h6 class="mb-0 gshop-subtitle text-secondary">Team Members</h6>
                                <span>
                                  <svg width="58" height="10" viewBox="0 0 58 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <line x1="-6.99382e-08" y1="5.2" x2="52" y2="5.2" stroke="#FF7C08" stroke-width="1.6"/>
                                      <path d="M58 5L50.5 9.33013L50.5 0.669872L58 5Z" fill="#FF7C08"/>
                                  </svg>
                              </span>
                            </div>
                            <h2 class="mb-3">Our Online Customer Help! Member</h2>
                            <p class="mb-7">Rationally encounter extremely painful there anyone.</p>
                            <div class="d-flex align-items-center gap-3">
                                <button type="button" class="team-slider-prev-btn team-slider-btn"><i class="fas fa-angle-left"></i></button>
                                <button type="button" class="team-slider-next-btn team-slider-btn"><i class="fas fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9">
                        <div class="swiper team-slider">
                            <div class="swiper-wrapper">
                                <div class="team-card text-center bg-white rounded py-7 px-4 swiper-slide">
                                    <div class="team-thumb mb-5">
                                        <img src="assets/img/authors/team-1.jpg" alt="team" class="img-fluid rounded-circle"/>
                                        <div class="team-social">
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-behance"></i></a>
                                        </div>
                                    </div>
                                    <h5>Frances Gilmartin</h5>
                                    <span>CEO &amp; Founder</span>
                                </div>
                                <div class="team-card text-center bg-white rounded py-7 px-4 swiper-slide">
                                    <div class="team-thumb mb-5">
                                        <img src="assets/img/authors/team-2.jpg" alt="team" class="img-fluid rounded-circle"/>
                                        <div class="team-social">
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-behance"></i></a>
                                        </div>
                                    </div>
                                    <h5>Frances Gilmartin</h5>
                                    <span>CEO &amp; Founder</span>
                                </div>
                                <div class="team-card text-center bg-white rounded py-7 px-4 swiper-slide">
                                    <div class="team-thumb mb-5">
                                        <img src="assets/img/authors/team-1.jpg" alt="team" class="img-fluid rounded-circle"/>
                                        <div class="team-social">
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-behance"></i></a>
                                        </div>
                                    </div>
                                    <h5>Frances Gilmartin</h5>
                                    <span>CEO &amp; Founder</span>
                                </div>
                                <div class="team-card text-center bg-white rounded py-7 px-4 swiper-slide">
                                    <div class="team-thumb mb-5">
                                        <img src="assets/img/authors/team-2.jpg" alt="team" class="img-fluid rounded-circle"/>
                                        <div class="team-social">
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-behance"></i></a>
                                        </div>
                                    </div>
                                    <h5>Frances Gilmartin</h5>
                                    <span>CEO &amp; Founder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        <section class="cta-section pb-120">
            <div class="container">
                <div class="cta-box rounded text-center" data-background="assets/img/banner/cta-banner.jpg">
                    <div class="d-flex align-items-center justify-content-center flex-wrap gap-2 mb-2">
                        <h6 class="mb-0 text-secondary gshop-subtitle">Weekend Offer</h6>
                        <span>
                          <svg width="58" height="10" viewBox="0 0 58 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="-6.99382e-08" y1="5.2" x2="52" y2="5.2" stroke="#FF7C08" stroke-width="1.6"/>
                              <path d="M58 5L50.5 9.33013L50.5 0.669872L58 5Z" fill="#FF7C08"/>
                          </svg>   
                      </span>
                    </div>
                    <h3 class="mb-5">Organic Foods Up to 40% off</h3>
                    <a href="shop-grid.html" class="btn btn-secondary">Shop Now<span class="ms-2"><i class="fas fa-arrow-right"></i></span></a>
                </div>
            </div>
        </section> 
        <section class="about-us-section pb-120">
            <div class="container">
                <div class="row g-4 align-items-center">
                    <div class="col-xl-5">
                        <div class="about-us-left position-relative">
                            <img src="assets/img/about/ab-2.png" alt="not found" class="img-fluid"/>
                            <div class="exp-box p-3 bg-white rounded-circle position-absolute">
                                <div class="bg-secondary w-100 h-100 rounded-circle d-flex align-items-center justify-content-center flex-column">
                                    <h2 class="text-white">14+</h2>
                                    <span class="h6 text-white">Year's Experience</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-7">
                        <div class="about-us-right">
                            <div class="section-title-mx mb-6">
                                <div class="d-flex align-items-center gap-2 flex-wrap mb-2">
                                    <h6 class="mb-0 gshop-subtitle text-secondary">Why Choose Us</h6>
                                    <span>
                                      <svg width="58" height="10" viewBox="0 0 58 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <line x1="-6.99382e-08" y1="5.2" x2="52" y2="5.2" stroke="#FF7C08" stroke-width="1.6"/>
                                          <path d="M58 5L50.5 9.33013L50.5 0.669872L58 5Z" fill="#FF7C08"/>
                                      </svg>
                                  </span>
                                </div>
                                <h2 class="mb-3">We do not Buy from the Open Market</h2>
                                <p class="mb-0">Compellingly fashion intermandated opportunities and multimedia based fnsparent e-business.</p>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="horizontal-icon-box d-flex align-items-center gap-4 bg-white rounded p-4 hover-shadow flex-wrap flex-xxl-nowrap">
                                        <span class="icon-wrapper position-relative flex-shrink-0">
                                          <img src="assets/img/icons/hand-icon.svg" alt="hand icon" class="img-fluid"/>
                                      </span>
                                        <div class="content-right">
                                            <h5 class="mb-3">Trusted Partner</h5>
                                            <p class="mb-0">Compellingly fashion intermandat opportunities e-business fashion intermandated business.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="horizontal-icon-box d-flex align-items-center gap-4 bg-white rounded p-4 hover-shadow flex-wrap flex-xxl-nowrap">
                                        <span class="icon-wrapper position-relative flex-shrink-0">
                                          <img src="assets/img/icons/hand-icon.svg" alt="hand icon" class="img-fluid"/>
                                      </span>
                                        <div class="content-right">
                                            <h5 class="mb-3">Return Policy</h5>
                                            <p class="mb-0">Compellingly fashion intermandat opportunities e-business fashion intermandated business.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="horizontal-icon-box d-flex align-items-center gap-4 bg-white rounded p-4 hover-shadow flex-wrap flex-xxl-nowrap">
                                        <span class="icon-wrapper position-relative flex-shrink-0">
                                          <img src="assets/img/icons/hand-icon.svg" alt="hand icon" class="img-fluid"/>
                                      </span>
                                        <div class="content-right">
                                            <h5 class="mb-3">100% Organic Fresh</h5>
                                            <p class="mb-0">Compellingly fashion intermandat opportunities e-business fashion intermandated business.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="horizontal-icon-box d-flex align-items-center gap-4 bg-white rounded p-4 hover-shadow flex-wrap flex-xxl-nowrap">
                                        <span class="icon-wrapper position-relative flex-shrink-0">
                                          <img src="assets/img/icons/hand-icon.svg" alt="hand icon" class="img-fluid"/>
                                      </span>
                                        <div class="content-right">
                                            <h5 class="mb-3">Secured Payment</h5>
                                            <p class="mb-0">Compellingly fashion intermandat opportunities e-business fashion intermandated business.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
    </div>
    
    </>
  )
}

export default Aboutus