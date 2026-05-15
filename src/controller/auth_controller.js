import userModel from '../models/user.js';
import errorHelper from '../helpers/error_helper.js';

const postRegister = async (req, res, next) => {

    const props = req.body.user;

    try{
        let user = await userModel.findOne({ email: props.email });

        if(user) {
            return next(errorHelper.createError({
                status: errorHelper.CONFLICT,
                message: 'Username already exist'
            }))
        }

        user = await userModel.create(props);
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

    const { email, password } = req.body;

    if(!email || !password){
        return next(errorHelper.createError({
            status: errorHelper.BAD_REQUEST,
            mesaage: 'Login infos is required'
        }));
    }

    try {
        const user = await userModel.verifyUser(email.trim(), password);
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