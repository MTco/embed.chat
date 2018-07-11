/* global describe, it */
const assert = require('assert');
const io = require('socket.io-client');
const server = require('../server');

const socket = io('http://localhost:3050');

describe('Server', () => {
	it('should send stats', async () => {
		socket.emit('subscribe-stats');

		await new Promise(resolve => socket.on('stats', resolve));
	});

	let name;

	it('should allocate name', async () => {
		socket.emit('init', 'localhost', true);

		name = await new Promise(resolve => socket.on('name', resolve));
	});

	it('should relay message', async () => {
		socket.emit('message', 'Hello, World!');

		assert.deepEqual(
			await new Promise(resolve => socket.on('message', resolve)),
			{
				name,
				text: 'Hello, World!'
			}
		);
	});
});