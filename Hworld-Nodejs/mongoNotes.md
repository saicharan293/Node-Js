        SQL:                :Mongo
       ------               -------

       Table        ===>   Collection = array of documents

       Record/Row   ===>   Document   = array of fields

       Column names ===>   Field names


=> show databases : to display all the databases
=> use --database-name : to use particular database (or) create that --database-name then use it

Note: empty databases aren't visible unless they contain atleast one collection (table) 

=> show collections : display collection (table/s) if present
=> --database-name.createCollection('--collection-name') : creates (--collection-name / table) collection inside --database-name 

=> db-name.collection-name.insertOne({id:1,username:'ChatBot',age:25}) : to insert one document (row) in the collection-name of db-name

=> db.users.find() : display all documents (records) present in users collection (table) in db (database)

=> db.users.find({age: {$gt: 24}}) : for greater than

=> db.users.find({age: {$lt: 24}}) : for less than

=> db.users.updateOne({username:'ChatBot'},{$set: {username
username:'Chat bot'}}) : to change username from 'ChatBot' to 'Chat bot'

