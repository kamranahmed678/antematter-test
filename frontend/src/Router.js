import React, { Fragment } from "react";
import { Route, Routes } from 'react-router-dom'

import Terminal from "./pages/Terminal";

// Component defining the routing configuration
const Router = () => {
    return (
        <Fragment>
            {/* Define the routes for the application */}
            <Routes>
                {/* Set up a route for the root path, rendering the Terminal component */}
                <Route path='/' element={<Terminal />} />
            </Routes>
        </Fragment>
    );
}

// Export the Router component to be used in the application
export default Router;
