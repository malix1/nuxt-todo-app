import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { TodoType } from "./modules/Todo";
import { StatusType } from "./modules/Status";


@Module({
    name: "todo",
    stateFactory: true,
    namespaced: true
})
export default class Todo extends VuexModule {
    todos: TodoType[] = [{ id: 1, completed: false, title: "Write task", username: "" }]
    status: StatusType = { message: "", code: "" }

    get getTodos(): TodoType[] {
        return this.todos;
    }

    get biggestId(): number {
        return Math.max.apply(Math, this.todos.map(todo => todo.id)) | 0
    }

    get remaining(): number {
        return this.todos.filter(todo => todo.completed === false).length;
    }

    get anyRemaining(): boolean {
        return this.remaining > 0
    }

    @Action
    addTodo(title: string) {
        const id = this.biggestId;
        console.log(id)
        const newTodo: TodoType = {
            id: id + 1,
            title, completed: false, username: ""
        }
        const response: StatusType = { code: "200", message: "Todo added" }
        this.context.commit("pushTodoToState", newTodo)
        this.context.commit("updateStatus", response)
    }

    @Action
    removeTodo(id: number) {
        const updatedTodos = this.todos.filter(todo => todo.id !== id);
        this.context.commit("updateTodos", updatedTodos)
    }

    @Action
    changeTodoStatus(updatedTodo: TodoType) {
        const updatedTodos = this.todos.map(todo => todo.id === updatedTodo.id ? { ...todo, completed: !todo.completed } : todo)
        this.context.commit("updateTodos", updatedTodos);
    }

    @Action
    changeAllTodosStatus(completed: boolean) {
        const updatedTodos = this.todos.map(todo => {
            return { ...todo, completed }
        })
        this.context.commit("updateTodos", updatedTodos)
    }

    @Action
    clearCompleted() {
        const updatedTodos = this.todos.filter(todo => todo.completed === false)
        this.context.commit("updateTodos", updatedTodos)
    }

    @Mutation
    pushTodoToState(todo: TodoType) {
        this.todos.push(todo);
    }

    @Mutation
    updateTodos(todos: TodoType[]) {
        this.todos = todos;
    }

    @Mutation
    updateStatus(response: StatusType) {
        this.status = response
    }


}