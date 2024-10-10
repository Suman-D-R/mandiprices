import HomeComponent from './HomeComponent';
import { StoreProvider } from './context/store';
import Header from './components/Header';
import Footer from './components/Footer';
export default function Home() {
  return (
    <StoreProvider>
      <div className='bg-background '>
        <Header />
        <HomeComponent />
        <Footer />
      </div>
    </StoreProvider>
  );
}
