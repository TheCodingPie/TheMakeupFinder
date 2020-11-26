const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'makeupfinder', localDataCenter: 'datacenter1' });
var assert = require('assert')
client.connect(err => assert.ifError(err));

const neo4j = require('neo4j-driver')
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "sifra"));


exports.cassandraClient = client;
exports.neo4jDriver = driver;