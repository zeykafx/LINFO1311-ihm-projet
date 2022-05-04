import React from 'react';
import ReactDOM from 'react-dom';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './index.css';

import NavBar from './views/NavBar';
import Admin from './views/Admin';
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
            </Routes>

            <Footer/>
        </BrowserRouter>
    </ChakraProvider>,
    document.getElementById('root')
);
