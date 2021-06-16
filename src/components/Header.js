import React from 'react'
import Button from './Button'

const Header = ({ setStream, setWatch }) => {
	return (
			<header className='header'>
				<Button text='Stream' color='steelblue' onClick={setStream} />
				<Button text='Watch' color='steelblue' onClick={setWatch} />
			</header>
	)
}

export default Header
