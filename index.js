require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 8000

app.get('/', (req, res)=>{
    res.send({name : "Harsh"})
})

app.listen(PORT, () => {
    console.log('Listening on port 8000');
})