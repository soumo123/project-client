import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import axios from 'axios'


const SideContents = ({ onChange }) => {

    const [tagsData, setTagsData] = useState([])
    const [ratings, setRatingsData] = useState([])


    const [selectedTags, setSelectedTags] = useState([])
    const [selectedTagsValues, setSelectedTagsValues] = useState([]);

    const getAllTags = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getalltags?type=1`)
            if (response.status === 200) {
                setTagsData(response.data.data)
            } else {
                setTagsData([])
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getRatings = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getallratings?type=1`)
            if (response.status === 200) {
                setRatingsData(response.data)
            } else {
                setRatingsData([])
            }

        } catch (error) {
            console.log(error)
        }


    }

    const handleTag = (tag) => {
        const index = selectedTags.findIndex(selectedTag => selectedTag.value === tag.value);
        if (index === -1) {
            // Tag is not selected, add it to the selected tags
            setSelectedTags([...selectedTags, tag]);
            setSelectedTagsValues([...selectedTagsValues, tag.value]);
        } else {
            // Tag is already selected, remove it from the selected tags
            const updatedSelectedTags = selectedTags.filter(selectedTag => selectedTag.value !== tag.value);
            const updatedSelectedTagsValues = selectedTagsValues.filter(value => value !== tag.value);
            setSelectedTags(updatedSelectedTags);
            setSelectedTagsValues(updatedSelectedTagsValues);
        }
    };

    useEffect(() => {
        console.log("selectedTags", selectedTags);
        let output = selectedTags.map(item => item.value).join(',');
        onChange(output);
    }, [selectedTags]);



    useEffect(() => {
        getAllTags()
        getRatings()
    }, [])



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
                                {/* <input type="checkbox" /> */}
                                {/* <span className="checkbox-field"><i className="fa-solid fa-check"></i></span> */}
                            </div>
                            <div className="rating-field text-warning fs-xs d-flex align-items-center ms-1">
                                <Rating name="size-small" defaultValue={5} precision={0.5} readOnly size="small" />
                            </div>
                        </div>
                        <span className="fw-bold fs-xs total-count">{ratings.fivestar}</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                        <div className="custom-checkbox d-inline-flex">
                            <div className="theme-checkbox flex-shrink-0">
                                {/* <input type="checkbox" /> */}
                                {/* <span className="checkbox-field"><i className="fa-solid fa-check"></i></span> */}
                            </div>
                            <div className="rating-field text-warning fs-xs d-flex align-items-center ms-1">
                                <Rating name="size-small" defaultValue={4} precision={0.5} readOnly size="small" />

                            </div>
                        </div>
                        <span className="fw-bold fs-xs total-count">{ratings.fourtar}</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                        <div className="custom-checkbox d-inline-flex">
                            <div className="theme-checkbox flex-shrink-0">
                                {/* <input type="checkbox" /> */}
                                {/* <span className="checkbox-field"><i className="fa-solid fa-check"></i></span> */}
                            </div>
                            <div className="rating-field text-warning fs-xs d-flex align-items-center ms-1">
                                <Rating name="size-small" defaultValue={3} precision={0.5} readOnly size="small" />

                            </div>
                        </div>
                        <span className="fw-bold fs-xs total-count">{ratings.threestar}</span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                        <div className="custom-checkbox d-inline-flex">
                            <div className="theme-checkbox flex-shrink-0">
                                {/* <input type="checkbox" /> */}
                                {/* <span className="checkbox-field"><i className="fa-solid fa-check"></i></span> */}
                            </div>
                            <div className="rating-field text-warning fs-xs d-flex align-items-center ms-1">
                                <Rating name="size-small" defaultValue={2} precision={0.5} readOnly size="small" />

                            </div>
                        </div>
                        <span className="fw-bold fs-xs total-count">{ratings.twostar}</span>
                    </li>
                </ul>
            </div>
            <div className="sidebar-widget tags-widget py-5 px-4 bg-white">
                <div className="widget-title d-flex">
                    <h6 className="mb-0">Tags.</h6>
                    <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                </div>
                <div className="mt-4 d-flex gap-2 flex-wrap">
                    {tagsData.map((tag) => (
                        <span
                            key={tag.value}
                            className={`btn btn-outline btn-sm ${selectedTags.includes(tag) ? 'selected' : ''}`}
                            style={{ backgroundColor: selectedTags.includes(tag) ? '#6eb356' : '', color: selectedTags.includes(tag) ? 'white' : '' }}
                            onClick={() => handleTag(tag)}
                        >
                            {tag.label}
                        </span>
                    ))}

                </div>
            </div>


        </>
    )
}

export default SideContents