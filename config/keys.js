
//Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const strConect = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.tgty3xr.mongodb.net/passport?retryWrites=true&w=majority`;

//dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

module.exports = {
    mongoURI: strConect
};