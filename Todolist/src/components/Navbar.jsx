import React from 'react'

const Navbar = () => {
  return (
    
           <nav className='flex  justify-between  bg-violet-900 text-white py-3'>
                  
                  <div className="log">
                      <span className='font-bold text-xl mx-8'>To-do List App</span>
                  </div>

                   <ul className='flex gap-8 mx-6'> 
                         <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                         <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
                   </ul>
           </nav>
    
  )
}

export default Navbar
