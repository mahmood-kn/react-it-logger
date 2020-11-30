import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTechs, setLoading } from '../../store/actions/techActions';

const TechSelectOptions = ({
  tech: { techs, loading },
  getTechs,
  setLoading,
}) => {
  return (
    !loading &&
    techs !== null &&
    techs.map((t) => (
      <option key={t.id} value={`${t.firstName} ${t.lastName}`}>
        {t.firstName} {t.lastName}
      </option>
    ))
  );
};

TechSelectOptions.propTypes = {
  getTechs: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  tech: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs, setLoading })(
  TechSelectOptions
);
