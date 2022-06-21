import React, { useEffect } from "react";
import { Navlink } from "../static/data";
import Link from "next/link";
import web3Connector from "../web3/walletConnect";
import { useAppContext } from "../context/appState";
import { addressShortner } from "../web3/helper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WalletConnect() {
  const {
    connectWallet,
    handleAccountChanged,
    handleChainChanged,
    eagerConnect,
  } = web3Connector();
  const { connected, account, setMetamaskPresent } = useAppContext();

  useEffect(() => {
    if (!window.ethereum) {
      setMetamaskPresent(false);
      return;
    }
    const account = localStorage.getItem("address");
    if (account) {
      eagerConnect();
    }
    window.ethereum.on("connect", eagerConnect);
    window.ethereum.on("accountsChanged", handleAccountChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
  }, [eagerConnect, handleAccountChanged, handleChainChanged]);

  return (
    <header className="container mx-auto p-6 mb-8">
      <ToastContainer />
      <nav className="bg-[#09251E]  flex justify-between items-center p-8 rounded-full">
        <div>
          <a href="/">
            <svg
              width="148"
              height="33"
              viewBox="0 0 148 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9755 32.2354L5.06049 17.9254V32.2354H0.965489V0.87035H5.06049V15.4054L18.0205 0.87035H23.1955L8.97549 16.5754L23.3305 32.2354H17.9755ZM41.206 32.5054C40.426 32.5054 39.766 32.2354 39.226 31.6954C38.686 31.1554 38.416 30.4954 38.416 29.7154C38.416 28.9354 38.686 28.2754 39.226 27.7354C39.766 27.1954 40.426 26.9254 41.206 26.9254C41.956 26.9254 42.586 27.1954 43.096 27.7354C43.636 28.2754 43.906 28.9354 43.906 29.7154C43.906 30.4954 43.636 31.1554 43.096 31.6954C42.586 32.2354 41.956 32.5054 41.206 32.5054Z"
                fill="#00E3A5"
              />
              <path
                d="M75.2693 0.87035L63.4343 32.2354H58.7093L46.8743 0.87035H51.2393L61.0943 27.9154L70.9493 0.87035H75.2693ZM90.5144 32.6404C88.2044 32.6404 86.1044 32.1154 84.2144 31.0654C82.3544 30.0154 80.8844 28.5304 79.8044 26.6104C78.7544 24.6604 78.2294 22.4104 78.2294 19.8604C78.2294 17.3404 78.7694 15.1204 79.8494 13.2004C80.9594 11.2504 82.4594 9.76535 84.3494 8.74535C86.2394 7.69535 88.3544 7.17035 90.6944 7.17035C93.0344 7.17035 95.1494 7.69535 97.0394 8.74535C98.9294 9.76535 100.414 11.2354 101.494 13.1554C102.604 15.0754 103.159 17.3104 103.159 19.8604C103.159 22.4104 102.589 24.6604 101.449 26.6104C100.339 28.5304 98.8244 30.0154 96.9044 31.0654C94.9844 32.1154 92.8544 32.6404 90.5144 32.6404ZM90.5144 29.0404C91.9844 29.0404 93.3644 28.6954 94.6544 28.0054C95.9444 27.3154 96.9794 26.2804 97.7594 24.9004C98.5694 23.5204 98.9744 21.8404 98.9744 19.8604C98.9744 17.8804 98.5844 16.2004 97.8044 14.8204C97.0244 13.4404 96.0044 12.4204 94.7444 11.7604C93.4844 11.0704 92.1194 10.7254 90.6494 10.7254C89.1494 10.7254 87.7694 11.0704 86.5094 11.7604C85.2794 12.4204 84.2894 13.4404 83.5394 14.8204C82.7894 16.2004 82.4144 17.8804 82.4144 19.8604C82.4144 21.8704 82.7744 23.5654 83.4944 24.9454C84.2444 26.3254 85.2344 27.3604 86.4644 28.0504C87.6944 28.7104 89.0444 29.0404 90.5144 29.0404ZM113.539 10.9504V25.4854C113.539 26.6854 113.794 27.5404 114.304 28.0504C114.814 28.5304 115.699 28.7704 116.959 28.7704H119.974V32.2354H116.284C114.004 32.2354 112.294 31.7104 111.154 30.6604C110.014 29.6104 109.444 27.8854 109.444 25.4854V10.9504H106.249V7.57535H109.444V1.36535H113.539V7.57535H119.974V10.9504H113.539ZM147.435 18.9604C147.435 19.7404 147.39 20.5654 147.3 21.4354H127.59C127.74 23.8654 128.565 25.7704 130.065 27.1504C131.595 28.5004 133.44 29.1754 135.6 29.1754C137.37 29.1754 138.84 28.7704 140.01 27.9604C141.21 27.1204 142.05 26.0104 142.53 24.6304H146.94C146.28 27.0004 144.96 28.9354 142.98 30.4354C141 31.9054 138.54 32.6404 135.6 32.6404C133.26 32.6404 131.16 32.1154 129.3 31.0654C127.47 30.0154 126.03 28.5304 124.98 26.6104C123.93 24.6604 123.405 22.4104 123.405 19.8604C123.405 17.3104 123.915 15.0754 124.935 13.1554C125.955 11.2354 127.38 9.76535 129.21 8.74535C131.07 7.69535 133.2 7.17035 135.6 7.17035C137.94 7.17035 140.01 7.68035 141.81 8.70035C143.61 9.72035 144.99 11.1304 145.95 12.9304C146.94 14.7004 147.435 16.7104 147.435 18.9604ZM143.205 18.1054C143.205 16.5454 142.86 15.2104 142.17 14.1004C141.48 12.9604 140.535 12.1054 139.335 11.5354C138.165 10.9354 136.86 10.6354 135.42 10.6354C133.35 10.6354 131.58 11.2954 130.11 12.6154C128.67 13.9354 127.845 15.7654 127.635 18.1054H143.205Z"
                fill="#F5FBF2"
              />
            </svg>
          </a>
        </div>
        <ul className="flex items-center space-x-12 text-white capitalize">
          {Navlink.map((item, idx) => {
            return (
              <li key={idx}>
                <a href={item.link}>{item.value}</a>
              </li>
            );
          })}
        </ul>
        {connected ? (
          <button className="bg-transparent font-bold text-[#f5f5f5] border-2 py-2 pl-6 pr-6 border-[#00E3A5]">
            {addressShortner(account)}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-transparent font-bold text-[#f5f5f5] border-2 py-2 pl-6 pr-6 border-[#00E3A5]"
          >
            <a>Connect Wallet</a>
          </button>
        )}
        {/* <Link href="/votes/allVotes">Launch App</Link> */}
      </nav>
    </header>
  );
}

export default WalletConnect;
