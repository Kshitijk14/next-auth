"use client";

import React from "react";
import { signOut } from "next-auth/react";

function TwitterNavbar() {
    return (
        <div className="flex flex-col justify-between h-screen p-4">
            <button className="bg-white rounded-full border border-gray-200 text-gray-800 px-4 py-2 flex items-center space-x-2 hover:bg-gray-200">
                <img
                    className="h-8 w-8 rounded-full"
                    src="https://png.pngtree.com/png-vector/20201227/ourmid/pngtree-surprised-shorthair-cat-expression-png-image_2654463.jpg"
                    alt="User profile"
                />
                <span onClick={() => signOut()} className="pr-[20px]">Logout</span>
            </button>
        </div>
    );
}

export default TwitterNavbar;
