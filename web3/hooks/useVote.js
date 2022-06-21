import {useEffect, useCallback,useRef} from "react"
import { getVoteDapp } from "../contractFactory";
import {rpc_url , contractAddress } from "../constant";
import { useAppContext } from "../../context/appState";
import { ethers } from "ethers";






export const useVoteDapp  = () =>{
    
    const {connected} = useAppContext()
    const signer = useRef()
    const provider = useRef()
    const voteContract = useRef()


    useEffect(() =>{
        if(connected){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer.current = provider.getSigner()
        }else{
            provider.current = new ethers.providers.JsonRpcProvider(rpc_url)
        }
        init()

    },[connected])

    const init = useCallback(async() =>{
     voteContract.current =  await getVoteDapp(contractAddress, signer.current || provider.current)
    },[])

    console.log(voteContract.current)


    const createPoll = useCallback(async(name, num,callback) =>{
        if(!connected) throw new Error("You're not connected");
        if(!voteContract.current) return;
        try {
            voteContract.current.createPoll(name, num)
            .then(callback)
            .catch(callback)
        } catch (error) {
            throw new Error ("something went wrong")
        }
    },[])

    const addCandidate = useCallback(async(address, name,callback) =>{
        if(!connected) throw new Error("You're not connected");
        if(!voteContract.current) return;
        try {
            voteContract.current.AddCandidate(address, name)
            .then(callback)
            .catch(callback)
        } catch (error) {
            throw new Error ("something went wrong")
        }
    },[])


    const VoteDetails = async(id) =>{
        if(!connected)throw new Error("You're not connected")
        try {
            const vote = await voteContract.current.getVotePollProps(id)
            return vote
        } catch (error) {
         console.error(error)   
        }
    }

    const exec = async() =>{
        const allId = await voteContract.current.allIds()
        const allPoll = await Promise.all(
            allId.map((id) =>{
                return VoteDetails(id)
            })
        )
        const result = allPoll.map((item,index) =>{
            return {
                name:item.name,
                id:index,
                numOfCandidate:item.currentNoOfCandidates,
                status:item.voting
            }
        })
        return result
    }


  

    
return {
    createPoll,
    addCandidate,
    exec
}


}