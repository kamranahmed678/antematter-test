// Import React library
import React from "react";

// Importing components for the Terminal view
import Body from "../components/Body";
import Header from "../components/Header";

// Component representing the Terminal view
const Terminal = () => {
    return (
        // A container for the terminal view, containing Header and Body components
        <div className="h-screen overflow-hidden">
            <Header /> {/* Header component for the terminal view */}
            <Body /> {/* Body component for the terminal view */}
        </div>
    );
}

// Export the Terminal component for use in the application
export default Terminal;
