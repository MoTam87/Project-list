import { Component, inject, NgModule  } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';

interface difficulty {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],

  
})
export class ProjectListComponent {
  firestore: Firestore = inject(Firestore);
  projects$: Observable<any> | undefined;

  constructor(){
    this.getProject()
  }

  project = {
    name: '',
    difficulty: '',
    duration: 0,
  };

  difficulties: difficulty[] = [
    { value: 'easy', viewValue: 'Easy' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'hard', viewValue: 'Hard' }
  ];

  getProject(){
    const aCollection = collection(this.firestore, 'projects')
    this. projects$ = collectionData(aCollection);
  };

  submitForm() {
    const projectCollection = collection(this.firestore, 'projects')
    addDoc(projectCollection, this.project)
  }

}
