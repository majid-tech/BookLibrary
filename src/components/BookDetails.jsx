import { X } from 'lucide-react';

function DetailRow({ label, value }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {value || 'N/A'}
    </p>
  );
}

function BookDetails({ book, onClose, loading, error }) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
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

        <div className="p-5 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5">
          <div className="h-72 w-full bg-gray-100 rounded-lg overflow-hidden">
            {book.coverUrl ? (
              <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-500">No Cover</div>
            )}
          </div>

          <div className="space-y-3 text-gray-800">
            <h3 className="text-2xl font-bold text-cyan-950">{book.title}</h3>
            <DetailRow label="Author(s)" value={book.authors} />
            <DetailRow label="Publisher" value={book.publisher} />
            <DetailRow label="Publication Date" value={book.publicationDate} />
            <DetailRow label="ISBN" value={book.isbn} />
            <DetailRow label="Number of Pages" value={book.numberOfPages} />

            {loading && <p className="text-sm text-cyan-800">Loading additional details...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div>
              <h4 className="font-semibold mb-1">Description</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{book.description || 'No description available.'}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">Subjects</h4>
              {Array.isArray(book.subjects) && book.subjects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {book.subjects.map((subject) => (
                    <span key={subject} className="text-xs px-2 py-1 rounded-full bg-cyan-100 text-cyan-900">
                      {subject}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-700">No subjects available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
