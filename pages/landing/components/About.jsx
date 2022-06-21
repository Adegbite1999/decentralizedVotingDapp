import React from 'react';
import Image from 'next/image';
import img from "../../../public/card.svg"

function About() {
  return (
    <section className='bg-[#09251E] mb-24 rounded-r-full'>
    <div className='flex space-x-12'>
        <div className='p-8 w-1/2'>
            <h3 className='text-white mb-24 font-bold text-2xl'>About us</h3>
            <p className='text-[#80AB9E] mb-24  text-2xl'>This is a system that help you generate your own voting protocol on the Blockchain with ease.  Set the admin and  candidates and share for people to vote.</p>
            <button className="p-2 border text-white pl-8 pr-8 py-2">Learn more</button>
        </div>
        <div className='w-1/2'>
            <Image src={img} alt='overlay'/>
        </div>
        </div>
    </section>
  )
}

export default About