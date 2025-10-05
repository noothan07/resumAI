import React from 'react';
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

export default function Hero() {
  return (
    <motion.section
      className='h-[77vh] sm:h-[80vh] flex justify-center items-center px-3 -z-10'
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2 }}
    >
      <div className='flex flex-col justify-center items-center gap-5'>
        <motion.h1 variants={item} className='tagline text-[30px] w-[350px] text-center sm:w-[650px] sm:text-[40px] lg:w-[850px] lg:text-[50px] hidden sm:block'>
          An AI-powered <span className='hidden sm:inline'>professional</span> cover letter and resume builder <span className='hidden sm:inline'>for free </span>
        </motion.h1>

        <motion.h1 variants={item} className='tagline text-[30px] w-[350px] text-center sm:w-[650px] sm:text-[40px] lg:w-[850px] lg:text-[50px] block sm:hidden'>
          An AI-powered <span className='hidden sm:inline'>professional</span> resume and cover letter builder <span className='hidden sm:inline'>for free </span>
        </motion.h1>

        <motion.p variants={item} className='text-center font-light sm:font-normal sm:w-[650px] lg:w-[750px] lg:text-xl text-gray-500'>
          Create professional cover letters and boost your hiring chances with intelligent keyword optimization and ATS-friendly formatting using AI-powered insights.
        </motion.p>

        <motion.a 
          variants={item}
          href="#Home" 
          className='bg-green-400 px-7 py-3 rounded hover:bg-green-500 text-white text-[17px]'
        >
          Get started
        </motion.a>
      </div>
    </motion.section>
  );
}
