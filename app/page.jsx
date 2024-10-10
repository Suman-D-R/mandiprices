import HomeComponent from './HomeComponent';
import { StoreProvider } from './context/store';
import Header from './components/Header';

export default function Home() {
  return (
    <StoreProvider>
      <div className='bg-background lg:p-4 p-2'>
        <Header />
        <HomeComponent />
      </div>
    </StoreProvider>
  );
}
