import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: function (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    occupation: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    logins: {
        type: [{
            token: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                default: Date.now()
            }
        }]
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'DELETED', 'UNVERIFIED'],
        default: 'UNVERIFIED'
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: function (value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Invalid phone');
            }
        }

    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.generateToken = async () => {
    console.log(this);
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET, {expiresIn: '30d'});
    console.log(token);
    this.logins = this.logins.concat({token});
    await this.save();
    return token;
}

const User = mongoose.model('User', userSchema);

export default User;