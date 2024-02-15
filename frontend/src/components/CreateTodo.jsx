import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function CreateTodo({fetchTodos}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("") 

  return (
    <div style={{ width: "200px", height: "200px", margin: "30px" }}>
      <Label>Title</Label>
      <Input type="text" placeholder="e.g. Buy Grocereis" onChange={(e) => {
        setTitle(e.target.value)
      }}/>
      <Label>Description</Label>
      <Textarea placeholder="e.g. Chips, Drinks, etc" onChange={(e) => {
        setDescription(e.target.value)
      }}/>
      <Button style={{ width: "100%", marginTop: "10px" }} onClick={() => {
          fetch('http://localhost:3000/todo', {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
              isComplete: false
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(async (res) => {
            await res.json();
            fetchTodos();
          });
      }}>Save</Button>
    </div>
  );
}
