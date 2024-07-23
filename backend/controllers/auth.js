const Sellers = require('../models/sellers');
const bcrypt = require('bcryptjs');
const Clients = require('../models/Clients')

const signupSeller = async (req, res) => {
    const { email, password, name, city } = req.body;

    try {

        let sellerCreated = await Sellers.create({ name, email, password, city });
        const token = await sellerCreated.generateToken();
        return res.status(200).json({
            message: 'Account created successfully.',
            token,
            user: { email, name, city }
        });

    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({ message: 'Internal Server Error' }); // Return added
    }
}

const signupClient = async (req, res) => {
    const { email, password, name } = req.body;

    try {

        let clientCreated = await Clients.create({ name, email, password });

        const token = await clientCreated.generateToken();

        return res.status(200).json({
            msg: 'Account created successfully.',
            token
        });

    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Return added
    }
}

const loginSeller = async (req, res) => {
    const { email, password } = req.body;

    try {
        const sellerExist = await Sellers.findOne({ email });

        if (!sellerExist) {
            return res.status(500).json({ message: 'Invalid Credentials' })
        }

        // If user exists, check the password
        const isPasswordValid = await sellerExist.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" })
        }

        const { name, city } = sellerExist;

        res.status(200).json({
            message: "Login successfull",
            token: await sellerExist.generateToken(),
            user: { email, name, city }
        })

    } catch (error) {
        console.log('Error in login controller: ', error);
        return res.status(500).json({ message: 'Server Internal Error' });
    }

}

const loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const clientExist = await Clients.findOne({ email });

        if (!clientExist) {
            return res.status(500).json({ message: 'Invalid Credentials' })
        }

        // If user exists, check the password
        const isPasswordValid = await clientExist.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" })
        }

        res.status(200).json({
            message: "Login successfull",
            token: await clientExist.generateToken()
        })

    } catch (error) {
        console.log('Error in login controller: ', error);
        return res.status(500).json({ error: 'Server Internal Error' });
    }

}

const updateSellerPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const seller = await Sellers.findOne({ email });

        // Compare the plaintext new password with the hashed password stored in the database
        const passValid = bcrypt.compareSync(password, seller.password);

        if (passValid) {
            return res.status(409).json({ message: "New password is same as your current password." });
        }

        const hash_password = bcrypt.hashSync(password, Math.floor(Math.random() * 10));
        const result = await Sellers.updateOne({ email }, { password: hash_password });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Password updated successfully." });
        } else {
            return res.status(500).json({ message: "Error updating password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error updating password." });
    }
};

const updateClientPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const client = await Clients.findOne({ email });

        // Compare the plaintext new password with the hashed password stored in the database
        const passValid = bcrypt.compareSync(password, client.password);

        if (passValid) {
            return res.status(409).json({ message: "New password is same as your current password." });
        }

        const hash_password = bcrypt.hashSync(password, Math.floor(Math.random() * 10));
        const result = await Clients.updateOne({ email }, { password: hash_password });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Password updated successfully." });
        } else {
            return res.status(500).json({ message: "Error updating password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error updating password." });
    }
};

const autoLogin = async (req, res) => {
    const { isSeller } = req.body;
    const userId = req.user.id; // Assuming parseToken middleware sets req.user.id

    try {
        let user;
        if (isSeller) {
            user = await Sellers.findById(userId).select('-password'); // Exclude password
        } else {
            user = await Clients.findById(userId).select('-password'); // Exclude password
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { email, name, city } = user;
        res.status(200).json({
            message: 'Auto login successfull',
            user: { email, name, city }
        });

    } catch (error) {
        console.error('Error in auto login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    signupClient,
    signupSeller,
    loginClient,
    loginSeller,
    updateClientPassword,
    updateSellerPassword,
    autoLogin
};
