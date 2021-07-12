import React, {useEffect, useState} from 'react';
import './editBookForm.css'

const EditBookForm = (props) => {
    const [title, setTitle] = useState(props.editBook.title);
    const [author, setAuthor] = useState(props.editBook.author);
    const [isbn, setIsbn] = useState(props.editBook.isbn);
    const [category, setCategory] = useState(props.editBook.category);
    const [newEditBook, setNewEditBook] = useState({})
    useEffect(() => {
        if (title || author || category) {
            const requestOptions = {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newEditBook)
            };
            // eslint-disable-next-line
            fetch("http://localhost:3000/books/" + `${props.editBook.id}`, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))

        }
    }, [newEditBook]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (title || author || category || isbn) {
            setNewEditBook({
                id: props.editBook.id,
                title,
                author,
                category,
                isbn
            });
        }
        console.log(newEditBook)
    }
    const onChangeAuthor = (e) => {
        e.preventDefault();
        setAuthor(e.target.value)
    }
    return (
        <div className='edit-form-container'>
            <form onSubmit={onSubmitHandler} className='edit-form' key={props.editBook.id}>
                <div className='input-item'>
                    <label>Book title</label>
                    <input
                        type='text'
                        className='input'
                        placeholder='Book title'
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}/>
                </div>
                <div className='input-item'>
                    <label>Author name</label>
                    <input type='text'
                           required
                           className='input'
                           placeholder='Author name'
                           value={author}
                           onChange={onChangeAuthor}/>
                </div>
                <div className='input-item'>
                    <div>Category</div>
                    <select
                        className='select'
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}>
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
                    <input
                        type='text'
                        className='input'
                        required
                        placeholder='ISBN'
                        value={isbn}
                        onChange={(e) => {
                            setIsbn(e.target.value)
                        }}/>
                </div>
                <div className='buttons'>
                <button
                    type='submit'
                    className='btn-edit'>Edit book</button>
                <button
                    className='btn-back'
                    onClick={props.toggleShowEditForm}>Back</button>
                </div>
            </form>
        </div>
    )
}
export default EditBookForm;
