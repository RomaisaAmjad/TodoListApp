import React from 'react'
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';


function Footer() {
    return (

          <footer className="bg-black text-white text-center p-8  absolute z-10 w-full min-bottom-0">
      <div className="flex justify-center items-center gap-4 text-xl">
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          <FaYoutube />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
      </div>
      <p className="text-sm mt-2">&copy; Budget Tracking App 2025. All rights reserved.</p>
    </footer>
        
    )
}

export default Footer
