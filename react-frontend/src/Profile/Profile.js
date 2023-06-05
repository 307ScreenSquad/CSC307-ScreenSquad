import React, {useState, useEffect} from 'react'
import './profile.css';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import { Navbar, Container, Nav } from "react-bootstrap";



function Profile() {
    const [initial, setInitial] = useState(true);
    const [adminTable, setAdminTable] = useState(false);
    const [checkAdmin, setCheckAdmin] = useState(false);
    const navigate = useNavigate();
    

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
    

    /*
    function changeAdminTableStatus(){
        console.log('change admintable', adminTable);
        console.log('change initial', initial);
        setAdminTable(true);
        setInitial(false);
        navigate('/profile');
        console.log('change admintable2', adminTable);
        console.log('change initial2', initial);
    }
    function returnBack(){
        console.log('admintable', adminTable);
        console.log('initial', initial);
        setAdminTable(false);
        setInitial(true);
        navigate('/profile');
        console.log('admintable2', adminTable);
        console.log('initial2', initial);
    }
    */
    function changeAdminTableStatus(){
        if(adminTable){
            setAdminTable(false);
            setInitial(true);
        }
        else{
            setAdminTable(true);
            setInitial(false);
        }
    }
    function Initial(props){
        const navigate = useNavigate();
        
        /*return(
            <tbody>
                <tr><td style ={{borderBottom : '0px'}}><h1 style ={{textAlign: 'center'}}>Welcome {localStorage.getItem('name')}</h1></td></tr>
                
                <tr className = "btn-group-vertical" role="group" aria-label="Vertical button group" style ={{display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                    <td><button className ="btn btn-secondary" type = "button" style={{border:'0px solid #ccc', backgroundColor: 'gray', width: 400,}}>Edit Profile</button></td>
                    {localStorage.getItem('isAdmin') && <td><button className ="btn btn-secondary" type = "button" style={{border:'0px solid #ccc', backgroundColor: 'gray', width: 400,}}>Admin</button></td>}
                </tr>
            </tbody>
        );*/
        return (
            <tbody>
                <tr><td style ={{borderBottom : '0px', textAlign: 'center', fontSize: 34, fontWeight: 'bold'}}>Welcome {localStorage.getItem('name')}</td></tr>
                <tr className = "btn-group-vertical" role="group" aria-label="Vertical button group" style ={{display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                        <td>
                            <button className ="btn btn-secondary"  onClick={() => {props.changeAdmin()}} type = "button" style={{border:'0px solid #ccc', backgroundColor: 'gray', width: 400,}}>Edit Profile</button>
                        </td>
                        {(localStorage.getItem('isAdmin') === "true") && <td>
                            <Nav className="btn-group-vertical">
                                <Nav.Link className ="btn btn-secondary" style={{fontWeight: 'bold', border:'0px solid #ccc', backgroundColor: 'gray', width: 400, color: 'white'}} as={Link} to="/admin">
                                    Admin
                                </Nav.Link>
                            </Nav>
                        </td>}
                    
                </tr>
                
              
            </tbody>
        )
    }


    
    
    function AdminTableBody (props) {
      const [user, setUser] = useState({});
      const [editedUsers, setEditedUsers] = useState({});
      const navigate = useNavigate();

      async function fetchCurrentUser(){
        try {
            const responseUser = await axios.get(`http://localhost:8000/users/${localStorage.getItem('id')}`);
            //console.log(responseUser.data)
            setUser(responseUser.data);
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log(error); 
           return false;         
        }
      }

      useEffect(() => {
        fetchCurrentUser().then( result => {
          if(result){
            setUser(result);
          }
        })
      })
    
      
      const handleInputChange = (event, userId) => {
        const { name, value } = event.target;
        if(name === 'isAdmin'){
          let booleanForAdmin = false;
          if(editedUsers[userId]?.isAdmin === undefined && localStorage.getItem('isAdmin') === 'false'){
            booleanForAdmin = true
          }
          if(editedUsers[userId]?.isAdmin === false){
            booleanForAdmin = true;
          }
          setEditedUsers((prevState) => ({
            ...prevState,
            [userId]: {
              ...prevState[userId],
              [name]: booleanForAdmin,
            },
          }));
        }
        else{
          setEditedUsers((prevState) => ({
            ...prevState,
            [userId]: {
              ...prevState[userId],
              [name]: value,
            },
          }));
        }
        
        
      };
    
      const updateUser = async (userId) => {
        try {
          const response = await axios.put(`http://localhost:8000/users/${userId}`, editedUsers[userId]);
          console.log(`http://localhost:8000/users/${userId}`)
          const responseUser = await axios.get(`http://localhost:8000/users/${userId}`);
          console.log('response user', responseUser)
          if(localStorage.getItem('id') == userId){
            localStorage.setItem('name', responseUser.data.name);
            localStorage.setItem('email', responseUser.data.email);
            localStorage.setItem('isAdmin', responseUser.data.isAdmin);
          }
          props.changePage()
          navigate('/profile')
          // Handle the response as needed
          console.log(response.data);
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };
      function isChecked(user1, user2){
        let checked = user1;
        if(user1 === undefined){
          checked = user2
        }
        if(checked === true){
          return true
        }
        return false
      }
    
      function checkAttribute(firstAttribute, secondAttribute){
        if(firstAttribute == undefined){
          return secondAttribute
        }
        return firstAttribute
      }
      return (
        <tbody>
            <tr><td style ={{borderBottom : '0px'}}><h1 style ={{textAlign: 'center'}}>Edit Profile</h1></td></tr>
            <tr className = "btn-group-vertical" role="group" aria-label="Vertical button group" style ={{display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                <td style ={{borderBottom : '0px'}}>
                <label for="name" style={{fontSize: '24px'}}>Full Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control mt-1"
                    value={checkAttribute(editedUsers[user._id]?.name, user.name)}
                    onChange={(event) => handleInputChange(event, user._id)}
                />
                </td>
                
                <td style ={{borderBottom : '0px'}}>
                <label for="email" style={{fontSize: '24px'}}>Email</label>
                <input
                    type="text"
                    name="email"
                    className="form-control mt-1"
                    value={checkAttribute(editedUsers[user._id]?.email, user.email)}
                    onChange={(event) => handleInputChange(event, user._id)}
                />
                </td>
                <td style ={{borderBottom : '0px'}}>
                <label for="name" style={{paddingRight: '36px', fontSize: '24px', display: 'inline-block'}}>Admin Status?</label>
                <input
                    type="checkbox"
                    name="isAdmin"
                    checked={isChecked(editedUsers[user._id]?.isAdmin, user.isAdmin)}
                    onChange={(event) => handleInputChange(event, user._id)}
                    />
                </td>
                
            
            </tr>
            <tr className = "btn-group-vertical" role="group" aria-label="Vertical button group" style ={{display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                <td style ={{borderBottom : '0px'}}><button onClick={() => updateUser(user._id)}>Update</button></td>
                <td style ={{borderBottom : '0px'}}><button onClick={() => props.changePage()}>Cancel</button></td>
            </tr>
        </tbody>
      );
    }
    return (
      <table style = {{height: '100%'}}>
        {initial && <Initial changeAdmin={changeAdminTableStatus}/>}
        {(!initial & adminTable) && <AdminTableBody changePage={changeAdminTableStatus}/>}
      </table>
    );
} 

export default Profile
  
  
  
  