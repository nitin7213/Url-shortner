const { nanoid } = require('nanoid');
const urlModel = require('../model/url');

//Post Req
const handlePostReq = async (req, res) => {
  const shortURL = nanoid(8);
  if (!req.body.url) return res.status(400).json({ err: 'Url is Required!' });

  await urlModel.create({
    shortId: shortURL,
    redirectURL: req.body.url,
    visHistory: [],
  });

  return res.status(201).json({ status: 'Success', id: shortURL });
};

//Get Req
const handleGetReq = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ err: 'Id is Required!' });

  const urlDoc = await urlModel.findOneAndUpdate(
    { shortId: id },
    { $push: { visHistory: { timestamps: Date.now() } } },
    { new: true } //updated one
  );

  if (!urlDoc) {
    return res.status(404).json({ err: 'URL not found' });
  }

  // Redirect to the original URL
  return res.redirect(urlDoc.redirectURL);
};

//Get Analytics
const handleAnalytics = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ err: 'Id is Required!' });

  const info = await urlModel.findOne({ shortId: id });

  return res.status(200).json({ Analytics: info.visHistory });
};

//Handle Delete
const handleDelete = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ err: 'Id is Required!' });

  try {
    const deletedDoc = await urlModel.findOneAndDelete({ shortId: id });

    if (!deletedDoc) {
      return res.status(404).json({ err: 'URL not found' });
    }

    return res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.error('Error deleting URL:', error);
    return res.status(500).json({ err: 'Internal Server Error' });
  }
};

module.exports = {
  handlePostReq,
  handleGetReq,
  handleAnalytics,
  handleDelete,
};
