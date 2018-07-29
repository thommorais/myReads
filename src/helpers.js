export function unCamelize(string){
  return string.replace(/([A-Z]+)/g, ' $1').toLowerCase();
}

export function organizeShelf(acc, book) {

  const shelf = acc.find(shelf => shelf.name === book.shelf) || { books: [] }

  shelf.books.push(book);

  if (!shelf.name) {
    shelf.name = book.shelf;
    acc.push(shelf);
  }

  return acc;
}


export const shelfsNames = [
  {
    value: 'currentlyReading',
    name:  'Currently Reading'
  },{
    value: 'wantToRead',
    name: 'Want to Read'
  },{
    value: 'read',
    name: 'Read'
  },{
    value: 'none',
    name: 'None'
  }
]

export function getShelfName(name){
  const shelfName = shelfsNames.find(shelf => shelf.value === name);
  if(shelfName)
    return shelfName.name;
}