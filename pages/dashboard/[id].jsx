import React,{useRef, useState,useEffect} from 'react'
import LayOut from '../../layout/LayOut'
import { useVoteDapp } from '../../web3/hooks/useVote';
import {toast} from "react-toastify";
import { useRouter,} from "next/router"
import { useAppContext } from '../../context/appState';
import Link from 'next/link';

function VoteDetails() {

  const address = useRef()
  const name = useRef()

  const router = useRouter()

  const id = router.query


const {connected} = useAppContext()

   const {addCandidate,setPollState,revealWinnerCandidate,VoteDetails} =  useVoteDapp()

   const vote = async() =>{
    const result = await VoteDetails(id.id)
    setDetail(result)
   }
   useEffect(() =>{
      vote()
    },[connected])
    
    
    const [winner,setWinner] = useState([])
    const [detail, setDetail] = useState([])
    
    
   const addCandidateHandler = async(e) =>{
    e.preventDefault()
    const addressField = address.current.value;
    // const nameField = name.current.value;

    await addCandidate(addressField,id.id, async(res,err) =>{
    
      try {
        if(!res.hash)
        return toast.error(err)
        address.current.value = "",
      // name.current.value = ""
      toast.success("candidate added successfully")
      } catch (error) {
        toast.error(error)
      }
      
    })
    
   }
   
   




   const activatePoll = async(e) =>{
    e.preventDefault()
    await setPollState(id.id, async(res,err) =>{
    
      try {
        if(!res.hash)
        return toast.error(err)
        const txn = await res.wait();
        const status = txn.events[0].args[0]
      toast.success(`status voting has been set to ${status}`)
      } catch (error) {
        toast.error(error)
      }

    })
  }

  // const revealCandidate = async (e) =>{
  //   e.preventDefault()
  //   const result = await revealWinnerCandidate(id.id)
  //   console.log(result)
  // } 

  return (
    <LayOut>
    
    <section className='mb-24'>
    <div className='text-white ml-12'><Link href="/votes/allVotes">Back</Link></div>
    <div>
        <h2 className='text-white  text-center font-bold text-2xl mb-4'>{detail?.name}</h2>
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
            {/* <div>
              <label className="block text-white text-center">Candidate id</label>
              <input
              ref={name}
                className="outline-none border-none bg-gray-300 py-2 pl-4 pr-4"
                type="number"
              />
            </div> */}
            <div className='flex justify-center'>
            <button onClick={addCandidateHandler} className='bg-[#00E3A5] mt-4 text-center pr-6 rounded-sm pl-6 font-bold'>Submit</button>
            </div>
            </form>
        </div>
        <div className='flex justify-center space-x-12 mt-6' >
        <div>
          <button onClick={activatePoll} className="bg-red-500 text-white pr-6 rounded-sm pl-6 font-bold">Start Poll/ End Poll</button>
        </div>
        
        <div>
          <button  className="bg-[#00E3A5] pr-6 text-white rounded-sm pl-6 font-bold">Reveal Winner</button>
        </div>
        </div>
        </div>
    </section>
    </LayOut>
  )
}

export default VoteDetails