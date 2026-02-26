import { X } from 'lucide-react';

function BookDetails({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-cyan-950">Book Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5">
          <div className="h-64 w-full bg-gray-100 rounded-lg overflow-hidden">
            {book.coverUrl ? (
              <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-500">No Cover</div>
            )}
          </div>

          <div className="space-y-3 text-gray-800">
            <h3 className="text-2xl font-bold text-cyan-950">{book.title}</h3>
            <p>
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p>
              <span className="font-semibold">First Published:</span> {book.publishedYear}
            </p>
            <p>
              <span className="font-semibold">Average Rating:</span> {book.rating}
            </p>
            <p>
              <span className="font-semibold">Editions:</span> {book.editionCount}
            </p>
            <p>
              <span className="font-semibold">Languages:</span> {book.languageCount}
            </p>
            <p className="text-sm text-gray-700">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
