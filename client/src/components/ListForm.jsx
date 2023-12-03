import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from '../features/lists/listSlice';

function ListForm() {
  const [title, setTitle] = useState('');
  const [superheroIds, setSuperheroIds] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    // Convert the comma-separated string of IDs to an array
    const idsArray = superheroIds.split(',').map(id => id.trim());

    dispatch(createList({ title, superheroIds: idsArray }));
    
    // Reset the form fields
    setTitle('');
    setSuperheroIds('');
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Enter list title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='superheroIds'>Enter superhero IDs (comma-separated)</label>
          <input
            type='text'
            name='superheroIds'
            id='superheroIds'
            value={superheroIds}
            onChange={(e) => setSuperheroIds(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add list
          </button>
        </div>
      </form>
    </section>
  );
}

export default ListForm;
