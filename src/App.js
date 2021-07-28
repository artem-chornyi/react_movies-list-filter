import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    query: '',
  };

  onChange = event => (
    this.setState({
      query: event.target.value.toLowerCase(),
    })
  );

  filterByMovies = () => (
    this.state.query.length === 0
      ? [...moviesFromServer]
      : [...moviesFromServer].filter(
        (movie) => {
          const { title, description } = movie;
          const { query } = this.state;

          return title.toLowerCase().includes(query)
            || description.toLowerCase().includes(query);
        },
      )
  );

  render() {
    const { query } = this.state;

    return (
      <div className="page">
        <div className="page-content">
          <div className="box">
            <div className="field">
              <label htmlFor="search-query" className="label">
                Search movie
              </label>

              <div className="control">
                <input
                  type="text"
                  id="search-query"
                  className="input"
                  placeholder="Type search word"
                  defaultValue={query}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>

          <MoviesList movies={this.filterByMovies()} />
        </div>
        <div className="sidebar">
          Sidebar goes here
        </div>
      </div>
    );
  }
}
