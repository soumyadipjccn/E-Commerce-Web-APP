
// This line imports the Mongoose library, which is used for interacting with MongoDB databases in Node.js applications.
const mongoose = require('mongoose')


// This block defines a schema for the user collection in the MongoDB database. The schema specifies the structure of documents that will be stored in the collection.
// The schema includes fields like name, email, password, profilePic, and role, each with its own data type and optional validation rules
// The timestamps: true option automatically adds createdAt and updatedAt fields to documents in the collection, with their values set to the current timestamp when a document is created or updated.

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,
},{
    timestamps : true
})

// This line creates a Mongoose model named userModel based on the userSchema defined earlier. A Mongoose model provides an interface for querying and manipulating documents in a MongoDB collection.
const userModel =  mongoose.model("user",userSchema)


// This line exports the userModel so that it can be imported and used in other modules. By exporting the model, other parts of the application can interact with the user collection in the MongoDB database using methods provided by Mongoose.
module.exports = userModel


//In summary, this code defines a Mongoose schema for the user collection, specifying the structure of user documents and any validation rules. It then creates a Mongoose model based on this schema, providing an interface for interacting with user documents in the database. Finally, it exports the model for use in other parts of the application.