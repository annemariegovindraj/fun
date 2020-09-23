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

////mould created from array of functions
//each piece is 7 xscale width except edge pieces 6 xscales
//each piece is 7 yscale height except edge pieces 6 yscales
//bulges left or right are 1 xscale width, bulges up or down are 1 yscale high 

//var possiblehoripaths=[ 'trtrh','trsqh', 'sqh','ntrtrh','trnqtrh', 'tnqth', 'trtrtrh', 'ntrtrtrh'];
//var possiblevertipaths=['sqsqv','trtrv','trsqv','nsqsqv','ntrtrv','ntrsqv','qqqv', 'qnqqv', 'qqnqv', 'trtrv','trtrtrv','trntrtrv'];	

var possiblehoripaths=[ 'trtrh','trsqh', 'sqh','ntrtrh','bststh','bbwsth','bfrsth','bbwbwh','trnqtrh', 'tnqth', 'trtrtrh', 'ntrtrtrh', 'bzbwh', 'bnzbwh', 'bZsth', 'bnZsth'];
var possiblevertipaths=['sqsqv','trtrv','trsqv','nsqsqv','ntrtrv','ntrsqv','bststv','bSTstv', 'bbwbwv', 'bSTbwv','qqqv', 'qnqqv', 'qqnqv', 'trtrv','trtrtrv','trntrtrv','bZstv', 'bnZstv', 'bzbwv', 'bnzbwv'];	

var pickingArrays=new function(){
		//sqsqh=2 squares bulging Down from Horizontal line if no n, upif starts with n
		///trtrh=2 triangles bulging Down from Horizontal line
		//sqsqv=2 squares bulging right from Vertical line if no n=+1
		//bbwbw=2 backwardleaning bezier curves
		//bSTstv=2 straightstanding Bezier curver ST biggerer than st
		//bfrsth= 1 forwardleaning , one straigth Bezier on horizontal lene
	this.arrlengths={sqsqh:10, sqsqv:10,trtrh:8,lineh :2, linev :2,trsqh: 9,sqh : 6, trtrv:8, trsqv:9,nsqsqv:10,ntrtrh:8,ntrtrv:8,ntrsqv:9,bststh:10,bbwsth:10,bfrsth:10,bbwbwh:10, bststv:10,bSTstv:10, bbwbwv:10, bSTbwv:10,trnqtrh :10, tnqth:12,qqqv:14, qnqqv :14, qqnqv :14, trtrv: 8,trtrtrh:9,ntrtrtrh:9,trtrtrv:9,trntrtrv:9,bzbwh :10, bnzbwh: 10,bZstv: 10, bnZstv :10, bzbwv: 10, bnzbwv :10,bZsth:10, bnZsth:10};
	this.map={sqsqh :function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+xscale,q],[p+xscale,q+yscale],[p+2*xscale,q+yscale],[p+2*xscale,q],[p+3*xscale,q],[p+3*xscale,q+yscale],[p+4*xscale,q+yscale],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		sqsqv : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+xscale,q+yscale],[p+xscale,q+2*yscale],[p,q+2*yscale],[p,q+3*yscale],[p+xscale,q+3*yscale],[p+xscale,q+4*yscale],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		trtrh : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q+yscale],[p+2*xscale,q],[p+3*xscale,q],[p+7*xscale/2,q+yscale],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		lineh : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+5*xscale,q]]; var x=arr[ii][0]; var y=arr[ii][1]; return [x,y];},
		linev : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+5*yscale]]; var x=arr[ii][0]; var y=arr[ii][1]; return [x,y];},
		trsqh : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q+yscale],[p+2*xscale,q],[p+3*xscale,q],[p+3*xscale,q+yscale],[p+4*xscale,q+yscale],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		sqh :	function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+2*xscale,q],[p+2*xscale,q+yscale],[p+3*xscale,q+yscale],[p+3*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		trtrv : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+xscale,q+3*yscale/2],[p,q+2*yscale],[p,q+3*yscale],[p+xscale,q+7*yscale/2],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0]; var y=arr[ii][1]; return [x,y];},
		trsqv : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+xscale,q+3*yscale/2],[p,q+2*yscale],[p,q+3*yscale],[p+xscale,q+3*yscale],[p+xscale,q+4*yscale],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0]; var y=arr[ii][1]; return [x,y];},
		nsqsqv : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p-xscale,q+yscale],[p-xscale,q+2*yscale],[p,q+2*yscale],[p,q+3*yscale],[p+xscale,q+3*yscale],[p+xscale,q+4*yscale],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		ntrtrh : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q-yscale],[p+2*xscale,q],[p+3*xscale,q],[p+7*xscale/2,q+yscale],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		ntrtrv : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p-xscale,q+3*yscale/2],[p,q+2*yscale],[p,q+3*yscale],[p+xscale,q+7*yscale/2],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0]; var y=arr[ii][1]; return [x,y];},
		ntrsqv : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p-xscale,q+3*yscale/2],[p,q+2*yscale],[p,q+3*yscale],[p+xscale,q+3*yscale],[p+xscale,q+4*yscale],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0]; var y=arr[ii][1]; return [x,y];},
		bststh : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+xscale,q],[p+3*xscale/4, q-yscale],[p+9*xscale/4, q-yscale],[p+2*xscale, q],[p+3*xscale, q],[p+11*xscale/4, q-yscale],[p+17*xscale/4, q-yscale],[p+4*xscale, q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bbwsth : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+xscale,q],[p+xscale,q-yscale],[p+3*xscale/2, q-5*yscale/4],[p+2*xscale,q],[p+3*xscale,q],[p+11*xscale/4, q-yscale],[p+17*xscale/4, q-yscale],[p+4*xscale, q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bfrsth : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q+yscale],[p+3*xscale,q+yscale],[p+2*xscale,q],[p+3*xscale,q],[p+11*xscale/4, q-yscale],[p+17*xscale/4, q-yscale],[p+4*xscale, q],[p+5*xscale,q]];   var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bbwbwh : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p+xscale,q],[p+xscale/2,q-yscale],[p+3*xscale/2, q-5*yscale/4],[p+2*xscale,q],[p+3*xscale,q],[p+2*xscale, q+5*yscale/4],[p+4*xscale, q+5*yscale/4],[p+4*xscale,q],[p+5*xscale,q]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bststv :  function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+xscale, q+3*yscale/4],[p+xscale, q+9*yscale/4],[p,q+2*yscale],[p,q+3*yscale],[p+xscale, q+11*yscale/4],[p+xscale, q+17*yscale/4],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bSTstv :  function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+5*xscale/4, q+3*yscale/4],[p+5*xscale/4, q+9*yscale/4],[p,q+2*yscale],[p,q+3*yscale],[p+xscale, q+11*yscale/4],[p+xscale, q+17*yscale/4],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bbwbwv :  function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+5*xscale/4, q+yscale/2],[p+5*xscale/4, q+3*yscale/2],[p,q+2*yscale],[p,q+3*yscale],[p+5*xscale/4, q+5*yscale/2],[p+5*xscale/4, q+17*yscale/4],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bSTbwv :  function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+5*xscale/4, q+3*yscale/4],[p+5*xscale/4, q+9*yscale/4],[p,q+2*yscale],[p,q+3*yscale],[p+5*xscale/4, q+11*yscale/4],[p+5*xscale/4, q+17*yscale/4],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
			ntrtrtrh: function(p,q,ii,xscale,yscale){ var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q-yscale],[p+2*xscale,q],[p+5*xscale/2,q+yscale],[p+3*xscale,q],[p+7*xscale/2,q-yscale],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		trtrtrh: function(p,q,ii,xscale,yscale){  var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q-yscale],[p+2*xscale,q],[p+5*xscale/2,q-yscale],[p+3*xscale,q],[p+7*xscale/2,q-yscale],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		tnqth:  function(p,q,ii,xscale,yscale){	var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q+yscale],[p+3*xscale/2,q],[p+2*xscale,q],[p+2*xscale,q-yscale],[p+3*xscale,q-yscale],[p+3*xscale,q],[p+7*xscale/2,q],[p+7*xscale/2,q+yscale],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		trnqtrh:	function(p,q,ii,xscale,yscale){	var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q+yscale],[p+2*xscale,q],[p+2*xscale,q-yscale],[p+3*xscale,q-yscale],[p+3*xscale,q],[p+7*xscale/2,q+yscale],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		qnqqv:	function(p,q,ii,xscale,yscale){	var arr=[[p,q],[p,q+yscale],[p+xscale,q+yscale],[p+xscale,q+3*yscale/2],[p,q+3*yscale/2],[p,q+2*yscale],[p-xscale,q+2*yscale],[p-xscale,q+3*yscale],[p,q+3*yscale],[p,q+7*yscale/2],[p+xscale,q+7*yscale/2],[p+xscale,q+4*yscale],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		qqnqv:	function(p,q,ii,xscale,yscale){	var arr=[[p,q],[p,q+yscale],[p+xscale,q+yscale],[p+xscale,q+3*yscale/2],[p,q+3*yscale/2],[p,q+2*yscale],[p+xscale,q+2*yscale],[p+xscale,q+3*yscale],[p,q+3*yscale],[p,q+7*yscale/2],[p-xscale,q+7*yscale/2],[p-xscale,q+4*yscale],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		qqqv:	function(p,q,ii,xscale,yscale){	var arr=[[p,q],[p,q+yscale],[p+xscale,q+yscale],[p+xscale,q+3*yscale/2],[p,q+3*yscale/2],[p,q+2*yscale],[p+xscale,q+2*yscale],[p+xscale,q+3*yscale],[p,q+3*yscale],[p,q+7*yscale/2],[p+xscale,q+7*yscale/2],[p+xscale,q+4*yscale],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		trtrv:	function(p,q,ii,xscale,yscale){	 var arr=[[p,q],[p,q+yscale],[p+xscale,q+3*yscale/2],[p,q+2*yscale],[p,q+3*yscale],[p+xscale,q+7*yscale/2],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
	 	trtrtrv: function(p,q,ii,xscale,yscale){ var arr=[[p,q],[p,q+yscale],[p+xscale,q+3*yscale/2],[p,q+2*yscale],[p+xscale,q+5*yscale/2],[p,q+3*yscale],[p+xscale,q+7*yscale/2],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		trntrtrv: function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+xscale,q+3*yscale/2],[p,q+2*yscale],[p-xscale,q+5*yscale/2],[p,q+3*yscale],[p+xscale,q+7*yscale/2],[p,q+4*yscale],[p,q+5*yscale]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bzbwh:  function(p,q,ii,xscale,yscale){ var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q-2*yscale],[p+3*xscale/2, q+2*yscale],[p+5*xscale/2,q],[p+3*xscale,q],[p+5*xscale/2, q+5*yscale/4],[p+4*xscale, q+5*yscale/4],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},//	
		bnzbwh: function(p,q,ii,xscale,yscale){ var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q+2*yscale],[p+3*xscale/2, q-2*yscale],[p+5*xscale/2,q],[p+3*xscale,q],[p+5*xscale/2, q+5*yscale/4],[p+4*xscale, q+5*yscale/4],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		bZstv :  function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+5*xscale/2, q+3*yscale/2],[p-5*xscale/2, q+2*yscale],[p,q+5*yscale/2],[p,q+3*yscale],[p+xscale, q+11*yscale/4],[p+xscale, q+17*yscale/4],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bnZstv : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p-5*xscale/2, q+3*yscale/2],[p+5*xscale/2, q+2*yscale],[p,q+5*yscale/2],[p,q+3*yscale],[p+xscale, q+11*yscale/4],[p+xscale, q+17*yscale/4],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bzbwv :  function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p+3*xscale/2, q+3*yscale/2],[p-3*xscale/2, q+2*yscale],[p,q+5*yscale/2],[p,q+3*yscale],[p+xscale, q+5*yscale/2],[p+xscale, q+17*yscale/4],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bnzbwv : function(p,q,ii,xscale,yscale){var arr=[[p,q],[p,q+yscale],[p-3*xscale/2, q+3*yscale/2],[p+3*xscale/2, q+2*yscale],[p,q+5*yscale/2],[p,q+3*yscale],[p+xscale, q+5*yscale/2],[p+xscale, q+17*yscale/4],[p,q+4*yscale],[p,q+5*yscale]];var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},
		bZsth:  function(p,q,ii,xscale,yscale){ var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q-5*yscale/2],[p+2*xscale, q+5*yscale/2],[p+5*xscale/2,q],[p+3*xscale,q],[p+3*xscale, q+5*yscale/4],[p+4*xscale, q+5*yscale/4],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];},	
		bnZsth: function(p,q,ii,xscale,yscale){ var arr=[[p,q],[p+xscale,q],[p+3*xscale/2,q+5*yscale/2],[p+2*xscale, q-5*yscale/2],[p+5*xscale/2,q],[p+3*xscale,q],[p+5*xscale/2, q+5*yscale/4],[p+4*xscale, q+5*yscale/4],[p+4*xscale,q],[p+5*xscale,q]]; var x=arr[ii][0];var y=arr[ii][1]; return [x,y];}	
		}
	}
var MouldPiece=function(whpiece,xscale,yscale){
	this.mcanvas=document.createElement("canvas"); 
	this.piecenb=whpiece;
if ((whpiece<Puzzle.nbofcols)|| (whpiece>=(Puzzle.nbofpieces-Puzzle.nbofcols))){
		this.mcanvas.height=6*Puzzle.yscale;
		} 
	else {	
		this.mcanvas.height=7*Puzzle.yscale;
	}
	if((whpiece%Puzzle.nbofcols==(Puzzle.nbofcols-1))||(whpiece%Puzzle.nbofcols==0)){
		this.mcanvas.width=6*Puzzle.xscale;
		}
	else {
	this.mcanvas.width=7*Puzzle.xscale;
	}
	this.xscale=xscale;
	this.yscale=yscale;
	this.path=Array(4);
	
	//document.getElementById("the_div").appendChild(this.canvas);
this.choosePath=function(){//the 4 contour lines
	if((Puzzle.nbofcols==1)||(Puzzle.nbofrows==1)){alert("only 1 column/row"); return}
	this.path=['','','',''];
	if(this.piecenb<Puzzle.nbofcols){
		this.path[0]='lineh';
	}
	if(this.piecenb>=(Puzzle.nbofcols*(Puzzle.nbofrows-1))){
		this.path[2]='lineh';
	}
	if(this.piecenb%Puzzle.nbofcols==0){
		this.path[3]='linev';
	}
	if(this.piecenb%Puzzle.nbofcols==(Puzzle.nbofcols-1)){
		this.path[1]='linev';
	}
	if(this.piecenb>=Puzzle.nbofcols){//&&(this.piecenb<Puzzle.nbofcols*(Puzzle.nbofrows-1))){
		var nbmould_up=this.piecenb-Puzzle.nbofcols;
		//console.log("this="+this.piecenb+moulds[nbmould_up].path[2]);
		this.path[0]=moulds[nbmould_up].path[2];
		}
	if(this.piecenb%Puzzle.nbofcols>0){ //&&(this.piecenb<Puzzle.nbofcols*(Puzzle.nbofrows-1))){
		var nbmould_left=this.piecenb-1;
		//console.log("this="+this.piecenb+moulds[nbmould_left].path[2]);
		this.path[3]=moulds[nbmould_left].path[1];
		}
	for(var j=0; j<4;j+=2){//console.log("path"+this.piecenb);
		if(this.path[j]==''){var choice=Math.floor(Math.random()*possiblehoripaths.length)
		this.path[j]=possiblehoripaths[choice];}
			}
	for(var j=1; j<4;j+=2){//console.log("path"+this.piecenb);
		if(this.path[j]==''){var choice=Math.floor(Math.random()*possiblevertipaths.length);
		this.path[j]=possiblevertipaths[choice];}
			}

//}this.drawPath=function(){
	//var	path3=[hlsq1,vlsq2,hlsq2,vlsq1];
	this.ctx=this.mcanvas.getContext('2d');
	this.ctx.beginPath();
	this.ctx.strokeStyle="black";
	this.ctx.fillStyle="rgba(255,0,0,1)";
	var Po; 
	var Qo;
	Qo=(this.piecenb<Puzzle.nbofcols)? 0 : this.yscale;
	Po=(this.piecenb%Puzzle.nbofcols==0)? 0 : this.xscale;
	this.ctx.moveTo(Po,Qo);//nextLine[0][0], nextLine[0][1]);
	//j each of the four curved lines using array from left to right for top horz and rigth vert, from right to left for j=2 or 3
	for (var j=0; j<4; j++){
		switch(j){
		 case 0 : p=Po; q=Qo;
		 
		 break;
		 case 1 : p=Po+5*this.xscale; q=Qo;
		  break;
		 case 2 : p=Po; q=Qo+5*this.yscale;
		 break;
		 case 3 : p=Po; q=Qo;
		 break;
		 default : alert("p,q ?");
		 }
		var name=this.path[j];
		var n=pickingArrays.arrlengths[name];
		if(this.path[j].charAt(0)=='b'){////bezier curves
			var i=0;
			while(i<n){
				switch(i) {
					case 0 :case 1 :case 5 : case 9 :
						var pt=Array(2);	
						if ((j==0)||(j==1)){pt=pickingArrays.map[name](p,q,i,this.xscale,this.yscale);}
						else {pt=pickingArrays.map[name](p,q,n-i-1,this.xscale,this.yscale);}
						//console.log("x: "+pt[0], "y:"+pt[1]);		
						this.ctx.lineTo(pt[0], pt[1]);
						break;
					case 2 : case 6:
						var pt1=Array(2); var pt2=Array(2);var pt3=Array(2);
						if ((j==0)||(j==1)){pt1=pickingArrays.map[name](p,q,i,this.xscale,this.yscale);
							pt2=pickingArrays.map[name](p,q,i+1,this.xscale,this.yscale);
							pt3=pickingArrays.map[name](p,q,i+2,this.xscale,this.yscale);
							this.ctx.bezierCurveTo(pt1[0],pt1[1],pt2[0],pt2[1],pt3[0],pt3[1]);
							}
						else {pt1=pickingArrays.map[name](p,q,n-i-1,this.xscale,this.yscale);
							pt2=pickingArrays.map[name](p,q,n-i-2,this.xscale,this.yscale);
							pt3=pickingArrays.map[name](p,q,n-i-3,this.xscale,this.yscale);
							
							this.ctx.bezierCurveTo(pt1[0],pt1[1],pt2[0],pt2[1],pt3[0],pt3[1]);
							}
						break;
					case 3: case 4: case 7: case 8:
					break;
					default : alert("case not found in switch");
					}
					i++;
					}
			}
		else{
		for (var i=0; i<n; i++){///straight lines 
			var pt=Array(2);	
			if ((j==0)||(j==1)){pt=pickingArrays.map[name](p,q,i,this.xscale,this.yscale);}
			else {pt=pickingArrays.map[name](p,q,n-i-1,this.xscale,this.yscale);}
			//var yy=pickingArrays('sqsqh',i,p,q,this.xscale,this.yscale);
			//console.log("x: "+pt[0], "y:"+pt[1]);		
			this.ctx.lineTo(pt[0], pt[1]);
			//ctx.lineTo(xx,yy);//, nextLine[i][1]);
				//console.log(nextLine[i][0],nextLine[i][1]);
			}
		}
	}
	this.ctx.fill();
	//this.ctx.strokeStyle="black";/// to get idea of size of piece
	//this.ctx.rect(1,1,this.mcanvas.width-2,this.mcanvas.height-2); this.ctx.stroke();
//this.mcanvas.style.display="none";
	//return this.mcanvas;
	}

	}
	
		
