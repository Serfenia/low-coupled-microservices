import React, { Component, PropTypes } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createTodo, deleteTodo} from './../actions/todos';

import TodoList from './TodoList';
import Notification from "./Notification";

const styles = {
    container: {
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

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style={styles.container}>
                    <TodoList
                        todos={this.props.todos}
                        onCreateTodo={this.props.createTodo}
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
    createTodo: PropTypes.func.isRequired,
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
    const actions = {createTodo, deleteTodo};
    return bindActionCreators(actions, dispatch);
})(TodoApp);