import React, { useState, useEffect } from 'react'
import HomeSlider from '../Slider/HomeSlider'
import HomeTopCategory from '../HomeTopCategory'
import FeatureProducts from '../FeatureProducts'
import TrendingProducts from '../TrendingProducts'
import Banner from '../Banner/Banner'
import BestDeals from '../Banner/BestDeals'
import Banner2 from '../Banner/Banner2'
import ViewData from '../ViewData'
import Others from '../Others'
import Posts from '../Posts'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {fetchProducts} from '../../../redux/actions/productAction'
import { useParams } from 'react-router-dom'

const Home = () => {

    const dispatch = useDispatch()
    const [data,setData]=useState([])
    const[featuredData,setFeaturedData] = useState([])
    const [topSellingData,setTopSellingData] = useState([])
    const [bestSelling,setBestSelling] = useState([])
    const [brandData,setBrandData] = useState([])
    const[dealsData,setDealsData] = useState([])
    const[newProducts,setNewProducts]=useState([])
    const [load,setLoad] = useState(false)
    // const {id} = useParams()

    // console.log("idididid",id)

    // useEffect(() => {
    //     if(id){

    //         localStorage.setItem("type",id)
    //     }
    // }, [id])
    
    const getFeatureProducts = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getAllProducts?limit=${12}&offset=${0}&type=1&key=${""}&tags=${""}&startprice=${0}&lastprice=${10000}`)

            if (response.status === 200) {
                setData(response.data.allData)
                setFeaturedData(response.data.featuredData)
                setBrandData(response.data.brandedData)
                setTopSellingData(response.data.topSellingData)
                setBestSelling(response.data.bestSellingData)    
                setDealsData(response.data.dealsData)
                setNewProducts(response.data.latestProducts)
                dispatch(fetchProducts(response.data))
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getFeatureProducts()
    }, [load])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <HomeSlider />
            <HomeTopCategory />
            <FeatureProducts featuredData={featuredData} load={load} setLoad={setLoad}/>
            <TrendingProducts topSellingData = {topSellingData} load={load} setLoad={setLoad}/>
            <Banner />
            <BestDeals dealsData={dealsData} load={load} setLoad={setLoad}/>
            <Banner2/>
            <ViewData />
            <Others newProducts={newProducts} load={load} setLoad={setLoad}/>
            <Posts />
           
        </>
    )
}

export default Home