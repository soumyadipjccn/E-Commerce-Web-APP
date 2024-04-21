
// This code imports the necessary modules: userModel for interacting with the user database model and bcrypt for hashing passwords.

const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

// This line defines an asynchronous function named userSignUpController, which handles the sign-up process for users.
async function userSignUpController(req,res){
    
    try{

        // This line extracts email, password, and name from the request body, which presumably contains user input data.
        const { email, password, name} = req.body


        // This line queries the user database model (userModel) to find a user with the specified email address.

        const user = await userModel.findOne({email})

        console.log("user",user)


        // This block checks if a user with the provided email already exists in the database. If a user is found, it throws an error indicating that the user already exists.

        if(user){
            throw new Error("Already user exits.")
        }

        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }
       
        // These lines generate a salt using bcrypt with a cost factor of 10 and then hash the user's password using the generated salt.
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }
        
        // This line creates a payload object containing user data extracted from the request body, along with additional data such as the user's role (set to "GENERAL") and the hashed password.
        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }
       
        // These lines create a new instance of the userModel with the payload data and save it to the database. The save method returns the saved user data.
        const userData = new userModel(payload)
        const saveUser = await userData.save()



        // This block sends a success response with status code 201 (Created), along with the saved user data and a success message.

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })

    //  This block catches any errors that occur during the execution of the try block. It sends an error response with details of the error encountered.
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

// This line exports the userSignUpController function, making it available for use in other modules.

module.exports = userSignUpController


// In summary, the userSignUpController function handles the sign-up process for users by validating input data, checking for existing users, hashing passwords, saving user data to the database, and sending appropriate responses based on the outcome of the sign-up process.