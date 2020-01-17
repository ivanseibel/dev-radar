const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');


module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const techsArray = parseStringAsArray(techs.toLowerCase());

      const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);

      let { name, avatar_url, bio, login } = apiRes.data;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        name: (!name) ? login : name,
        github_username,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filter only connections until 10km distance and where the 
      // new dev has one of the technologies at least.
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find();

    res.json(devs);
  },

  async update(req, res) {
    const {
      name,
      github_username,
      avatar_url,
      bio,
      latitude,
      longitude,
      techs
    } = req.body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const techsArray = parseStringAsArray(techs.toLowerCase());

    const query = { github_username };
    const dev = await Dev.findOneAndUpdate(query,
      {
        name,
        avatar_url,
        bio,
        location,
        techs: techsArray
      },
      { new: true }
    );

    return res.json(dev);
  },

  async destroy(req, res) {
    const { github_username } = req.params;

    const query = { github_username };
    result = await Dev.findOneAndDelete(query);
    return res.json(result);
  },

}