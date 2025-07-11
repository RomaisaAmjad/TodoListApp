import React from 'react'
import TodoIcon from '../assets/TodoIcon.png'
import {Link} from 'react-router-dom'


function Navbar() {
    return (
        <div className=' absolute w-full bg-black m-auto p-2 z-10 top-0 left-0 m-4'>
            <div className=' flex flex-row justify-between text-white p-3 gap-5 '>
                <div className='flex gap-2 text-center items-center'>
                     <img  width="40px" src={TodoIcon} />
                    <h1 className='text-white font-bold'>VoidList</h1>
                </div> 
                <div>
               <ul className='flex gap-5 font-semibold text-center mt-3' >
               <Link to="/" > Home</Link>
               <Link to="/login"> Login</Link>
               <Link to="/signup" > Signup </Link>
                
               </ul>
               </div>
            </div>

        </div>
    )
}

export default Navbar
