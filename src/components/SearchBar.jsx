import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    if (onSearch) {
      onSearch({ query, category });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl shadow-md"
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Category Selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">All</option>
        <option value="Author">Author</option>
        <option value="Title">Title</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:cursor-pointer hover:bg-blue-700 transition duration-200"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;