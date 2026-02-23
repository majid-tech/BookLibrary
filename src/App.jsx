import BookCard from './components/BookCard';
import Footer from './components/Footer';
import Main from './components/Main';
import SearchBar from './components/SearchBar';
import './index.css'
import { BookOpen } from 'lucide-react';


function App() {
  const bookAvailable = true

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='w-full flex justify-center items-center gap-3 text-cyan-950 p-8'>
        <BookOpen size={28}/>
        <h1 className='text-2xl font-bold'>Book Library</h1>
      </div>

      <SearchBar />
      {bookAvailable ? <BookCard /> : <Main />}
      {/* <Main /> */}
      <Footer />
    </div>
  )
}

export default App
