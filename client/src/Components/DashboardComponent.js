import React, { useContext, useEffect, useState } from 'react';
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

function Dashboard(props) {
    const authContext = useContext(AuthContext);
    const [currentSemester, setCurrentSemester] = useState(1);
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        const currentYear = new Date();
        const semester = (currentYear.getFullYear() - authContext.user.admissionYear) * 2;
        if (currentYear.getMonth() >= 1 && currentYear.getMonth() <= 6) {
            setCurrentSemester(semester);
        } else {
            setCurrentSemester(semester + 1);
        }

        const data = {
            semester: semester,
            branch: authContext.user.branch
        }
        fetch('/getcourses', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json()).then(data => {
            setCourses(data.courses);
        })
    }, [authContext]);

    const RenderCourses = () => {
        return courses.map(course => {
            return (
                <div key={course.courseCode} className="course-details-inner">
                    <div className="course-code-div">
                        <p>{course.courseCode}</p>
                    </div>
                    <div className="course-name-div">
                        <p>{course.courseName}</p>
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
            <Sidebar history={props.history} />
            <div className="main-page">
                <div className="section">
                    <h1 className="main-heading">ACADEMICS</h1>
                    <hr />
                    <div className="user-details">
                        <i className="material-icons avatar">account_circle</i>
                        <div>
                            <p className="content-tag">{authContext.user.name}</p>
                            <p className="content-tag">{authContext.user.username}</p>
                        </div>
                        <div className="year-details">
                            <p className="content-tag">Admission Year: {authContext.user.admissionYear}</p>
                            <p className="content-tag">Semester: {currentSemester}</p>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h1 className="main-heading">COURSES</h1>
                    <hr />
                    <div className="course-details">
                        <RenderCourses />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Dashboard);