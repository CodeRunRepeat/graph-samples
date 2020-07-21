var express = require('express');
var router = express.Router();
var tokens = require('../tokens.js');
var graph = require('../graph.js');

/* GET users photo. */
router.get('/:userId(\\w+\\@?\\w*)',
  async function (req, res) {
    if (!req.isAuthenticated()) {
      // Redirect unauthenticated requests to home page
      res.redirect('/')
    } else {
      let params = {
        active: { users: true }
      };

      // Get the access token
      var accessToken;
      try {
        accessToken = await tokens.getAccessToken(req);
      } catch (err) {
        res.json(err);
      }

      let userId = 'me';
      if (req.params.userId) {
        userId = req.params.userId;
      }


      if (accessToken && accessToken.length > 0) {
        try {
          var result = await graph.getUserPhoto(accessToken, userId);

          res.json(result);
        } catch (err) {
          res.json(err);
        }
      }
      else {
        req.flash('error_msg', 'Could not get an access token');
      }
    }
  }
);

module.exports = router;
