function Main({ loading, error, hasSearched, resultCount }) {
  if (loading) {
    return (
      <main className="w-full flex-1 flex justify-center items-center p-8 text-cyan-950">
        <p className="text-lg font-semibold">Loading books...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full flex-1 flex justify-center items-center p-8 text-center">
        <p className="text-red-600 font-medium">{error}</p>
      </main>
    );
  }

  if (hasSearched && resultCount === 0) {
    return (
      <main className="w-full flex-1 flex flex-col justify-center items-center text-center gap-3 p-8">
        <h2 className="font-semibold text-2xl text-cyan-950">No books found</h2>
        <p className="text-gray-700">Try a different title, author, or keyword.</p>
      </main>
    );
  }

  return (
    <main className="w-full flex-1 flex flex-col justify-center items-center text-center gap-3 bg-blue-100 p-8">
      <h2 className="font-semibold text-2xl text-cyan-950">Discover Your Next Great Read</h2>
      <p className="max-w-2xl text-gray-800">
        Search for books by title, author, or keywords to explore millions of books from Open Library.
      </p>
    </main>
  );
}

export default Main;
