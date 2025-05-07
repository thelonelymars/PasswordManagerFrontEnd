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


interface ToDoItem {
  toDoListName: string;
  status: string;
  id: number;
}
@Component({
  selector: 'app-root',
  imports: [ FormsModule, NgIf, NgForOf, MatSlideToggleModule, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
saveItem() {
  this.toDoService.SaveItem().then(response => {
    this.openMessageBox("Success", response);
  }).catch(error => {
    this.openMessageBox("Error", error.message);
  });

}
  constructor(private toDoService:TodoService,private dialog:MatDialog){}
  toDoList = 'ToDoList';
  items:ToDoItem[] = [];
  ngOnInit() {
    this.items=this.toDoService.items;
  }
  addItem(item:string){
    this.toDoService.addItem(item);
    this.items=this.toDoService.getItems();
  }
  deleteItem(id:number) {
   this.toDoService.deleteItem(id);
   this.items=this.toDoService.getItems();
  }
openMessageBox(title:string,message:string){ {
this.dialog.open(MessageBoxComponent, {
  data: { title, message }
})}}
  // Initial items array with PascalCase property names
  
  
}
