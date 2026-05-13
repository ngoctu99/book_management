import ModelHelper from "../helpers/model_helper";  
import bcrypt from "bcrypt";

const name = 'User';
const tableName = 'users';

// password will not be included
const selectableProps = {
    'id',
    'email',
    'first_name',
    'last_name',
    'role',
    'created_at',
}

// bcrypt function used for hashing password

const SALT_ROUND = 10;
const hashPassword = password => bcrypt.hash(password, SALT_ROUND);

// verify password 
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);