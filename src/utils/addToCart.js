import axios from 'axios'


const userId = localStorage.getItem('userId')

const addToCart = async (productId, cartData) => {

    try {
        const config = {
            headers: {
                'Content-Type': "application/json",
            },
            withCredentials: true
        }
        console.log("productId,cartData", productId, cartData)
        const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/addToCart?userId=${userId}&productId=${productId}&type=1`, cartData, config)

        console.log("response.status",response.status)

        if (response.status === 200) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false

    }

}

export default addToCart