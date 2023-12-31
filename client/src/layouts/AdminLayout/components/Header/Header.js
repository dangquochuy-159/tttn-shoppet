import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header({ title, avatar, name, id }) {


    return (
        <div className="wrapper--header sm:w-full sm:!p-0 md:w-11/12 w-10/12 h-[var(--header-admin-height)] fixed top-0 right-0 z-2 px-2 pb-2 bg[var(--bg-content-admin)]">
            <div className='header-content h-full flex justify-between items-center px-2 bg-[var(--primary-color)]'>
                <div className='header--title flex items-center'>
                    <FontAwesomeIcon className='icon sm:!w-5 sm:!h-5 w-6 h-6 text-white' icon={faPlay} />
                    <h2 className='title--page text-2xl sm:!text-lg text-white font-bold uppercase ml-4'>{title}</h2>
                </div>
                {
                    avatar && name && id &&
                    <div className='header--admin flex items-center '>
                        <h2 className='sm:hidden title--admin text-2xl text-white font-thin'>{name}</h2>
                        <img className='w-10 h-10 ml-4 object-cover rounded-full' src={avatar} alt={avatar} />
                        <Link to='/' className='p-4 hover:text-white'><FontAwesomeIcon icon={faHouse} /></Link>
                    </div>
                }
            </div>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default Header;