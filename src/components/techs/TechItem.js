import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTech, setLoading } from '../../store/actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech, deleteTech, setLoading }) => {
  const onDelete = () => {
    setLoading();
    deleteTech(tech.id);
    M.toast({ html: 'Technision deleted' });
  };
  return (
    <li className='collection-item'>
      <div>
        {tech.firstName} {tech.lastName}
        <a onClick={onDelete} href='#!' className='secondary-content grey-text'>
          <i className='material-icons'>delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  deleteTech: PropTypes.func.isRequired,
};

export default connect(null, { setLoading, deleteTech })(TechItem);
