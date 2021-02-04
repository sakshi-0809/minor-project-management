import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Sidebar(props) {

    const handleLogout = (e) => {
        fetch('/logout', {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            console.log(data);
            props.history.push('/');
        })
    }

    const viewDashboard = (e) => {
        props.history.push('/dashboard');
    }

    const editProfile = (e) => {
        props.history.push('/editprofile');
    }

    return (
        <div className="sidebar">
            <i className="material-icons sidebar-button" onClick={viewDashboard}>home</i>
            <div className="sidebar-content">Dashboard</div>

            <i className="material-icons sidebar-button" onClick={editProfile}>edit</i>
            <div className="sidebar-content">Edit Profile</div>

            <i className="material-icons logout-button" onClick={handleLogout}>exit_to_app</i>
        </div>
    )
}

function EditProfile(props) {

    const authContext = useContext(AuthContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [isValid, setIsValid] = useState({ value: false, msg: " " });
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        const user = {
            password: password,
            newPassword: newPassword,
            changePassword: changePassword,
            username: authContext.user.username
        }

        e.preventDefault();

        fetch('/changeprofile', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json()).then(data => {
                setMessage(data.message.msgBody);
                setName('');
                setConfirmPassword('');
                setPassword('');
                setNewPassword('');
            });
    }

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "newPassword") {
            setNewPassword(e.target.value);
        } else if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "phoneNumber") {
            setPhoneNumber(e.target.value);
        }
    }

    const handleBlur = (e) => {
        validate(e.target.name, e.target.value)
        e.target.addEventListener('change', (e) => {
            validate(e.target.name, e.target.value)
        })
    }

    const validate = (type, value) => {
        if (type === "confirmPassword") {
            if (value !== newPassword) {
                setIsValid({ value: false, msg: "Password Does Not Match" })
                return false;
            }
            else {
                setIsValid({ value: true, msg: "" })
                return true;
            }
        }

        if (type === "phoneNumber") {
            var regexPhone = /^[0-9]{10,10}$/;

            if (!regexPhone.test(value)) {
                setIsValid({ value: false, msg: "Contact Number should only have <br> numbers and be 10 digits long." });
                return false;
            }
            else {
                setIsValid({ value: true, msg: "" });
                return true;
            }
        }
    }

    const handleCheckBox = (e) => {
        setChangePassword(!changePassword);
    }

    return (
        <div>
            <Sidebar history={props.history} />
            <div className="main-page">
                <div className="edit-profile-heading">Edit Profile</div>

                <div className="form">
                    <div className="form-card">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Name" value={name} name="name" onChange={handleChange} onBlur={handleBlur} />
                            <input type="email" placeholder="Official Email ID" value={email} name="email" onChange={handleChange} onBlur={handleBlur} />
                            <input type="text" placeholder="Contact Number" value={phoneNumber} name="phoneNumber" onChange={handleChange} onBlur={handleBlur} />
                            <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} onBlur={handleBlur} />

                            {changePassword ? <input type="password" placeholder="New Password" value={newPassword} name="newPassword" onChange={handleChange} onBlur={handleBlur} /> : null}
                            {changePassword ? <input type="password" placeholder="Confirm New Password" value={confirmPassword} name="confirmPassword" onChange={handleChange} onBlur={handleBlur} /> : null}

                            <label htmlFor="changePassword">
                                Change Password? <input type="checkbox" id="changePassword" name="changePassword" onClick={handleCheckBox} />
                            </label>

                            {isValid.value === false ? <div className="form-error" dangerouslySetInnerHTML={{ __html: isValid.msg }}></div> : <div></div>}
                            {message !== '' ? <div>{message}</div> : null}
                            <button className="edit-button" type="submit">Save Changes</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default withRouter(EditProfile);