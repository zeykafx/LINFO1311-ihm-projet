import React from "react";
import "./App.css";

import MoviesViewer from "../components/clientViewers/MoviesViewer.js";
import TVShowsViewer from "../components/clientViewers/TVShowsViewer";
import {Box, Center} from "@chakra-ui/react";
import {Gallery} from "./Gallery";
import {Contact} from "./Contact";

function App() {

    return (
        <Box>
            <div className="gradientBackground">
                <div id="movies">
                    <MoviesViewer
                        maxNumberOfMovies={5}
                        height={600}
                    />
                </div>

                <div id="tv-shows">
                    <TVShowsViewer
                        maxNumberOfTVShows={5}
                        height={600}
                    />
                </div>

                {/* <Center id={"contact-us"}>
                    <Contact/>
                </Center> */}

            </div>
        </Box>

    );
}

export default App;
