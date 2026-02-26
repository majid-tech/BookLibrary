import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import Footer from './components/Footer';
import Main from './components/Main';
import SearchBar from './components/SearchBar';
import './index.css';

function mapBook(doc) {
  const coverId = doc.cover_i;
  const author = Array.isArray(doc.author_name) && doc.author_name.length > 0 ? doc.author_name[0] : 'Unknown Author';
  const year = doc.first_publish_year ?? 'N/A';
  const rating = typeof doc.ratings_average === 'number' ? doc.ratings_average.toFixed(1) : 'N/A';
  const subjects = Array.isArray(doc.subject) ? doc.subject.slice(0, 4).join(', ') : '';

  return {
    id: doc.key,
    title: doc.title || 'Unknown Title',
    author,
    publishedYear: year,
    rating,
    coverUrl: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : '',
    description: subjects ? `Topics: ${subjects}` : 'No description available.',
    key: doc.key,
    editionCount: doc.edition_count ?? 0,
    languageCount: Array.isArray(doc.language) ? doc.language.length : 0,
  };
}

function buildSearchParams(query, category) {
  const trimmedQuery = query.trim();
  const params = new URLSearchParams({ limit: '24' });

  if (category === 'Author') {
    params.set('author', trimmedQuery);
    return params;
  }

  if (category === 'Title') {
    params.set('title', trimmedQuery);
    return params;
  }

  params.set('q', trimmedQuery);
  return params;
}

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = async ({ query, category }) => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    setSelectedBook(null);

    try {
      const params = buildSearchParams(query, category);
      const response = await fetch(`https://openlibrary.org/search.json?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const docs = Array.isArray(data.docs) ? data.docs : [];
      setBooks(docs.map(mapBook));
    } catch {
      setBooks([]);
      setError('Unable to fetch books right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="w-full flex justify-center items-center gap-3 text-cyan-950 p-8">
        <BookOpen size={28} />
        <h1 className="text-2xl font-bold">Book Library</h1>
      </header>

      <SearchBar onSearch={handleSearch} />
      <Main loading={loading} error={error} hasSearched={hasSearched} resultCount={books.length} />

      {books.length > 0 && (
        <section className="w-full max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {books.map((book, index) => (
              <BookCard
                key={`${book.id}-${index}`}
                title={book.title}
                author={book.author}
                publishedYear={book.publishedYear}
                rating={book.rating}
                coverUrl={book.coverUrl}
                description={book.description}
                onViewDetails={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </section>
      )}

      <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
      <Footer />
    </div>
  );
}

export default App;
