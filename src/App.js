import React, { useState } from 'react'
import './App.css';

import Header from './components/Header'
import Display from './components/Display';
import Watch from './components/Watch'

const JSON_URL = "http://localhost:5000"
// const JSON_URL = "https://react-video-stream.herokuapp.com/api"
function App() {
	const [stream, setStream] = useState(false);
	const [watch, setWatch] = useState(false);
	var chunks = [];
	var idRef;



	const startStream = () => {
		idRef = setInterval(updateDisplayAndChunk, 200);
	}

	const stopStream = () => {
		clearInterval(idRef);
	}

	const updateDisplayAndChunk = () => {
		var video = document.getElementById("video");
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		var img = document.getElementById('img');
		canvas.width = 600;
		canvas.height = 337;
		ctx.drawImage(video, 0, 0, 600, 337);
		const srcEncoded = canvas.toDataURL('image/jpeg', 0.7);
		img.src = srcEncoded;
		chunks.push({
			dataUrl: srcEncoded
		})
		if (chunks.length === 50) {
			const chunksCopy = [...chunks];
			uploadChunk(chunksCopy)
			chunks.splice(0, chunks.length);
		}
	}

	const uploadChunk = async (chunks) => {
		const status = await getStatus();
		const target = status.nextnext;
		const body = {
			chunks: chunks
		}
		const res = await fetch(`${JSON_URL}/${target}/1`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		console.log(res);
		return await setNewStatus(status);
	}

	const getStatus = async () => {
		const res = await fetch(`${JSON_URL}/status/1`);
		const status = await res.json();
		return status;
	}

	const setNewStatus = async (old) => {
		const newStatus = {};
		newStatus.current = old.next;
		newStatus.next = old.nextnext;
		newStatus.nextnext = old.current;
		const res = await fetch(`${JSON_URL}/status/1`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newStatus)
		})
		return res;
	}

	var watchId1, watchId2;
	var watchChunk = [];
	let nextChunk = " ";
	let isLoading = false;

	const startWatch = () => {
		watchId1 = setInterval(updateImg, 200);
		watchId2 = setInterval(updateChunk, 1000);
	}

	const stopWatch = () => {
		clearInterval(watchId1)
		clearInterval(watchId2)
	}

	const updateImg = () => {
		if (watchChunk.length > 0) {
			var watchImg = document.getElementById('watchImg');
			watchImg.src = watchChunk.shift().dataUrl;
		}
		console.log(watchChunk.length);
	}

	const updateChunk = async () => {
		if (isLoading) return;
		const status = await getStatus();
		const target = status.next;
		if (nextChunk !== target) {
			isLoading = true;
			const res = await fetch(`${JSON_URL}/${target}/1`)
			const data = await res.json();
			watchChunk.push(...(data.chunks))
			nextChunk = target;
			isLoading = false;
		}
	}

	const initalizeChunk = async () => {
		const status = await getStatus();
		const target = status.current;
		const res = await fetch(`${JSON_URL}/${target}/1`)
		const data = await res.json();
		watchChunk.push(...(data.chunks))
	}

	return (
		<div className="container">
			<Header setStream={() => setStream(!stream)} setWatch={() => setWatch(!watch)} />
			{stream ? <Display startStream={startStream} stopStream={stopStream} /> : <h3>No stream</h3>}
			{watch && <Watch startWatch={() => { initalizeChunk(); setTimeout(startWatch, 200); }} stopWatch={stopWatch} />}
		</div>
	);
}

export default App;
