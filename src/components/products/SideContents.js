import React from 'react'
import Rating from '@mui/material/Rating';

const SideContents = () => {
    return (

        <>

            <div className="sidebar-widget rating-widget py-5 px-4 border-top bg-white">
                <div className="widget-title d-flex">
                    <h6 className="mb-0 flex-shrink-0">Rating</h6>
                    <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                </div>
                <ul className="mt-4 sidebar-rating-list">
                    <li className="d-flex align-items-center justify-content-between">
                        <div className="custom-checkbox d-inline-flex">
                            <div className="theme-checkbox flex-shrink-0">
                                <input type="checkbox" />
                                <span className="checkbox-field"><i className="fa-solid fa-check"></i></span>
                            </div>
                            <div className="rating-field text-warning fs-xs d-flex align-items-center ms-1">
                            <Rating name="size-small"  defaultValue={5} precision={0.5} readOnly size="small"/>
                            </div>
                        </div>
                        <span className="fw-bold fs-xs total-count">48</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                        <div className="custom-checkbox d-inline-flex">
                            <div className="theme-checkbox flex-shrink-0">
                                <input type="checkbox" />
                                <span className="checkbox-field"><i className="fa-solid fa-check"></i></span>
                            </div>
                            <div className="rating-field text-warning fs-xs d-flex align-items-center ms-1">
                            <Rating name="size-small"  defaultValue={4} precision={0.5} readOnly size="small"/>

                            </div>
                        </div>
                        <span className="fw-bold fs-xs total-count">14</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                        <div className="custom-checkbox d-inline-flex">
                            <div className="theme-checkbox flex-shrink-0">
                                <input type="checkbox" />
                                <span className="checkbox-field"><i className="fa-solid fa-check"></i></span>
                            </div>
                            <div className="rating-field text-warning fs-xs d-flex align-items-center ms-1">
                            <Rating name="size-small"  defaultValue={3} precision={0.5} readOnly size="small"/>

                            </div>
                        </div>
                        <span className="fw-bold fs-xs total-count">36</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                        <div className="custom-checkbox d-inline-flex">
                            <div className="theme-checkbox flex-shrink-0">
                                <input type="checkbox" />
                                <span className="checkbox-field"><i className="fa-solid fa-check"></i></span>
                            </div>
                            <div className="rating-field text-warning fs-xs d-flex align-items-center ms-1">
                            <Rating name="size-small"  defaultValue={2} precision={0.5} readOnly size="small"/>

                            </div>
                        </div>
                        <span className="fw-bold fs-xs total-count">24</span>
                    </li>
                </ul>
            </div>
            <div className="sidebar-widget tags-widget py-5 px-4 bg-white">
                <div className="widget-title d-flex">
                    <h6 className="mb-0">Tags.</h6>
                    <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                </div>
                <div className="mt-4 d-flex gap-2 flex-wrap">
                    <a href="#" className="btn btn-outline btn-sm">Vegetable</a>
                    <a href="#" className="btn btn-outline btn-sm">Healthy</a>
                    <a href="#" className="btn btn-outline btn-sm">Meat</a>
                    <a href="#" className="btn btn-outline btn-sm">Organic</a>
                    <a href="#" className="btn btn-outline btn-sm">Nature</a>
                    <a href="#" className="btn btn-outline btn-sm">food</a>
                    <a href="#" className="btn btn-outline btn-sm">bd food</a>
                    <a href="#" className="btn btn-outline btn-sm">fish</a>
                    <a href="#" className="btn btn-outline btn-sm">vegetable</a>
                </div>
            </div>


        </>
    )
}

export default SideContents