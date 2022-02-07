// BUILD YOUR SERVER HERE
const express = require('express');
const { find, findById, insert, update, remove } = require('./users/model');

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post('/api/users', (req, res) => {
	const body = req.body;
	if (!body.name || !body.bio) {
		res
			.status(400)
			.json({ message: 'Please provide name and bio for the user' });
	} else {
		insert(body)
			.then((user) => {
				res.status(201).json({ msg: user });
			})
			.catch((err) => {
				res.status(500).json({
					message: 'There was an error while saving the user to the database',
				});
			});
	}
});

server.get('/api/users', (req, res) => {
	find()
		.then((users) => {
			res.status(200).json({ msg: users });
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The users information could not be retrieved' });
		});
});

server.get('/api/users/:id/', (req, res) => {
	const id = req.params.id;
	findById(id)
		.then((user) => {
			if (!user) {
				res.status(404).res.json({
					message: 'The user with the specified ID does not exist',
				});
			} else {
				res.status(200).json(user);
			}
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'The user information could not be retrieved' });
		});
});

server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id;
	res.status(200).json({ message: `Deleting user with an ID of ${id} 👀` });
});

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	res.status(200).json({ message: `Updating user with an ID of ${id} 👌` });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
