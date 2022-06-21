import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import logo from "../public/images.svg"
import Image from 'next/image'
import WalletConnect from '../components/WalletConnect';

function LayOut({children}) {
  return (
    <>
    <WalletConnect/>
    <main>
    {children}
    {/* <div>
<Image src={logo} alt=""/>
      </div> */}
    </main>
    <Footer/>

    </>
  )
}

export default LayOut