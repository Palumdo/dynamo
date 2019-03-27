
RGraph=window.RGraph||{isRGraph:true};RGraph.Meter=function(conf)
{if(typeof conf==='object'&&typeof conf.value!=='undefined'&&typeof conf.id==='string'){var id=conf.id
var canvas=document.getElementById(id);var min=conf.min;var max=conf.max;var value=conf.value;var parseConfObjectForOptions=true;}else{var id=conf;var canvas=document.getElementById(id);var min=arguments[1];var max=arguments[2];var value=arguments[3];}
this.id=id;this.canvas=canvas;this.context=this.canvas.getContext?this.canvas.getContext("2d",{alpha:(typeof id==='object'&&id.alpha===false)?false:true}):null;this.canvas.__object__=this;this.type='meter';this.min=RGraph.stringsToNumbers(min);this.max=RGraph.stringsToNumbers(max);this.value=RGraph.stringsToNumbers(value);this.centerx=null;this.centery=null;this.radius=null;this.isRGraph=true;this.currentValue=null;this.uid=RGraph.CreateUID();this.canvas.uid=this.canvas.uid?this.canvas.uid:RGraph.CreateUID();this.colorsParsed=false;this.coordsText=[];this.original_colors=[];this.firstDraw=true;this.properties={'chart.background.image.url':null,'chart.background.image.offsetx':0,'chart.background.image.offsety':0,'chart.background.image.stretch':true,'chart.background.color':'white','chart.gutter.left':15,'chart.gutter.right':15,'chart.gutter.top':15,'chart.gutter.bottom':20,'chart.linewidth':1,'chart.linewidth.segments':0,'chart.strokestyle':null,'chart.border':true,'chart.border.color':'black','chart.text.font':'Arial, Verdana, sans-serif','chart.text.size':12,'chart.text.color':'black','chart.text.valign':'center','chart.text.accessible':false,'chart.text.accessible.overflow':'visible','chart.text.accessible.pointerevents':false,'chart.value.text':false,'chart.value.text.font':null,'chart.value.text.size':16,'chart.value.text.bold':false,'chart.value.text.italic':false,'chart.value.text.color':null,'chart.value.text.decimals':0,'chart.value.text.units.pre':'','chart.value.text.units.post':'','chart.value.text.background':true,'chart.value.text.background.fill':'rgba(255,255,255,0.75)','chart.value.text.background.stroke':'rgba(0,0,0,0)','chart.title':'','chart.title.background':null,'chart.title.hpos':null,'chart.title.vpos':null,'chart.title.color':'black','chart.title.bold':true,'chart.title.font':null,'chart.title.x':null,'chart.title.y':null,'chart.title.halign':null,'chart.title.valign':null,'chart.green.start':((this.max-this.min)*0.35)+this.min,'chart.green.end':this.max,'chart.green.color':'#207A20','chart.yellow.start':((this.max-this.min)*0.1)+this.min,'chart.yellow.end':((this.max-this.min)*0.35)+this.min,'chart.yellow.color':'#D0AC41','chart.red.start':this.min,'chart.red.end':((this.max-this.min)*0.1)+this.min,'chart.red.color':'#9E1E1E','chart.colors.ranges':null,'chart.units.pre':'','chart.units.post':'','chart.contextmenu':null,'chart.zoom.factor':1.5,'chart.zoom.fade.in':true,'chart.zoom.fade.out':true,'chart.zoom.hdir':'right','chart.zoom.vdir':'down','chart.zoom.frames':25,'chart.zoom.delay':16.666,'chart.zoom.shadow':true,'chart.zoom.background':true,'chart.zoom.action':'zoom','chart.annotatable':false,'chart.annotate.color':'black','chart.shadow':false,'chart.shadow.color':'rgba(0,0,0,0.5)','chart.shadow.blur':3,'chart.shadow.offsetx':3,'chart.shadow.offsety':3,'chart.resizable':false,'chart.resize.handle.adjust':[0,0],'chart.resize.handle.background':null,'chart.tickmarks.small.num':100,'chart.tickmarks.big.num':10,'chart.tickmarks.small.color':'#bbb','chart.tickmarks.big.color':'black','chart.scale.decimals':0,'chart.scale.point':'.','chart.scale.thousand':',','chart.radius':null,'chart.centerx':null,'chart.centery':null,'chart.labels':true,'chart.labels.count':10,'chart.labels.specific':null,'chart.labels.radius.offset':0,'chart.segment.radius.start':0,'chart.needle.radius':null,'chart.needle.type':'normal','chart.needle.tail':false,'chart.needle.head':true,'chart.needle.color':'black','chart.needle.image.url':null,'chart.needle.image.offsetx':0,'chart.needle.image.offsety':0,'chart.adjustable':false,'chart.angles.start':RGraph.PI,'chart.angles.end':RGraph.TWOPI,'chart.centerpin.stroke':'black','chart.centerpin.fill':'white','chart.clearto':'rgba(0,0,0,0)'}
if(!this.canvas){alert('[METER] No canvas support');return;}
if(!this.canvas.__rgraph_aa_translated__){this.context.translate(0.5,0.5);this.canvas.__rgraph_aa_translated__=true;}
var RG=RGraph,ca=this.canvas,co=ca.getContext('2d'),prop=this.properties,pa2=RG.path2,win=window,doc=document,ma=Math
if(RG.Effects&&typeof RG.Effects.decorate==='function'){RG.Effects.decorate(this);}
this.set=this.Set=function(name)
{var value=arguments[1]||null;if(arguments.length===1&&typeof name==='object'){RG.parseObjectStyleConfig(this,name);return this;}
if(name.substr(0,6)!='chart.'){name='chart.'+name;}
while(name.match(/([A-Z])/)){name=name.replace(/([A-Z])/,'.'+RegExp.$1.toLowerCase());}
if(name=='chart.value'){this.value=value;return;}
prop[name]=value;return this;};this.get=this.Get=function(name)
{if(name.substr(0,6)!='chart.'){name='chart.'+name;}
while(name.match(/([A-Z])/)){name=name.replace(/([A-Z])/,'.'+RegExp.$1.toLowerCase());}
if(name=='chart.value'){return this.value;}
return prop[name];};this.draw=this.Draw=function()
{RG.FireCustomEvent(this,'onbeforedraw');if(this.value>this.max)this.value=this.max;if(this.value<this.min)this.value=this.min;this.currentValue=this.value;this.gutterLeft=prop['chart.gutter.left'];this.gutterRight=prop['chart.gutter.right'];this.gutterTop=prop['chart.gutter.top'];this.gutterBottom=prop['chart.gutter.bottom'];this.centerx=((ca.width-this.gutterLeft-this.gutterRight)/2)+this.gutterLeft;this.centery=ca.height-this.gutterBottom;this.radius=Math.min((ca.width-this.gutterLeft-this.gutterRight)/2,(ca.height-this.gutterTop-this.gutterBottom));this.coordsText=[];if(typeof(prop['chart.centerx'])=='number')this.centerx=prop['chart.centerx'];if(typeof(prop['chart.centery'])=='number')this.centery=prop['chart.centery'];if(typeof(prop['chart.radius'])=='number')this.radius=prop['chart.radius'];if(!this.colorsParsed){this.parseColors();this.colorsParsed=true;}
this.drawBackground();this.drawLabels();this.drawNeedle();this.drawReadout();RG.DrawTitle(this,prop['chart.title'],this.gutterTop,null,prop['chart.title.size']?prop['chart.title.size']:prop['chart.text.size']+2);if(prop['chart.contextmenu']){RG.ShowContext(this);}
if(prop['chart.resizable']){RG.AllowResizing(this);}
RG.InstallEventListeners(this);if(this.firstDraw){this.firstDraw=false;RG.fireCustomEvent(this,'onfirstdraw');this.firstDrawFunc();}
RG.FireCustomEvent(this,'ondraw');return this;};this.exec=function(func)
{func(this);return this;};this.drawBackground=this.DrawBackground=function()
{if(typeof prop['chart.background.image.url']==='string'&&!this.__background_image__){var x=0+prop['chart.background.image.offsetx'];var y=0+prop['chart.background.image.offsety'];var img=new Image();this.__background_image__=img;img.src=prop['chart.background.image.url'];img.onload=function()
{if(prop['chart.background.image.stretch']){co.drawImage(this,x,y,ca.width,ca.height);}else{co.drawImage(this,x,y);}
RG.redraw();}}else if(this.__background_image__){var x=0+prop['chart.background.image.offsetx'];var y=0+prop['chart.background.image.offsety'];if(prop['chart.background.image.stretch']){co.drawImage(this.__background_image__,x,y,ca.width,ca.height);}else{co.drawImage(this.__background_image__,x,y);}}
co.beginPath();co.fillStyle=prop['chart.background.color'];if(prop['chart.shadow']){RG.SetShadow(this,prop['chart.shadow.color'],prop['chart.shadow.offsetx'],prop['chart.shadow.offsety'],prop['chart.shadow.blur']);}
co.moveTo(this.centerx,this.centery);co.arc(this.centerx,this.centery,this.radius,prop['chart.angles.start'],prop['chart.angles.end'],false);co.fill();RG.NoShadow(this);if(prop['chart.shadow']){co.beginPath();var r=(this.radius*0.06)>40?40:(this.radius*0.06);co.arc(this.centerx,this.centery,r,0,RG.TWOPI,0);co.fill();RG.NoShadow(this);}
if(prop['chart.tickmarks.small.num']){for(var i=0;i<(prop['chart.angles.end']-prop['chart.angles.start']);i+=(RG.PI/prop['chart.tickmarks.small.num'])){co.beginPath();co.strokeStyle=prop['chart.tickmarks.small.color'];co.arc(this.centerx,this.centery,this.radius,prop['chart.angles.start']+i,prop['chart.angles.start']+i+0.00001,0);co.arc(this.centerx,this.centery,this.radius-5,prop['chart.angles.start']+i,prop['chart.angles.start']+i+0.00001,0);co.stroke();}
co.beginPath();co.fillStyle=prop['chart.background.color'];co.arc(this.centerx,this.centery,this.radius-4,prop['chart.angles.start'],prop['chart.angles.end'],false);co.closePath();co.fill();}
if(prop['chart.tickmarks.big.num']){var colors=['white','white',prop['chart.tickmarks.big.color']];for(var j=0;j<colors.length;++j){for(var i=0;i<(prop['chart.angles.end']-prop['chart.angles.start']);i+=((prop['chart.angles.end']-prop['chart.angles.start'])/prop['chart.tickmarks.big.num'])){co.beginPath();co.strokeStyle=colors[j];co.arc(this.centerx,this.centery,this.radius,prop['chart.angles.start']+i,prop['chart.angles.start']+i+0.001,0);co.arc(this.centerx,this.centery,this.radius-5,prop['chart.angles.start']+i,prop['chart.angles.start']+i+0.0001,0);co.stroke();}}}
co.beginPath();co.fillStyle=prop['chart.background.color'];co.moveTo(this.centerx,this.centery);co.arc(this.centerx,this.centery,this.radius-7,prop['chart.angles.start'],prop['chart.angles.end'],false);co.closePath();co.fill();var ranges=prop['chart.colors.ranges'];if(RG.is_array(prop['chart.colors.ranges'])){var ranges=prop['chart.colors.ranges'];for(var i=0;i<ranges.length;++i){co.strokeStyle=prop['chart.strokestyle']?prop['chart.strokestyle']:ranges[i][2];co.fillStyle=ranges[i][2];co.lineWidth=prop['chart.linewidth.segments'];co.beginPath();co.arc(this.centerx,this.centery,this.radius*0.85,(((ranges[i][0]-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],(((ranges[i][1]-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],false);if(prop['chart.segment.radius.start']>0){co.arc(this.centerx,this.centery,prop['chart.segment.radius.start'],(((ranges[i][1]-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],(((ranges[i][0]-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],true);}else{co.lineTo(this.centerx,this.centery);}
co.closePath();co.stroke();co.fill();}
co.beginPath();}else{co.lineWidth=prop['chart.linewidth'];co.strokeStyle=prop['chart.strokestyle']?prop['chart.strokestyle']:prop['chart.green.color'];co.fillStyle=prop['chart.green.color'];co.lineWidth=prop['chart.linewidth.segments'];co.beginPath();co.arc(this.centerx,this.centery,this.radius*0.85,(((prop['chart.green.start']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-this.properties['chart.angles.start']))+prop['chart.angles.start'],(((prop['chart.green.end']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],false);if(prop['chart.segment.radius.start']>0){co.arc(this.centerx,this.centery,prop['chart.segment.radius.start'],(((prop['chart.green.end']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],(((prop['chart.green.start']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],true);}else{co.lineTo(this.centerx,this.centery);}
co.closePath();co.stroke();co.fill();co.strokeStyle=prop['chart.strokestyle']?prop['chart.strokestyle']:prop['chart.yellow.color'];co.fillStyle=prop['chart.yellow.color'];co.lineWidth=prop['chart.linewidth.segments'];co.beginPath();co.arc(this.centerx,this.centery,this.radius*0.85,(((prop['chart.yellow.start']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],(((prop['chart.yellow.end']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],false);if(prop['chart.segment.radius.start']>0){co.arc(this.centerx,this.centery,prop['chart.segment.radius.start'],(((prop['chart.yellow.end']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],(((prop['chart.yellow.start']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],true);}else{co.lineTo(this.centerx,this.centery);}
co.closePath();co.stroke();co.fill();co.strokeStyle=prop['chart.strokestyle']?prop['chart.strokestyle']:prop['chart.red.color'];co.fillStyle=prop['chart.red.color'];co.lineWidth=prop['chart.linewidth.segments'];co.beginPath();co.arc(this.centerx,this.centery,this.radius*0.85,(((prop['chart.red.start']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],(((prop['chart.red.end']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],false);if(prop['chart.segment.radius.start']>0){co.arc(this.centerx,this.centery,prop['chart.segment.radius.start'],(((prop['chart.red.end']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],(((prop['chart.red.start']-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'],true);}else{co.lineTo(this.centerx,this.centery);}
co.closePath();co.stroke();co.fill();co.lineWidth=1;}
if(prop['chart.border']){co.strokeStyle=prop['chart.border.color'];co.lineWidth=prop['chart.linewidth'];co.beginPath();co.moveTo(this.centerx,this.centery);co.arc(this.centerx,this.centery,this.radius,prop['chart.angles.start'],prop['chart.angles.end'],false);co.closePath();}
co.stroke();co.lineWidth=1;};this.drawNeedle=this.DrawNeedle=function()
{var a=(((this.value-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'];if(typeof prop['chart.needle.image.url']==='string'&&!this.__needle_image__){var img=new Image();this.__needle_image__=img;img.src=prop['chart.needle.image.url'];img.onload=function()
{co.save();RG.rotateCanvas(ca,this.centerx,this.centery,a);co.drawImage(this,this.centerx+prop['chart.needle.image.offsetx'],this.centery+prop['chart.needle.image.offsety']);co.restore();RG.redraw();}}else if(this.__needle_image__){co.save();RG.rotateCanvas(ca,this.centerx,this.centery,a);co.drawImage(this.__needle_image__,this.centerx+prop['chart.needle.image.offsetx'],this.centery+prop['chart.needle.image.offsety']);co.restore();}
var needleRadius=typeof(prop['chart.needle.radius'])=='number'?prop['chart.needle.radius']:this.radius*0.7;if(prop['chart.needle.type']==='pointer'){var r=(this.radius*0.06)>40?40:(this.radius*0.06);co.beginPath();co.fillStyle=prop['chart.needle.color'];co.moveTo(this.centerx,this.centery);co.arc(this.centerx,this.centery,r,0,RG.TWOPI,false);co.fill();co.beginPath();co.arc(this.centerx,this.centery,r,a+RG.HALFPI,a+RG.HALFPI+0.0001,false);co.arc(this.centerx,this.centery,needleRadius,a,a+0.001,false);co.arc(this.centerx,this.centery,r,a-RG.HALFPI,a-RG.HALFPI+0.001,false);co.fill();}else{co.fillStyle='black';co.lineWidth=this.radius>=200?7:3;co.lineCap='round';co.beginPath();co.strokeStyle=prop['chart.needle.color'];if(typeof(prop['chart.needle.linewidth'])=='number')co.lineWidth=prop['chart.needle.linewidth'];co.arc(this.centerx,this.centery,needleRadius,a,a+0.001,false);co.lineTo(this.centerx,this.centery);co.stroke();if(prop['chart.needle.head']){co.fillStyle=prop['chart.needle.color'];co.beginPath();co.lineWidth=1;co.arc(this.centerx,this.centery,needleRadius+15,a,a+0.001,0);co.arc(this.centerx,this.centery,needleRadius-15,a+0.087,a+0.087999,0);co.arc(this.centerx,this.centery,needleRadius-15,a-0.087,a-0.087999,1);co.fill();}
if(prop['chart.needle.tail']){co.beginPath();co.strokeStyle=prop['chart.needle.color'];if(typeof(prop['chart.needle.linewidth'])=='number')co.lineWidth=prop['chart.needle.linewidth'];var a=((this.value-this.min)/(this.max-this.min)*(this.properties['chart.angles.end']-this.properties['chart.angles.start']))+this.properties['chart.angles.start']+RG.PI;co.arc(this.centerx,this.centery,25,a,a+0.001,false);co.lineTo(this.centerx,this.centery);co.stroke();}
var r=(this.radius*0.06)>40?40:(this.radius*0.06);co.beginPath();co.fillStyle=prop['chart.centerpin.stroke'];co.arc(this.centerx,this.centery,r,0+0.001,RG.TWOPI,0);co.fill();co.fillStyle=prop['chart.centerpin.fill'];co.beginPath();co.arc(this.centerx,this.centery,r-2,0+0.001,RG.TWOPI,0);co.fill();}};this.drawLabels=this.DrawLabels=function()
{if(!prop['chart.labels']){return;}
var radius=this.radius,text_size=prop['chart.text.size'],text_font=prop['chart.text.font'],units_post=prop['chart.units.post'],units_pre=prop['chart.units.pre'],centerx=this.centerx,centery=this.centery,min=this.min,max=this.max,decimals=prop['chart.scale.decimals'],numLabels=prop['chart.labels.count'],offset=prop['chart.labels.radius.offset'],specific=prop['chart.labels.specific'];if(specific){for(var i=0;i<specific.length;++i){if(typeof specific[i]==='string'||typeof specific[i]==='number'){var angle=this.getAngle((((this.max-this.min)/specific.length)/2)+(((this.max-this.min)/specific.length)*i)+this.min),angle_degrees=angle*(180/RG.PI),text=specific[i].toString(),coords=RG.getRadiusEndPoint(this.centerx,this.centery,angle,(this.radius*0.925)+offset);}else{var angle=this.getAngle(specific[i][1]),angle_degrees=angle*(180/RG.PI),text=specific[i][0].toString(),coords=RG.getRadiusEndPoint(this.centerx,this.centery,angle,(this.radius*0.925)+offset);}
RG.text2(this,{font:text_font,size:text_size,x:coords[0],y:coords[1],text:text,halign:'center',valign:'center',angle:angle_degrees+90,bounding:false,tag:'labels-specific',color:'black'});}
return;}
co.fillStyle=prop['chart.text.color'];co.lineWidth=1;co.beginPath();for(var i=0;i<=numLabels;++i){var angle=((prop['chart.angles.end']-prop['chart.angles.start'])*(i/numLabels))+prop['chart.angles.start'];var coords=RG.getRadiusEndPoint(centerx,centery,angle+(((i==0||i==numLabels)&&prop['chart.border'])?(i==0?0.05:-0.05):0),((this.radius*0.925)-(prop['chart.text.valign']==='bottom'?15:0)+prop['chart.labels.radius.offset']));var angleStart=prop['chart.angles.start'],angleEnd=prop['chart.angles.end'],angleRange=angleEnd-angleStart,angleStart_degrees=angleStart*(180/RG.PI),angleEnd_degrees=angleEnd*(180/RG.PI),angleRange_degrees=angleRange*(180/RG.PI)
valign=prop['chart.text.valign'];if(prop['chart.border']){if(i==0){halign='left';}else if(i==numLabels){halign='right';}else{halign='center'}}else{halign='center';}
var value=((this.max-this.min)*(i/numLabels))+this.min;RG.text2(this,{font:text_font,size:text_size,x:coords[0],y:coords[1],text:RG.numberFormat(this,(value).toFixed(value===0?0:decimals),units_pre,units_post),halign:halign,valign:valign,angle:((angleRange_degrees*(1/numLabels)*i)+angleStart_degrees)-270,bounding:false,boundingFill:(i==0||i==numLabels)?'white':null,tag:'scale'});}};this.drawReadout=this.DrawReadout=function()
{if(prop['chart.value.text']){co.fillStyle=(prop['chart.value.text.color']||prop['chart.text.color']);RG.text2(this,{font:prop['chart.value.text.font']||prop['chart.text.font'],size:prop['chart.value.text.size']||prop['chart.text.size'],italic:typeof prop['chart.value.text.italic']==='boolean'?prop['chart.value.text.italic']:prop['chart.text.italic'],bold:typeof prop['chart.value.text.bold']==='boolean'?prop['chart.value.text.bold']:prop['chart.text.bold'],x:this.centerx,y:this.centery-(prop['chart.value.text.size']||prop['chart.text.size'])-15,text:(prop['chart.value.text.units.pre']||'')
+(this.value).toFixed(prop['chart.value.text.decimals'])
+(prop['chart.value.text.units.post']||''),halign:'center',valign:'bottom',bounding:prop['chart.value.text.background'],boundingFill:prop['chart.value.text.background.fill'],boundingStroke:prop['chart.value.text.background.stroke'],tag:'value.text'});}};this.getShape=function(e){};this.getValue=function(e)
{var mouseXY=RG.getMouseXY(e);var angle=RG.getAngleByXY(this.centerx,this.centery,mouseXY[0],mouseXY[1]);var radius=RG.getHypLength(this.centerx,this.centery,mouseXY[0],mouseXY[1]);if(radius>this.radius){return null;}
if(angle<RG.HALFPI){angle+=RG.TWOPI;}
var value=(((angle-prop['chart.angles.start'])/(prop['chart.angles.end']-prop['chart.angles.start']))*(this.max-this.min))+this.min;value=Math.max(value,this.min);value=Math.min(value,this.max);return value;};this.getObjectByXY=function(e)
{var mouseXY=RGraph.getMouseXY(e);var radius=RG.getHypLength(this.centerx,this.centery,mouseXY[0],mouseXY[1]);if(mouseXY[0]>(this.centerx-this.radius)&&mouseXY[0]<(this.centerx+this.radius)&&mouseXY[1]>(this.centery-this.radius)&&mouseXY[1]<(this.centery+this.radius)&&radius<=this.radius){return this;}};this.adjusting_mousemove=this.Adjusting_mousemove=function(e)
{if(prop['chart.adjustable']&&RG.Registry.Get('chart.adjusting')&&RG.Registry.Get('chart.adjusting').uid==this.uid){this.value=this.getValue(e);RG.clear(this.canvas);RG.redrawCanvas(this.canvas);RG.fireCustomEvent(this,'onadjust');}};this.getAngle=function(value)
{if(value>this.max||value<this.min){return null;}
var angle=(((value-this.min)/(this.max-this.min))*(prop['chart.angles.end']-prop['chart.angles.start']))+prop['chart.angles.start'];return angle;};this.parseColors=function()
{if(this.original_colors.length===0){this.original_colors['chart.green.color']=RG.array_clone(prop['chart.green.color']);this.original_colors['chart.yellow.color']=RG.array_clone(prop['chart.yellow.color']);this.original_colors['chart.red.color']=RG.array_clone(prop['chart.red.color']);this.original_colors['chart.colors.ranges']=RG.array_clone(prop['chart.colors.ranges']);}
prop['chart.green.color']=this.parseSingleColorForGradient(prop['chart.green.color']);prop['chart.yellow.color']=this.parseSingleColorForGradient(prop['chart.yellow.color']);prop['chart.red.color']=this.parseSingleColorForGradient(prop['chart.red.color']);var ranges=prop['chart.colors.ranges'];if(ranges&&ranges.length){for(var i=0;i<ranges.length;++i){ranges[i][2]=this.parseSingleColorForGradient(ranges[i][2]);}}};this.reset=function()
{};this.parseSingleColorForGradient=function(color)
{if(!color||typeof(color)!='string'){return color;}
if(color.match(/^gradient\((.*)\)$/i)){if(color.match(/^gradient\(({.*})\)$/i)){return RGraph.parseJSONGradient({object:this,def:RegExp.$1,radial:true});}
var parts=RegExp.$1.split(':');var grad=co.createRadialGradient(this.centerx,this.centery,prop['chart.segment.radius.start'],this.centerx,this.centery,this.radius*0.85);var diff=1/(parts.length-1);for(var j=0;j<parts.length;++j){grad.addColorStop(j*diff,RG.trim(parts[j]));}}
return grad?grad:color;};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
if(typeof this[type]!=='function'){this[type]=func;}else{RG.addCustomEventListener(this,type,func);}
return this;};this.firstDrawFunc=function()
{};this.grow=function()
{var obj=this;obj.currentValue=obj.currentValue||obj.min;var opt=arguments[0]||{};var frames=opt.frames||30;var frame=0;var diff=obj.value-obj.currentValue;var step=diff/frames;var callback=arguments[1]||function(){};var initial=obj.currentValue;function iterator()
{obj.value=initial+(frame++ *step);RG.clear(obj.canvas);RG.redrawCanvas(obj.canvas);if(frame<=frames){RG.Effects.updateCanvas(iterator);}else{callback(obj);}}
iterator();return this;};RG.att(ca);RG.register(this);if(parseConfObjectForOptions){RG.parseObjectStyleConfig(this,conf.options);}};