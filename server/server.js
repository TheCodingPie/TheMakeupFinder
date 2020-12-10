const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const cookieAge = 30 * 60 * 1000//in miliseconds
const dataLayer = require('./dataLayer.js');
const client = dataLayer.cassandraClient;
const driver = dataLayer.neo4jDriver;
var session = require('express-session');
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.header('origin'));
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept,Authorization"
	);
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
app.use(express.json({ limit: '1mb' }));
app.use(session({ secret: 'keyboard cat', cookie: { name: 'ime', maxAge: cookieAge } }));
app.set('trust proxy', 1);
app.listen(1234, () => {
	console.log("Server is listening on port: 1234");
});

app.get("/sessionLogin", async (req, res) => {
	console.log('u sessionLogin')
	console.log(req.sessionID);
	let username = await sessionExists(req.sessionID)
	console.log('u sessionLogin username:')
	console.log(username)
	if (username) {
		console.log('upao')
		getUserData(username, res);
	}
	else {
		res.json(false);
	}
});

getUserData = (username, res) => {
	console.log('getuserdata')
	console.log(username)
	query = "SELECT * FROM person WHERE  username = ? ";

	client.execute(query, [username], async (err, result) => {
		if (result.rows.length > 0) {
			tosnd = {};
			tosnd["username"] = result.rows[0].username;
			tosnd["email"] = result.rows[0].email;
			tosnd["lastname"] = result.rows[0].lastname;
			tosnd["name"] = result.rows[0].name;
			tosnd["type"] = "Client"
			res.json(tosnd);
			return;
		}
		else {
			getArtistData(username, res);
		}

	});
}
getArtistData = async (username, res) => {

	query = "SELECT * FROM makeupartist WHERE  username = ? ";
	let resu = await client.execute(query, [username]);

	tosnd = {};
	tosnd["username"] = resu.rows[0].username;
	tosnd["email"] = resu.rows[0].email;
	tosnd["lastname"] = resu.rows[0].lastname;
	tosnd["name"] = resu.rows[0].name;
	tosnd["type"] = "Artist",
		tosnd["city"] = resu.rows[0].city;
	tosnd["description"] = resu.rows[0].description;
	tosnd["numofreviews"] = resu.rows[0].numofreviews;
	tosnd["stars"] = resu.rows[0].stars;
	tosnd["timeslot"] = resu.rows[0].timeslot;
	tosnd["price"] = resu.rows[0].price;
	res.json(tosnd);
	return;

}

app.get("/login/:id/:password", async (req, res) => {
	console.log('u login')
	console.log(req.sessionID);
	let tosnd = false;
	let id = req.params.id;
	let password = req.params.password;
	query = "SELECT * FROM person WHERE  username = ? ";

	client.execute(query, [id], async (err, result) => {
		if (result.rows.length > 0) {
			if (bcrypt.compareSync(password, result.rows[0].password)) {
				tosnd = {};
				tosnd["username"] = result.rows[0].username;
				tosnd["email"] = result.rows[0].email;
				tosnd["lastname"] = result.rows[0].lastname;
				tosnd["name"] = result.rows[0].name;
				tosnd["type"] = "Client"
				addSession(req.sessionID, id)
			}
			res.json(tosnd);
		}
		else {
			loginArtist(res, id, req.sessionID);
		}
	});
});


app.get("/logout", async (req, res) => {

	let isDeleted = await deleteSession(req.sessionID);
	res.json(isDeleted);

});

deleteSession = async (sessionID) => {
	console.log(sessionID);

	query = "DELETE FROM sessions WHERE  sessionID = ? ";

	let result = await client.execute(query, [sessionID])
	return result;
}

sessionExists = async (sessionID) => {
	query = "SELECT * FROM sessions WHERE  sessionID = ? ";
	let result = await client.execute(query, [sessionID])
	if (result.rows.length > 0) {
		return result.rows[0].username;
	}
	else {
		return false;
	}
}

addSession = (sessionID, username) => {
	query = "INSERT INTO sessions(sessionID,username) VALUES (?,?);";
	client.execute(query, [sessionID, username]);

}
loginArtist = async (res, id, sessionID) => {
	query = "SELECT * FROM makeupartist WHERE  username = ? ";
	let resu = await client.execute(query, [id]);
	if (resu.rows.length > 0) {
		tosnd = {};
		tosnd["username"] = resu.rows[0].username;
		tosnd["email"] = resu.rows[0].email;
		tosnd["lastname"] = resu.rows[0].lastname;
		tosnd["name"] = resu.rows[0].name;
		tosnd["type"] = "Artist",
			tosnd["city"] = resu.rows[0].city;
		tosnd["description"] = resu.rows[0].description;
		tosnd["numofreviews"] = resu.rows[0].numofreviews;
		tosnd["stars"] = resu.rows[0].stars;
		tosnd["timeslot"] = resu.rows[0].timeslot;
		tosnd["price"] = resu.rows[0].price;
		addSession(sessionID, id)
	}
	else {
		tosnd = false;
	}
	res.json(tosnd);
}

app.get("/createClient/:id/:password/:name/:lastname/:email", async (req, res) => {
	let id = req.params.id;
	query = "select  * from makeupartist where username = ? ";
	let resA = await client.execute(query, [id]);
	if (resA.rows.length > 0) {
		res.json('false');
	}
	else {
		query = "SELECT * FROM person WHERE  username = ? ";
		client.execute(query, [id], (err, result) => {

			if (result.rows.length > 0) {
				res.json('false');
			}
			else {
				let hashedPassword = bcrypt.hashSync(req.params.password, 5);
				query = "INSERT INTO person(username, email, lastname, name, password) VALUES (?, ?,? , ?,? );";
				client.execute(query, [id, req.params.email, req.params.lastname, req.params.name, hashedPassword], addClientToNeo4j(res, id));
			}
		});
	}
})

addClientToNeo4j = (res, id) => {
	const session = driver.session();
	const cypher = "create (c:Client{name:$name})";
	const params = { name: id };
	session.run(cypher, params)
		.then(() => {
			session.close();
			res.json(true);
		});
}

app.post("/createArtist", async (req, res) => {
	if (await usernameExists(req.body.username)) {
		res.json('false');
		return;
	}
	const id = req.body.username;
	const cities = req.body.cities;
	const price = req.body.price;
	const hashedPassword = bcrypt.hashSync(req.body.password, 5);
	query1 = "INSERT INTO makeupartist(username, email, lastname, name, password,numofreviews,stars,city,timeslot,price,alltogether) VALUES (?, ?,? , ?,?,0,0,? ," + req.body.timeslot + ", " + price + ",0);";
	query2 = "INSERT INTO artists (username, username_first_letter) values(  ?,?);";
	query3 = " insert into comments (artistusername,artistCommNum ) values(  ?,0);";
	const queries = [
		{ query: query1, params: [id, req.body.email, req.body.lastname, req.body.name, hashedPassword, req.body.cities] },
		{ query: query2, params: [id, id[0]] },
		{ query: query3, params: [id] }
	];
	client.batch(queries, { prepare: true })
		.then(() => {
			addArtistToNeo4j(id, price, cities, res);
		})
		.catch((err) => {
			console.log(err)
			res.json('error');
		});
});

addArtistToNeo4j = async (id, price, cities, res) => {
	const cypher1 = "create (p:Artist{name:$id,price:$price})";
	let session1 = driver.session();
	let params2 = { id: id, price: parseInt(price) };
	await session1.run(cypher1, params2);
	session1.close();
	cities.forEach(async (x, i) => {
		let city = x;
		let session = driver.session();
		const cypher = "create(n:City{name:$name})  ";
		const cypher0 = "MATCH (n:City{name:$city}) RETURN n ";
		const cypher2 = "match(c:City{name:$city}),(a:Artist{name:$idd}) create (c)-[r:WORKS_IN]->(a) ";
		let params1 = { name: city };
		let params3 = { city: city, idd: id };
		let toAdd = false;
		const result = await session.run(cypher0, { city: city });
		if (result.records.length == 0)
			toAdd = true;
		if (toAdd)
			await session.run(cypher, params1);
		await session.run(cypher2, params3)
		session.close();
	});
	res.json('Kreirali ste profil');

}

usernameExists = async (username) => {
	query = "SELECT * FROM person WHERE  username = ? ";
	let result = await client.execute(query, [username]);
	if (result.rows.length > 0) {
		return true;
	}
	else {
		query = "select  * from makeupartist where username = ? ";
		result = await client.execute(query, [username]);
		if (result.rows.length > 0) {
			return true;
		}
		else {
			return false;
		}

	}
}

app.get("/getUsernames/:first_letter", (req, res) => {

	let params;
	let query;
	params = [req.params.first_letter]
	query = "SELECT username FROM artists WHERE username_first_letter = ?  ";

	client.execute(query, params, (err, result) => {

		let usernames = [];
		result.rows.forEach(row => usernames.push(row.username));

		res.json(usernames);//pretvara ga u json i ujednolo ga i salje
	});


});

app.get("/artistInfo/:id", async (req, res) => {

	let id = req.params.id;

	query = "SELECT * FROM makeupartist WHERE  username = ? ";
	let resu = await client.execute(query, [id]);
	console.log(resu);

	tosnd = {};
	tosnd["username"] = resu.rows[0].username;
	tosnd["email"] = resu.rows[0].email;
	tosnd["lastname"] = resu.rows[0].lastname;
	tosnd["name"] = resu.rows[0].name;
	tosnd["type"] = "Artist",
		tosnd["city"] = resu.rows[0].city;
	tosnd["description"] = resu.rows[0].description;
	tosnd["numofreviews"] = resu.rows[0].numofreviews;
	tosnd["stars"] = resu.rows[0].stars;
	tosnd["timeslot"] = resu.rows[0].timeslot;
	tosnd["price"] = resu.rows[0].price;

	res.json(tosnd);

});

app.post("/findArtist", async (req, res) => {
	let timeFrom = req.body.timeFrom;
	let timeTo = req.body.timeTo;
	console.log(timeFrom + " " + timeTo);
	var session = driver.session();
	var cypher = "match(c:City{name:$city})-[r:WORKS_IN]->(a:Artist)  where a.price>=" + parseInt(req.body.priceFrom) + " and a.price<" + parseInt(req.body.priceTo) + " return (a)";
	var params = { city: req.body.city };
	var result = await session.run(cypher, params);
	console.log(result)
	await session.close();
	let artists = [];
	let artistspirice = {}
	if (result.records.length == 0) {
		res.json("Nije pronadjen ni jedan sminker, pokusajte sa novim parametrima");
		return;
	}

	result.records.forEach((x) => {
		artists.push("'" + x._fields[0].properties.name + "'");
		artistspirice[x._fields[0].properties.name] = x._fields[0].properties.price;
		console.log(x._fields[0].properties.price);
	})
	let joinedArists = artists.join();
	query = "SELECT * FROM makeupartist where username in (" + joinedArists + ");";
	console.log(query)
	const resu = await client.execute(query);
	toReturn = [];
	if (resu.rows.length == 0) {
		res.json("Nije pronadjen ni jedan sminker, pokusajte sa novim parametrima");
		return;
	}
	resu.rows.forEach((x, i) => {
		let appointments = x.get("d" + req.body.date);
		if (appointments != undefined || appointments != null) {
			//console.log(appointments)
			Object.keys(appointments).forEach(key => {
				if (key >= timeFrom && key <= timeTo && appointments[key] == 'false') {
					toReturn.push({
						username: resu.rows[i].get('username'),
						numofReviews: resu.rows[i].get('numofreviews'),
						stars: resu.rows[i].get('stars'),
						timeslot: resu.rows[i].get('timeslot'),
						timeStarts: key,
						price: artistspirice[resu.rows[i].get('username')],
					})
				}
			})
		}
	})


	res.json(toReturn);
})

app.get("/getArtist/:id", async (req, res) => {


	let tosnd = false;
	let id = req.params.id;

	query = "SELECT * FROM makeupartist WHERE  username = ? ";
	let resu = await client.execute(query, [id]);

	if (resu.rows.length > 0) {

		tosnd = {};
		tosnd["username"] = resu.rows[0].username;
		tosnd["email"] = resu.rows[0].email;
		tosnd["lastname"] = resu.rows[0].lastname;
		tosnd["name"] = resu.rows[0].name;
		tosnd["type"] = "Artist",
			tosnd["city"] = resu.rows[0].city;
		console.log(resu.rows[0].city)
		tosnd["description"] = resu.rows[0].description;
		tosnd["numofreviews"] = resu.rows[0].numofreviews;
		tosnd["stars"] = resu.rows[0].stars;
		tosnd["timeslot"] = resu.rows[0].timeslot;
		tosnd["price"] = resu.rows[0].price;

		res.json(tosnd);
	}


});

app.get("/artistInfo/:id", async (req, res) => {

	let id = req.params.id;

	query = "SELECT * FROM makeupartist WHERE  username = ? ";
	let resu = await client.execute(query, [id]);
	console.log(resu);

	tosnd = {};
	tosnd["username"] = resu.rows[0].username;
	tosnd["email"] = resu.rows[0].email;
	tosnd["lastname"] = resu.rows[0].lastname;
	tosnd["name"] = resu.rows[0].name;
	tosnd["type"] = "Artist",
		tosnd["city"] = resu.rows[0].city;
	tosnd["description"] = resu.rows[0].description;
	tosnd["numofreviews"] = resu.rows[0].numofreviews;
	tosnd["stars"] = resu.rows[0].stars;
	tosnd["timeslot"] = resu.rows[0].timeslot;
	tosnd["price"] = resu.rows[0].price;

	res.json(tosnd);

});


