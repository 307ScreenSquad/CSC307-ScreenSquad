import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './styles/profile.css';


function ProfileReview (props) {
    const [reviews, setReviews] = useState([]);
    const [editedReviews, setEditedReviews] = useState({});
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

  //NEED TO FETCH ALL BY USER
    async function fetchReviews(){
        try {
          const response = await axios.get(`http://localhost:8000/reviews?userId=${localStorage.getItem('id')}`);
          
          return response.data.reviews;
        }
        catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
        }
    }

    /*
      adult: false
      backdrop_path: "/h8gHn0OzBoaefsYseUByqsmEDMY.jpg"
      genre_ids: Array(3) [ 28, 53, 80 ]
      id: 603692
      original_language: "en"
      original_title: "John Wick: Chapter 4"
      overview: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes."
      popularity: 8361.829
      poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
      release_date: "2023-03-22"
      title: "John Wick: Chapter 4"
      video: false
      vote_average: 8
      vote_count: 2263
​​
    */
    async function fetchMovies(){
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a43aea022f03ee960884520d48d1c5f8`);
        return response.data.results;
      }
      catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
      }
    }
    

  useEffect(() => {
    if(movies.length === 0){
      fetchMovies().then( result => {
        if(result){
            setMovies(result);
        //console.log(result)
        }
      })
    }
    
    if(reviews.length == 0){
      fetchReviews().then((result) => {
        if(result){
          setReviews(result);
        }
      })

    }
    
  })

  const handleReviewChange = (event, userId) => {
    const { name, value } = event.target;
    setEditedReviews((prevState) => ({
        ...prevState,
        [userId]: {
          ...prevState[userId],
          [name]: value,
        },
      }));
  };

  const updateReview = async (userId, reviewId) => {
    try {
      const response = await axios.put(`http://localhost:8000/reviews/${reviewId}`, editedReviews[userId]);
      navigate('/profile/reviews')
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  function checkAttribute(firstAttribute, secondAttribute){
    if(firstAttribute === undefined){
      return secondAttribute
    }
    return firstAttribute
  }

  function findMovie(movieId){
    let foundMovie = movies.find(movie => movie.id === parseInt(movieId))
    return foundMovie
  }
  

  //function setMovieInformation(){}
  return (
      <table>
        <tbody>
          <tr style ={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><td><h2 style={{textAlign: 'center'}}>My Reviews</h2></td></tr>
          {reviews.map((review) => (
          <tr key={review._id}>
            <td className ="movie">
              <img
                src={`https://image.tmdb.org/t/p/w500/${findMovie(review.movieId).poster_path}`}
                alt={findMovie(review.movieId).title}
              />
            </td>
            <td className="movieDetails">
              <h3>{findMovie(review.movieId).title}</h3>
              <p>Overview: {findMovie(review.movieId).overview}</p>
              <p>Release Date: {findMovie(review.movieId).release_date}</p>
              <p>Overall Ratings: {findMovie(review.movieId).vote_average}/10</p>
              <h4>My Review:</h4>
              <input
              type="text"
              name="reviewText"
              className="form-control mt-1"
              style = {{width: 1000}}
              value={checkAttribute(editedReviews[review.userId]?.reviewText, review.reviewText)}
              onChange={(event) => handleReviewChange(event, review.userId)}
            />
            <button onClick={() => updateReview(review.userId, review._id)}>Update</button>
            </td>
            
            
            
            
          </tr>
          ))}
          
        </tbody>
      </table>
  );
}

export default ProfileReview