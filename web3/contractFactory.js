import abi from "./abi/index.json";
import {Contract} from "ethers";

export const getVoteDapp = async(address, signerOrProvider) =>{
    return new Contract(address,abi,signerOrProvider)
} 