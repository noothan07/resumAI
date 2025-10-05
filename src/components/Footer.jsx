import React from 'react'
import { motion } from 'framer-motion'

function Footer() {
  return (
    <section className="h-[100px] sm:h-[120px] flex flex-col  sm:gap-3 bg-gray-800 text-center justify-center items-center" >
      <motion.h1 className='sm:text-2xl text-white mt-3 font-Poppins text-[17px]' initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeOut"}} >Designed and developed by Noothan nagala</motion.h1>
      <motion.p className='text-gray-400 text-[13px]' initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeOut"}} >© 2025 Nagala Noothan, All rights reserved.</motion.p>
    </section>
  )
}

export default Footer
