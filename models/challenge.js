import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['PUBLISHED', 'DRAFT'],
        default: 'DRAFT'
    },
    flyer: {
        type: String
    },
    prizes: {
        type: [{
            position: {
                type: Number,
                required: true
            },
            reward: {
                type: String,
                required: true
            },
            remark: {
                type: String
            },
        }]
    },
    instructions: {
        type: [String]
    },
    sponsors: {
        type: [{
            image: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }]
    },
    slug: {
        type: String
    }
}, {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});

challengeSchema.pre('save', async function (next) {
    this.slug = slugify(this.title, {lower: true, replacement: '-'});
    await this.save();
    next();
})

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;