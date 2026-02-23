import { Search } from 'lucide-react';

function Main(){

    return(
        <>
            <main className="w-full flex-1 flex flex-col justify-center items-center text-center gap-3 bg-blue-200 p-8">
                <Search size={100} />
                <h2 className="font-semibold text-2xl">Discover Your Next Great Read</h2>
                <p>Search for books by title, author, or keywords to explore millions of books from the Open Library. </p>
            </main>
        </>
    )
}

export default Main;
