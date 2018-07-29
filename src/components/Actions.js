import React from 'react';
import {shelfsNames} from '../helpers';

export default function Actions(props){

	const { onChangeShelf, book, currentShelf } = props;
	const lastShelf = currentShelf;

	return (
		<div className="book-shelf-changer">
			<select value={currentShelf || 'none'} onChange={({ target }) => onChangeShelf(book, target.value, lastShelf) }>
				<option value="move" disabled>Move to...</option>
				{shelfsNames.map(shelf => <option key={shelf.value} value={shelf.value}>{shelf.name}</option>)}
			</select>
		</div>
	)
}
