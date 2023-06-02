import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import bcrypt from 'bcryptjs'
import './styles/profile.css';


function EditProfile (props) {
        
    const [user, setUser] = useState({});
    const [editedUsers, setEditedUsers] = useState({});
    const [passwordMatchingError, setPasswordMatchingError] = useState(false);
    const [passwordMatchingSuccess, setPasswordMatchingSuccess] = useState(false);
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
      if(editedUsers[userId] === undefined){
        return;
      }
      if(editedUsers[userId].password.length !== null && editedUsers[userId].password.length > 0){
        if(editedUsers[userId].password !== editedUsers[userId].confirmNewPassword){
          setPasswordMatchingError(true);
          setPasswordMatchingSuccess(false);
          return;
        }
        editedUsers[userId].password = bcrypt.hashSync(editedUsers[userId].password, props.bcryptSalt)
      }

      
      try {
        const response = await axios.put(`http://localhost:8000/users/${userId}`, editedUsers[userId]);
        console.log(`http://localhost:8000/users/${userId}`)
        const responseUser = await axios.get(`http://localhost:8000/users/${userId}`);
        console.log('response user', responseUser)
        if(localStorage.getItem('id') === userId){
          localStorage.setItem('name', responseUser.data.name);
          localStorage.setItem('email', responseUser.data.email);
          localStorage.setItem('isAdmin', responseUser.data.isAdmin);
        }
        setPasswordMatchingError(false);
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
      if(firstAttribute === undefined){
        return secondAttribute
      }
      return firstAttribute
    }
    return (
        <table>
            <tbody>
                <tr><td style ={{borderBottom : '0px'}}><h1 style ={{textAlign: 'center'}}>Edit Profile</h1></td></tr>
                <tr className = "btn-group-vertical" role="group" aria-label="Vertical button group" style ={{display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                {passwordMatchingError && (
                  <td><div className="error-message">Passwords do not match</div></td>
                )}
                    <td style ={{borderBottom : '0px'}}>
                    <label style={{fontSize: '24px'}}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control mt-1"
                        value={checkAttribute(editedUsers[user._id]?.name, user.name)}
                        onChange={(event) => handleInputChange(event, user._id)}
                    />
                    </td>
                    
                    <td style ={{borderBottom : '0px'}}>
                    <label style={{fontSize: '24px'}}>Email</label>
                    <input
                        type="text"
                        name="email"
                        className="form-control mt-1"
                        value={checkAttribute(editedUsers[user._id]?.email, user.email)}
                        onChange={(event) => handleInputChange(event, user._id)}
                    />
                    </td>
                    <td style ={{borderBottom : '0px', position: 'relative'}}>
                    <label style={{fontSize: '24px'}}>New Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control mt-1"
                        value={checkAttribute(editedUsers[user._id]?.password, '')}
                        onChange={(event) => handleInputChange(event, user._id)}
                    />
                    
                    </td>
                    <td style ={{borderBottom : '0px'}}>
                    <label style={{fontSize: '24px'}}>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        className="form-control mt-1"
                        value={checkAttribute(editedUsers[user._id]?.confirmNewPassword, '')}
                        onChange={(event) => handleInputChange(event, user._id)}
                    />
                    </td>
                
                </tr>
                <tr className = "btn-group-vertical" role="group" aria-label="Vertical button group" style ={{display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                    <td style ={{borderBottom : '0px'}}><button onClick={() => updateUser(user._id)}>Update</button></td>
                    <td style ={{borderBottom : '0px'}}><button onClick={() => navigate('/profile')}>Cancel</button></td>
                </tr>
            </tbody>
        </table>
      
    );
  }
  export default EditProfile