import ModelHelper from "../helpers/model_helper.js";  
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

const { sign, verify } = jwt;

const name = 'User';
const tableName = 'users';

// password will not be included
const selectableProps = [
    'id',
    'email',
    'first_name',
    'last_name',
    'role',
    'created_at',
]

// bcrypt function used for hashing password

const SALT_ROUND = 10;
const hashPassword = password => bcrypt.hash(password, SALT_ROUND);

// verify password 
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);


const beforeSave = (user) => {
    if(!user.password) return Promise.resolve(user);

    return hashPassword(user.password)
        .then( hash => ({...user, password: hash}))
        .catch( err => `Error in hashing password ${err}`);
}


const userModel = (knex) => {
    const userHelper = ModelHelper({
        knex,
        name,
        tableName,
        selectableProps
    });
    

    const createUser = props => beforeSave(props)
        .then( user => userHelper.create(user));


    const verifyUser = async (email , password) => {
        const user = await knex.select()
            .from(tableName)
            .where({email});

        if(user.length > 0){
            const isMatch = await verifyPassword(password, user[0].password);

            if(isMatch) {
                delete user[0].password;

                const token = sign(user[0], config.JWT_SECRET, {
                    expiresIn: config.JWT_TTL
                });

                return {
                    ...user[0],
                    token
                }
            }
        }else {
            return null;
        }

        throw new Error('Password does not match!');
    }

    return {
        name,
        ...userHelper,
        createUser,
        verifyUser
    }
}

export default userModel;