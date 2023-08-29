interface SearchInputProps {
  onChange: (value: string) => void
}

const SearchInput = ({ onChange }: SearchInputProps) => (
  <div className="my-4">
    <input
      className="border rounded-lg py-2 px-4 focus:outline-none bg-gray-400 text-white placeholder-white focus:ring-1 focus:ring-blue-500"
      type="search"
      placeholder="Search Users"
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
)

export default SearchInput
