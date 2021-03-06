import React, { useEffect } from 'react'
import Button from './Button'
const Watch = ({startWatch, stopWatch}) => {
	useEffect(() => {
		startWatch();
	})

	return (

		<div>
			<img id="watchImg" height="360" width="640" alt='No Video'></img>	
			<Button text='Stop' color='steelblue' onClick={stopWatch} />
		</div>
	)
}

export default Watch
