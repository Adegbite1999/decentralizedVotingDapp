import React,{useState,useRef,useEffect} from 'react'
import Modal from "../../components/Modal";
import LayOut from '../../layout/LayOut';
import Link from "next/link"
import { useVoteDapp } from '../../web3/hooks/useVote';
import {useRouter} from "next/router"
import { useAppContext } from '../../context/appState';
import { toast } from 'react-toastify';
function Vote() {

  const router = useRouter()
  const id = router.query;
  const [result,setResult] = useState([])
  const {connected}= useAppContext()
  const num = useRef()
  
   const {VoteDetails,voted} =  useVoteDapp()



  const fetchDetails = async() =>{
    const result = await VoteDetails(id.id)
    setResult(result)
   }
   
   useEffect(() =>{
    fetchDetails()
  },
  /* eslint-disable */
  [connected])



  const voteForCandidate = async (e) =>{
    e.preventDefault()
  const  numField = num.current.value;
    try {
       await voted(numField, async(res, err) =>{
        if(!res.hash) return toast.error(err)
        num.current.value= "";
        toast.success("you have voted!")
       })
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <LayOut>
         {/* <Modal show={show} onClose={() => setShow(false)}> */}
         <div className='mb-5'>
         <p className='text-white font-bold ml-12'><Link href="/votes/allVotes">Back</Link></p>
          <div className="flex justify-center">
            <div>
              <h1 className="text-center text-white font-bold text-2xl mb-6">
                {result?.name}
              </h1>
              <div>
                <label className="block text-white capitalize text-center">Candidate id</label>
                <input
                ref={num}
                  className="outline-none border-none bg-gray-300 py-2 pl-4 pr-4"
                  type="text"
                />
              </div>
              <div className="flex justify-center mt-8">
                <button onClick={voteForCandidate} className="bg-[#00E3A5] pr-6 rounded-sm pl-6 font-bold">
                  Vote
                </button>
              </div>
            </div>
          </div>
          </div>
        {/* </Modal> */}
    </LayOut>
  )
}

export default Vote