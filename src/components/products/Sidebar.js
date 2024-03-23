import React,{useState} from 'react'

const Sidebar = ({onSearch }) => {

    const [searchValue, setSearchValue] = useState('');

    // Function to handle input change
    const handleChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
        // Call the onSearch function with the updated value
        onSearch(value);
    };



    
    return (
        <>

            <div className="gshop-sidebar bg-white rounded-2 overflow-hidden">
                <div className="sidebar-widget search-widget bg-white py-5 px-4">
                    <div className="widget-title d-flex">
                        <h6 className="mb-0 flex-shrink-0">Search Now</h6>
                        <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                    </div>
                    <form className="search-form d-flex align-items-center mt-4">
                    <input type="text" value={searchValue} onChange={handleChange} placeholder="Search Products..." />
                        <button type="submit" className="submit-icon-btn-secondary"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
                <div className="sidebar-widget category-widget bg-white py-5 px-4 border-top">
                    <div className="widget-title d-flex">
                        <h6 className="mb-0 flex-shrink-0">Categories</h6>
                        <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                    </div>
                    <ul className="widget-nav mt-4">
                        <li><a href="#" className="d-flex justify-content-between align-items-center">Apples<span className="fw-bold fs-xs total-count">08</span></a></li>
                        <li><a href="#" className="d-flex justify-content-between align-items-center">Organic Vegetable<span className="fw-bold fs-xs total-count">09</span></a></li>
                        <li><a href="#" className="d-flex justify-content-between align-items-center">Avocados<span className="fw-bold fs-xs total-count">06</span></a></li>
                        <li><a href="#" className="d-flex justify-content-between align-items-center">Dried Fruits & Nuts<span className="fw-bold fs-xs total-count">10</span></a></li>
                        <li><a href="#" className="d-flex justify-content-between align-items-center">Coffee<span className="fw-bold fs-xs total-count">11</span></a></li>
                        <li><a href="#" className="d-flex justify-content-between align-items-center">Juice Drinks<span className="fw-bold fs-xs total-count">15</span></a></li>
                        <li><a href="#" className="d-flex justify-content-between align-items-center">Fresh Fish<span className="fw-bold fs-xs total-count">18</span></a></li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Sidebar