import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import {
  updateLog,
  setLoading,
  clearCurrent,
} from '../../store/actions/logActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const EditLogModal = ({ current, updateLog, setLoading, clearCurrent }) => {
  const [message, setMessage] = useState('');
  const [tech, setTech] = useState('');
  const [attention, setAttention] = useState(false);

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setTech(current.tech);
      setAttention(current.attention);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({
        html: 'Please Fill The Fields',
      });
    } else {
      const updLog = {
        id: current.id,
        message,
        tech,
        attention,
        date: new Date(),
      };
      setLoading();
      updateLog(updLog);
      M.toast({
        html: `Log Updated by ${tech}`,
      });
      clearCurrent();
      setAttention(false);
      setMessage('');
      setTech('');
    }
  };
  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className='row'>
            <div className='input-field'>
              <select
                value={tech}
                name='tech'
                className='browser-default'
                onChange={(e) => setTech(e.target.value)}>
                <option value='' disabled></option>
                <option value='John Doe'>John Doe</option>
                <option value='Sam Smith'>Sam Smith</option>
                <option value='Sara Wilson'>Sara Wilson</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in checkbox-blue'
                  checked={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          className='btn modal-close waves-effect blue left modal-btn-margin-left btn-large'
          onClick={onSubmit}>
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

EditLogModal.prototype = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, {
  updateLog,
  setLoading,
  clearCurrent,
})(EditLogModal);
