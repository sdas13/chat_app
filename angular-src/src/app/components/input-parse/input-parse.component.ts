import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input-parse',
  templateUrl: './input-parse.component.html',
  styleUrls: ['./input-parse.component.css']
})
export class InputParseComponent implements OnInit {

  anTxt: string = '';
  anTxtModel: string = '';
  anValidInput: boolean = false;
  ssnTxt: string = '';
  ssnTxtModel: string = '';
  ssnValidInput: boolean = false;
  @ViewChild('accnum') accnumInput: ElementRef;

  constructor() { }

  ngOnInit() {

    this.accnumInput.nativeElement.addEventListener('keydown', (event: any) => {
      let regex = /[0-9]/g;

      // console.log(event);
      //console.log(this.anTxt);

      if (event.code == 'Backspace')
        return;
      else if (event.ctrlKey)
        return;
      else if (event.shiftKey)
        return;
      else if (!regex.test(event.key) || this.anTxt.length >= 10)
        event.preventDefault();
    })

    this.accnumInput.nativeElement.addEventListener('paste', (event: any) => {
      let regex = /[0-9]/g;
      let clipboardData = event.clipboardData.getData('text');
      if (isNaN(Number(clipboardData)) || !regex.test(clipboardData) || clipboardData.length>10)
        event.preventDefault();

    })

  }

  anFormatter(value) {
    //console.log('formatter',value);
    return value;
  }

  anParser(value) {
    //console.log('Parser',value)
    this.anTxt = value;
  }

  maskInput() {
    //console.log('In blur');
    console.log(this.anTxt);

    if (this.anTxt.length == 10) {
      this.anValidInput = true;
      this.anTxtModel = this.anTxt;
      this.anTxt = 'xxxxxxx' + this.anTxt.slice(-3);
      console.log(this.anTxtModel);
    }
    else {
      this.anValidInput = false;
      this.anTxtModel = this.anTxt;
    }
  }

  unmaskInput() {
    this.anTxt = this.anTxtModel;
  }



  /*
  ssnFormatter(value){
    let regex=/[-\s]/g

    let temp=value.replace(regex,'')
    console.log('formatter',value,temp);
    if(temp && temp.length<=4)
    return `${temp}-  -    `
      return '    -   -    ';
  }

  ssnParser(value){
      //console.log('Parser',value)
      this.ssnTxt=value;
  }

  parseSsnInput(){
    //console.log('In blur');
  }
 */

}
