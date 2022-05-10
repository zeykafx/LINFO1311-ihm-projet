import React from 'react';
import { useState } from 'react';
import { useToast } from "@chakra-ui/react";

import CButton from '../buttons/CButton';
import CTextInput from '../inputs/CTextInput';
import CDateInput from '../inputs/CDateInput.js';

import "../commonStyle.css";
import CArrayTextInput from '../inputs/CArrayTextInput.js';
import CLongTextInput from '../inputs/CLongTextInput';
import PhotoUploader from "../inputs/PhotoUploader.js"

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
    const [filename, setFilename] = useState("");

    const [response, setResponse] = useState("");
    const toast = useToast();

    const isFormComplete = () => {
        return  name!=="" &&
                director !== "" &&
                releaseDate !== null &&
                description !== "" &&
                actorRole !== "" && filename !== "";
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
            actorRole: actorRole,
            filename: filename
        };

        fetch("/api/tvshows/create", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {
            
            if (response.status){
                // TV show creation successful
                toast({
                    title: "Success",
                    description: "This TV Show has succesfully been created ",
                    status: "success",
                    position: "bottom-left",
                    duration: 15000,
                    isClosable: true,
                  });
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

            <PhotoUploader 
              label="Image"
              disabled = {false}
              inheritedErrorMessageExistence = {false}
              filenameFunction={(filename)=>setFilename(filename)}
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