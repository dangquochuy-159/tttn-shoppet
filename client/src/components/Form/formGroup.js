import PropTypes from 'prop-types'

function FormGroup({ children, className = '' }) {
    return (
        <div className={`${className} gap-2 form-group`}>
            {children}
        </div>
    );
}

FormGroup.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default FormGroup;