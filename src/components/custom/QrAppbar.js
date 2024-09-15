import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';

const QrAppbar = () => {
    const navigate = useNavigate()
    const cartData = useSelector((state) => state.qrProducts.carts)

    const homePage = ()=>{
        navigate("/results")
    }
    const addToCart = ()=>{
        navigate("/product-cart")
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "#68033f" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography onClick={homePage} variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            Welcome to Creamyaffirs
                        </Typography>
                 
                     
                        <Badge badgeContent={cartData && cartData.length} color="primary" onClick={addToCart}>
                            <AddShoppingCartIcon color="" />
                        </Badge>
                  
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default QrAppbar