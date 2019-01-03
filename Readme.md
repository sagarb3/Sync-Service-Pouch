###########################################MONGO_POUCH_INDEXEDDB_SYNC##############

##Modules Used :
1. PouchDb
2. express-pouchdb
3. socket-pouch library
4. mongodb
5. node-crontab

How to Use the project

##Pouch-Server

1. DBNAME : mongodb name
2. HOSTURL in Pouch-server
3. Place collections of json in a folder called masters or any folder mentioned in syncCollection service to sync the collections if present in jsonFormat
4. mention the array of collections to be used

After running npm i inside Pouch-Server
->hit rest-api 
Create mongocollection and task_db
http://localhost:3000/createMongoTbl
->then hit the seed api
http://localhost:3000/seed

after that the task_dbs control the manner in which you want to keep the mongodb instance and pouchdb instance in sync
i.e client db and server db

in the task_dbs collection in your mongodb instance
their are three values with each collections tableName
1. "seed" : true/false,
2. "periodic" : true/false,
3. "enableSync" : true/false

if seed : true then the after hitting

http://localhost:3000/seed this api the collection will get seeded
intialially for all document it is true

whenever collection value is updated , update enableSync : true ( if you want to sync for this time only)

remember to use this functionality you need to hit the route
http://localhost:3000/enableAuto (one time only after start , restart of server)

then a cron will be executed after a time interval and if any enableSync : true is find it will sync mongo and pouch

if periodic is true then the mongo - pouch sync will be continous ( please don't use this for large collections as it will create extreme server overhead)

##Socket-Server

After Pouch-server settings enable 
the socket-server

run npm i and npm start to enable the socket server


##Client

1. inside the lib/sync.js provide the collection sync arr and the remote url of the socket server
2.run npm start to deploy the client http-server 

(Please install http-server modules globally beforehand)