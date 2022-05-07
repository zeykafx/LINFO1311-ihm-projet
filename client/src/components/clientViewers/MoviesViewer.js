import React, { useState, useEffect, useRef } from 'react';

import ScrollArea from 'react-scrollbar';

import "../../Constants/vars.css";
import "../../Constants/font.css";

import "./MoviesViewer.css";
import Loader from '../misc/Loader';

function MoviesViewer({
    maxNumberOfMovies=-1,
    gradientBackground=false
}) {

    const [moviesList, setMoviesList] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState({});

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState("");

    const getReadableDateFromMilliTime = (dateInMilli) => {
        const dateObject = new Date(parseInt(dateInMilli));
        return dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
    }

    useEffect(() => {

        setLoading(true);
        setResponse("");

        const data = {
            maxNumberOfMovies: maxNumberOfMovies
        };

        fetch("/api/movies/client/get", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                // Movie fetching successful
                setMoviesList(response.message);
                setSelectedMovie(response.message[0]);
            } else {
                // Error while trying
                setResponse(response.message);
            }

            setLoading(false);

        }));

    }, []);

    const genCoActorBubbles = (coActors) => {
        return coActors.map((actor, index) => {
            let separator = "";
            if(index !== (coActors.length - 1)){
                separator = index===(coActors.length - 2) ? ", and " : ", ";
            }
            return <b className="actorBubble">{actor}{separator}</b>
        })
    }

    const extractWebsiteName = (rawURL) => {
        let result = "";

        let positionWWW = rawURL.indexOf("www.");
        if(positionWWW===-1) positionWWW = 0;

        let startRegisteringDot = false;

        for (let index = positionWWW; index < rawURL.length; index++) {
            const letter = rawURL[index];
            


            if(startRegisteringDot){
                if(letter==="/"){
                    break;
                }
            } else {
                if(letter==="."){
                    startRegisteringDot = true;
                }
            }

            result += letter;

        }

        return result;
    }

    return (
        <div className={"MV-container " + (gradientBackground ? "gBg " : "")}>
            { response!=="" ?
            <div className="errorContainer">
                <h3>{response}</h3>
            </div>
            :
            <>
            { loading 
            ? <Loader color="rgb(94, 94, 94)" size={30} noAspectRatio={true} label="Fetching the movies..."/>
            :
            <div className="moviesContainer">
                {moviesList.map((movie) =>
                    <div key={movie.id} className={"moviePreview " + (movie.id===selectedMovie.id ? "selected" : "")}>
                        <div className="clickToKnowMore">
                            <h3>Click to know more</h3>
                        </div>
                        <img src="https://images.immediate.co.uk/remote/m.media-amazon.com/images/M/MV5BNWE3Mzc2YzUtZDAyYS00MmQ4LWFhZmItYTA5MTYyYjgxMTQ4XkEyXkFqcGdeQXVyNDgxMDU4NTU@._V1_.jpg?quality=90&webp=true&resize=650,911"/>
                    </div>
                )}
            </div>
            }
            </>    
            }
        </div>
    )

}
export default MoviesViewer;