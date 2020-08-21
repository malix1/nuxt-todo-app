<template>
  <div>
    <div class="container">
      <input
        type="text"
        class="todo-input"
        placeholder="What needs to be done"
        v-model="todoTitle"
        @keyup.enter="addTodo"
      />
      <transition-group
        name="fade"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <div class="todo-item" v-for="(todo) in todos" :key="todo.id">
          <div class="todo-item-left">
            <input type="checkbox" :checked="todo.completed" @change="changeStatus(todo)" />
            <div
              v-if="!todo.editing"
              @dblclick="editTodo(todo)"
              class="todo-item-label"
              :class="{ completed : todo.completed }"
            >{{ todo.title }}</div>
            <!--             <input
              v-else
              class="todo-item-edit"
              type="text"
              v-model="editedTitle"
              @blur="completeEdit(todo)"
              @keyup.enter="completeEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              v-focus
            />-->
          </div>
          <div class="remove-item" @click="removeTodo(todo.id)">&times;</div>
        </div>
      </transition-group>

      <div class="extra-container">
        <div>
          <label>
            <input type="checkbox" :checked="!anyRemaining" @change="changeAllTodosStatus" /> Check All
          </label>
        </div>
        <div>{{ remaining }} items left</div>
      </div>

      <div class="extra-container">
        <!--   <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
        <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
        </div>-->

        <div>
          <!--  <button @click="updateTodosStatus">Save Status</button> -->
          <transition name="fade">
            <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
          </transition>
        </div>
      </div>
    </div>
    <!--   <div>
      <Alert :alertStatus="showAlert" :status="status"></Alert>
    </div>-->
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TodoType } from "../../store/modules/Todo";
import { todoStore } from "~/store";

@Component({
  layout: "UserLayout"
})
export default class Todos extends Vue {
  todoTitle: string = "";

  get todos() {
    return todoStore.getTodos;
  }

  get remaining() {
    return todoStore.remaining;
  }

  get anyRemaining() {
    return todoStore.anyRemaining;
  }

  get showClearCompletedButton() {
    return this.remaining !== this.todos.length;
  }

  public addTodo(): void {
    todoStore.addTodo(this.todoTitle);
    this.todoTitle = "";
  }

  public removeTodo(id: number): void {
    todoStore.removeTodo(id);
  }

  public changeStatus(todo: TodoType): void {
    todoStore.changeTodoStatus(todo);
  }

  public changeAllTodosStatus(event: Event): void {}

  public clearCompleted(): void {
    todoStore.clearCompleted();
  }
}
</script>

<style lang="scss" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
.container {
  max-width: 60%;
  margin: 5% auto;
}

.alert {
  width: 35%;
  position: absolute;
  margin-left: 5%;
  bottom: 0;
  left: 5;
}

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  &:focus {
    outline: 0;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}
.todo-item-left {
  // later
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; //override defaults
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}
.active {
  background: lightgreen;
}
// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>