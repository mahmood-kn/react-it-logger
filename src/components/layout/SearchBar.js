import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { searchLogs } from '../../store/actions/logActions';
import PropTypes from 'prop-types';

const SearchBar = ({ searchLogs }) => {
  const [search, setSearch] = useState('');
  const text = useRef('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === text.current.value) {
        searchLogs(text.current.value);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              value={search}
              placeholder='Search...'
              ref={text}
              onChange={(e) => setSearch(e.target.value)}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.prototype = {
  searchLogs: PropTypes.func.isRequired,
};

export default connect(null, { searchLogs })(SearchBar);
