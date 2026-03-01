function BookCard({
  title = 'Unknown Title',
  authors = 'Unknown Author',
  publisher = 'Unknown Publisher',
  coverUrl = '',
  description = 'No description available.',
  onViewDetails,
}) {
  return (
    <article className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="h-56 w-full bg-gray-100">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-500 font-medium">
            No Cover
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-bold text-cyan-950 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{authors}</p>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-semibold">Publisher:</span> {publisher}
        </p>

        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>

        <button
          type="button"
          onClick={onViewDetails}
          className="mt-1 px-4 py-2 bg-cyan-950 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default BookCard;
