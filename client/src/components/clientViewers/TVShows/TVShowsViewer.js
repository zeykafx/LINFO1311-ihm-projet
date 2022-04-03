import React, { useState, useEffect, useRef } from 'react';

import ScrollArea from 'react-scrollbar';

import "../../../Constants/vars.css";
import "../../../Constants/font.css";

import "./TVShowsViewer.css";
import Loader from '../../misc/Loader';

function TVShowsViewer({
    maxNumberOfTVShows=-1,
    height=1000,
    gradientBackground=false
}) {

    const [TVShowsList, setTVShowsList] = useState([]);

    const scrollbar = useRef();

    const [selectedTVShow, setSelectedTVShow] = useState({});

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
            maxNumberOfTVShows: maxNumberOfTVShows
        };

        fetch("/api/tvshows/client/get", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                // TVShow fetching successful
                setTVShowsList(response.message);
                setSelectedTVShow(response.message[0]);
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
            if(index != (coActors.length - 1)){
                separator = index==(coActors.length - 2) ? " and " : ", ";
            }
            return <b className="actorBubble">{actor}{separator}</b>
        })
    }

    return (
        <div className={"MV-container " + (gradientBackground ? "gBg " : "")}  style={{
            height: height
        }}>
            <div className="TVShowsDetailsContainer">
                { selectedTVShow.name &&
                <ScrollArea
                speed={0.7}
                ref={scrollbar}
                className="TVShowInfoBox"
                smoothScrolling={true}
                horizontal={false}
                >
                    <div className="MIB-TopBar">
                        <h1>{selectedTVShow.name}</h1>
                        <h3>Directed by <b>{selectedTVShow.director}</b> - Released on the <b>{getReadableDateFromMilliTime(selectedTVShow.releaseDate)}</b></h3>
                        <h3>With {genCoActorBubbles(selectedTVShow.coActors)}</h3>
                    </div>
                    <div className="MIB-Desc">
                        <b>DESCRIPTION</b>
                        <p>{selectedTVShow.description}</p>
                    </div>
                    <div className="MIB-Links">

                        <h3>Available in : { selectedTVShow.languages.map((language) => {
                                return <b className="languageBubble">{language}</b>
                        })}</h3>

                        <h3>Available on the TV channels : { selectedTVShow.tv_channels.map((tv_channel) => {
                                return <b className="languageBubble">{tv_channel}</b>
                        })}</h3>

                        <h3>Available on the streaming platforms : { selectedTVShow.streaming_services.map((streaming_service) => {
                                return <b className="languageBubble">{streaming_service}</b>
                        })}</h3>

                    </div>
                </ScrollArea>
                }
            </div>
            <div className="TVShowsCarrousel">
                <div className="TitleContainer">
                    <h1>Discover her best TV Shows</h1>
                </div> 
                { response!=="" ?
                <div className="errorContainer">
                    <h3>{response}</h3>
                </div>
                :
                <>
                { loading 
                ? <Loader color="rgb(94, 94, 94)" size={30} noAspectRatio={true} label="Fetching the TVShows..."/>
                :
                <div className="TVShowsContainer">
                    {TVShowsList.map((TVShow) =>
                        <div key={TVShow.id} className={"TVShowPreview " + (TVShow.id===selectedTVShow.id ? "selected" : "")} onClick={() => {
                            setSelectedTVShow(TVShow);
                            scrollbar.current.scrollArea.scrollTop();
                            }}>
                            <div className="TVShowPosterContainer">
                                <div className="TVShowPosterContainerEffect">
                                    <div className="clickToKnowMore">
                                        <h3>Know more</h3>
                                    </div>
                                    <img src="https://images.immediate.co.uk/remote/m.media-amazon.com/images/M/MV5BNWE3Mzc2YzUtZDAyYS00MmQ4LWFhZmItYTA5MTYyYjgxMTQ4XkEyXkFqcGdeQXVyNDgxMDU4NTU@._V1_.jpg?quality=90&webp=true&resize=650,911"/>
                                </div>
                            </div>
                            <div className="TVShowsTextContainer">
                                <h1>{TVShow.name}</h1>
                                <h3>Playing as {TVShow.actorRole}</h3>
                            </div>
                        </div>
                    )}
                </div>
                }
                </>    
                }
            </div>
        </div>
    )

}
export default TVShowsViewer;