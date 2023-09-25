import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import AddAnime from "./AddAnime";


const App = ()=> {
  const [error, setError] = useState("")
  const [anime, setAnime] = useState([]); 
  useEffect (()=> {
    const fetchAnime = async() => {
      const {data} = await axios.get('/api/anime_db');
      setAnime(data);
    };

    fetchAnime();
 },[]);
 const increaseRating = async(anime)=>{
  try{
    setError("")
    const newRating = anime.stars + 1
    const{data} = await axios.put(`/api/anime_db/${anime.id}`, {title: anime.title, stars: newRating})
    console.log(data)
    const newAnime = anime.map((animeMap)=>{
      if(animeMap.id === anime.id){
        return data
      } else{
        return animeMap
      }
    })
    setAnime(newAnime)
  }catch(error){
    setError(error.response.data)
  }
 };

 const decreaseRating = async(anime) =>{
  try{
    setError("")
    const newRating = anime.stars -1
    const {data} = await axios.put(`/api/anime_db/${anime.id}`, {title:anime.title, stars:newRating})
    console.log(data)
    const newAnime = anime.map((animeMap)=>{
      if(animeMap.id === anime.id){
        return data
      }else{
        return animeMap
      }
    })
    setAnime(newAnime)
  }catch(error){
    setError(error.response.data)
  }
 };

 const deleteAnime = async(anime)=>{
  await axios.delete(`/api/anime_db/${movie.id}`)
  const updateAnimelist = anime.filter((animeFilter)=>{
    return (animeFilter.id !== anime.id)
  })
  setAnime[updateAnimelist]
 }

  return (
    <div>
      <p>{error}</p>
      <h1>Anime({anime.lenght})</h1>
      <AddAnime anime={anime} setAnime={setAnime}/>
      <ul>
        {
          anime.map( anime=> {
            return (
              <li key={ anime.id }>
                <h2>{ anime.title }</h2>
                <h3>Rating:{anime.stars}
                <button onClick={()=> {increaseRating(anime)}}>+</button>
                <button onClick={()=> {decreaseRatingRating(anime)}}>-</button>
                </h3>
                <button onClick={()=> {deleteAnime(anime)}}>Delete</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
