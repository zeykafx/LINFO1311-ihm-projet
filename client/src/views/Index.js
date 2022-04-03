import React, { useState } from "react";
import "./Index.css";

import MoviesViewer from "../components/clientViewers/MoviesViewer.js";
import TVShowsViewer from "../components/clientViewers/TVShows/TVShowsViewer";

function Index() {
    return (
        <div className="gradientBackground">
            <MoviesViewer 
                maxNumberOfMovies={5}
                height={600}
            />

            <TVShowsViewer 
                maxNumberOfTVShows={5}
                height={600}
            />
        </div>
    );
}

export default Index;
