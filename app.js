const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose')
app.use(express.json())

app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))
app.use(require('./routes/profile.routes'))
app.get('/', (req, res) => {
res.json('Hello World!')
})
mongoose.connect('mongodb://localhost:27017/PlatformProjectAPI', {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(port, () => console.log(`Example app listening on port port!`))