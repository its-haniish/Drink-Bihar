import React from 'react';
import { Circles } from 'react-loader-spinner';

const LoadingMore = () => {
    return (
        <div className="flex justify-center items-center py-4">
            <Circles color="#00BFFF" height={40} width={40} />
            <span className="ml-2 text-blue-600">Loading more...</span>
        </div>
    );
};

export default LoadingMore;
