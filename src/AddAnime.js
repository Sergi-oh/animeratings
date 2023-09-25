import react, {useState} from "react";
import axios from "axios";

const AddAnime = ({anime, setAnime}) =>{
    const [title, setTitle] = useState('')
    const [stars, setStars] = useState(1)

    const submit = async(event)=> {
        event.preventDefault()
        const newAnime = {title, stars}
        const {data} = await axios.post('api/anime_db', newAnime)
        setAnime([...anime, data])
    }
    
    return(
        <div>
            <form onSubmit={submit}>
                <label>
                    Anime Title:
                    <input type="text" onChange={ev=>setTitle(ev.target.value)}/>
                </label>
                <label>
                    Star Rating:
                    <input type="number" min="1" max="5" onChange={ev => setStars(ev.target.value)}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )  
}
export default AddAnime