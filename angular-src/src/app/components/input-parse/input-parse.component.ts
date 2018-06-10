import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-parse',
  templateUrl: './input-parse.component.html',
  styleUrls: ['./input-parse.component.css']
})
export class InputParseComponent implements OnInit {

  txt:string='';
  txtModel:string='';
  validInput:boolean=false;

  constructor() { }

  ngOnInit() {  }

  formatter(value){
    //console.log('formater',value);
      return value;
  }

  parser(value){
      //console.log('Parser',value)
      this.txt=value;
  }

  parseInput(){
    //console.log('In blur');
    if(this.txt.length==10){
      this.validInput=true;
      this.txtModel=this.txt;    
      this.txt='xxxxxx'+this.txt.slice(-3);
      console.log(this.txtModel);  
    }
    else
    this.validInput=false;    
  }

}
