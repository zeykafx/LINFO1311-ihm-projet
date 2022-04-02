import React, { useState } from 'react';

import CButton from '../buttons/CButton';
import CTextInput from '../inputs/CTextInput';

import "../commonStyle.css";
import './AdminModifyMovieForm.css';
import AdminAccountVerificator from '../../misc/AdminAccountVerificator.js';

import CArrayTextInput from '../inputs/CArrayTextInput.js';
import CDateInput from '../inputs/CDateInput.js';
import CLongTextInput from '../inputs/CLongTextInput.js';

function AdminModifyMovieForm({
    movieData
}) {

    const [name, setName] = useState(movieData.name);
    const [director, setDirector] = useState(movieData.director);
    const [coActors, setCoActors] = useState(movieData.coActors);
    const [releaseDate, setReleaseDate] = useState(movieData.releaseDate);
    const [languages, setLanguages] = useState(movieData.languages);
    const [description, setDescription] = useState(movieData.description);
    const [ticketLinks, setTicketLinks] = useState(movieData.ticketLinks);
    const [actorRole, setActorRole] = useState(movieData.actorRole);

    const [responseType, setResponseType] = useState("");
    const [response, setResponse] = useState("");

    const [isAdminAccountVerified, setIsAdminAccountVerified] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!isAdminAccountVerified) return;
        if(!canSubmit()) return;

        setResponse("");

        const data = {
            id: movieData.id,
            name: name,
            director: director,
            coActors: coActors,
            releaseDate: releaseDate,
            languages: languages,
            description: description,
            ticketLinks: ticketLinks,
            actorRole: actorRole
        };

        fetch("/api/movies/modify", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => res.json().then((response) => {

            if (response.status){
                // Movie modification successful
                setResponseType("success");
                setResponse("This movie has succesfully been modified")
            } else {
                // Error while trying
                setResponseType("error");
                setResponse(response.message)
            }

        }));

    }

    const canSubmit = () => {
        return  name!=="" &&
                director !== "" &&
                releaseDate !== null &&
                description !== "" &&
                actorRole !== "";
    }

    return (
        <>

            <AdminAccountVerificator feedback={() => setIsAdminAccountVerified(true)}/>

            { isAdminAccountVerified &&
            <>
                <hr />

                <form onSubmit={e => {handleSubmit(e)}}>

                    { response &&
                        <div className={"formResponse " + (responseType==="success" ? "success" : "error")}>
                            <h3>{response}</h3>
                        </div>
                    }

                    <CTextInput 
                        label="Movie's name"
                        placeholder="Please enter the movie's name"
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
                        label="Movie's description"
                        placeholder="Please enter the movie's description"
                        value={description}
                        feedback={(value) => setDescription(value)}
                        maxSize={2000}
                    />

                    <CArrayTextInput 
                        label="Ticket links"
                        placeholder="Please enter a ticket link"
                        values={ticketLinks}
                        feedback={(value) => setTicketLinks(value)}
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
                        disabled={!canSubmit()}
                        text="Modify"
                        type="submit"
                    />

                </form>
            </>
            }

        </>
    )

}
export default AdminModifyMovieForm;