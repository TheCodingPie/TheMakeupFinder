const express = require("express");
const app = express();
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept,Authorization"
	);
	next();
});
app.use(express.json({ limit: '1mb' }));
app.listen(1234, () => {
	console.log("Server is listening on port: 1234");
});
//-------------------------------------------------POVEZIVANJE NA CASSANDRU----------------------------------------------------------------------------------------
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'makeupfinder', localDataCenter: 'datacenter1' });
var assert = require('assert')
client.connect(function (err) {
	assert.ifError(err);
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------POVEZIVANJE NA NEO4J--------------------------------------------------------------------------------------------
const neo4j = require('neo4j-driver')
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "sifra"));  //prvo je neo4j pa onda se stavlja password
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

const bcrypt = require('bcrypt');

app.get("/login/:id/:password", async (req, res) => {
	let tosnd = false;
	let id = req.params.id;
	let password = req.params.password;
	query = "SELECT * FROM person WHERE  username = ? ";

	client.execute(query, [id], async  (err, result) =>{
		if (result.rows.length > 0) 
		{
			if (bcrypt.compareSync(password, result.rows[0].password)) 
			{
				tosnd = {};
				tosnd["username"] = result.rows[0].username;
				tosnd["email"] = result.rows[0].email;
				tosnd["lastname"] = result.rows[0].lastname;
				tosnd["name"] = result.rows[0].name;
				tosnd["type"] = "Client"
			}
			res.json(tosnd);
		}
		else 
		{
			loginArtist(res,id);	
		}
	});
});

loginArtist= async (res,id)=>
{
	query = "SELECT * FROM makeupartist WHERE  username = ? ";
	let resu = await client.execute(query, [id]);
	if (resu.rows.length > 0) 
	{
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
	}
	else 
	{
		tosnd = false;
	}
	res.json(tosnd);
}

app.get("/createClient/:id/:password/:name/:lastname/:email", async (req, res) => {
	let id = req.params.id;
	query = "select  * from makeupartist where username = ? ";
	let resA = await client.execute(query, [id]);
	if (resA.rows.length > 0) 
	{
		res.json('false');
	}
	else {
		query = "SELECT * FROM person WHERE  username = ? ";
		client.execute(query, [id],  (err, result) => {

			if (result.rows.length > 0) 
			{
				res.json('false');
			}
			else 
			{	
				let hashedPassword= bcrypt.hashSync(req.params.password, 5);
				query = "INSERT INTO person(username, email, lastname, name, password) VALUES (?, ?,? , ?,? );";
				client.execute(query, [id, req.params.email, req.params.lastname, req.params.name, hashedPassword],addClientToNeo4j(res,id));
			}
		});
	}
})

addClientToNeo4j = (res,id) => {
	const session = driver.session();
	const cypher = "create (c:Client{name:$name})";
	const params = { name: id };
	session.run(cypher, params)
			.then(() => 
			{
				session.close();
				res.json(true);
			});
}

app.post("/createArtist", async (req, res) => {
	if(await usernameExists(req.body.username))
	{
		res.json('false');
		return;
	}
	const id = req.body.username;
	const cities = req.body.cities;
	const price = req.body.price;
	const hashedPassword= bcrypt.hashSync(req.body.password, 5);
	query1 = "INSERT INTO makeupartist(username, email, lastname, name, password,numofreviews,stars,city,timeslot,price,alltogether) VALUES (?, ?,? , ?,?,0,0,? ," + req.body.timeslot + ", " + price + ",0);";
	query2 = "INSERT INTO artists (username, username_first_letter) values(  ?,?);";
	query3 = " insert into comments (artistusername,artistCommNum ) values(  ?,0);";
	const queries = [
		{ query: query1, params: [id, req.body.email, req.body.lastname, req.body.name, hashedPassword, req.body.cities]},
		{ query: query2, params: [id, id[0]] } ,
		{ query: query3, params:  [id] } 
	 ];
	client.batch(queries, { prepare: true })
			.then(()=> {
				addArtistToNeo4j(id,price,cities,res);
			})
			.catch((err) =>{
				console.log(err)
				res.json('error');
			});
});

addArtistToNeo4j = async(id,price,cities,res)=>{
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
	if (result.rows.length > 0) 
	{
		return true;
	}
	else 
	{
	query = "select  * from makeupartist where username = ? ";
	result = await client.execute(query, [username]);
	if (result.rows.length > 0) 
		{
			return true;
		}
		else
		{
			return false;
		}
	
	}
}


