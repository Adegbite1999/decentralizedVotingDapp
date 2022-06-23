import { useCallback} from "react";
import { useAppContext } from "../context/appState";
import { ethers } from "ethers";
// import { useToasts } from 'react-toast-notifications';
import {toast} from "react-toastify"





export default function web3Connector (){

  // const {addToast} = useToasts()
  
 
  const {setConnected, setAccount} = useAppContext()
  const connectWallet = async () => {
    if (!!window.ethereum || !!window.web3) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      eagerConnect();
      toast.success('wallet connected successfully', );

    } else {
      toast.error("use an ethereum enabled browser");

    }
  };

  // const networkId = await window.ethereum.request({method:"eth_chainId"})
  // if(networkId){
  //   if(Number(networkId) !== 80001) toast.error("please connect to mumbai network")
  // }

  
  const disconnectWallet = async =>{
    setAccount("")
    setConnected(false)
    localStorage.removeItem("address");
    toast.error("Disconnected wallet")
  }

  const eagerConnect = useCallback(async () =>{
    const networkId = await window.ethereum.request({method:"eth_chainId"})
    if(Number(networkId) !== 80001) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if(!accounts.length) return
    setAccount(accounts[0])
    localStorage.setItem("address", accounts[0]);
      setConnected(true)
  },[])

  const handleAccountChanged = useCallback(async (accounts) => {
    if (!!accounts.length) {
      const networkId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (Number(networkId) !== 80001) return;
      setConnected(true);
      setAccount(accounts[0]);
      localStorage.setItem("address", accounts[0]);
      // toast.success("Connected to wallet");
    } else {
      setConnected(false);
      setAccount("");
      localStorage.removeItem("address");
      toast.error("no account found");
    }
  }, []);




  
  const handleChainChanged = useCallback(async (chainid) => {
    if (Number(chainid) !== 80001) {
      setConnected(false);
      setAccount("");
      localStorage.removeItem("address");
      toast.error(
        "You are connected to the wrong network, please switch to mumbai"
      );
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (!accounts.length) return;
      setAccount(accounts[0]);
      localStorage.setItem("address", accounts[0]);
      setConnected(true);
    }
  }, []);

  return {
    handleAccountChanged,
    handleChainChanged,
    connectWallet,
    eagerConnect,
    disconnectWallet
  }
  
}






