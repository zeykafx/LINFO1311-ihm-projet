import React from 'react';
import ReactDOM from 'react-dom';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './index.css';

import Index from './views/Index.js';
import { Gallery } from './views/Gallery';
import { Contact } from './views/Contact';

import NavBar from './views/NavBar';
import Admin from './views/Admin';

import {ChakraProvider} from "@chakra-ui/react";
import Footer from "./components/misc/Footer";
ReactDOM.render(
    <ChakraProvider>
        <BrowserRouter>

            <NavBar/>

            <Routes>
                <Route path="/gallery" element={
                    <div className="clientContainer">
                        <Gallery/>
                    </div>
                }/>
                <Route path="/contact" element={
                    <div className="clientContainer">
                        <Contact/>
                    </div>
                }/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="*" element={
                    <div className="clientContainer">
                        <Index/>
                    </div>
                }/>
            </Routes>

            <Footer/>
        </BrowserRouter>
    </ChakraProvider>,
    document.getElementById('root')
);
