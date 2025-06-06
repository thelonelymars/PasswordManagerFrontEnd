import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIcon} from '@angular/material/icon';
import {response} from 'express';
import { TodoService } from './todo.service';
import { MessageBoxComponent } from '../Fragments/message-box/message-box.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'node:console';

interface $oid{
  oid:string
}
interface ToDoItem {
  toDoListName: string;
  status: string;
  _id:$oid
}

@Component({
  selector: 'app-root',
  imports: [ FormsModule, NgIf, NgForOf, MatSlideToggleModule, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 editingItemId: string | null = null;
saveItem() {
  this.toDoService.SaveItem().then(response => {
    this.openMessageBox("Success", response);
  }).catch(error => {
    this.openMessageBox("Error", error.message);
  });

}
  constructor(private toDoService:TodoService,private dialog:MatDialog){}
  toDoList = 'ToDoList';
  items:TodoListItem[] = [];
  ngOnInit() {
     this.toDoService.GetLists()
  this.toDoService.GetLists().then((data:TodoListItem[])=>{
      this.items=data
      debugger
    }).catch(error =>{
      console.log("Error")
    })

  }
  async addItem(item:string){
    try{
      await this.toDoService.addItem(item);
      const data=await this.toDoService.GetLists();
      this.items=data
    } catch(error){
      console.error("error:",error)
    }
  }
  async deleteItem(id: string) {
  try {
    await this.toDoService.deleteItem(id);
    const data = await this.toDoService.GetLists();
    this.items = data;
  } catch (error) {
    console.error('Delete failed:', error);
    // Consider showing user feedback
  }
}
 onEdit(itemId: string) {
    this.editingItemId = itemId;
  }

  async finishEditing(itemId: string,NewTaskName:string) {
    await this.toDoService.editItem(itemId,NewTaskName)
    const data=await this.toDoService.GetLists()
    this.items=data
    this.editingItemId = null;
  }
openMessageBox(title:string,message:string){ {
this.dialog.open(MessageBoxComponent, {
  data: { title, message }
})}}
  // Initial items array with PascalCase property names
  
  
}


export interface TodoListItem {
  _id: Id
  name: string
  status: string
  id: number
}

export interface Id {
  $oid: string
}

