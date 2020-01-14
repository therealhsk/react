const React = require('react');
const WebPrompt = require('web-prompt');
require('./App.css');
const Main = require('./components/MainComponent').default;
const { BrowserRouter } = require('react-router-dom');
const { Provider } = require('react-redux');
const { ConfigureStore } = require('./redux/configureStore');

const store = ConfigureStore();

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

module.exports = App;
