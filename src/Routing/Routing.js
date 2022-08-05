import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "../Chat"

function Routing() {
 
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/rooms/:roomId" element={<Chat />} />
        </Routes>
    );
}

export default Routing;