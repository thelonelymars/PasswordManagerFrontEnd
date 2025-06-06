import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
   items:TodoListItem[] = [];

 
  async addItem(item: string) {
    let Item:TodoListItem={
      toDoListName:item,
      status:"Pending"
    }
    // Create a new object with PascalCase property names
     const response = await fetch("http://localhost:5109/AddItem", { method: "POST",body:JSON.stringify(Item), headers: { "Content-Type": "application/json" } });
    if (response.status === 200) {
      return response.json();
    }
    else {
      throw new Error("Could not save item!");
    }
  }

//test
  async SaveItem():Promise<any> {
    const response = await fetch("http://localhost:5109/todo", { method: "POST",headers: { "Content-Type": "application/json" } });
    if (response.status === 200) {
      return response.json();
    }
    else {
      throw new Error("Could not save item!");
    }
  }
async GetLists(): Promise<any> {
  try {
    // GET requests typically don't have a body - removed JSON.stringify(this.items)
    const response = await fetch("http://localhost:5109/GetAllTaskList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {  // Checks for any non-2xx status code
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();  // Actually parse the JSON
    this.items=data
    debugger
    return data;
    
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw new Error("Could not fetch lists!");  // Or re-throw the original error
  }
}
  async deleteItem(id:string) {
    //this.items=this.items.filter(item=>item.id!==id)

    // Create a new object with PascalCase property names
     const response = await fetch(`http://localhost:5109/Delete/${id.toString()}`, { method: "DELETE",headers: { "Content-Type": "application/json" } });
    if (response.status === 200) {

    }
    else {
      throw new Error("Could not save item!");
    }  
  }

  async editItem(id:string,NewTaskName:string) {
    const response=await fetch(`http://localhost:5109/EditTask/${id.toString()}/${NewTaskName.toString()}`,{method:"PATCH",headers: { "Content-Type": "application/json" } });
    if(response.status===200){

    }else{
      throw new Error("test failed")
    }
  }
  constructor() { }
}

interface $oid{
  oid:string
}
interface TodoListItem {
  toDoListName: string;
  status: string;
  _id?:$oid
}