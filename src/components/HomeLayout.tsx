// src/components/HomeLayout.tsx
import React from 'react';
import {  Outlet } from 'react-router-dom';

const HomeLayout: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Ticket Generator</h1>
            <Outlet /> {/* This renders nested routes */}
        </div>
    );
};

export default HomeLayout;
