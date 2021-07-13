import React, {useState} from 'react';
import './App.css';
import Dashboard from "./components/dashboard/Dashboard";
import AddBook from "./components/addBook/AddBook";
import {BrowserRouter, Route} from "react-router-dom";

export const CounterContext = React.createContext();

function App() {
    const [counter, setCounter] = useState(false);
    const toggleCounter = () => {
        setCounter(prev => !prev);
    }
    return (
        <CounterContext.Provider value={counter}>
            <div className="app">
                <div className='container'>
                <BrowserRouter>
                    <Route path='/' component={Dashboard}/>
                    <Route path='/addbook' render={() => <AddBook toggleCounter={toggleCounter}/>}/>
                </BrowserRouter>
                </div>
            </div>
        </CounterContext.Provider>
    );
}

export default App;
