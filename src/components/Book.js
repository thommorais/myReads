import React from 'react';
import Actions from './Actions';
import { getShelfName } from '../helpers';

function hasImage(image){
    const thumbnail = image ? image.thumbnail : '';
    return {thumbnail};
}


export default function Book(props){

    const { data, onChangeShelf } = props;
    const { title, authors, imageLinks, id, shelf, label } = data;
    const { thumbnail } = hasImage(imageLinks);

    return (
        <li>
            <div className={`book ${label && 'book-has-label'}`}>
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                    <Actions id={id} book={data} onChangeShelf={onChangeShelf} currentShelf={shelf} />
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
                {label && <div className="book-shelf-name"><sup>On Shelf</sup><div>{getShelfName(label)}</div></div>}

            </div>
        </li>
    )

}
