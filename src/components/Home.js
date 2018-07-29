import React from 'react';
import Shelf from './Shelf';
import {Link} from 'react-router-dom';
import Loader from './Loader';

export default function Home(props){

    const { shelfs, onChangeShelf} = props;

    const hasShelfs = shelfs.length ? true : false;

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {hasShelfs && <div className="list-books-content">
                {shelfs.map(shelf => <Shelf shelf={shelf} key={shelf.name} onChangeShelf={onChangeShelf} />)}
                <div className="open-search">
                    <Link to='/search' >Add a book</Link>
                </div>
            </div>}
            {!hasShelfs && <Loader />}
        </div>
    )

}