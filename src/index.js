const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  post: String,
  comment: String,
});

const Posts = mongoose.model('Post', postSchema);

app.get('/Post', async (req, res) => {
  const posts = await Posts.find({});
  res.json(posts);
});

app.post('/Post', async (req, res) => {
  const { post, comment } = req.body;
  const posts = new Posts({ post, comment });
  await posts.save();
  res.json(posts);
});

app.put('/Post/:id', async (req, res) => {
  const { id } = req.params;
  const { post, comment } = req.body;
  await Posts.findByIdAndUpdate(id, { post, comment });
  const updatedName = await Posts.findById(id);
  res.json(updatedName);
});

app.delete('/Post/:id', async (req, res) => {
  const { id } = req.params;
  await Posts.findByIdAndDelete(id);
  res.json({ message: 'Post deleted' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});