import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  items = [{ toDoListName: 'laundry', status: 'pending', id: 1 }];

  getItems() {
    return this.items;
  }
  addItem(item: string) {
    // Create a new object with PascalCase property names
    let toDoObject = { toDoListName: item, status: 'pending', id: Math.floor(Math.random() * 1000) + 1 };

    // Add the new item to the list
    this.items.push(toDoObject);
  }


  async SaveItem():Promise<any> {
    const response = await fetch("http://localhost:5109/todo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(this.items) });
    if (response.status === 200) {
      return response.json();
    }
    else {
      throw new Error("Could not save item!");
    }
  }

  deleteItem(id:number) {
    this.items=this.items.filter(item=>item.id!==id)

  }

  editItem(item: { ToDoListName: string; Status: string }) {

  }
  constructor() { }
}
