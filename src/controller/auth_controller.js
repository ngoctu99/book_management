import models from '../models/index.js';
import errorHelper from '../helpers/error_helper.js';

const User = models['User'];

const postRegister = async (req, res, next) => {
    console.log("1");
    const props = req.body.user;
    console.log("2");
    try{

        console.log("3");
        console.log("check props: ", props);
        console.log("Usermodel: ", User);
        let user = await User.findOne({ email: props.email });
        
        console.log("4");
        if(user) {
            return next(errorHelper.createError({
                status: errorHelper.CONFLICT,
                message: 'Username already exist'
            }))
        }
        console.log("5");
        user = await User.createUser(props);
        console.log("6");
        res.json({
            ok: true,
            message: 'Registration successful',
            user
        });
    }catch(err){
        next(err);
    }
}


const postLogin = async (req, res, next) => {
    console.log("7");
    const { email, password } = req.body;

    if(!email || !password){
        return next(errorHelper.createError({
            status: errorHelper.BAD_REQUEST,
            message: 'Login infos is required'
        }));
    }

    try {
        console.log(`need to verify: ${email} ${password}`);
        console.log("8");
        console.log("check User Model by login: ", User);
        const user = await User.verifyUser(email.trim(), password);
        console.log(user);
        if(!user) {
            return next(errorHelper.createError({
                status: errorHelper.NOT_FOUND,
                message: 'User not found'
            }));
        }
        
        return res.json({
            ok: true,
            message: 'Login successful',
            token: user.token
        });
    } catch (error) {
        return next(errorHelper.createError({
            status: errorHelper.UNAUTHORIZED,
            message: error
        }));
    }
}

export default {
    postLogin,
    postRegister
}