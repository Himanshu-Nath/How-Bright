var Schema = mongoose.Schema;

var QuizSchema = new Schema({
    question: {type: String, required: true},
    options: {
        o1: {type: String, required: true}, 
        o2: {type: String, required: true}, 
        o3: {type: String}, 
        o4: {type: String}},
    answer: {type: String, required: true},
    marks: {type: String, required: true},
    hint: String,
    category: String,
    course: String,
    sort: Number
}, {collection: 'quizs'});
mongoose.model('quizCollection', QuizSchema);