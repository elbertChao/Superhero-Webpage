import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from '../features/lists/listSlice';

// ListForm component for creating a new list
function ListForm() {
  // State hooks for form input values
  const [title, setTitle] = useState('');
  const [superheroIds, setSuperheroIds] = useState('');

  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Convert the comma-separated string of IDs to an array
    const idsArray = superheroIds.split(',').map(id => id.trim());

    // Dispatch the createList action with the list data
    dispatch(createList({ title, superheroIds: idsArray }));

    // Reset the form fields
    setTitle('');
    setSuperheroIds('');
  };

  // Render the form component
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        {/* Input field for list title */}
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

        {/* Input field for superhero IDs (comma-separated) */}
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

        {/* Submit button */}
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add list
          </button>
        </div>
      </form>
    </section>
  );
}

// Exporting the ListForm component as the default export
export default ListForm;
