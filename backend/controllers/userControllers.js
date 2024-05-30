const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// async and await is used retrieve data from the server
const createUser = async (req, res) => {
    // Wrting steps to follow 

    // 1. Check incomming data 
    console.log(req.body);

    // 2. Destructure the incomming data
    const { firstName, lastName, email, password } = req.body;

    // 3. Valdiate the data (If empty, stop the process and send an error response)
    if (!firstName || !lastName || !email || !password) {
        // res.send("Please enter in all the fields");
        return res.json({
            "sucess": false,
            "message": "Please enter all the fields!!"
        });
    }

    // 4. Error handling (Try Catch)
    try {
        // 5. Check if the user is already registered
        const existingUser = await userModel.findOne({
            email: email
        });
        // 5.1. If user found: Send response user already exist
        // 5.1.1. Stop the process
        if (existingUser) {
            // return is used to end the process
            return res.json({
                "success": false,
                "message": "User already exists!!!"
            })
        }


        // Hasing/Encryption of the password
        // Salt is the term used in hashing
        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, randomSalt);



        // 5.2. If user is new
        const newUser = new userModel({
            // Database Fields : Client's Value
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        })
        // 5.3. Save to the database
        await newUser.save();

        // 5.4. Send the response to the user
        res.json({
            "sucess": true,
            "message": "User created sucessfully"
        });

    } catch (error) {
        console.log(error);
        res.json({
            "success": "false",
            "message": "Internal serval error"
        })
    }
}


// Login Funciton
// async and await is used retrieve data from the server
const loginUser = async (req, res) => {
    // Wrting steps to follow 

    // 1. Check incomming data
    console.log(req.body);

    // 2. Destructure the incomming data
    const { email, password } = req.body;

    // 3. Valdiate the data (If empty, stop the process and send an error response)
    if (!email || !password) {
        // res.send("Please enter in all the fields");
        return res.json({
            "sucess": false,
            "message": "Please enter all the fields!!"
        });
    }

    // 4. Error handling (Try Catch)
    try {
        // Checking if the user exists or not on the basis of email
        const user = await userModel.findOne({
            email: email,
        })
        // found date from the database frstName, lastName, email, password


        // If user found
        // Compare the password

        const isValidPassword = await bcrypt.compare(password, user.password);


        // If password is correct


        // If password incorrect

        if (!isValidPassword) {
            return res.json({
                "success": false,
                "message": "Incorrect Password!!!"
            })
        }

        // token generation (JWT (Json Web Token)) - user data + secret key 
        const token = await jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        // respose (sucess, token, user data)
        res.json({
            "sucess": true,
            "message": "User logged in sucessfully",
            "token": token,
            "userData": user
        })


        // Incase of user not found
        if (!user) {
            return res.json({
                "success": false,
                "message": "User does not exist!"
            })
        }



    } catch (error) {
        console.log(error);
        res.json({
            "success": "false",
            "message": "Internal server error!"
        })

    }


}





// exporting
module.exports = {
    createUser,
    loginUser
}