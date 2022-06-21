import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import About from './components/About';
import Details from './components/Details';
import Features from './components/Features';
import Jumbotron from './components/Jumbotron';

function Landing() {
  return (
    <>

    <Header/>
<Jumbotron/>
<Details/>
<About/>
<Features/>
<Footer/>
    </>
  )
}

export default Landing