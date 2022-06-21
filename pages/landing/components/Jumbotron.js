import React from 'react'
import jumbo from "../../../public/jumbo.svg";
import Image from "next/image"

function Jumbotron() {
  return (
    <section>
        <div className='grid grid-cols-2 items-center container mx-auto'>
          <div>
          <h3 className='text-[#80AB9E] text-2xl'>Build the Future with </h3>
          <p className='text-[#F5FBF2] font-bold text-4xl my-4'>A Decentralized Voting System</p>
          <p className='text-[#80AB9E] mb-4'>Generate your own voting system on the blockchaiin in few steps. </p>

          <button className='bg-[#00E3A5] outline-none pl-8 py-2 rounded-sm bg-blur-sm pr-8'>White paper</button>

          </div>
          <div>
            <Image src={jumbo} alt="jumbo_svg"/>
          </div>
        </div>
    </section>
  )
}

export default Jumbotron