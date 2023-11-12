import React from "react";

// Component representing the Header section
const Header = () => {
    return (
        // Header section with the app title
        <>
            <div className="flex w-full bg-black justify-center items-center h-10">
                <p className="text-white">Antematter</p> {/* Title of the app */}
                <div className="absolute end-3 flex items-center">
                    <div className="w-5 h-5 rounded-full bg-yellow-400 m-1 cursor-pointer"></div>
                    <div className="w-5 h-5 rounded-full bg-purple-500 m-1 cursor-pointer"></div>
                    <div className="w-5 h-5 rounded-full bg-red-500 m-1 cursor-pointer"></div>
                </div>
            </div>
        </>
    );
}

export default Header;
