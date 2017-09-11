import { Component, PropTypes } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchTodos, saveTodo, deleteTodo} from './../actions/todos';

import TodoFilters from './TodoFilters';
import TodoList from './TodoList';
import Notification from "./Notification";

const styles = {
    container: {
        backgroundColor: '#00000070',
        margin: 'auto',
        width: 768,
        height: 'auto',
        minHeight: 700,
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'flex-start'
    }
};

class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.props.searchTodos(this.state);
    }

    searchTodos() {
        this.props.searchTodos(this.state);
    }

    setSearchTimeout() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.searchTodos.bind(this), 500);
    }

    handleSearchChange(value) {
        this.setState({
            search: value
        }, this.setSearchTimeout);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style={styles.container}>
                    <TodoFilters
                        value={this.state.search}
                        onSearchChange={this.handleSearchChange.bind(this)}
                    />
                    <TodoList
                        todos={this.props.todos}
                        onSaveTodo={this.props.saveTodo}
                        onDeleteTodo={this.props.deleteTodo}
                    />
                    <Notification
                        notification={this.props.notification}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

TodoApp.propTypes = {
    todos: PropTypes.array.isRequired,
    searchTodos: PropTypes.func.isRequired,
    saveTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};
TodoApp.defaultProps = {
    todos: []
};
TodoApp.childContextTypes = {
    muiTheme: PropTypes.object
};

export default connect(({todos, notification}) => {
    return {
        todos,
        notification
    }
}, (dispatch) => {
    const actions = {searchTodos, saveTodo, deleteTodo};
    return bindActionCreators(actions, dispatch);
})(TodoApp);