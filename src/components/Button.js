import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ text, color, link, onClick }) => {
	return (
		<div>
			{ link ?  
				<Link to={link} className='btn'
					style={{ backgroundColor: color }}
				>{text}</Link>
				: 
				<button className='btn' style= {{backgroundColor: color}}
				onClick={onClick}
				>{text}</button>
			}
		</div>
	)
}

export default Button
