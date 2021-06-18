import React, { useEffect } from 'react';
import Button from './Button'



const Display = ({ startStream, stopStream }) => {
	useEffect(() => {
		var video = document.getElementById("video");
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({
				video: {
					width: 854,
					height: 480,
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
			<video id="video" className="video" height="180" width="320" playsInline autoPlay muted loop></video>
			<canvas style={{ display: 'none' }} id="canvas"></canvas>
			<img id="img" height="180" width="320" alt='No Video'></img>
			<Button text='Stop' color='steelblue' onClick={stopStream} />
		</div>
	)
}

export default Display
