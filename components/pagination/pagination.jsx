import React from "react";

const Pagination1 = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="flex w-24 justify-evenly items-center">
                <div className="circle w-1 h-1 rounded-full bg-white opacity-50"></div>
                <div className="circle w-2 h-2 rounded-full bg-white opacity-50"></div>
                <div className="circle w-3 h-3 rounded-full bg-primaryColor-100"></div>
                <div className="circle w-2 h-2 rounded-full bg-white opacity-50"></div>
                <div className="circle w-1 h-1 rounded-full bg-white opacity-50"></div>
            </div>
        </div>
    );
};

export default Pagination1;
