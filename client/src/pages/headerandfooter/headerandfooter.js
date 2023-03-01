import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/header'
import Footer from './footer/footer'

function Headerandfooter() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Headerandfooter