import '../styles/globals.css';
import { AppWrapper } from '../context/appState';
import { ToastProvider } from 'react-toast-notifications';



function MyApp({ Component, pageProps }) {

  return (
    <AppWrapper>  
    {/* <ToastProvider> */}
      <Component {...pageProps} />
      {/* </ToastProvider> */}
      </AppWrapper>


  )

}

export default MyApp
