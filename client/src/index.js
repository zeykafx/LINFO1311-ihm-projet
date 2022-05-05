import React from 'react';
import ReactDOM from 'react-dom';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import './index.css';

import NavBar from './views/NavBar';
import Admin from './views/Admin';
import PageNotFound from './views/PageNotFound';
import App from './views/App';
import {ChakraProvider} from "@chakra-ui/react";
import Footer from "./components/misc/Footer";

ReactDOM.render(
    <ChakraProvider>
        <BrowserRouter>

            <NavBar/>

            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/admin" element={<Admin/>}/>
                
                {/* Si on trouve pas, on redirige vers 404 */}
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>

            <Footer/>
        </BrowserRouter>
    </ChakraProvider>,
    document.getElementById('root')
);
