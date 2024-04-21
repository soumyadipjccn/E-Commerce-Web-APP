
// This code imports the necessary modules: bcrypt for password hashing and comparison, userModel for interacting with user data in the database, and jsonwebtoken for creating and verifying JSON Web Tokens (JWT).

const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');


// This line defines an asynchronous function named userSignInController, which handles the user sign-in process. It takes two parameters: req (the request object) and res (the response object).
async function userSignInController(req,res){

    // This line starts a try block where the main logic of the function is executed. It allows for catching and handling errors that may occur during execution.
    try{


        // This line extracts email and password from the request body, which presumably contains user input data.
        const { email , password} = req.body


         //These blocks check if the required fields (email and password) are provided in the request body. If any of them are missing, it throws an error indicating that the required fields are not provided.


        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
             throw new Error("Please provide password")
        }


       // This line queries the user database model (userModel) to find a user with the specified email address.

        const user = await userModel.findOne({email})


    //  This block checks if a user with the provided email exists in the database. If no user is found, it throws an error indicating that the user was not found.
       if(!user){
            throw new Error("User not found")
       }


       // This line compares the provided password with the hashed password stored in the user document retrieved from the database. It uses bcrypt.compare() method to compare the passwords securely.

       const checkPassword = await bcrypt.compare(password,user.password)

       console.log("checkPassoword",checkPassword)



       // If the passwords match, this block creates a JWT (JSON Web Token) using the jsonwebtoken module. It includes the user's _id and email in the token's payload and signs it using a secret key (TOKEN_SECRET_KEY) fetched from environment variables. The token is set to expire after 8 hours (expiresIn: 60 * 60 * 8).

       if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

        const tokenOption = {
            httpOnly : true,
            secure : true
        }


        // This block sets the generated token as an HTTP-only secure cookie named "token". The cookie is sent in the response to the client along with a success message and the token itself.

        res.cookie("token",token,tokenOption).status(200).json({
            message : "Login successfully",
            data : token,
            success : true,
            error : false
        })

       }else{
         throw new Error("Please check Password")
       }






    //  This block catches any errors that occur during the execution of the try block. It sends an error response with details of the error encountered.
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }

}

// This line exports the userSignInController function, making it available for use in other modules.

module.exports = userSignInController



// In summary, this function handles the user sign-in process by verifying the provided credentials, generating a JWT if the credentials are valid, and sending the JWT as an HTTP-only secure cookie in the response. If any errors occur during the process, appropriate error responses are sent back to the client.