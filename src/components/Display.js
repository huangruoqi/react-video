import React, { useEffect } from 'react';
import Button from './Button'



const Display = ({ startStream, stopStream }) => {
	useEffect(() => {
		var video = document.getElementById("video");
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({
				video: {
					width: 1280,
					height: 720,
					facingMode: 'environment'
				}
			}).then(stream => {
				video.srcObject = stream;
				startStream();
			})
		}
	})
	return (
		<div>
			<div className='videoContainer'>
				<video id="video" className="video" height="720" width="1280" playsInline autoPlay muted loop></video>
			</div>
			<canvas style={{ display: 'none' }} id="canvas"></canvas>
			<img id="img" height="360" width="640" alt='No Video'></img>
			<Button text='Stop' color='steelblue' onClick={stopStream} />
		</div>
	)
}

export default Display
