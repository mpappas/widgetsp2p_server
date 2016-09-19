// Instantiate Couchbase and Ottoman
var couchbase=require('couchbase');
var ottoman=require('ottoman');

// Build my cluster object and open a new cluster
var myCluster = new couchbase.Cluster('localhost:8091');
var myBucket = myCluster.openBucket('widgetsp2p_server');
ottoman.bucket=myBucket;

// Build my "schema" from my model files
require('./model/user');

// Build the necessary indexes to function
ottoman.ensureIndices(function(){});