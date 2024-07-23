import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-80 rounded-lg p-8 flex flex-col items-center">
                <ThreeCircles
                    height="80"
                    width="80"
                    color="green"
                    ariaLabel="loading"
                />
                <p className="mt-4 text-black">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
