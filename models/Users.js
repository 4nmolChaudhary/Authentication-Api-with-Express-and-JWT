import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('User', userSchema)