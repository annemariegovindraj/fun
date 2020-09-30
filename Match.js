/*
 This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details. at 
	https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

you may contact me at annemarie.govindraj@gmail.com
*/
var xo,yo;
var neededWidth=0;
var otherside=0;
var KButton=function(lbl,coords){
	this.width=coords[2]; //200;
	this.height=coords[3];//40;
	this.label=lbl;
	this.x=coords[0];
	this.y=coords[1];
	this.buttoncanvas= document.createElement("canvas");
	this.buttoncanvas.height=coords[3];
	this.buttonctx=this.buttoncanvas.getContext('2d');
	this.buttoncanvas.style="position:absolute; "
	//this.buttoncanvas.style.z-index=2; ///Attempt to make the buttons float FAILED , instead big transp canvas with plates on top of image
	this.buttonctx.font=Match.contx.font;//"25px Arial";}
	this.width=this.buttonctx.measureText(this.label).width;
	//this.height=Match.plates_h;
	this.longi=0,this.lati=0;
	[this.longi,this.lati]=geodata[this.label];
	if(window.innerWidth<neededWidth){this.longi=Math.floor(this.longi/2); this.lati=Math.floor(this.lati/2);}
	this.buttoncanvas.id="plate"+this.label;
	this.targetReached=false;
	//this.target=0;
	
	this.drawButton=function(){
		//var colorbackground=(this.target===1)?"rgb(255,255,255)":"rgb(62,249,146)";
		//console.log("target"+this.target);
		this.buttonctx.fillStyle="rgb(62,249,146)";//colorbackground;
		//if(this.target===1){this.buttonctx.globalalpha=0.4;}
		//else{this.buttonctx.globalalpha=1;}//(this.target===0)?1:0;
		this.buttonctx.fillRect(0,0,this.width,this.height);
		this.buttonctx.fillStyle="black"; 
		var lblw=this.buttonctx.measureText(this.label).width;
		this.buttonctx.fillText(this.label,  (this.width-lblw)/2, this.height - 3);
		}
	//this.removebackground=function(){		this.buttonctx.globalalpha=0.4;		}
		
	this.setX=function(newx){this.x=newx; }
	this.setY=function(newy){ this.y=newy;}
	this.istargetOK=function(){
			var boo=false;
			if((this.x<this.longi+xo)&&((this.x-xo+this.width)>this.longi)&&(this.y-yo<this.lati)&&((this.y-yo+this.height)>this.lati)){
					boo=true; //this.target=1;
					}
			return boo;
		}
	}
	
var DText=function(coord, label){
	this.textcanvas= document.createElement("canvas");
	this.textctx=this.textcanvas.getContext('2d');
	this.textcanvas.width=coord[2];
	this.textcanvas.height=coord[3];
	this.textcanvas.style="position:absolute";
	this.textcanvas.style.left=coord[0]+"px";
	this.textcanvas.style.top=coord[1]+"px";//	this.y=coord[1];
	this.textcanvas.style.zIndex="5";
	this.label=label;
	this.textctx.font=Match.contx.font;	
	document.getElementById("world").appendChild(this.textcanvas);
		
	this.updateScore=function(myscore, mytries){
		this.textctx.fillStyle="rgb(62,249,146)";//lightgreen
		this.textctx.fillRect(0,0, this.textcanvas.width, this.textcanvas.height);
		this.textctx.fillStyle="black";
		this.textctx.fillText(this.label+myscore+"/"+mytries, 0, this.textcanvas.height-3);
		}
	}
var imginfo= new function(){
		this.nbitems=0;
		this.load=function(imgsource,callback){
				this.image=new Image();
				this.image.src=imgsource;
				this.image.onload=callback; //function(){nbitems=callback;}
				}
		this.getimgw=function(){
				return this.image.naturalWidth;}
		this.getimgh=function(){
				return this.image.naturalHeight;}
		this.draw=function(context){
				if(window.innerWidth>neededWidth){context.drawImage(this.image,0,0);}
				else if(window.innerWidth>400){context.drawImage(this.image,0,0,this.image.naturalWidth,this.image.naturalHeight,0,0,Math.floor(this.image.naturalWidth/2),Math.floor(this.image.naturalHeight/2));}
				}
		}				
					
var Match=new function(){
	//console.log(window.innerHeight+"," +screen.height);
	this.canvas = document.getElementById('mappicture');
	 this.contx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.contx) { return alert("Please upgrade your browser to play"); }
	this.canvas.id="matchcanvas";
	this.canvas.width=window.innerWidth;
	this.canvas.height=window.innerHeight;
				this.canvas.style="position:absolute"
				this.canvas.style.left="0px"; 
				this.canvas.style.top="0px";
				this.canvas.style.zIndex="2";
	this.contx = this.canvas.getContext('2d');
	this.imgcanvas=document.createElement('canvas');
	this.imgcanvas.style.zIndex="0";
	this.imgctx; 
	//this.neededWidth=0;
	
	this.plate=[];
	this.plateselected=0;
	this.offsetx=0,this.offsety=0;
	this.gameover=false;
	this.nboftries=0;
	this.select=false;
	this.nbofitems=0;
	this.mapReady=false;
	this.scoreboard=null;
	this.endscoreboard=null;
	this.score=0;
	this.plates_w,this.plates_h;
	 if (window.innerWidth>800){this.contx.font="18px Arial"; this.plates_h=23;}	
	else if (window.innerWidth>475){this.contx.font="12px Arial";this.plates_h=16;}
	
	this.initialize=function(imgsource,callback){
		if(window.innerwidth<400){window.alert("resolution is too low for this app");}
		else{imginfo.load(imgsource,callback);}
			}	
	this.drawMap=function(){	
		imginfo.draw(Match.imgctx);
		//Match.contx.drawImage(Match.scoreboard.textcanvas , Match.scoreboard.x, Match.scoreboard.y);	
			
		for(var item in geodata){///if changed should be changed like imginfo
			var longi=0,lati=0;
			[longi,lati]=geodata[item];
			Match.imgctx.fillStyle="black";
			if(window.innerWidth>neededWidth){Match.imgctx.fillRect(longi-3,lati-3,6,6);}
			else{Match.imgctx.fillRect(Math.floor(longi/2)-2,Math.floor(lati/2)-2,4,4);}
			}
			
		this.mapReady=true;
		}
	this.loaddata=function(){
		
		var i=0;
		//var otherside=0;
		this.imgwidth=imginfo.getimgw();
		this.imgheight=imginfo.getimgh();
		//console.log("img"+this.imgwidth+"x"+this.imgheight);
		Match.imgcanvas.width=this.imgwidth;
		Match.imgcanvas.height=this.imgheight;
		var wordwidth=Match.contx.measureText("Saudi_Arab").width;
		neededWidth=this.imgwidth+2*wordwidth;
		if(window.innerWidth>neededWidth){xo=Math.round(window.innerWidth-this.imgwidth)/2; yo=50; Match.contx.font="18px Arial";}
		else {xo=Math.round(window.innerWidth-this.imgwidth/2)/2; yo=30; Match.contx.font="14px Arial";}
		
		Match.imgcanvas.style="position:absolute; "
		Match.imgcanvas.style.zIndex="1";
		Match.imgcanvas.style.left=xo+"px"; 
		Match.imgcanvas.style.top=yo+"px";
		Match.imgctx= Match.imgcanvas.getContext('2d');
		document.getElementById("world").appendChild(Match.imgcanvas);
		Match.drawMap();
		Match.nbofitems=0;
		for(var item in geodata){Match.nbofitems++;}
		
		for(var item in geodata){//console.log(i+","+item);
			var label=item;
			//console.log("this in item"+this);///this is an HTMLimageelement!!!!
			var platespercolumn=Math.ceil(Match.nbofitems/2);
			var rownb=i%(platespercolumn);
			var space=(Match.nbofitems<23)?48: 44;
			if(i>=platespercolumn){//var wordwidth=Match.contx.measureText("Saudi_Arabia").width;
					if(window.innerWidth>950){otherside=Math.floor((window.innerWidth+this.imgwidth)/2); }
					else if(window.innerWidth>neededWidth){otherside=Math.min((window.innerWidth-wordwidth),Math.floor((window.innerWidth+this.imgwidth)/2));  }
					else{otherside=Math.floor((window.innerWidth+this.imgwidth/2)/2);  }
					}
			if(window.innerWidth>neededWidth){Match.plate[i]=new KButton(label,[20+otherside,yo-30+rownb*space,150, 23]);}
			else {Match.plate[i]=new KButton(label,[20+otherside,yo-15+rownb*space/2,100,16]);}
			Match.plate[i].drawButton();
			i++;
			}
		Match.addPlates();
		var wordwidth=Match.contx.measureText(" SCORE=99/99 ").width;
		Match.scoreboard=new DText([Math.floor((window.innerWidth-wordwidth)/2), Math.round(0.7*Match.plates_h),wordwidth,Match.plates_h], " SCORE= ");
		Match.scoreboard.updateScore(Match.score,Match.nboftries);
		
			
		//Match.getnbofitems=function(){	return nbofitems;}
		}
	this.addPlates=function(){
			if(this.mapReady===false){setTimeout(Match.addPlates,5);}
			if(this.mapReady===true){
			for(var i=0;i<Match.plate.length;i++)
					{Match.contx.drawImage(Match.plate[i].buttoncanvas, Match.plate[i].x, Match.plate[i].y);}	
				}
			}
	this.resolveButton=function(event){
		//console.log(event);
		this.select=false;
		var nx=event.clientX;
		var ny=event.clientY;
		for( var i=0; i<Match.plate.length;i++){///while select===false?
			if((ny>Match.plate[i].y)&&(ny<Match.plate[i].y+Match.plate[i].height)&&(nx>Match.plate[i].x)&&(nx<Match.plate[i].x+Match.plate[i].width)){
				this.select=true;
				this.plateselected=i;
				this.offsetx=nx-Match.plate[this.plateselected].x;
				this.offsety=ny-Match.plate[this.plateselected].y;
				//console.log(Match.plate[this.plateselected].label);
				}
			}
		}
	this.drag=function(event){event.preventDefault();
			if(this.select===true){
			this.mapReady=false;
			Match.plate[this.plateselected].setX(event.clientX-this.offsetx);
			Match.plate[this.plateselected].setY(event.clientY-this.offsety);
			Match.contx.clearRect(0,0,Match.canvas.width,Match.canvas.height);  
			Match.drawMap();//.contx.fillRect(0,0,window.innerWidth,window.innerHeight);
			Match.addPlates();
			}
		}
	this.checkTarget=function(event){
		//console.log(Match.nbofitems);///undefined
		if(this.select===true){
			Match.plate[this.plateselected].setX(event.clientX-this.offsetx);
			Match.plate[this.plateselected].setY(event.clientY-this.offsety);
			this.select=false;
			this.offsetx=0;
			this.offsety=0; 
			Match.nboftries++;
			var boo=Match.plate[this.plateselected].istargetOK();
			//var nbofitems=this.getnbofitems(); //here Match.getnbofitems undefined!!!!!!!!
			//console.log(" outof boo this"+this.id);	//we're in canvas	
			if (boo===false){
					//Match.nbofitems=Match.getnbofitems();/////here defined although we're still in same canvas!!!!
					var platespercolumn=Math.ceil(Match.nbofitems/2);
					if(platespercolumn!=0)
						{var rownb=this.plateselected%platespercolumn;}
					//var otherside=0;
					var space=(Match.nbofitems<23)?48:44;
					if(window.innerWidth>neededWidth){
							//otherside=Math.floor((window.innerWidth+imginfo.getimgw())/2);
						Match.plate[this.plateselected].setY(yo-30+rownb*space);}
					else {	//otherside=Math.floor(window.innerWidth/2+imginfo.getimgw()/4); 
					Match.plate[this.plateselected].setY(yo-15+rownb*space/2); }
					
					if (this.plateselected>=platespercolumn){
									Match.plate[this.plateselected].setX(20+otherside);
									}
					else {Match.plate[this.plateselected].setX(20);}
									
					}
			if ((boo===true)&&(Match.plate[this.plateselected].targetReached===false)){
					Match.score+=1; ////else gives nbofitems as undefined
					//Match.nbofitems=Match.getnbofitems();
					//console.log("nbofitems"+Match.nbofitems);
					if (Match.score==Match.nbofitems){this.gameover=true;}
						
					Match.plate[this.plateselected].targetReached=true;
				 }
			Match.contx.clearRect(0,0,Match.canvas.width,Match.canvas.height);  
			Match.scoreboard.updateScore(Match.score, Match.nboftries);
			Match.drawMap();
			Match.addPlates();
			if(this.gameover==true){
					var congrats="";
					if((Match.score/Match.nboftries)>0.9){congrats=" Well Done"};
					var wordwidth=Match.contx.measureText(" ENDSCORE = 100% . Well Done").width;
					Match.endscoreboard=new DText([Math.floor((window.innerWidth-wordwidth)/2), Math.round(0.6*Match.plates_h),wordwidth,Match.plates_h], " ENDSCORE = ");
					Match.endscoreboard.updateScore(Math.floor(100*Match.score/Match.nboftries)+" %."+congrats);
					}}
		}
	
	
	this.canvas.addEventListener('mousedown', this.resolveButton);
	this.canvas.addEventListener('mousemove', this.drag);
	this.canvas.addEventListener('mouseup', this.checkTarget);
	this.canvas.addEventListener('touchstart', this.resolveButton);
	//this.canvas.addEventListener('touchmove', this.drag);
	//this.canvas.addEventListener('touchend', this.checkTarget);
			
	} 
window.addEventListener("load", function(){Match.initialize(imgsource,Match.loaddata)});//	"asia1.GIF",Match.loaddata)});	