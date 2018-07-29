import React from 'react';
import Book from './Book';
import { getShelfName } from '../helpers';

export default function Shelf(props) {

    const { shelf, onChangeShelf} = props;
    const { name, books} = shelf;

    const hasBooks = books.length ? true : false;

    return (
            <React.Fragment>
            {hasBooks &&
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{getShelfName(name)}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map(book => <Book data={book} key={book.id} onChangeShelf={onChangeShelf} />)}
                            </ol>
                        </div>
                    </div>
              }
            </React.Fragment>
    )
}
