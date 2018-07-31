import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';
import { Debounce } from 'react-throttle';

export default class Search extends Component {

    state = {
        searchQry : '',
        results : []
    }

    getSearchResults(){

        const { searchQry } = this.state;

        BooksAPI.search(searchQry.trim()).then( bookRes => {

            if (!bookRes || bookRes.error) {

                this.setState({ results: [] })

            } else {

                const {books} = this.props;

                const results = bookRes.map(book => {
                    const foundBook = books.find(myBook => myBook.id === book.id);
                    if(foundBook){
                        foundBook.label = foundBook.shelf;
                    }
                    return foundBook || book;
                })

                this.setState({ results })

            }

        })

    }

    updateSearchQuery(searchQry){
        this.setState( prvState => ({ searchQry }), this.getSearchResults);
    }

    onChangeShelfInSearch(book, shelf){

        this.props.onChangeShelf(book, shelf);

        const {results} = this.state;

        const changedResults = results.map(resBook => {

            if (resBook.id === book.id){
                resBook.shelf = shelf;
                resBook.label = shelf;
            }

            return resBook;
        })

        this.setState({ results: changedResults})

    }

    render() {

        const {results} = this.state;
        const hasResults = results.length ? true : false;

        return <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>

                <Debounce time="300" handler="onChange" className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"  onChange={event => this.updateSearchQuery(event.target.value)} />
                </Debounce>
            </div>

            <div className="search-books-results">
              <ol className="books-grid">
                {!hasResults && <div>
                    Use your feelings, Obi-Wan, and find him you will.
                  </div>}
                {hasResults && results.map(book => (
                    <Book
                      data={book}
                      key={book.id}
                      onChangeShelf={this.onChangeShelfInSearch.bind(
                        this
                      )}
                    />
                  ))}
              </ol>
            </div>
          </div>
    }

}