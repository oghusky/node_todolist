const input = document.querySelector("input");

// function to get length of todolist
function getTodoListLength() {
  $.ajax({
    url: "/api/todos",
    method: "GET"
  }).then(res => {
    document.querySelector("#todo-length").value = res.todos.length + 1;
    res.todos.map(todo => {
      const todoItem = document.createElement("div");
      todoItem.innerHTML = `
        ${todo.text}
      `;
      document.querySelector("#todos").append(todoItem);
    })
  });
}
getTodoListLength()