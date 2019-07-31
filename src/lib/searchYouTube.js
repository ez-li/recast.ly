// import YOUTUBE_API_KEY from './../config/youtube.js';
import App from './../components/App.js';

var searchYouTube = (options, callback) => {
  // send a GET request to youtube
  // invoke a callback with videos array that is returned from youtube
  // options {query, max, key}
  // only get embeddable videos
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: { order: '-createdAt' },
    data: $.extend({
      key: options.key,
      q: options.query,
      part: 'snippet'
    }, {
      maxResults: options.max,
      pageToken: $('#pageToken').val()
    }),
    // contentType: 'application/json',
    success: function(data) { callback(data); },
    error: function(error) { console.log('failed to search youtube', error); }
  })
};

export default searchYouTube;
