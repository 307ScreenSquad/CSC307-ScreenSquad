import React, {useState, useEffect} from 'react'
import './styles/profile.css';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import { Navbar, Container, Nav } from "react-bootstrap";



function Profile() {
    const [initial, setInitial] = useState(true);
    const [adminTable, setAdminTable] = useState(false);
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [reviewsTable, setReviewsTable] = useState(false);
    const navigate = useNavigate();
    
    
    /*
    useEffect(() => {
        isAdmin();
    })
    async function isAdmin(){
        if(localStorage.getItem('name').length === 0){
            setCheckAdmin(false);
            navigate('/')
        }
        else{
            setCheckAdmin(true);
        }
    }
    */
    function Initial(props){
        const navigate = useNavigate();
        const [checkPage, setCheckPage] = useState(false);
        return (
            <tbody>
                <tr><td style ={{borderBottom : '0px', textAlign: 'center', fontSize: 34, fontWeight: 'bold'}}>Welcome {localStorage.getItem('name')}</td></tr>
                <tr className = "btn-group-vertical" role="group" aria-label="Vertical button group" style ={{display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                        <td>
                        <Nav className="btn-group-vertical">
                                <Nav.Link className ="btn btn-secondary" style={{fontWeight: 'bold', border:'0px solid #ccc', backgroundColor: 'gray', width: 400, color: 'white'}} as={Link} to="/profile/edit">
                                    Edit Profile
                                </Nav.Link>
                            </Nav>
                        </td>
                        {(localStorage.getItem('isAdmin') === "true") && <td>
                            <Nav className="btn-group-vertical">
                                <Nav.Link className ="btn btn-secondary" style={{fontWeight: 'bold', border:'0px solid #ccc', backgroundColor: 'gray', width: 400, color: 'white'}} as={Link} to="/admin">
                                    Admin
                                </Nav.Link>
                            </Nav>
                        </td>}
                        <td>
                        <Nav className="btn-group-vertical">
                                <Nav.Link className ="btn btn-secondary" style={{fontWeight: 'bold', border:'0px solid #ccc', backgroundColor: 'gray', width: 400, color: 'white'}} as={Link} to="/profile/reviews">
                                    View Movie Reviews
                                </Nav.Link>
                            </Nav>
                        </td>
                    
                </tr>
            </tbody>
        )
    }
    return (
      <table style = {{height: '100%'}}>
        <Initial/>
      </table>
    );
} 

export default Profile
  
  
  
  