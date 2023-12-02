import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createList, reset } from '../features/lists/listSlice'

function ListForm() {
    const [name, setName] = useState('');
    const [visibility, setVisibility] = useState('private');
    const [selectedHeroes, setSelectedHeroes] = useState([]);

    const dispatch = useDispatch();

    // Create heroSlice.js
    const { heroes } = useSelector((state) => state.heroes);

    useEffect(() => {
        // Fetch heroes when the component mounts
        dispatch(getHeroes());
      }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        
        const listData = {
            name,
            visibility,
            heroes: selectedHeroes.map((hero) => hero._id),
        };
        
        dispatch(createList(listData));
        setName('');
        setVisibility('private');
        setSelectedHeroes([]);
    };

    return (
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">List Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="visibility">Visibility</label>
              <select
                name="visibility"
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="heroes">Select Heroes</label>
              <select
                multiple
                name="heroes"
                id="heroes"
                value={selectedHeroes.map((hero) => hero._id)}
                onChange={(e) =>
                  setSelectedHeroes(
                    Array.from(e.target.selectedOptions, (option) =>
                      heroes.find((hero) => hero._id === option.value)
                    )
                  )
                }
              >
                {heroes.map((hero) => (
                  <option key={hero._id} value={hero._id}>
                    {hero.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-block" type="submit">
                Add List
              </button>
            </div>
          </form>
        </section>
      );
    }

export default ListForm