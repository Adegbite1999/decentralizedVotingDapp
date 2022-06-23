import abi from "./abi/index.json";
import {Contract} from "ethers";

export const getVoteDapp = (address, signerOrProvider) =>{
    return new Contract(address,abi,signerOrProvider)
} 