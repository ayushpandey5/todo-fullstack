import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export function Todos({ todos, fetchTodos }) {
  return (
    <>
      {todos.map((todo, index) => {
        return (
          <div key={index} id={index}>
            <Label>{todo.title}</Label>
            <p> {todo.description}</p>
            <Button onClick={() => {
              fetch('http://localhost:3000/completed', {
                method: "PUT",
                body: JSON.stringify({
                  id: todo._id,
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(async (res) => {
                await res.json();
                fetchTodos()
              });
            }}>
              {todo.isComplete ? "Completed" : "Mark as Complete"}
            </Button>
            <Button variant="destructive" onClick={() => {
              fetch('http://localhost:3000/todo', {
                method: "DELETE",
                body: JSON.stringify({
                  id: todo._id,
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(async (res) => {
                await res.json();
                fetchTodos()
              });
            }}>Delete</Button>
          </div>
        );
      })}
    </>
  );
}
