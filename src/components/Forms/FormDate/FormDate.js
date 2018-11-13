import React from 'react';
import PropTypes from 'prop-types';
import './FormDate.css';

const FormDate = (props) => {
    const { errors, onChange } = props;

    let days = [];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let years = [];
    for (let i = 1; i < (2020 - 1905); i++) {
        years.push(i + 1904);
        if (i < 32) {
            days.push(i);
        }
    }
    years = years.reverse();

    return (
        <div className="form-date">
            <select name="day" onChange={onChange} className="form-date__select">
                <option disabled defaultValue value="0" className="form-date__option">Day</option>
                {days.map(day => {
                    return (<option key={day} value={day} className="form-date__option">{day}</option>)
                })}
            </select>

            <select name="month" onChange={onChange} className="form-date__select">
                <option disabled defaultValue value="0" className="form-date__option">Month</option>
                {months.map(month => {
                    return (<option key={month} value={month} className="form-date__option">{month}</option>)
                })}
            </select>

            <select name="year" onChange={onChange} className="form-date__select">
                <option disabled defaultValue value="0" className="form-date__option">Year</option>
                {years.map(year => {
                    return (<option key={year} value={year} className="form-date__option">{year}</option>)
                })}
            </select><br />
            {Object.keys(errors).length > 0 && (<small className="form-date__errors">{errors.errors.dob}</small>)}
        </div>
    )
}

FormDate.propTypes = {
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default FormDate;
