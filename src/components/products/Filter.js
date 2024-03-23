import React, { useState } from 'react'
import Slider from '@mui/material/Slider';


function valuetext(value) {
  return `${value}°C`;
}

const Filter = ({onChange}) => {

  const [value, setValue] = React.useState([0, 10000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue)
  };


  return (
    <>
      <div className="sidebar-widget price-filter-widget bg-white py-5 px-4 border-top">
        <div className="widget-title d-flex">
          <h6 className="mb-0 flex-shrink-0">Filter by Price</h6>
          <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
        </div>
        <div className="at-pricing-range mt-4">
          <form className="range-slider-form">
            <div className="price-filter-range"></div>
            <div className="d-flex align-items-center mt-3">
              {/* <input type="text" oninput="validity.valid||(value='0');" className="min_price price-range-field price-input" />
              <span className="d-inline-block ms-2 me-2 fw-bold">-</span>
              <input type="text" oninput="validity.valid||(value='10000');" className="max_price price-range-field price-input" /> */}
              <Slider
                min={0}
                step={1}
                max={10000}
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}

              />
            </div>
            <div className="d-flex pt-2 pb-2 priceRange">
              <span>
                From: <strong className="text-success">₹ {value[0]}</strong>
              </span>
              <span className="ms-auto">
                To: <strong className="text-success">₹ {value[1]}</strong>
              </span>
            </div>
            <button type="submit" className="btn btn-primary btn-sm mt-3">Filter</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Filter