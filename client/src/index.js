import React from 'react';
import ReactDOM from 'react-dom';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './index.css';

import NavBar from './views/NavBar';
import Admin from './views/Admin';
import Index from './views/Index.js';
import {ChakraProvider} from "@chakra-ui/react";
import Footer from "./components/misc/Footer";
import { Gallery } from './views/Gallery';

ReactDOM.render(
    <ChakraProvider>
        <BrowserRouter>

            <NavBar/>

            <Routes>
                <Route path="/" element={
                    <div className="clientContainer">
                        <Index/>
                    </div>
                }/>
                <Route path="/gallery" element={
                    <div className="clientContainer">
                        <Gallery/>
                    </div>
                }/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>

            <Footer/>
        </BrowserRouter>
    </ChakraProvider>,
    document.getElementById('root')
);
