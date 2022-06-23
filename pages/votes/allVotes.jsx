import React, { useEffect, useState } from "react";
import logo from "../../public/images.svg";
import Image from "next/image";
import Link from "next/link";
import LayOut from "../../layout/LayOut";
import { useVoteDapp } from "../../web3/hooks/useVote";
import { useAppContext } from "../../context/appState";
import { useRouter } from "next/router";
import Vote from "../vote/[id]";

function AllVotes() {
  const { connected } = useAppContext();
  const {  exec,VoteDetails } = useVoteDapp();

  const [polls, setPolls] = useState();
  // const [show,setShow] = useState(false)

  useEffect(() => {
    if (connected) {
      callExec();
    }
  }, [connected]);

  const callExec = async () => {
    const result = await exec();
    setPolls(result);
  };






  const router = useRouter();

  // const [show, setShow] = useState(false);
  return (
    <LayOut>
      <section className="text-white  bg-create">
        <div className="max-w-6xl mx-auto py-12">
          <div className=" flex items-end space-x-56 justify-end">
            <h3 className="align-self-center text-3xl font-bold">
              Available polls
            </h3>
            <button className="bg-transparent font-bold justify-self-end text-[#f5f5f5] border-2 py-2 pl-6 pr-6 border-[#00E3A5]">
              <Link href="/create/vote">Create Polls</Link>{" "}
            </button>
          </div>
          <table class="w-full border-collapse mt-4	 border-2 text-center">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Number of candidate</th>
                <th>Status</th>
                <th>Action</th>
                <th>View Poll</th>
              </tr>
            </thead>
            <tbody>
              {polls?.length === 0 ? (
                <h1 className="text-white text-center text-2xl">
                  No Polls created yet
                </h1>
              ) : (
                polls?.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.numOfCandidate}</td>
                      <td>{item.status === false ? "false" : "true"}</td>
                      <td>
                        <button
                          onClick={() => router.push(`/vote/${item.id}`)}
                          className="bg-[#00E3A5] pr-6 rounded-sm pl-6 font-bold"
                        >
                          Vote
                        </button>
                      </td>
                      <td>
                        <button
                          className="bg-[#00E3A5] pr-6 rounded-sm pl-6 font-bold"
                          onClick={() => router.push(`/dashboard/${item.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div>
          <Image src={logo} alt="" />
        </div>
        {/* <Vote show={show} setShow={setShow}/> */}
        {/* <Modal show={show} onClose={() => setShow(false)}>
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
        </Modal> */}
      </section>
    </LayOut>
  );
}

export default AllVotes;
