import React from 'react'
import TodoIcon from '../assets/TodoIcon.png'
import {Link} from 'react-router-dom'


function HeroNavbar() {
    return (
        <div className=' absolute w-full bg-black m-auto p-2 z-10 top-0 left-0 m-4'>
            <div className=' flex flex-row justify-between text-white p-3 gap-5 '>
                <div className='flex gap-2 text-center items-center'>
                     <img  width="40px" src={TodoIcon} />
                    <h1 className='text-white font-bold'>VoidList</h1>
                </div> 
                <div className="text-white italic text-xl font-bold mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Empty the mind, fill the list!
                      </div>

                
              
            </div>

        </div>
    )
}

export default HeroNavbar
