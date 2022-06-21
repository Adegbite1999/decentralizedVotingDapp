import React, { useEffect, useState } from "react";
import logo from "../../public/images.svg";
import Image from "next/image";
import Modal from "../../components/Modal";
import Link from "next/link";
import LayOut from "../../layout/LayOut";
import { useVoteDapp } from "../../web3/hooks/useVote";
import { useAppContext } from "../../context/appState";
import { poll } from "ethers/lib/utils";

function AllVotes() {
  const {connected} = useAppContext()
   const {getAllVotingPoll, exec} =    useVoteDapp()

   const [polls, setPolls] = useState()



    useEffect(() =>{
      if(connected){
         callExec()
        
        }

    },[connected])

    
    const callExec = async() =>{
      const result =  await exec()
      setPolls(result)
      // setPolls(result)
    }
    console.log(connected)

//  const getPolls = async() =>{
//   const result = await getAllVotingPoll()
//   setPolls(result)
//  }

//  useEffect(() =>{
//   if(connected){
//     getPolls()
//   }
// },[connected])

// console.log(polls)

  const [show, setShow] = useState(false);
  return (
    <LayOut>
    <section className="text-white  bg-create">
      <div className="max-w-6xl mx-auto py-12">
        <div className=" flex items-end space-x-56 justify-end">
          <h3 className="align-self-center text-3xl font-bold">
            Available polls
          </h3>
          <button className="bg-transparent font-bold justify-self-end text-[#f5f5f5] border-2 py-2 pl-6 pr-6 border-[#00E3A5]">
            <Link href="/create/vote">Create Polls</Link>          </button>
        </div>
        <table class="w-full border-collapse mt-4	 border-2 text-center">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Number of candidate</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
              {
                polls?.map((item) =>{
                  return (
                    <tr>
                    <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.numOfCandidate}</td>
              <td>{item.status ===false? "false" : "true"}</td>
              <td>
                <button
                  onClick={() => setShow(true)}
                  className="bg-[#00E3A5] pr-6 rounded-sm pl-6 font-bold"
                >
                  Vote
                </button>
              </td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
      </div>

      <div>
        <Image src={logo} alt="" />
      </div>
      <Modal show={show} onClose={() => setShow(false)}>
        <div className="flex justify-center">
          <div>
            <h1 className="text-center font-bold text-2xl mb-6">
              Presidential polls
            </h1>
            <div>
              <label className="block text-center">Candidate Address</label>
              <input
                className="outline-none border-none bg-gray-300 py-2 pl-4 pr-4"
                type="text"
              />
            </div>
            <div className="flex justify-center mt-8">
              <button className="bg-[#00E3A5] pr-6 rounded-sm pl-6 font-bold">
                Vote
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
    </LayOut>
  );
}

export default AllVotes;
