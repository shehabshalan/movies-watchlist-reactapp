import React, { useState } from 'react'
import { ResultCard } from './ResultCard'
export const Add = () => {
    const REACT_APP_TMDB_KEY = '16b780cf08886b80cd4738a8af9816ad';
    const [query, setQuery] = useState('')
    const [results, setResults] = useState('')
    const onChangeQuery = (e) => {
        e.preventDefault();
        setQuery(e.target.value)
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
            .then(res => res.json())
            .then((data) => {
                if (!data.errors) {
                    setResults(data.results)
                    console.log(data.results)
                } else {
                    setResults([])
                }
            })
    }
    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input type="text" placeholder="Search for a movie" value={query} onChange={onChangeQuery} />
                    </div>
                    {results.length > 0 && (
                        <ul className="results">
                            {results.map(movie => (
                                <li key={movie.id}>
                                    <ResultCard movie={movie} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}
