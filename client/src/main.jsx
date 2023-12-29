import React from 'react' 
import ReactDOM, { createRoot } from 'react-dom/client'
import {BrowserRouter as Router}from "react-router-dom"
import {ChainId,ThirdwebProvider} from '@thirdweb-dev/react'
import { Sepolia } from "@thirdweb-dev/chains";
import App from "./App"
import "./index.css"
import { StateContextProvider } from './context'
import { ChakraProvider } from '@chakra-ui/react';

const root=ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain={ Sepolia } 
    clientId='76bbef884e3fb97188b2b99466716c8d'>
        <ChakraProvider>

        <Router>
            <StateContextProvider>
                <App/>
            </StateContextProvider>
        </Router>
        </ChakraProvider>
    </ThirdwebProvider>
)