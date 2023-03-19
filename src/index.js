const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('Register', userSchema);

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if(!name)return res.status(404).send({status:false,msg:"Write Name"})
  if(!email)return res.status(404).send({status:false,msg:"Write Email"})
  if(!password)return res.status(404).send({status:false,msg:"Write Password"})

 
  const user = new User({ name, email, password });
  user.save()
    .then(() => {
      res.status(200).send('User registered successfully');
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
