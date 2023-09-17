import { data } from './../models/data';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
	ngOnInit(): void {		
	}
	constructor(public fileUploadService: FileUploadService) {}

	shortLink: string = "";
	loading: boolean = false; // Flag variable
	file!: File ; // Variable to store file
	data : data[][] = [];
	metric1 = "";
	metric2 = "";
	first:any;
	second:any;
	title = 'angular-file-upload';
	chartOptions = {};
	numberExist!:boolean;
	selectedItem1: any;
	selectedItem2: any;
	optionType = ['Number','String','Date'];
	colTypes = [
		{
			name : "",
			type : ""
		}
	];
	
	changeValue1(item:any){
		this.selectedItem1=item;
	}

	changeValue2(item:any){
		this.selectedItem2=item;
		return this.selectedItem2;
	}
	onlyNumber(){
		for (let num of this.optionType){
		var key= this.optionType.filter(type => type=='Number');
		// console.log(key);
	}
	}

	onChange(event:any) {
		this.file = event.target.files[0];
	}

	onUpload() {
		this.loading = !this.loading;
		// console.log(this.file);
		this.fileUploadService.upload(this.file).subscribe(
			event => {				
				if (typeof (event) === 'object') {
					// console.log(event)
					this.shortLink = event.link;
					this.data = event;
					// console.log(this.data);
					this.colTypes = [];
					for(let i of this.data[0]) {
						let obj = {
							name : i.col_name,
							type : "Number"
						}
						this.colTypes.push(obj);
						console.log(this.colTypes);
					}
					let num = this.colTypes.filter((elt : any) => elt.type === 'Number');
					if(num.length === 0){
						this.numberExist = false;
					}
					else {
						this.numberExist = true;
					}	
				}			
		}	);
	}
	
	onlyNumbers() {
		return this.colTypes.filter((elt : any) => elt.type === 'Number');	
	}

	display(){		
		var list : data[]=[];
		for (let lista of this.data){
			var obj : any; 
			var key : data[] = lista.filter((x: data) => x.col_name ==this.selectedItem1);
			var value: data[]  = lista.filter((x: data) => x.col_name ==this.selectedItem2);			
			obj = {
				"label" :<string>(key[0].col_val),
				"y" : parseInt(value[0].col_val),
			}
			list.push(obj);
		};
		this.loading = false;
		this.chartOptions = {		
			animationEnabled: true, 
			animationDuration: 2000,
			zoomEnabled: true, 
			axisX:{
				title: this.selectedItem1,
			   },
			axisY:{
				title: this.selectedItem2,
			},
			title: {
			  text: "Result"
			},
			data: [{
				  type: "column",
			  dataPoints: list
			}]			  
		  };
	}

	updateType(i : string, j : any) {		
		for(let col of this.colTypes) {
			if(col.name === i){
				col.type = j.target.value;
			}
		}
		let num = this.colTypes.filter((elt : any) => elt.type === 'Number');
		if(num.length === 0){
			this.numberExist = false;
		}
		else {
			this.numberExist = true;
		}	
	}
}
