import { Component, OnInit } from '@angular/core';
import { NameService } from '../name.service';
import { ResponseModel } from '../model/res.model';
import { ResponsePhpModel } from '../model/resphp.model';
import { PostResponse } from '../model/postres.model';
import { NameDataModel } from '../model/namedata.model';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css']
})
export class NamesComponent implements OnInit {

  public namesMock: string[] = [
    "Kovács Patrícia",
    "Kiss László",
    "Balogh Emese"
  ];

  public employeeNames: NameDataModel[] = [];

  public selectedNames: NameDataModel[] = [];
  public newName: string = null;
  public modifiedName: string;
  public namesLoaded: boolean = false;
  public display: boolean = false;

  public updateId: string = null;

  constructor(private nameService: NameService) { }

  public ngOnInit(): void {
    this.nameService.getNamesPhp().subscribe( response => {
      console.log(response);
    });
    this.loadNamesPhp();
  }

  // public loadNames(): void {
  //   this.namesLoaded = false;
  //   this.nameService.getNames().subscribe( (response: ResponseModel) => {
  //     if (response.data) {
  //       this.namesLoaded = true;
  //       this.employeeNames = response.data;
  //     }
  //   });
  // }

  public loadNamesPhp(): void {
    this.employeeNames = [];
    this.namesLoaded = false;
    this.nameService.getNamesPhp().subscribe( (response: ResponsePhpModel) => {
      if (response.data) {
        this.namesLoaded = true;
        response.data.forEach( nameData => {
          this.employeeNames.push(nameData)
        });
      }
    });
  }

  public addName(): void {
    if (this.newName) {
      let body: string = JSON.stringify({"nev": this.newName});
      // this.employeeNames.push(this.newName);
      this.nameService.postNames(body).subscribe( (response: PostResponse) => {
        if (response.error) {
          console.log(response.error);
        }
        console.log(response);
        // this.employeeNames.push(this.newName);
        this.loadNamesPhp();
      });
    }
    
  }

  public deleteName(): void {
    if (this.selectedNames.length > 0) {
      this.selectedNames.forEach( (item, index) => {
        this.nameService.deleteNamesPhp(item.id).subscribe( response => {
          console.log(response);
          if (index === this.selectedNames.length-1) {
            this.selectedNames = [];
            this.loadNamesPhp();
          }
        });
      });
    }
  }

  public showDialog(item: NameDataModel): void {
    this.updateId = item.id;
    this.display = true;
    this.modifiedName = item.name;
    console.log(this.modifiedName)
  }

  public updateName(): void {
    let body: string = JSON.stringify({"newName": this.modifiedName});
    this.display = false;
    this.nameService.updateNamePhp(this.updateId, body).subscribe( (response) => {
      console.log(response);
      // this.employeeNames.push(this.newName);
      this.loadNamesPhp();
    });
  }

  public change(): void {
    // console.log(this.selectedNames);
  }

}
