

const Search = () => {
    return (
        <div className="hidden md:flex flex-1">
             <input className="py-2 px-3 border-none rounded-t-md outline-none flex flex-1" type="text" placeholder="Arama Yap..."/>
             <button className="p-2 bg-orange-900">Ara</button>
        </div>
    )
}

export default Search