'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

// --- Snowflakes Component (No Changes) ---
const Snowflakes = () => {
    // ... same as before
    const [snowflakes, setSnowflakes] = useState([]);
    useEffect(() => {
        const generatedSnowflakes = Array.from({ length: 150 }).map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 1 + 0.75}rem`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 10}s`,
            };
            const snowflakeChar = ['+', '❄', '·'][Math.floor(Math.random() * 3)];
            return <span key={i} className="snowflake" style={style}>{snowflakeChar}</span>;
        });
        setSnowflakes(generatedSnowflakes);
    }, []);
    return <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">{snowflakes}</div>;
};

// --- Modal Component (No Changes) ---
const Modal = ({ title, inputLabel, buttonText, onClose, onSubmit, isLoading }) => {
    // ... same as before
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = () => {
        if (inputValue.trim() && !isLoading) {
            onSubmit(inputValue);
        }
    };
    const minecraftModalClipPath = "[clip-path:polygon(0px_16px,_8px_16px,_8px_8px,_16px_8px,_16px_0px,_calc(100%_-_16px)_0px,_calc(100%_-_16px)_8px,_calc(100%_-_8px)_8px,_calc(100%_-_8px)_16px,_100%_16px,_100%_calc(100%_-_16px),_calc(100%_-_8px)_calc(100%_-_16px),_calc(100%_-_8px)_calc(100%_-_8px),_calc(100%_-_16px)_calc(100%_-_8px),_calc(100%_-_16px)_100%,_16px_100%,_16px_calc(100%_-_8px),_8px_calc(100%_-_8px),_8px_calc(100%_-_16px),_0px_calc(100%_-_16px))]";
    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 font-pixeboy">
            <div className={`bg-[#0f1a2e] border-4 border-[#8be9fd] shadow-[inset_0_0_0_4px_#0a141c,0_0_20px_rgba(139,233,253,0.5)] p-8 max-w-md w-full text-center text-white ${minecraftModalClipPath}`}>
                <h2 className="text-4xl text-[#8be9fd] mb-6 [text-shadow:2px_2px_#0a141c,0_0_10px_rgba(139,233,253,0.8)]">{title}</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={inputLabel}
                    className="w-full bg-[#0a141c] border-2 border-[#8be9fd] text-white rounded-lg p-3 mb-6 text-xl focus:outline-none focus:ring-2 focus:ring-[#8be9fd]"
                    disabled={isLoading}
                />
                <div className="flex gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex-1 bg-cyan-600 text-white py-3 rounded-lg text-xl hover:bg-cyan-700 transition-colors border-2 border-cyan-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'WORKING...' : buttonText}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 bg-gray-700 text-white py-3 rounded-lg text-xl hover:bg-gray-800 transition-colors border-2 border-gray-500 disabled:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Join Team Component ---
export default function JoinTeam() {
    const [modal, setModal] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // --- UPDATED: `handleJoinTeam` with deployed URL ---
    const handleJoinTeam = async (code) => {
        setIsLoading(true);
        setMessage('');
        try {
            // UPDATED URL
            const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/teams/join`;
            const response = await axios.put(apiUrl, { code });
            setMessage('Successfully joined team!');
            console.log('Join success:', response.data);
            setModal(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid code or error joining team.';
            setMessage(`Error: ${errorMessage}`);
            console.error('Join error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- UPDATED: `handleCreateTeam` with deployed URL ---
    const handleCreateTeam = async (name) => {
        setIsLoading(true);
        setMessage('');
        try {
            // UPDATED URL
            const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/teams`;
            const response = await axios.post(apiUrl, { name });
            setMessage(`Team "${name}" created successfully!`);
            console.log('Create success:', response.data);
            setModal(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Could not create team.';
            setMessage(`Error: ${errorMessage}`);
            console.error('Create error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const playSound = () => {
        const audio = new Audio('/Glass_dig2.ogg');
        audio.play();
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[url('/your-background.svg')] bg-cover bg-center text-white font-pixeboy">
            <Snowflakes />
            {message && (
                <div className="absolute top-10 z-20 bg-gray-800 border-2 border-cyan-400 text-white py-2 px-4 rounded-lg shadow-lg">
                    {message}
                </div>
            )}
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 z-10">
                <div
                    className="cursor-pointer group"
                    onClick={() => {
                        playSound();
                        setModal('create');
                    }}
                >
                    <Image
                        src="/create_team_base.svg"
                        alt="Create Team Base"
                        width={400}
                        height={400}
                        className="transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    />
                </div>
                <div
                    className="cursor-pointer group"
                    onClick={() => {
                        playSound();
                        setModal('join');
                    }}
                >
                    <Image
                        src="/join_team_base.svg"
                        alt="Join Team Base"
                        width={400}
                        height={400}
                        className="transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    />
                </div>
            </div>
            {modal === 'create' && (
                <Modal
                    title="Create a New Team"
                    inputLabel="Enter your team name..."
                    buttonText="Create Team"
                    onClose={() => setModal(null)}
                    onSubmit={handleCreateTeam}
                    isLoading={isLoading}
                />
            )}
            {modal === 'join' && (
                <Modal
                    title="Join an Existing Team"
                    inputLabel="Enter the team code..."
                    buttonText="Join Team"
                    onClose={() => setModal(null)}
                    onSubmit={handleJoinTeam}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}