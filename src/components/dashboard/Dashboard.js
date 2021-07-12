import React, {useContext, useEffect, useState} from 'react';
import './dashboard.css'
import {CounterContext} from "../../App";
import EditBookForm from "../editBook/EditBookForm";
import {NavLink} from "react-router-dom";


const Dashboard = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [books, setBooks] = useState([]);
    const [idDel, setIdDel] = useState('');
    const [idEdit, setIdEdit] = useState('');
    const [count, setCount] = useState(0);
    const [editBook, setEditBook] = useState({});
    const [showEditForm, setShowEditForm] = useState(false)
    const counter = useContext(CounterContext);
console.log(counter)

    useEffect(() => {
        //eslint-disable-next-line
        fetch("http://localhost:3000/books/" + `${idDel}`, {method: 'DELETE'})
            .then((res) => res.json())
            .then(() => setCount(count - 1))
    }, [idDel]);

    useEffect(() => {
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then(result => {
                    setIsLoaded(true);
                    setBooks(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [count, counter]);

    useEffect(() => {
 console.log(editBook)
     }, [editBook])

    const changeEditBook = () => {
        if (idEdit) {
            const currentBook = books.filter(item => +item.id === +idEdit)
            setEditBook(...currentBook);
            setShowEditForm(true)
        }
    }
    const editHandler = (e) => {
        e.preventDefault();
        setIdEdit(e.target.value);
        changeEditBook();
    }

    const toggleShowEditForm = () => {
        window.location.reload()
        setShowEditForm(prev => !prev)
    }

    if (showEditForm) {
        return (
            <EditBookForm
                editBook={editBook}
                toggleShowEditForm={toggleShowEditForm}/>
        )
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Wait for loading please</div>;
    } else {
        return (
            <div className='dashboard-container'>
                <table className='dashboard-container__table'>
                    <thead>
                    <tr>
                        <th>Book title</th>
                        <th>Author name</th>
                        <th>Category</th>
                        <th>ISBN</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.isbn}</td>
                            <td>
                                <button value={book.id}
                                        className='btn-edit'
                                        onClick={editHandler}
                                >Edit
                                </button>
                                <button value={book.id}
                                        className='btn-delete'
                                        onClick={(e) => {
                                            setIdDel(e.target.value)
                                        }}
                                >Delete
                                </button>
                            </td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>

                <NavLink to='/addbook'><button className='btn-new-book'>Add new book</button> </NavLink>

            </div>
        );
    }
}

export default Dashboard;
