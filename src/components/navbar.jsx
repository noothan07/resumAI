import React from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo_icon.png'

export default function Navbar() {
  return (
    <section className='top-0 sticky border-b-1 border-gray-400 bg-white rounded-b-4xl z-10'>
      <div className='flex justify-between items-center text-black h-[80px] w-full lg:px-33 sm:px-10 px-5'>
        <motion.div className='flex justify-center items-center' initial={{x:-100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.8,ease:"easeOut"}}>
        <div className="w-12 sm:w-15"><img src={logo} alt="logo" /></div>
        <div><h1 className='font-semibold text-xl logo sm:text-2xl gradient'>RESUMAI</h1></div>
        </motion.div>
        <motion.div className="link text-4xl sm:text-5xl text-gray-700 hover:text-gray-500"
         initial={{x:100,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.8,ease:"easeOut"}}>
        <a href="https://github.com/noothan07/resumAI.git" target="_blank"><i className="fa-brands fa-github"></i></a></motion.div>
      </div>
      
    </section>
  )
}