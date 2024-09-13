
import React, { useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SignIn from '../../images/sign-in.jpg'
import SignUp from '../../images/signup-image.jpg'
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import WalletIcon from '@mui/icons-material/Wallet';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { noteRefs } from '../../redux/actions/userAction'
import { useAlert } from 'react-alert'
import { fetchUserDetails } from '../../redux/actions/userAction';

const Authentication = ({ openModal, setOpenModal ,logoutOpenModal,setLogOutOpenModal}) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("1")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [imagePreview, setImagePreview] = useState("./avatar.jpg")
    const [logoutOpen, setLogOutOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        file: null // for storing the selected file
    });

    const handleClose = () => {
        setOpenModal(false);
        setMode("1")
        setName("")
        setNumber("")
        setEmail("")
        setPassword("")
        setFormData({})
    };
    const handleOpenSignup = () => {
        setMode("2")
        setName("")
        setNumber("")
        setEmail("")
        setPassword("")

    }


    const handleSignIn = async () => {
        try {
            const json = {
                email: email,
                password: password
            }
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }
            const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/signin`, json, config)
            if (response.status === 200) {
                alert.success("login Successfull")
                setEmail("")
                setPassword("")
                setOpenModal(false)
                const profileData = response.data
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userId", response.data.user.userId)
                // localStorage.setItem("type", response.data.user.type)
                localStorage.setItem("profile", JSON.stringify(profileData))
                dispatch(fetchUserDetails(response.data.user))
                dispatch(noteRefs(new Date().getSeconds()))
                navigate("/")
            } else {
                alert.error("Invalid email or password")
            }
        } catch (error) {
            console.log(error.stack, "errorrrrrrrrrrrrrrrrr")
            alert.error("Invalid email or password")
        }

    }
    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, file: e.target.files[0] });
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById('selectedImage').src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);


        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    const handleLogoutModalClose = () => {
        setLogOutOpenModal(false);
   }
    const handleReturnLogin = () => {
        setMode("1")
        setName("")
        setNumber("")
        setEmail("")
        setPassword("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, mobile, file } = formData;
        if (!name || !email || !password || !mobile || !file) {
            setErrorMessage('Please fill in all fields');
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", name);
            formDataToSend.append("email", email);
            formDataToSend.append("password", password);
            formDataToSend.append("mobile", mobile);
            formDataToSend.append("file", file);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/signup`, formDataToSend, config);

            if (response.status === 200) {
                alert.success("Sign up successfully")
                setFormData({})
                setOpen(false);
                setMode("1")

            } else {
                alert.error("Sign up Failed")
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };



    const handleSignout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        localStorage.removeItem("profile")
        alert.success("Logout successfully")
        setLogOutOpenModal(false);
        dispatch(fetchUserDetails([]))
        dispatch(noteRefs(new Date().getSeconds()))
    }

    console.log("logoutOpen",logoutOpen)
    return (
        <>
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span className="clear">

                            <ClearIcon onClick={handleClose} />
                        </span>
                        <div className="row">
                            <div className="col-md-6">
                                {
                                    mode === "1" ?
                                        <img src={SignIn} /> : <img src={SignUp} />
                                }

                            </div>
                            <div className="col-md-6">
                                <div className="sign-name">
                                    {mode === "1" ? <h1>{"Sign in"}</h1> : <h1>{"Sign up"}</h1>}
                                </div>
                                {
                                    mode === "1" ? (
                                        <>
                                            <div className="form-title">
                                                <div className="email-input">
                                                    <div className='form-group'>
                                                        <label className="email-label" >
                                                            <EmailIcon />
                                                        </label>
                                                        <input type="text" name="email" value={email} placeholder="Enter email " onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="email-input mt-3" >
                                                    <div className='form-group'>
                                                        <label className="password-label">
                                                            <LockIcon />
                                                        </label>
                                                        <input type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                                                    </div>

                                                    <Button variant="contained" className="mt-3 form-submit" onClick={handleSignIn} >Sign in</Button>
                                                    <div className="mt-3">
                                                        <span>or login with <Button style={{
                                                            width: "115px",
                                                            height: "30px",
                                                            textTransform: "capitalize"
                                                        }}>Phone Number</Button></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <p style={{ fontWeight: "700" }}>Dont have any account ? <Button style={{
                                                    color: "#999",
                                                    width: "68px",
                                                    height: "30px",
                                                    textTransform: "capitalize",
                                                    fontWeight: "bold"
                                                }} onClick={handleOpenSignup}>Sign up</Button> </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-title">

                                                <div class="image-container">
                                                    <img id="selectedImage" src={imagePreview} alt="Selected Image" class="default-image" />
                                                    <label for="imageUpload" class="choose-image" onCl><AddCircleIcon /></label>
                                                    <input type="file" id="imageUpload" name="file" onChange={handleChange} />
                                                </div>

                                                <div className="email-input">
                                                    <div className='form-group'>
                                                        <label className="name-label" >
                                                            <PersonIcon />
                                                        </label>
                                                        <input type="text" name="name" value={formData.name} placeholder="Enter name " onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="email-input mt-3">
                                                    <div className='form-group'>
                                                        <label className="number-label" >
                                                            <StayCurrentPortraitIcon />
                                                        </label>
                                                        <input type="text" name="mobile" value={formData.mobile} placeholder="Enter Mobile No " onChange={handleChange} />
                                                    </div>
                                                </div>

                                                <div className="email-input mt-3">
                                                    <div className='form-group'>
                                                        <label className="signup-email-label" >
                                                            <EmailIcon />
                                                        </label>
                                                        <input type="text" name="email" value={formData.email} placeholder="Enter email " onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="email-input mt-3" >
                                                    <div className='form-group'>
                                                        <label className="signup-pass-label">
                                                            <LockIcon />
                                                        </label>
                                                        <input type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} />
                                                    </div>
                                                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                                    <Button variant="contained" className="mt-3 form-submit" onClick={handleSubmit}>Sign up</Button>
                                                    <div className="mt-3">
                                                        <span>Do you want to login ?<Button onClick={handleReturnLogin} style={{
                                                            width: "52px",
                                                            height: "30px",
                                                            textTransform: "capitalize"
                                                        }}>Login</Button></span>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
                open={logoutOpenModal}
                onClose={handleLogoutModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ fontSize: "larger" }}>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className="submit" onClick={handleSignout}>Yes</Button>
                    <Button className="submi1" onClick={handleLogoutModalClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Authentication
