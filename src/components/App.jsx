import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import searchYouTube from './../lib/searchYouTube.js';
import YOUTUBE_API_KEY from './../config/youtube.js';

var test = {snippet: {
  title: 'test',
  description: 'description'
}};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      listOfVideos: exampleVideoData,
      currentVideoInPlayer: exampleVideoData[0], // this will be updated on click
      inputText: '',
      submit: false
    };
  }

  onClick(props) {
    // changes the currentVideoInPlayer
    this.setState({
      currentVideoInPlayer: props // set to props.video
    });
  }

  onChange() {
    // console.log($('.form-control').val());
    this.setState({
      inputText: $('.form-control').val()
    });
    // use the new inputText to search youtube
    // get new list of videos, an array
    // update this.state.listOfVideos with new list
    // update currentVideoInPlayer to be first in list
  }

  updateList(data) {
    this.setState({
      listOfVideos: data.items,
      currentVideoInPlayer: data.items[0]
    });
  }

  onSubmit() {
    // when the search submit button is clicked, we will search youtube with the input text
    // run ajax get function with the inputText
    // console.log('clicked')
    var options = {};
    options.query = this.state.inputText;
    options.max = 5;
    options.key = YOUTUBE_API_KEY;
    searchYouTube(options, (data) => {
      // call function on data
      // console.log('inside searchyoutube', data);
      this.updateList(data);

    });
    // var newList = searchYouTube(options, (data) => console.log(data));
    // console.log('onSubmit', newList);
    // console.log(searchYouTube(options))

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em><Search cbChange={this.onChange} cbSubmit={this.onSubmit}/></em></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5><em><VideoPlayer video={this.state.currentVideoInPlayer}/></em></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5><em><VideoList videos={this.state.listOfVideos} callback={this.onClick}/></em></h5></div>
          </div>
        </div>
      </div>
    );
  }
}


// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <div><h5><em><Search/></em> view goes here</h5></div>
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <div><h5><em><VideoPlayer video={exampleVideoData[0]}/></em></h5></div>
//       </div>
//       <div className="col-md-5">
//         <div><h5><em><VideoList videos={exampleVideoData}/></em></h5></div>
//       </div>
//     </div>
//   </div>
// );

// ReactDOM.render(<App />, document.getElementById("app"));
// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

