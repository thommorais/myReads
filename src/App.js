import './App.css';
import './loader.css';
import React from 'react';
import Home from './components/Home';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import {Route} from 'react-router-dom';
import { organizeShelf} from './helpers';

class BooksApp extends React.Component {

	state = {
		myBooks: [],
		shelfs: [],
	}

	componentWillMount() {
		BooksAPI.getAll().then(myBooks => {
			const shelfs = myBooks.reduce( (acc, book) => organizeShelf(acc, book),[]);
			this.setState({ shelfs, myBooks });
		})
	}


	addToCollection(book, shelf){

		const {myBooks} = this.state;
		const foundBook = myBooks.find(myBook => myBook.id === book.id);

		if(!foundBook){

				foundBook.shelf = shelf;
				foundBook.label = null;

				this.setState(prevState => {
					const { myBooks } = prevState;
					myBooks.push(foundBook);
					return {myBooks};
				})

		}

	}

	onChangeShelf(movedBook, newShelf) {

			this.addToCollection(movedBook, newShelf);

			BooksAPI.update(movedBook, newShelf).then(items => {

				const keys = Object.keys(items);

				const {myBooks} = this.state;

				const shelfs = keys.reduce( (acc, name) => {

					const books = items[name].map(bookID => myBooks.find(book => book.id === bookID) );
					acc.push({ books, name});
					return acc;

				}, [])

				this.setState({shelfs});

			})

	}

	render() {

		const { myBooks, shelfs } = this.state;

		return (
			<React.Fragment>
				<Route
					exact
					path="/"
					render={() => (
						<Home
							books={myBooks}
							shelfs={shelfs}
							onChangeShelf={this.onChangeShelf.bind(this)}
						/>
					)}
				/>
				<Route
					path="/search"
					render={() => (
						<Search
							books={myBooks}
							onChangeShelf={this.onChangeShelf.bind(this)}
						/>
					)}
				/>
			</React.Fragment>
		)
	}
}

export default BooksApp;