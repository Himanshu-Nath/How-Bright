var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type : String, required : true },
    email:  { type : String, unique : true, required : true },
    username: { type : String, unique : true, required : true },
    password: { type : String, required : true },
    gender: String,
    dob: Date,
    mobile: Number,
    role: { type : String, default: "USER"},
    status: { type : Boolean, default: false },
    image: {id: String, filename: String, bucket: String},
    lastLogin: Date,
    exams:[],
    token: String,
    tempKey: String,
    question: {q1: String, a1: String},
    ct: {type: Date, default: Date.now},
    mt: {type: Date, default: Date.now}
}, {collection: 'users'});
mongoose.model('userCollection', UserSchema);