import React, { useEffect } from 'react';
import TechItem from './TechItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTechs, setLoading } from '../../store/actions/techActions';

const TechsListModal = ({ tech: { techs, loading }, getTechs, setLoading }) => {
  useEffect(() => {
    setLoading();
    getTechs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technicians</h4>
        <ul className='collection'>
          {!loading &&
            techs !== null &&
            techs.map((tech) => <TechItem tech={tech} key={tech.id} />)}
        </ul>
      </div>
    </div>
  );
};

TechsListModal.prototype = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs, setLoading })(
  TechsListModal
);
