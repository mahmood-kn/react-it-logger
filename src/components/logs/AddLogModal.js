import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog, setLoading } from '../../store/actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = ({ addLog, setLoading }) => {
  const [message, setMessage] = useState('');
  const [tech, setTech] = useState('');
  const [attention, setAttention] = useState(false);

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({
        html: 'Please Fill The Fields',
      });
    } else {
      const newLog = {
        message,
        tech,
        attention,
        date: new Date(),
      };
      setLoading();
      addLog(newLog);
      M.toast({ html: `Log added by ${tech}` });
      setAttention(false);
      setMessage('');
      setTech('');
    }
  };
  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
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
            <label htmlFor='message' className='active'>
              Log Message
            </label>
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

AddLogModal.prototype = {
  addLog: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

export default connect(null, { addLog, setLoading })(AddLogModal);
