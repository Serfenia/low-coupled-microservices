import {Component,PropTypes} from 'react';
import {List, Divider, Subheader} from 'material-ui';

import AddTodoItem from './AddTodoItem';
import TodoItem from './TodoItem';

class TodoList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List>
                <Subheader>Todos</Subheader>
                <Divider/>
                {
                    this.props.todos.map((todo, index) => {
                        return [
                            <TodoItem
                                key={`${todo.content}.${index}`}
                                todo={todo}
                                index={index}
                                onDeleteTodo={this.props.onDeleteTodo}
                            />,
                            <Divider/>
                        ];
                    })
                }
                <AddTodoItem onCreateTodo={this.props.onCreateTodo} />
            </List>
        )
    }
}

TodoList.propTypes = {
    todos: PropTypes.array,
    onDeleteTodo: PropTypes.func.isRequired,
    onCreateTodo: PropTypes.func.isRequired
};
TodoList.defaultProps = {
    todos: []
};

export default TodoList;