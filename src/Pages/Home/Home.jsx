import React from 'react'
import { NavBar } from '../../components/NavBar'
import { Header } from '../../components/Header'

export const Home = () => {
    return (
        <div
            className="relative min-h-screen bg-cover bg-center flex flex-col items-center w-full "
            id="Header"
        >
            <NavBar />
            <div className="pt-24 w-full">
                <Header />
            </div>
        </div>
    )
}
