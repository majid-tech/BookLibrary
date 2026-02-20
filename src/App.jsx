import './index.css'
import { BookOpen } from 'lucide-react';

function App() {

  return (
    <>
      <div className='flex justify-center items-center gap-2 text-cyan-950 p-8 bg-blue-200'>
        <BookOpen size={28}/>
        <h1 className='text-2xl font-semibold'>Book Library</h1>
      </div>
    </>
  )
}

export default App