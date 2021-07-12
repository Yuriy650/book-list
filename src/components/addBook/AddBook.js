import React, {useEffect, useState} from 'react';
import './addBook.css'

const AddBook = ({toggleCounter}) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [isbn, setIsbn] = useState('');
    const [newBook, setNewBook] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (title || author || category) {
            setNewBook({
                id: Date.now(),
                title,
                author,
                category,
                isbn
            });
        }
    }
    useEffect(() => {
        if (title || author || category) {
            fetch("http://localhost:3000/books", {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newBook)
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                })
        }
        setTitle('');
        setAuthor('');
        setCategory(null);
        setIsbn('')
    }, [newBook])

    return (
        <div className='addBook-container'>
            <form onSubmit={onSubmitHandler} className='form-container'>
                <div className='input-item'>
                    <label>Book title</label>
                    <input type='text'
                           className='input-field'
                           required
                           placeholder='Book title'
                           value={title}
                           onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className='input-item'>
                    <label>Author name</label>
                    <input type='text'
                           className='input-field'
                           required
                           placeholder='Author name'
                           value={author}
                           onChange={e => setAuthor(e.target.value)}/>
                </div>
                <div className='input-item'>
                    <div>Category</div>
                    <select
                        required
                        className='select-field'
                        onChange={e => setCategory(e.target.value)}>
                        <option> </option>
                        <option value='programming'>Programming</option>
                        <option value='classics'>Classics</option>
                        <option value='adventure'>Adventure</option>
                        <option value='detective'>Detective</option>
                        <option value='horror'>Horror</option>
                    </select>
                </div>
                <div className='input-item'>
                    <label>ISBN</label>
                    <input type='text'
                           required
                           className='input-field'
                           placeholder='ISBN'
                           value={isbn}
                           onChange={e => setIsbn(e.target.value)}/>
                </div>
                <button
                    type='submit'
                    className='btn-add'
                    onClick={toggleCounter}>
                    Add book
                </button>
            </form>

        </div>
    )
}

export default AddBook;
