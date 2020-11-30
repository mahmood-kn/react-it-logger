import React, { useEffect } from 'react';
import LogItem from './LogItem';
import PropTypes from 'prop-types';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';
import { getLogs, setLoading } from '../../store/actions/logActions';

const Logs = ({ logs, loading, getLogs, setLoading }) => {
  useEffect(() => {
    setLoading();
    getLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show ...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.prototype = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  logs: state.log.logs,
  loading: state.log.loading,
});

export default connect(mapStateToProps, { getLogs, setLoading })(Logs);
