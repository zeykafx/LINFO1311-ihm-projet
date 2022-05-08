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
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/admin" element={<Admin/>}/>

                <Route path="*" element={<Index/>}/>
            </Routes>

            <Footer/>
        </BrowserRouter>
    </ChakraProvider>,
    document.getElementById('root')
);