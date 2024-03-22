import React from 'react'
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
import Footer from '../../Footer/Footer'

const Home = () => {
    return (
        <>
            <HomeSlider />
            <HomeTopCategory />
            <FeatureProducts />
            <TrendingProducts />
            <Banner />
            <BestDeals />
            <Banner2/>
            <ViewData />
            <Others />
            <Posts />
           
        </>
    )
}

export default Home