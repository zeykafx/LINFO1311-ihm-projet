import React, { useState } from "react";
import "./Index.css";

import MoviesViewer from "../components/clientViewers/MoviesViewer.js";

function Index() {
    return (
        <>
            <MoviesViewer 
                maxNumberOfMovies={5}
                height={600}
                gradientBackground={true}
            />
        </>
    );
}

export default Index;
