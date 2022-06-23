import React,{useRef} from 'react';
import logo from "../../public/images.svg";
import Image from "next/image";
import LayOut from '../../layout/LayOut';
import { useVoteDapp } from '../../web3/hooks/useVote';
import { useAppContext } from '../../context/appState';
import {toast} from "react-toastify";
import {useRouter} from "next/router"
import Link from 'next/link';

function CreateVote() {
  const router = useRouter()
  const {connected} = useAppContext()
  console.log(connected)
        const {createPoll} =  useVoteDapp()
        const name = useRef();
        const maxmember = useRef()

        const createVoteHandler = async () =>{
            const nameField = name.current.value;
            const maxmemberField = maxmember.current.value

             await createPoll(nameField,maxmemberField, async(res,err) =>{
                if(!res.hash)
                return toast.error(err)
                const txn =await  res.wait();
                const status = await txn.events[0].args[2].toString();
                name.current.value ="";
                maxmember.current.value ="";
                toast.success("Voting poll created successfully")
                router.push(`/dashboard/${status}`)
                
            })


        }


        
  return (
    <LayOut>
    <section>
        <div>
        <div>
          <Link  href="/votes/allVotes"><span className='text-white ml-12 cursor-pointer'>Back</span></Link>
        </div>
        <div className="flex justify-center">
          <div>
            <h1 className="text-center text-white font-bold text-2xl mb-6">
              Create Poll
            </h1>
            <div className='mb-4'>
              <label className="block text-white text-center">Voting Name</label>
              <input
                ref={name}
                className="outline-none border-none bg-gray-300 py-2 pl-4 pr-4"
                type="text"
              />
            </div>
            <div>
              <label className="block text-white text-center">Max member</label>
              <input
                ref={maxmember}
                className="outline-none border-none bg-gray-300 py-2 pl-4 pr-4"
                type="number"
              />
            </div>

            <div className="flex justify-center mt-8">
              <button onClick={createVoteHandler} className="bg-[#00E3A5] pr-6 rounded-sm pl-6 font-bold">
                createPoll
              </button>
            </div>
          </div>
        </div>
        <div>
        <Image src={logo} alt="" />
      </div>
        </div>
    </section>
    </LayOut>
  )
}

export default CreateVote