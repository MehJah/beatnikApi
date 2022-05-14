const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
const signUpRoute = require('./Routes/signUp')
const loginRoute = require('./Routes/login')

//middleware 
app.use('/signUp', signUpRoute)
app.use('/login', loginRoute)

//will be authenticating the hits! by token match
// app.use('/', () => {
// })

//showing error
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
      error : {
          status : err.status || 500,
          message : err.message
      }
  });
});


app.get('/', (req, res) => {
  res.send('custom run')
})

app.listen(port, () => {
  console.log(`Testing ok at port - ${port}`)
})