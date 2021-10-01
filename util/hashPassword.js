const bcrypt =require('bcryptjs')

exports.hashPassword = (password) => {
    if (password.length < 8) {
        throw new Error('Password must be 8 characters or longer.')
    }

    return bcrypt.hash(password, 10)
}
exports.matchPassword = (password,hashedpassword)=>{
return bcrypt.compare(password,hashedpassword)
}