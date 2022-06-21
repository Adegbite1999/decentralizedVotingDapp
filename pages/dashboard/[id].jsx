import React,{useRef} from 'react'
import LayOut from '../../layout/LayOut'
import { useVoteDapp } from '../../web3/hooks/useVote';
import {toast} from "react-toastify";
import { useRouter,} from "next/router"
import { useAppContext } from '../../context/appState';

function VoteDetails() {

  const address = useRef()
  const name = useRef()

  const router = useRouter()

  const id = router.query
  console.log(id.id)


const {connected} = useAppContext()

   const {addCandidate} =  useVoteDapp()
console.log(connected)


   const addCandidateHandler = async(e) =>{
    e.preventDefault()
    const addressField = address.current.value;
    const nameField = name.current.value;

    await addCandidate(addressField,nameField, async(res,err) =>{
      if(!res.hash)
      return toast.error(err)
      toast.success("candidate added successfully")


    })


   }
  return (
    <LayOut>
    <section className='mb-24'>
        <h2 className='text-white  text-center font-bold text-2xl mb-4'>Presidential Poll</h2>
        <div className='flex justify-center'>
        <form>
        <div className='mb-4'>
              <label className="block text-white text-center">Candidate Address</label>
              <input
                ref={address}
                className="outline-none border-none bg-gray-300 py-2 pl-4 pr-4"
                type="text"
              />
            </div>
            <div>
              <label className="block text-white text-center">Candidate Name</label>
              <input
              ref={name}
                className="outline-none border-none bg-gray-300 py-2 pl-4 pr-4"
                type="text"
              />
            </div>
            <div className='flex justify-center'>
            <button onClick={addCandidateHandler} className='bg-[#00E3A5] mt-4 text-center pr-6 rounded-sm pl-6 font-bold'>Submit</button>
            </div>
            </form>
        </div>
        <div className='flex justify-center space-x-12 mt-6' >
        <div>
          <button className="bg-[#00E3A5] pr-6 rounded-sm pl-6 font-bold">Start Poll</button>
        </div>
        <div>
          <button className="bg-[#E30000] pr-6 rounded-sm pl-6 font-bold">End Poll</button>
        </div>
        <div>
          <button className="bg-[#00E3A5] pr-6 rounded-sm pl-6 font-bold">Reveal Winner</button>
        </div>
        </div>
    </section>
    </LayOut>
  )
}

export default VoteDetails