import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from '../features/lists/listSlice'

function ListForm() {
    const [ text,setText ] = useState('');

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();

        dispatch(createList({ text }));
        setText('');
    }

    return <section className = 'form'>
        <form onSubmit = { onSubmit }>
            <div className = "form-group">
                <label htmlFor = "text">List</label>
                <input type = "text"
                name = 'text'
                id = 'text'
                value = { text }
                onChange = { (e) => setText(e.target.value) }/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                    Add List
                </button>
            </div>
        </form>
    </section>
}

export default ListForm