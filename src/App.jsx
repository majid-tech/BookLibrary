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
  const authors = Array.isArray(doc.author_name) && doc.author_name.length > 0
    ? doc.author_name.join(', ')
    : 'Unknown Author';
  const publisher = Array.isArray(doc.publisher) && doc.publisher.length > 0
    ? doc.publisher[0]
    : 'Unknown Publisher';
  const description = Array.isArray(doc.subject)
    ? `Topics: ${doc.subject.slice(0, 4).join(', ')}`
    : 'No description available.';

  return {
    id: doc.key,
    title: doc.title || 'Unknown Title',
    authors,
    publisher,
    coverUrl: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : '',
    description,
    workKey: doc.key,
    publicationDate: doc.first_publish_year ? String(doc.first_publish_year) : 'N/A',
    isbn: Array.isArray(doc.isbn) && doc.isbn.length > 0 ? doc.isbn[0] : 'N/A',
    numberOfPages: doc.number_of_pages_median ?? 'N/A',
    subjects: Array.isArray(doc.subject) ? doc.subject.slice(0, 8) : [],
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

function extractDescription(description) {
  if (!description) return '';
  if (typeof description === 'string') return description;
  if (typeof description === 'object' && typeof description.value === 'string') return description.value;
  return '';
}

async function fetchBookDetails(selectedBook) {
  const workResponse = await fetch(`https://openlibrary.org${selectedBook.workKey}.json`);

  if (!workResponse.ok) {
    throw new Error(`Details request failed with status ${workResponse.status}`);
  }

  const work = await workResponse.json();
  const fullDescription = extractDescription(work.description) || selectedBook.description;
  const subjects = Array.isArray(work.subjects) && work.subjects.length > 0
    ? work.subjects.slice(0, 10)
    : selectedBook.subjects;

  let publicationDate = work.first_publish_date || selectedBook.publicationDate;
  let isbn = selectedBook.isbn;
  let numberOfPages = selectedBook.numberOfPages;

  if (isbn === 'N/A' || numberOfPages === 'N/A' || publicationDate === 'N/A') {
    const workId = selectedBook.workKey.split('/').pop();
    const editionsResponse = await fetch(`https://openlibrary.org/works/${workId}/editions.json?limit=1`);

    if (editionsResponse.ok) {
      const editions = await editionsResponse.json();
      const firstEdition = Array.isArray(editions.entries) ? editions.entries[0] : null;

      if (firstEdition) {
        if (isbn === 'N/A') {
          if (Array.isArray(firstEdition.isbn_13) && firstEdition.isbn_13.length > 0) {
            [isbn] = firstEdition.isbn_13;
          } else if (Array.isArray(firstEdition.isbn_10) && firstEdition.isbn_10.length > 0) {
            [isbn] = firstEdition.isbn_10;
          }
        }

        if (numberOfPages === 'N/A' && typeof firstEdition.number_of_pages === 'number') {
          numberOfPages = firstEdition.number_of_pages;
        }

        if (publicationDate === 'N/A' && firstEdition.publish_date) {
          publicationDate = firstEdition.publish_date;
        }
      }
    }
  }

  return {
    ...selectedBook,
    description: fullDescription,
    publicationDate: publicationDate || 'N/A',
    isbn: isbn || 'N/A',
    numberOfPages: numberOfPages || 'N/A',
    subjects: Array.isArray(subjects) ? subjects : [],
  };
}

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  const handleSearch = async ({ query, category }) => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    setSelectedBook(null);
    setDetailsLoading(false);
    setDetailsError('');

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

  const handleViewDetails = async (book) => {
    setSelectedBook(book);
    setDetailsLoading(true);
    setDetailsError('');

    try {
      const details = await fetchBookDetails(book);
      setSelectedBook(details);
    } catch {
      setDetailsError('Unable to load full book details right now.');
    } finally {
      setDetailsLoading(false);
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
                authors={book.authors}
                publisher={book.publisher}
                coverUrl={book.coverUrl}
                description={book.description}
                onViewDetails={() => handleViewDetails(book)}
              />
            ))}
          </div>
        </section>
      )}

      <BookDetails
        book={selectedBook}
        onClose={() => {
          setSelectedBook(null);
          setDetailsError('');
        }}
        loading={detailsLoading}
        error={detailsError}
      />
      <Footer />
    </div>
  );
}

export default App;
