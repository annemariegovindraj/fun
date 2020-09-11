//////draws puzzlepiece from arrays in mouldpiece and picture and  allows to select and drag  
///put all var at the top, moved findgrp higher for hoisting
///single piece dragged in middle of other grps problem; solved, but if on top of other group ProBLEM
///try with z values, but not for drawing
var Pictpieces=null;//=Array();
var Pieces=null;//Array();
var moulds=Array();
var imginfo= new function(){
		this.load=function(imgsource,callback){
				this.image=new Image();
				this.image.src=imgsource;
				//console.log(imgsource);
				this.image.onload=callback; //function(){nbitems=callback;}
				}
		this.getimgw=function(){
				return this.image.width;}
		this.getimgh=function(){
				return this.image.height;}
		this.draw=function(pctx,i){//console.log("drawing piece "+i);///can be shortened with widthofpieces, but works
			if(i==0){
	pctx.drawImage(this.image,0,0,6*Puzzle.xscale,6*Puzzle.yscale,0,0,6*Puzzle.xscale,6*Puzzle.yscale);
	} else if (i%Puzzle.nbofcols==0){
	pctx.drawImage(this.image,0,5*Puzzle.yscale*Math.floor(i/Puzzle.nbofcols)-Puzzle.yscale,6*Puzzle.xscale,7*Puzzle.yscale,0,0,6*Puzzle.xscale,7*Puzzle.yscale);
	} else if (Math.floor(i/Puzzle.nbofcols)==0){
		pctx.drawImage(this.image,5*Puzzle.xscale*(i%Puzzle.nbofcols)-Puzzle.xscale,0,7*Puzzle.xscale,6*Puzzle.yscale,0,0,7*Puzzle.xscale,6*Puzzle.yscale);
		}
		 else if (i>=(Puzzle.nbofpieces-Puzzle.nbofcols)){
		pctx.drawImage(this.image,5*Puzzle.xscale*(i%Puzzle.nbofcols)-Puzzle.xscale,5*Puzzle.yscale*Math.floor(i/Puzzle.nbofcols)-Puzzle.yscale,7*Puzzle.xscale,6*Puzzle.yscale,0,0,7*Puzzle.xscale,6*Puzzle.yscale);
		}	else if(i%Puzzle.nbofcols==(Puzzle.nbofcols-1)){
		pctx.drawImage(this.image,5*Puzzle.xscale*(i%Puzzle.nbofcols)-Puzzle.xscale,5*Puzzle.yscale*Math.floor(i/Puzzle.nbofcols)-Puzzle.yscale,6*Puzzle.xscale,7*Puzzle.yscale,0,0,6*Puzzle.xscale,7*Puzzle.yscale);
		}

	else{
	pctx.drawImage(this.image,5*Puzzle.xscale*(i%Puzzle.nbofcols)-Puzzle.xscale,5*Puzzle.yscale*Math.floor(i/Puzzle.nbofcols)-Puzzle.yscale,7*Puzzle.xscale,7*Puzzle.yscale,0,0,7*Puzzle.xscale,7*Puzzle.yscale);
		}
		}
	}			
var Composite= function(Cctx,i){

	//Cctx=acanvas.getContext('2d');
			//imginfo.draw(Picture.ctx,0,0);
		//Picture.ctx.globalCompositeOperation="destination-in";

		Cctx.drawImage(moulds[i].mcanvas,0,0);
		Cctx.globalCompositeOperation="source-in";
		Cctx.drawImage(Pictpieces[i].pcanvas,0,0);
		//return acanvas;
		}
Pcanvas= function(i){	
	this.pcanvas=document.createElement("canvas"); 
	this.pcanvas.height=Puzzle.heightofpieces[i];
	this.pcanvas.width=Puzzle.widthofpieces[i];
		
	//document.getElementById("the_div").appendChild(this.pcanvas);
	}
class Group {
   constructor(target,ps){
		this.Content=Array();
		this.leaderr;///leftmost piece, because %
		if((ps%Puzzle.nbofcols)>(target%Puzzle.nbofcols)){
			this.leaderr=target;
			}
		else {this.leaderr=ps;}
		this.Content.push(ps); 
		this.Content.push(target);
		//console.log("leader "+this.leaderr+ "target"+target); // OK
				}
	getContent=function(){
		return this.Content;
		}
	addmember=function(p){
		this.Content.push(p);
		if(this.leaderr%Puzzle.nbofcols>=p%Puzzle.nbofcols){
			this.leaderr=p;
			//console.log("leader "+this.leaderr+this.Content);
			}
		return this.leaderr;
		}
	
	doesContain=function(k){
		var sizeofgrp=this.Content.length;
		for (var i=0; i<sizeofgrp;i++){
			if (k==this.Content[i]){return true;}
			}
		return false;
		}
	}


var Puzzle=new function(){
	this.bigcanvas=document.getElementById("big");
	this.bigcanvas.width=window.innerWidth;
	this.bigcanvas.height=window.innerHeight;
	this.bigcanvas.style="position:absolute"
	this.bigcanvas.style.left="0px"; 
	this.bigcanvas.style.top="0px";
	this.ctx=this.bigcanvas.getContext("2d");
	this.widthofpieces=null;
	this.heightofpieces=null;
	this.grps=Array();
	this.oldlocationsx=null;
	this.oldlocationsy=null;
	this.pieceselect=false;
	this.grpselect=false;
	this.pieceselected=-1;
	this.groupdragged=-1;
	
this.firstimgloading=function(imgsource,nbcolumns,nbrows,callback){
		Puzzle.nbofcols=nbcolumns;
		Puzzle.nbofrows=nbrows;
		Puzzle.nbofpieces=nbcolumns*nbrows;
		imginfo.load(imgsource,callback);
		}
	
	this.initialize=function(){
			//imgsource="mychildren.png";
//for canvas 3 x 2 , divide height by 10, width by 15, round off	
	
	var w=imginfo.getimgw();
	var h=imginfo.getimgh(h);
	//console.log("w/h"+w+","+h);//ok
	Puzzle.zs=Array(Puzzle.nbofpieces);
	for(var i=0;i<Puzzle.nbofpieces;i++){
		Puzzle.zs[i]=3;}//stand-alone pieces get z value of 3
	Puzzle.xscale=Math.floor(w/(5*Puzzle.nbofcols));
	Puzzle.yscale=Math.floor(h/(5*Puzzle.nbofrows));
	//console.log(Puzzle.xscale, Puzzle.yscale);//,this.nbofcols);//=nbcolumns;
	//this.nbofrows=nbrows;
	//this.nbofpieces=nbcolumns*nbrows;
	Puzzle.widthofpieces=Array(Puzzle.nbofpieces);
	Puzzle.heightofpieces=Array(Puzzle.nbofpieces);
	for(var i=0;i<Puzzle.nbofpieces;i++){
		if ((i<Puzzle.nbofcols)|| (i>=(Puzzle.nbofpieces-Puzzle.nbofcols))){
			Puzzle.heightofpieces[i]=6*Puzzle.yscale;
			} 
		else {	
			Puzzle.heightofpieces[i]=7*Puzzle.yscale;
		}
		if((i%Puzzle.nbofcols==(Puzzle.nbofcols-1))||(i%Puzzle.nbofcols==0)){
			Puzzle.widthofpieces[i]=6*Puzzle.xscale;
			}
		else {
			Puzzle.widthofpieces[i]=7*Puzzle.xscale;
			}
		}
	Pictpieces=Array(Puzzle.nbofpieces);
	Pieces=Array(Puzzle.nbofpieces);
	for(var i=0;i<Puzzle.nbofpieces;i++){
			moulds[i]= new MouldPiece(i,Puzzle.xscale,Puzzle.yscale);
			moulds[i].choosePath();
			//moulds[i].drawPath();
		//	document.getElementById("the_div").appendChild(moulds[i].mcanvas);
			Pieces[i]=new Pcanvas(i);
			Pictpieces[i]=new Pcanvas(i);
			}
			//canvas2=document.createElement("canvas"); 
		//canvas2.height=7*this.yscale;
		//canvas2.width=7*this.xscale; //scale*5*Math.round(w/5);
		Puzzle.locationsx=Array(Puzzle.nbofpieces);
		Puzzle.locationsy=Array(Puzzle.nbofpieces);
		for(var i=0;i<Puzzle.nbofpieces;i++){
			var x=Math.floor(Math.random()*(Puzzle.bigcanvas.width-7*Puzzle.xscale));
			var y=Math.floor(Math.random()*(Puzzle.bigcanvas.height-7*Puzzle.yscale));
			Puzzle.locationsx[i]=x;
			Puzzle.locationsy[i]=y;
			}
			Puzzle.draw();
		}
	this.draw=function(){
		/*for(var i=0;i<3;i++){
		window.setTimeout(function(){imginfo.draw(i);
									Composite(Pictpieces[i],i);
									
									},20+10*i);*/
		for(var i=0;i<Puzzle.nbofpieces;i++){
			//var y=300*Math.floor(i/3);
			//var x=(i%3)*280;
			imginfo.draw(Pictpieces[i].pcanvas.getContext("2d"),i);
			Composite(Pieces[i].pcanvas.getContext('2d'),i);
			
		Puzzle.ctx.drawImage(Pieces[i].pcanvas,Puzzle.locationsx[i], Puzzle.locationsy[i]);
		}
	
		//document.getElementById("the_div").appendChild(canvas1);
	//document.getElementById("the_div").appendChild(canvas2);
	}
	
	this.findGroup=function(target, ps){
		//console.log("target "+target+"incom"+ps);//OK, ps is pieceselected
		var g=0;
		var oldnbofgrps=Puzzle.grps.length;
		
		if((Puzzle.pieceselect==true)&& (ps>=0)){
				if (oldnbofgrps==0){
				var newgrp=new Group(target,ps);
				Puzzle.zs[target]=1;
				Puzzle.zs[ps]=1;
				Puzzle.grps.push(newgrp);
					return g;
				}
				for (var g=0; g<oldnbofgrps;g++){///if target in existing group 
						var bool1=false,bool2=true;
						//console.log(Puzzle.grps[g].Content);
						bool1=Puzzle.grps[g].doesContain(target);
						//console.log("Group"+g+"contains?"+target +" "+bool1);
						bool2=Puzzle.grps[g].doesContain(ps);
						//console.log("Group"+g+"contains?"+ps +" "+bool2);
						if((bool1==true)&&(bool2==false)){
							Puzzle.grps[g].addmember(Puzzle.pieceselected);///can i say ps here?
							Puzzle.zs[ps]=1;
							return g;
							}
						}
				g=oldnbofgrps;///target not in a grp yet
				Puzzle.grps.push(new Group(target,ps));
				Puzzle.zs[target]=1;
				Puzzle.zs[ps]=1;
				return g;
			}
						
		else if(Puzzle.grpselect==true){//console.log("in findgroup, dragged grp"+Puzzle.groupdragged);
			for (var g=0; g<=oldnbofgrps;g++){
					if(g==oldnbofgrps){
							Puzzle.grps[Puzzle.groupdragged].addmember(target);
							return Puzzle.groupdragged;
							}	///target not in a grp yet, target =1 piece; add target to groupdragged 
					else{
				///if target in existing group 
					var bool1=false,bool2=true;
						//console.log(Puzzle.grps[g].Content);
						bool1=Puzzle.grps[g].doesContain(target);
						//console.log("Group"+g+"contains?"+target +" "+bool1);
						bool2=Puzzle.grps[g].doesContain(ps);
						//console.log("Group"+g+"contains?"+ps +" "+bool2);
						if((bool1==true)&&(bool2==false)){
							//console.log("foundgroup "+g);//Puzzle.grps[g].addmember(Puzzle.pieceselected);//not here
							return g;
							}
						}
					
					}
				}
		}
			
	this.resolveButton=function(event){
		Puzzle.pieceselect=false;
		Puzzle.pieceselected=-1;
		Puzzle.groupdragged=-1;
		var nx=event.pageX; //var nxx=event.clientX;
		var ny=event.pageY; //var nyy=event.clientY;
		for( var i=0; i<Puzzle.nbofpieces;i++){
			if(Puzzle.zs[i]!=3) continue;
			else if((ny>Puzzle.locationsy[i])&&(ny<(Puzzle.locationsy[i]+Puzzle.heightofpieces[i]))&&(nx>Puzzle.locationsx[i])&&(nx<(Puzzle.locationsx[i]+Puzzle.widthofpieces[i]))){
					Puzzle.pieceselected=i;
					Puzzle.pieceselect=true;
					Puzzle.grpselect=false;
					Puzzle.offsetx=nx-Puzzle.locationsx[Puzzle.pieceselected];
					Puzzle.offsety=ny-Puzzle.locationsy[Puzzle.pieceselected];
					return ;//??
					}
				}
		if(Puzzle.pieceselect==false){
		for( var i=0; i<Puzzle.nbofpieces;i++){///while select===false?
			if((ny>Puzzle.locationsy[i])&&(ny<(Puzzle.locationsy[i]+Puzzle.heightofpieces[i]))&&(nx>Puzzle.locationsx[i])&&(nx<(Puzzle.locationsx[i]+Puzzle.widthofpieces[i]))){
					Puzzle.pieceselected=i;
					for(var g=0; g<Puzzle.grps.length;g++){
						if (Puzzle.grps[g].doesContain(i)==true){
							//console.log(g+" , "+Puzzle.grps[g].Content);
							Puzzle.groupdragged=g; 
							Puzzle.grpselect=true;
							Puzzle.pieceselect=false;//var cont=Array();
							//cont=Puzzle.grps[g].Content;  gives erratic results upon iteration
							//console.log(Puzzle.grps[g].Content.length);
							Puzzle.oldlocationsx=new Map(); 
							Puzzle.oldlocationsy=new Map();
							//console.log("group "+Puzzle.grpselect);//ok
							for (var pp=0; pp<Puzzle.grps[g].Content.length; pp++){ //to keep right distance while dragging
							//console.log(Puzzle.grps[g].Content[pp]);
								Puzzle.oldlocationsx.set(Puzzle.grps[g].Content[pp],Puzzle.locationsx[Puzzle.grps[g].Content[pp]]);
								Puzzle.oldlocationsy.set(Puzzle.grps[g].Content[pp],Puzzle.locationsy[Puzzle.grps[g].Content[pp]]);//cont[pp],Puzzle.locationsy[cont[pp]]);
								}
							//console.log(Puzzle.oldlocationsx);///goes on forever if using cont.length, correct map now
							//console.log("piece "+Puzzle.pieceselected+",grp "+Puzzle.groupdragged);//ok
							Puzzle.offsetx=nx-Puzzle.locationsx[Puzzle.pieceselected];
							Puzzle.offsety=ny-Puzzle.locationsy[Puzzle.pieceselected];
							break;///dont look for another grp
							}
						}
					}///clicked not on this peice
				/*	if(g==Puzzle.grps.length){///one piece only, not in grp yet
						Puzzle.pieceselect=true;
						Puzzle.grpselect=false;
						Puzzle.offsetx=nx-Puzzle.locationsx[Puzzle.pieceselected];
						Puzzle.offsety=ny-Puzzle.locationsy[Puzzle.pieceselected];
				}*/
					}//clicked middle of nowhere
				}
			}
		
	
	this.drag=function(event){ event.preventDefault();
		Puzzle.locationsx[Puzzle.pieceselected]=(event.pageX-Puzzle.offsetx);
		Puzzle.locationsy[Puzzle.pieceselected]=(event.pageY-Puzzle.offsety);
		//console.log(Puzzle.pieceselected);
		if(Puzzle.pieceselect===true){
			//console.log("location "+Puzzle.locationsx[Puzzle.pieceselected]+","+Puzzle.locationsy[Puzzle.pieceselected]);
			Puzzle.ctx.clearRect(0,0,Puzzle.bigcanvas.width, Puzzle.bigcanvas.height);  
			Puzzle.draw();//.contx.fillRect(0,0,window.innerWidth,window.innerHeight);
			}
		else if (Puzzle.groupdragged>=0){
			//console.log(Puzzle.grps[Puzzle.groupdragged].Content);//ok
			//console.log(Puzzle.oldlocationsx.get(Puzzle.pieceselected));
			var deltax=Puzzle.locationsx[Puzzle.pieceselected]-Puzzle.oldlocationsx.get(Puzzle.pieceselected);
			var deltay=Puzzle.locationsy[Puzzle.pieceselected]-Puzzle.oldlocationsy.get(Puzzle.pieceselected);
			//console.log("deltas "+deltax+" , "+deltay);//ok
			
			var cont=Puzzle.grps[Puzzle.groupdragged].Content;
			//for (var pp=0; pp<cont.length; p++){
			for (var piec in cont){		
				Puzzle.locationsx[cont[piec]]=Puzzle.oldlocationsx.get(cont[piec])+deltax;
					//console.log(Puzzle.locationsx[Puzzle.grps[Puzzle.groupdragged].Content[piec]]);
				Puzzle.locationsy[cont[piec]]=Puzzle.oldlocationsy.get(cont[piec])+deltay;;
				}
			/*for (var pp=0; pp<cont.length; p++){//Puzzle.grps[Puzzle.groupdragged].Content.length; p++){
				Puzzle.locationsx[Puzzle.grps[Puzzle.groupdragged].Content[pp]]=Puzzle.oldlocationsx.get(Puzzle.grps[Puzzle.groupdragged].Content[pp])+deltax;
				Puzzle.locationsy[Puzzle.grps[Puzzle.groupdragged].Content[pp]]=Puzzle.oldlocationsy.get(Puzzle.grps[Puzzle.groupdragged].Content[pp])+deltay;;
				}*/
					
			Puzzle.ctx.clearRect(0,0,Puzzle.bigcanvas.width, Puzzle.bigcanvas.height);  
			Puzzle.draw();
			}
		}
	this.checkTarget=function(event){ //console.log();
		//console.log("grp"+Puzzle.grpselect) 
		//if(Puzzle.pieceselect==true){
			//console.log("piece "+Puzzle.pieceselected);
			var PosX=(event.pageX-Puzzle.offsetx);
			var PosY=(event.pageY-Puzzle.offsety);
			Puzzle.locationsx[Puzzle.pieceselected]=PosX;
			Puzzle.locationsy[Puzzle.pieceselected]=PosY;
		if(Puzzle.pieceselect==true){
				var itsgrp=-1;
				//console.log("dropped "+Puzzle.locationsx[Puzzle.pieceselected]+","+Puzzle.locationsy[Puzzle.pieceselected]);
				Puzzle.offsetx=0;
				Puzzle.offsety=0;  
				var targetL=Puzzle.pieceselected-1; var targetR=Puzzle.pieceselected+1;
				var targetU=Puzzle.pieceselected-Puzzle.nbofcols; var targetD=Puzzle.pieceselected+Puzzle.nbofcols;
				///hope no Map needed because proceeding piece per piece
	////appproach from below
				if((Puzzle.pieceselect==true)&&(Puzzle.pieceselected>=Puzzle.nbofcols)&&(Math.abs(PosY-Puzzle.locationsy[targetU]-Puzzle.heightofpieces[targetU]+2*Puzzle.yscale)<5)&&(Math.abs(PosX-Puzzle.locationsx[targetU])<5)){
					Puzzle.locationsx[Puzzle.pieceselected]=Puzzle.locationsx[targetU]; //+Puzzle.widthofpieces[])+2*Puzzle.xscale;
					Puzzle.locationsy[Puzzle.pieceselected]=Puzzle.locationsy[targetU]+Puzzle.heightofpieces[targetU]-2*Puzzle.yscale;
			//console.log("distx "+Math.abs(PosX-Puzzle.locationsx[targetU])+ " disty "+Math.abs(PosY-Puzzle.locationsy[targetU]-Puzzle.heightofpieces[targetU]+2*Puzzle.yscale));console.log("uptarget "+targetU);
					itsgrp=Puzzle.findGroup(targetU, Puzzle.pieceselected);
					if(itsgrp>=0){Puzzle.pieceselect=false;	}
					}
					////appproach from the right
				if((Puzzle.pieceselect==true)&&(Puzzle.pieceselected%Puzzle.nbofcols!=0)&&(Math.abs(PosY-Puzzle.locationsy[targetL])<5)&&(Math.abs(PosX-Puzzle.locationsx[targetL]-Puzzle.widthofpieces[targetL]+2*Puzzle.xscale)<5)){
					Puzzle.locationsx[Puzzle.pieceselected]=Puzzle.locationsx[targetL]+Puzzle.widthofpieces[targetL]-2*Puzzle.xscale;
					Puzzle.locationsy[Puzzle.pieceselected]=Puzzle.locationsy[targetL];//Puzzle.heightofpieces[])+2*Puzzle.yscale;
			//console.log("distx "+(PosX-Puzzle.locationsx[targetL]-Puzzle.widthofpieces[targetL]+2*Puzzle.xscale)+ " disty "+Math.abs(PosY-Puzzle.locationsy[targetL]));//console.log("lefttarget "+targetL);
					itsgrp=Puzzle.findGroup(targetL, Puzzle.pieceselected);
					if(itsgrp>=0){Puzzle.pieceselect=false;	}
					}
					////appproach from top
				if((Puzzle.pieceselect==true)&&(Puzzle.pieceselected<(Puzzle.nbofpieces-Puzzle.nbofcols))&&(Math.abs(PosY+Puzzle.heightofpieces[Puzzle.pieceselected]-2*Puzzle.yscale-Puzzle.locationsy[targetD])<5)&&(Math.abs(PosX-Puzzle.locationsx[targetD])<5)){
					//console.log("distx "+Math.abs(PosX-Puzzle.locationsx[targetD])+ " disty "+(-PosY+Puzzle.locationsy[targetD]-Puzzle.heightofpieces[Puzzle.pieceselected]+2*Puzzle.yscale));
					//console.log("downtarget "+targetD);
					Puzzle.locationsx[Puzzle.pieceselected]=Puzzle.locationsx[targetD];//+Puzzle.widthofpieces[])+2*Puzzle.xscale;
					Puzzle.locationsy[Puzzle.pieceselected]=Puzzle.locationsy[targetD]-Puzzle.heightofpieces[Puzzle.pieceselected]+2*Puzzle.yscale;
						itsgrp=Puzzle.findGroup(targetD, Puzzle.pieceselected);
					if(itsgrp>=0){Puzzle.pieceselect=false;	}
						}
					////appproach from left
				if((Puzzle.pieceselect==true)&&(Puzzle.pieceselected%Puzzle.nbofcols<(Puzzle.nbofcols-1))&&(Math.abs(PosY-Puzzle.locationsy[targetR])<5)&&(Math.abs(PosX+Puzzle.widthofpieces[Puzzle.pieceselected]-2*Puzzle.xscale-Puzzle.locationsx[targetR])<5)){
					//console.log("distx "+(-PosX-Puzzle.widthofpieces[Puzzle.pieceselected]+2*Puzzle.xscale+Puzzle.locationsx[targetR])+ " disty "+Math.abs(PosY-Puzzle.locationsy[targetR]));//console.log("righttarget "+targetR);
					Puzzle.locationsx[Puzzle.pieceselected]=Puzzle.locationsx[targetR]-Puzzle.widthofpieces[Puzzle.pieceselected]+2*Puzzle.xscale;
					Puzzle.locationsy[Puzzle.pieceselected]=Puzzle.locationsy[targetR];//+Puzzle.heightofpieces[])+2*Puzzle.yscale;
					itsgrp=Puzzle.findGroup(targetR, Puzzle.pieceselected);
					if(itsgrp>=0){Puzzle.pieceselect=false;	}
					}
				Puzzle.pieceselect=false;///no target found
				}
		else if(Puzzle.grpselect==true){
				//console.log(Puzzle.groupdragged);
				var cont=Puzzle.grps[Puzzle.groupdragged].getContent();
						if(cont.length==Puzzle.nbofpieces){alert( "Congratulations, Game over");}
						contlength=Puzzle.grps[Puzzle.groupdragged].Content.length;
						//console.log("content of grp dragged"+cont+" length "+contlength); //ok
								//for (var piec in cont){	//console.log("pieceexamined "+piec);	}//takes 0, and 1
						var grpfound=false;
						////first look for edge pieces on right edge of groupdragged
				for (var pp=0; pp<contlength; pp++){
					var piec=cont[pp];//Puzzle.grps[Puzzle.groupdragged].Content[pp];
						//console.log(piec);
									////appproach from the right, piec in grpdragged
					if((piec%Puzzle.nbofcols==0)||((Puzzle.grps[Puzzle.groupdragged].doesContain(piec-1))==true)||(grpfound==true)){}
					else { 
						var targetL=(piec-1);
						if((Math.abs(Puzzle.locationsx[piec]-Puzzle.locationsx[targetL]-Puzzle.widthofpieces[targetL]+2*Puzzle.xscale)<5)&&(Math.abs(Puzzle.locationsy[piec]-Puzzle.locationsy[targetL])<5)){
							//console.log("approaching from right with piec"+piec+" ,targetL"+targetL+",locx "+Puzzle.locationsx[targetL])
							var oldlocx=Puzzle.locationsx[targetL];///safe keeping to know where each piece of itsgrp is compared to target
							var oldlocy=Puzzle.locationsy[targetL];
							//console.log("send to findgroup");
							itsgrp=Puzzle.findGroup(targetL, piec);
							//console.log("itsgrp "+itsgrp);//ok finds correct group
							///reposition targetpiece
							Puzzle.locationsy[targetL]=Puzzle.locationsy[piec];
							Puzzle.locationsx[targetL]=Puzzle.locationsx[piec]-Puzzle.widthofpieces[targetL]+2*Puzzle.xscale;
							
							if (itsgrp==Puzzle.groupdragged){ ///only one piece as target, add the single piece
								//all done , locations changed, piece added in group in findgroup, nbgrp not changed
								}
							else if(itsgrp>=0){
								//console.log("will absorb "+Puzzle.grps[itsgrp].Content);
									
								var itsgrpcont=Puzzle.grps[itsgrp].getContent();
								for(var pp=0; pp<itsgrpcont.length; pp++){
									itsgrppiec=Puzzle.grps[itsgrp].Content[pp];
										//console.log(Puzzle.grps[itsgrp].Content);
										var offstx=Puzzle.locationsx[itsgrppiec]-oldlocx;///should give position piece in itsgrp
										var offsty=Puzzle.locationsy[itsgrppiec]-oldlocy;///should be negative mostly
										Puzzle.locationsx[itsgrppiec]=Puzzle.locationsx[targetL]+offstx;
										Puzzle.locationsy[itsgrppiec]=Puzzle.locationsy[targetL]+offsty;
										Puzzle.grps[Puzzle.groupdragged].addmember(itsgrppiec);

									}
								Puzzle.grps.splice(itsgrp,1);
								grpfound=true;}
							}
							//break;
							}
								////appproach from below
					if(((piec-Puzzle.nbofcols)<0)||(grpfound==true)||((Puzzle.grps[Puzzle.groupdragged].doesContain(piec-Puzzle.nbofcols))==true)){}
					else { //piec is in groupdragged 
						var targetU=(piec-Puzzle.nbofcols);
						//console.log("approaching from below with piec "+piec+"at "+Puzzle.locationsy[piec] +"to "+targetU+" at "+(Puzzle.locationsy[piec]));
						if((Math.abs(Puzzle.locationsy[piec]-Puzzle.locationsy[targetU]-Puzzle.heightofpieces[targetU]+2*Puzzle.yscale)<5)&&(Math.abs(Puzzle.locationsx[piec]-Puzzle.locationsx[targetU])<5)){
							//console.log("got target with piec "+piec +"at "+(Puzzle.locationsy[piec])+", targetU="+Puzzle.locationsy[targetU]);
							var oldlocx=Puzzle.locationsx[targetU];///safe keeping to know where each piece of itsgrp is compared to target
							var oldlocy=Puzzle.locationsy[targetU];
							//console.log("send to findgroup");
							itsgrp=Puzzle.findGroup(targetU, piec);
							//console.log("itsgrp "+itsgrp);//ok finds correct group
							///reposition targetpiece
							Puzzle.locationsx[targetU]=Puzzle.locationsx[piec];
							Puzzle.locationsy[targetU]=Puzzle.locationsy[piec]-Puzzle.heightofpieces[targetU]+2*Puzzle.yscale;
							
							if (itsgrp==Puzzle.groupdragged){ ///only one piece as target, add the single piece
								//all done , locations changed, piece added in group in findgroup, nbgrp not changed
								}
							else if(itsgrp>=0){
								//console.log(Puzzle.grps[itsgrp].Content);
								var itsgrpcont=Puzzle.grps[itsgrp].getContent();
								for(var pp=0; pp<itsgrpcont.length; pp++){
									itsgrppiec=Puzzle.grps[itsgrp].Content[pp];
										//console.log(Puzzle.grps[itsgrp].Content);
										var offstx=Puzzle.locationsx[itsgrppiec]-oldlocx;///should give position piece in itsgrp
										var offsty=Puzzle.locationsy[itsgrppiec]-oldlocy;///should be negative mostly
										Puzzle.locationsx[itsgrppiec]=Puzzle.locationsx[targetU]+offstx;
										Puzzle.locationsy[itsgrppiec]=Puzzle.locationsy[targetU]+offsty;
										Puzzle.grps[Puzzle.groupdragged].addmember(itsgrppiec);

									}
								Puzzle.grps.splice(itsgrp,1);
								grpfound=true; 
								}
							}
							//break;
						}
				///approach from top
				if((piec>=(Puzzle.nbofpieces-Puzzle.nbofcols))||(grpfound==true)||((Puzzle.grps[Puzzle.groupdragged].doesContain(piec+Puzzle.nbofcols))==true)){}
				else  {
					var targetD=(piec+Puzzle.nbofcols);
					//console.log("approaching from top with piece "+piec+" at "+Puzzle.locationsy[piec]+", to targetD "+ targetD+" at"+Puzzle.locationsy[targetD]);
					if((Math.abs(-Puzzle.locationsy[piec]+Puzzle.locationsy[targetD]-Puzzle.heightofpieces[piec]+2*Puzzle.yscale)<5)&&(Math.abs(Puzzle.locationsx[piec]-Puzzle.locationsx[targetD])<5)){
						//console.log("found target with piece "+piec+" at "+Puzzle.locationsy[piec]+", to targetD "+ targetD+" at"+Puzzle.locationsy[targetD]);
					var oldlocx=Puzzle.locationsx[targetD];///safe keeping to know where each piece of itsgrp is compared to target
						var oldlocy=Puzzle.locationsy[targetD];
								itsgrp=Puzzle.findGroup(targetD, piec);
							//console.log("itsgrp "+itsgrp);
							///reposition targetpiece
							Puzzle.locationsx[targetD]=Puzzle.locationsx[piec];
							Puzzle.locationsy[targetD]=Puzzle.locationsy[piec]+Puzzle.heightofpieces[piec]-2*Puzzle.yscale;
						if (itsgrp==Puzzle.groupdragged){ }
						else if(itsgrp>=0){
								//console.log(Puzzle.grps[itsgrp].Content);
								var itsgrpcont=Puzzle.grps[itsgrp].getContent();
								for(var pp=0; pp<itsgrpcont.length; pp++){
									itsgrppiec=Puzzle.grps[itsgrp].Content[pp];
										//console.log(Puzzle.grps[itsgrp].Content);
										var offstx=Puzzle.locationsx[itsgrppiec]-oldlocx;///should give position piece in itsgrp
										var offsty=Puzzle.locationsy[itsgrppiec]-oldlocy;
										Puzzle.locationsx[itsgrppiec]=Puzzle.locationsx[targetD]+offstx;
										Puzzle.locationsy[itsgrppiec]=Puzzle.locationsy[targetD]+offsty;
										Puzzle.grps[Puzzle.groupdragged].addmember(itsgrppiec);

									}
								Puzzle.grps.splice(itsgrp,1);
								grpfound=true;}
							}
							//break;
						}
					////appproach from the left, piec in grpdragged
					if((piec%Puzzle.nbofcols==(Puzzle.nbofcols-1))||(grpfound==true)||((Puzzle.grps[Puzzle.groupdragged].doesContain(piec+1))==true)){}
					else {
						var targetR=(piec+1);
						//console.log("targetR"+targetR+",locx "+Puzzle.locationsx[targetR])
						//console.log("looking from left with "+piec+ " at "+(Puzzle.locationsx[piec])+",targetR"+Puzzle.locationsx[targetR]);
						if((Math.abs(-Puzzle.locationsx[piec]+Puzzle.locationsx[targetR]-Puzzle.widthofpieces[piec]+2*Puzzle.xscale)<5)&&(Math.abs(Puzzle.locationsy[piec]-Puzzle.locationsy[targetR])<5)){
							var oldlocx=Puzzle.locationsx[targetR];///safe keeping to know where each piece of itsgrp is compared to target
							var oldlocy=Puzzle.locationsy[targetR];
							itsgrp=Puzzle.findGroup(targetR, piec);
							//console.log("itsgrp "+itsgrp);//ok finds correct group
							///reposition targetpiece
							Puzzle.locationsy[targetR]=Puzzle.locationsy[piec];
							Puzzle.locationsx[targetR]=Puzzle.locationsx[piec]+Puzzle.widthofpieces[piec]-2*Puzzle.xscale;
							
							if (itsgrp==Puzzle.groupdragged){ }
							else if(itsgrp>=0){
								//console.log(Puzzle.grps[itsgrp].Content);
									
								var itsgrpcont=Puzzle.grps[itsgrp].getContent();
								for(var pp=0; pp<itsgrpcont.length; pp++){
									itsgrppiec=Puzzle.grps[itsgrp].Content[pp];
										//console.log(Puzzle.grps[itsgrp].Content);
										var offstx=Puzzle.locationsx[itsgrppiec]-oldlocx;///should give position piece in itsgrp
										var offsty=Puzzle.locationsy[itsgrppiec]-oldlocy;
										Puzzle.locationsx[itsgrppiec]=Puzzle.locationsx[targetR]+offstx;
										Puzzle.locationsy[itsgrppiec]=Puzzle.locationsy[targetR]+offsty;
										Puzzle.grps[Puzzle.groupdragged].addmember(itsgrppiec);
										}
								Puzzle.grps.splice(itsgrp,1);
								grpfound=true;
								}
							}
							//break;
						}
					}
				Puzzle.grpselect=false;//no dragging
				//
				
				Puzzle.groupdragged=-1;
				//console.log("stopped dragging because grpfound =" +grpfound);
				}///else : nothing dropped the piece/group in the middle of nowhere
				for (var i=0;i<Puzzle.grps.length;i++){console.log("nb of grps"+Puzzle.grps.length+"which "+Puzzle.grps[i].Content);}
				
			Puzzle.pieceselected=-1;
			//Puzzle.pieceselect=false;
			Puzzle.draw();
			}	
		
		
	
	/*this.bigcanvas.addEventListener('touchstart', this.resolveButton);
	this.bigcanvas.addEventListener('touchmove', this.drag);
	this.bigcanvas.addEventListener('touchend', this.checkTarget);
	*/
	this.bigcanvas.addEventListener('mousedown',  this.resolveButton);
	this.bigcanvas.addEventListener('mousemove', this.drag);
	this.bigcanvas.addEventListener('mouseup', this.checkTarget);
	this.bigcanvas.addEventListener('mouseclicked', this.resolveButton);
		
}
//window.addEventListener("load",function(){Puzzle.initialize(imgsource,nbcolums,nbrows,Puzzle.draw);});
