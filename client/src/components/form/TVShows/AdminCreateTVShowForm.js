import React from 'react';
import { useState } from 'react';

import CButton from '../buttons/CButton';
import CTextInput from '../inputs/CTextInput';
import CDateInput from '../inputs/CDateInput.js';

import "../commonStyle.css";
import CArrayTextInput from '../inputs/CArrayTextInput.js';
import CLongTextInput from '../inputs/CLongTextInput';

function AdminCreateTVShowForm({}) {

    const [name, setName] = useState("");
    const [director, setDirector] = useState("");
    const [coActors, setCoActors] = useState([]);
    const [releaseDate, setReleaseDate] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [description, setDescription] = useState("");
    const [tvChannels, setTvChannels] = useState([]);
    const [streamingServices, setStreamingServices] = useState([]);
    const [actorRole, setActorRole] = useState("");

    const [response, setResponse] = useState("");

    const isFormComplete = () => {
        return  name!=="" &&
                director !== "" &&
                releaseDate !== null &&
                description !== "" &&
                actorRole !== "";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setResponse("");

        if(!isFormComplete()) return;

        const data = {
            name: name,
            director: director,
            coActors: coActors,
            releaseDate: releaseDate,
            languages: languages,
            description: description,
            tvChannels: tvChannels,
            streamingServices: streamingServices,
            actorRole: actorRole
        };

        fetch("/api/tvshows/create", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                // TV show creation successful
            } else {
                // Error while trying
                setResponse(response.message)
            }

        }));

    }

    return (
        <form onSubmit={e => {handleSubmit(e)}}>

            { response &&
                <div className="formResponse">
                    <h3>{response}</h3>
                </div>
            }

            <CTextInput 
                label="TV Show's name"
                placeholder="Please enter the TV Show's name"
                value={name}
                feedback={(value) => setName(value)}
                maxSize={512}
            />

            <CTextInput 
                label="Director's name"
                placeholder="Please enter the director's name"
                value={director}
                feedback={(value) => setDirector(value)}
                maxSize={512}
            />

            <CArrayTextInput 
                label="Co-actors"
                placeholder="Please enter a co-actor's name"
                values={coActors}
                feedback={(value) => setCoActors(value)}
            />

            <hr />

            <CDateInput 
                label="Release date"
                value={releaseDate}
                feedback={(value) => setReleaseDate(value)}
            />

            <CArrayTextInput 
                label="Languages"
                placeholder="Please enter a language"
                values={languages}
                feedback={(value) => setLanguages(value)}
            />

            <hr />

            <CLongTextInput 
                label="TV Show's description"
                placeholder="Please enter the TV Show's description"
                value={description}
                feedback={(value) => setDescription(value)}
                maxSize={2000}
            />

            <CArrayTextInput 
                label="TV Channels"
                placeholder="Please enter a TV Channel"
                values={tvChannels}
                feedback={(value) => setTvChannels(value)}
            />


            <CArrayTextInput 
                label="Streaming services"
                placeholder="Please enter a streaming service"
                values={streamingServices}
                feedback={(value) => setStreamingServices(value)}
            />
            
            <hr />

            <CTextInput 
                label="Actor's role"
                placeholder="Please enter the actor's role"
                value={actorRole}
                feedback={(value) => setActorRole(value)}
                maxSize={512}
            />

            <CButton 
                disabled={!isFormComplete()}
                text="Create"
                type="submit"
            />

        </form>
    )

}
export default AdminCreateTVShowForm;