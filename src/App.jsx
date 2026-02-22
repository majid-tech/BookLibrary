import SearchBar from './components/SearchBar';
import './index.css'
import { BookOpen } from 'lucide-react';


function App() {

  return (
    <>
      <div className='flex justify-center items-center gap-3 text-cyan-950 p-8 bg-blue-200'>
        <BookOpen size={28}/>
        <h1 className='text-2xl font-bold'>Book Library</h1>
      </div>

      <SearchBar />
    </>
  )
}

export default App