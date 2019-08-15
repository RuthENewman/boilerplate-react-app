'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DoubtDebuggerApp = function (_React$Component) {
  _inherits(DoubtDebuggerApp, _React$Component);

  function DoubtDebuggerApp(props) {
    _classCallCheck(this, DoubtDebuggerApp);

    var _this = _possibleConstructorReturn(this, (DoubtDebuggerApp.__proto__ || Object.getPrototypeOf(DoubtDebuggerApp)).call(this, props));

    _this.reset = _this.reset.bind(_this);
    _this.handleChoice = _this.handleChoice.bind(_this);
    _this.addOption = _this.addOption.bind(_this);
    _this.deleteOption = _this.deleteOption.bind(_this);

    _this.state = {
      options: []
    };

    return _this;
  }

  _createClass(DoubtDebuggerApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);
        if (options) {
          this.setState(function () {
            return { options: options };
          });
        }
      } catch (error) {}
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
        console.log('saving data');
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('Component Will Unmount');
    }
  }, {
    key: 'handleChoice',
    value: function handleChoice() {
      var randomNumber = Math.floor(Math.random() * this.state.options.length);
      var choice = this.state.options[randomNumber];
      alert(choice);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'deleteOption',
    value: function deleteOption(option) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (prevOption) {
            return prevOption !== option;
          })
        };
      });
    }
  }, {
    key: 'addOption',
    value: function addOption(option) {
      if (!option) {
        return 'Please enter a valid value to add a new option';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'Please provide a unique value to add another option';
      }

      this.setState(function (prevState) {
        return {
          options: prevState.options.concat([option])
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {

      var subtitle = 'Make decisions quickly!';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: subtitle }),
        React.createElement(Action, { hasOptions: this.state.options.length > 0,
          handleChoice: this.handleChoice
        }),
        React.createElement(Options, {
          options: this.state.options,
          reset: this.reset,
          deleteOption: this.deleteOption
        }),
        React.createElement(AddOption, {
          addOption: this.addOption
        })
      );
    }
  }]);

  return DoubtDebuggerApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      'h3',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: 'Doubt Debugger'
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.handleChoice,
        disabled: !props.hasOptions
      },
      'Debug your doubt!'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.reset },
      'Remove all options'
    ),
    props.options.length === 0 && React.createElement(
      'p',
      null,
      'Start adding options to choose from in order to start debugging your doubt'
    ),
    props.options.map(function (option) {
      return React.createElement(Option, {
        key: option,
        option: option,
        deleteOption: props.deleteOption
      });
    })
  );
};

var Option = function Option(props) {
  return React.createElement(
    'div',
    null,
    props.option,
    React.createElement(
      'button',
      {
        onClick: function onClick(event) {
          props.deleteOption(props.option);
        }
      },
      'X'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);

    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var option = event.target.elements.option.value.trim();
      var error = this.props.addOption(option);

      this.setState(function () {
        return { error: error };
      });

      if (!error) {
        event.target.elements.option.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          React.createElement('input', { type: 'text', name: 'option' }),
          React.createElement(
            'button',
            { type: 'submit' },
            'Add an option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(DoubtDebuggerApp, null), document.getElementById('app'));
