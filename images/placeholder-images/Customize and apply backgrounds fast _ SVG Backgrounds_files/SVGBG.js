"use strict";

//var LINE = []; //array of each line of SVG code
var UI = {};
var BG = {};
var CIPHER = {
	L: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1250, 1600, 4000, 2500, -5, 5, -10, 10], 
	U: [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 250, 300, 400, 500, 600, 800, 1000, 2000],
	key: ['a', 'b', 'c', 'd', 'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
	position: {'b': 'bottom', 't': 'top', 'r': 'right', 'l': 'left', 'c': 'center'}
}

function screenWidth(){
    var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth;
    return x;
}
function screenHeight(){
    var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],y=w.innerHeight||e.clientHeight||g.clientHeight;
    return y;
}

function ColorSetting (colorHex, CSSclass, typeNumber, lineNumber, variation, lightness, stepNumber) {
    this.color = colorHex;
    this.type = CSSclass;
    this.number = typeNumber;
    this.line = lineNumber;
    this.vary = variation || false;
    this.lightness = lightness || 0;
    this.step = stepNumber || 0;
}
/*
function SVGSetting (tag, type) {
    this.tag = tag; // g, path, use, circle, rect... etc
    this.type = type; // start, end, self	
    this.attributes = {}; //['stroke-width']: {value: 3, unit: '%25', ...(maybe not mult/slide multiple: 1.2, slider: 'A')};
	this.addAttr = function(obj){
		this.attributes.push(obj);
	}	
	this.hasProperty = function(str){
		//check for property
		//this.attributes.push(string);
	}
	this.getAttr = function(str){
		//
	}
	this.updateAttr = function(str){ //get/set (use update to really differentiate the two)
		//
	}
	this.outputLine = function(){
		//rules not to output attributes that are unneccessary...
			//opacity='1'  
			//opacity='0'... hard to track down		
	}
}
function AttrSetting (key, val, slider) {
    this.key = key;
    this.val = val;
    this.slider = slider || 0; //optional way to track associated slider to key/val / or multiple
}*/


function UISetting () {  //optional... multiple, pattern[spin,span,active]
    this.val = 0;
    this.lines = []; // [{line: 1, slider: 0}]
    this.sliders = [];	
	this.add = function(obj){
		this.lines.push(obj);
	}
	this.registerSlider = function(num){
		this.sliders.push(num);
	}
	this.count = function(){
		return this.lines.length;
	}
	this.get = function(index){ //whole object
		return this.lines[index];
	}
	this.getLine = function(index){
		return this.lines[index].line;
	}
	this.getIndex = function(line){
		for(var i = 0; i < this.count(); i++){
			if(this.lines[i].line === line){return i;}
		}
		return 'variation error: line not indexed';
	}
	this.getLineFromSlider = function(num){
		var sliderIndex = this.sliders.indexOf(num);
		var lineFromSlider = 'error';
		this.lines.forEach(function(obj){			
			if(obj.slider === sliderIndex){
				lineFromSlider = obj.line;
			}
		});
		return lineFromSlider;
	}
}

function SliderSetting (id, code, type, name, min, max, step, val, version) {
    this.id = id;
    this.code = code;
    this.type = type || '';
    this.name = name || '';    
    this.min = min || 0;
    this.max = max || 100;
    this.step = step || 1;
	this.val = val || 0;
    this.version = version || 1;
    this.tooltip = 0;
}
function DefaultSetting (type, name, min, max, step, val) {
    this.type = type;
    this.name = name;
    this.min = min;
    this.max = max;
    this.step = step;
	this.val = val;
}

var BG_ARRAY = [];  //SVG = [];
var COLOR = ['000', 'AAA', 'FFF', '000', '444', '555', '666', '777', '888', '999'];
var BKUP_COLOR = [];
var PALETTE = [];
var COPIED_COLOR = 'F0F';
var STEP_COUNTER = [];
var MODIFICATION_VERSIONS = 0; //UI.mod.count
var MODIFICATION_NUMBER = 1;  //UI.mod.current
var ORIGINAL_WIDTH;
var ORIGINAL_HEIGHT;

function resetStepCounter(){
    STEP_COUNTER = [];
    for(var i=0; i<99; i++){
        STEP_COUNTER[i] = 0;
    }
}

function setupUI(){
	//hide description
	gsap.to("#set-details", {height: 0, padding: '0 15px', duration: .5});	
	//show ui
	document.getElementById('SVGBG_UI').classList.add('active');	
	//resize area??
}

var SHOW_COLOR_HISTORY = (document.getElementById("the_colors").dataset.colorHistory === "YES") ? true : false;
var BRAND_COLORS = document.getElementById("the_colors").dataset.brandColors;
if(BRAND_COLORS === "#FFFFFF|#FFFFFF|#FFFFFF|#FFFFFF|#FFFFFF|#FFFFFF|#FFFFFF|#FFFFFF|#FFFFFF|#FFFFFF|"){
	BRAND_COLORS = ['#FFFFFF', '#BBBBBB', '#888888', '#555555', '#FF5522', '#FFEE33', '#88DD22', '#22EECC', '#2299FF', '#BB11DD'];
}else{
	BRAND_COLORS = BRAND_COLORS.slice(0, -1).split("|");
}
var COLOR_HISTORY = BRAND_COLORS;
//Never reset color_history


function resetUI(){
	setupUI();
	UI = {};
	var theAttibutes = [
		'opacity', 'scale', 'angle', 'radial', 'strokeWidth', 'size', 'position', 'move', 'pattern', 
		'width', 'height', 'colorMode', 'variance', 'color', 'duration', 'stagger', 'loops'
	];
	theAttibutes.forEach(function (item) {
		UI[item] = new UISetting();
	});
	
	UI.default = {};
	setDefaults();
	setConstants();
	
	//UI.position.val = '';	
	UI.isVisible = true;
	
	PALETTE = [];	
    BKUP_COLOR = [];	
    resetStepCounter();
}

function getCodeValue(code){	
	if ('0123456789'.indexOf(code) !== -1) {
		return parseInt(code);
	}else if(code === code.toUpperCase()){		
        return Number(CIPHER.U[CIPHER.key.indexOf(code.toLowerCase())]);       
	}else{
        var codeNumber = Number(CIPHER.L[CIPHER.key.indexOf(code)]);
        if(code.match(/[w-z]/)){
            var largestDimension;
            if(ORIGINAL_WIDTH > ORIGINAL_HEIGHT){
                largestDimension = ORIGINAL_WIDTH;
            }else{
                largestDimension = ORIGINAL_HEIGHT;
            }
            if(codeNumber > 0){
                return(largestDimension * codeNumber); 
            }else{
                return(largestDimension / -codeNumber);
            }
        }else{
            return codeNumber;
        }		
	}
}

function selectBG(el){	
	resetUI();
	
	var id = el.id;
	var el_CSS = document.getElementById('css-'+id);
	var CSS = getComputedStyle(el_CSS);	
	UI.slug = id;
	UI.name = titleCase(id.replace("-", " "));
	
	var thumb = document.getElementById('img-'+id);	
	UI.thumb = thumb.src;
	UI.alt = thumb.alt;
	
	mixpanel.track('Select Background', {"name": UI.slug});
	mixpanel.people.increment('bg_previews');
	
	//UI.thumb = titleCase(id.replace("-", " "));
	
	if(UI.inheritColors){
        COLOR[1] = String(chroma(CSS.getPropertyValue('background-color')).hex()).replace('#', '');
	}
    
	BG.image = CSS.getPropertyValue('background-image')
		.replace(/\%20/g, " ")
		.replace(/\\\'/g, "'")
		.replace("url('data:image/svg+xml", 'url("data:image/svg+xml')
		.replace("%3C/svg%3E')", '%3C/svg%3E")')
		.replace("</svg>')", '</svg>")');
    
	BG.attachment = CSS.getPropertyValue('background-attachment');
	BG.size = CSS.getPropertyValue('background-size');
    BG.repeat = CSS.getPropertyValue('background-repeat');    
    
	/*
	if(BG.size === "115%"){
		BG.size = "auto";
	}else if(BG.size === "200%"){
        BG.size = "cover";
    }*/
    
    var attribute_code = 'data-ctrl';
    UI.code  = el.getAttribute(attribute_code);
	
	MODIFICATION_NUMBER = 1; //extract number from data-ctrl
    if(MODIFICATION_NUMBER > 1){
        attribute_code += MODIFICATION_NUMBER;
        if(el.getAttribute(attribute_code) !== null){
            UI.code  = el.getAttribute(attribute_code);
        }
    } 
	indexBG_Image();
	updatePattern();
	setControls();
    updateColor(1, COLOR[1]);
}

function showTooltip(id){
	var bubble = document.getElementById('tt' + id);
	var slider = document.getElementById('slider' + id);
	var newVal = Number(((slider.value - slider.min) * 100) / (slider.max - slider.min));
	var adjustedVal = newVal + 25 - (newVal * .25);
	bubble.style.left = `calc(${adjustedVal}% + (${9 - newVal * 0.18}px))`;
	bubble.classList.add('active');
	bubble.innerHTML = slider.value;
	UI.slider[id].tooltip++;
	setTimeout(() => resetTooltip(bubble, id), 1500);	
}
function resetTooltip(el, id){
	if(UI.slider[id] === undefined){return;}
	UI.slider[id].tooltip--;
	if(UI.slider[id].tooltip < 1){
		el.classList.remove('active');
		UI.slider[id].tooltip = 0;
	}
}
function lockColors(){
	if(UI.inheritColors){
		UI.inheritColors = false;
		document.getElementById("color-lock-btn").className = "locked";
	}else{
		UI.inheritColors = true;
		document.getElementById("color-lock-btn").className = "unlocked";
	}	
}
function setColorLock(){
	if(document.getElementById("color-lock-btn").classList.contains("locked")){
		UI.inheritColors = false;
	}else{
		UI.inheritColors = true;
	}
}

//var previewMode = document.getElementById("stickyControls");
var previewMode = document.getElementById("SVGBG_UI");
previewMode.addEventListener("mouseenter", hideButtons, false);
var previewModeOff = document.getElementById("stage");
previewModeOff.addEventListener("mouseenter", showButtons, false);

var SHOW_BUTTONS = true;
function hideButtons(){    
    if(SHOW_BUTTONS){
        SHOW_BUTTONS = false;
        if(document.getElementById("stage").getAttribute('class') !== 'hideUI'){
            document.getElementById("stage").className = "hideUI";
        }
    }	
}
function showButtons(){  
    if(!SHOW_BUTTONS){
        SHOW_BUTTONS = true;
        if(document.getElementById("stage").getAttribute('class') !== 'showUI'){
            document.getElementById("stage").className = "showUI";
        }
    }
}
//var UI_LISTENER = document.getElementById("hide-ui").addEventListener('mouseout', function() {
var UI_LISTENER = document.getElementById("BTN_HIDE").addEventListener('mouseout', function() {
	showInterface();	
});

function hideInterface(){ //add and remove mouseout would be ideal.
	if(UI.isVisible){
		UI.isVisible = false;
		document.getElementById("controls").className = "hideUI";
	}else{
        showInterface();
    }
}
function showInterface(){	
	if(!UI.isVisible){
		UI.isVisible = true;
		document.getElementById("controls").className = "showUI";
	}
}
function getAttrValue(line, attribute){
    var regEx = new RegExp(' ' + attribute + "=\\'([^']*)\\'");    
    if(BG_ARRAY[line].includes(' ' + attribute)){
        return BG_ARRAY[line].match(regEx)[1];
    }else{
        return null;
    }
}
function updateAttrValue(line, attribute, new_value){    
    var old_value = getAttrValue(line, attribute);
    //if(old_value !== null){
        var old_line = ' ' + attribute + "='" + old_value + "'";
        var new_line = ' ' + attribute + "='" + new_value + "'";
        BG_ARRAY[line] = BG_ARRAY[line].replace(old_line, new_line);
    //}
}

function indexBG_Image(){
	var counter = {angle: 0, radial: 0};	
	
	var str = BG.image;
    var lightness = 0;
    var matches = '';
    var strokeMultiple = 1;
    var color_number = 0;
    var color_hex = '';
    var color_type = '';
    var step_instance = 0;
    var variation = false;
    var attributeValue = 0;
    var attributeNumber = 0;
	str = str.replace("svg+xml,", "svg+xml,|");	
	str = str.split("%3E%3C").join('%3E|%3C');	
	
	BG_ARRAY = str.split("|");
	//LINE = []; //array of each line of SVG code		
	
	var l = 0;    
	while(l < BG_ARRAY.length){        
		var temp = BG_ARRAY[l];
        if(l === 1){
            if(temp.includes("viewBox")){
                var viewBox_numbers = temp.match(/viewBox=\'([0-9.%]* [0-9.%]* [0-9.%]* [0-9.%]*)\'/)[1];
				if(viewBox_numbers.includes("%25")){
					console.log("viewBox has percentage: " + viewBox_numbers);
				}
                viewBox_numbers.split('%25').join('');
                var v_num = viewBox_numbers.split(" ");         
                ORIGINAL_WIDTH = Number(v_num[2]) - Number(v_num[0]);
                ORIGINAL_HEIGHT = Number(v_num[3]) - Number(v_num[1]);
            }else{
                ORIGINAL_WIDTH = 0;
                ORIGINAL_HEIGHT = 0;
            }            
        }
		
        strokeMultiple = 1;
        
		if(temp.includes("class='")){
			var tempClass = temp.match(/class=\'([^']*)\'/)[1];   //// how to target class='' or width etc.
            BG_ARRAY[l] = BG_ARRAY[l].replace(tempClass, "");
			BG_ARRAY[l] = BG_ARRAY[l].replace("class=''", "");
            
            lightness = 0;            
            if(tempClass.includes("darken") || tempClass.includes("lighten") || tempClass.includes("fade") || tempClass.includes("boost") ){
                var match_type = tempClass.match(/(darken|lighten|fade|boost)([0-9]{0,2})/)[1];
                var match_value = tempClass.match(/(darken|lighten|fade|boost)([0-9]{0,2})/)[2];
                if(match_value === ''){
                    match_value = 100;
                }
                match_value = parseInt(match_value, 10) / 100;                
                if(match_type === "darken"){
                    lightness -= match_value; //darken -0.99 to -.01; 
                }else if(match_type === "lighten"){
                    lightness += match_value; //lighten 0.01 to 0.99; 
                }else if(match_type === "fade"){
                    lightness += match_value + 1; //fade 1.01 to 1.99, default 2;
                }else if(match_type === "boost"){
                    lightness -= (match_value + 1); //fade -1.01 to -1.99, default -2;
                }
            }            
            if(tempClass.includes("stroke")){
                matches = tempClass.match(/stroke([0-9]{2})/)[1];
                tempClass = tempClass.replace(matches, "");
                matches = parseInt(matches, 10) / 10;
				strokeMultiple = matches;
            }            
            if(tempClass.includes("vary")){
                tempClass = tempClass.replace("vary", "");
                variation = true;
            }else{
                variation = false;
            }            
            if(tempClass.includes("copy")){
                tempClass = tempClass.replace("copy", "");
                PALETTE[PALETTE.length] = new ColorSetting(COPIED_COLOR, 'copy', 0, l, variation, lightness);
            }             
            if(tempClass.includes("size")){   //clean up...
                attributeNumber = Number( tempClass.match(/size([0-9]{1})/)[1] );				
				UI.size.add( {line: l, slider: attributeNumber} );				
                tempClass = tempClass.replace("size"+attributeNumber, "");
            }           
            if(tempClass.includes("width")){               
                attributeNumber = tempClass.match(/width([0-9]{1})/)[1]; 
                attributeValue = temp.match(/width=\'([^']*)\'/)[1];
				UI.width.add({
					line: l,					
					value: attributeValue, 
					type: "width", 
					number: attributeNumber
				});
                tempClass = tempClass.replace("width", "");
            }            
            if(tempClass.includes("height")){   //clean up...
                attributeNumber = tempClass.match(/height([0-9]{1})/)[1];
                attributeValue = temp.match(/height=\'([^']*)\'/)[1];
				UI.height.add({
					line: l,					
					value: attributeValue,
					type: "height", 
					number: attributeNumber
				});				
                tempClass = tempClass.replace("height", "");
            }            
            if(tempClass.includes("ignore")){
                //ignore these lines
				UI.ignoredLines.push(l);
            }            
            if(tempClass.includes("colorList")){                
				color_number = tempClass.match(/colorList(\d+)/)[1];				
				UI.colorList.push({line: l, colors: color_number});
				tempClass = tempClass.replace("colorList" + color_number, "");
				
				extractColorList(color_number, temp.match(" values=\\'([^']*)\\'")[1]);
				
            }            
            if(tempClass.includes("color") || tempClass.includes("steps") || tempClass.includes("blend")){
				color_type = tempClass.match(/(color|steps|blend)[0-9]{1,2}/)[0];				
                color_number = color_type.match(/[0-9]{1,2}/);
                color_number = parseInt(color_number, 10);
                color_type = color_type.match(/[a-z]*/)[0];
                //color_hex = temp.match(/\'\%23([^']*)\'/)[1]; //possibly whitelist color, stroke, color-stop - to prevent href="#a"
				color_hex = temp.match(/(stop-color|fill|stroke)=\'\%23([^']*)\'/)[2];				
                COPIED_COLOR = color_hex;
                if(UI.inheritColors && color_type === "color" && color_number !== 1){
                    if(lightness === 0){
                        BKUP_COLOR[color_number] = color_hex;
                    }                    
                    if(BKUP_COLOR[color_number] === undefined){
                        COLOR[color_number] = color_hex;
                    }else{
                        COLOR[color_number] = BKUP_COLOR[color_number];
                    }                    
				}else if(color_type === "steps"){
                    STEP_COUNTER[color_number]++;
                    step_instance = STEP_COUNTER[color_number];
                }
                PALETTE[PALETTE.length] = new ColorSetting(color_hex, color_type, color_number, l, variation, lightness, step_instance);                
            }		
			if(tempClass.includes("scale")){
				UI.scale.add( {line:l});
			}        
            if(tempClass.includes("position")){
                var pType = tempClass.match(/position([xyXYUDLR]*)/)[1];
                var pValue = temp.match(/d=\'(M[0-9.-]*[ ][0-9.-]*)/)[1];				
				UI.position.add({line: l, type: pType, val: pValue});				
			}
            if(tempClass.includes("move")){
                //var originCode = tempClass.match(/origin([0-9a-zA-Z_])*/g);
                var mInstance = tempClass.match(/move([0-9a-zA-Z_])*/g);
                var mCode, mRange, mTemp;
                var mValues = []; //[-10,0,0,1000] ... 'move1_a_0_0_Y' ... xmin_xmax_ymin_ymax;                
                var tempVal = 0;
                var tempVals = [];
                var origin = getOrigin(l);                
                
                var i, ii, iii;
                for(i = 0; i < mInstance.length; i++){
                    mCode =  mInstance[i];
                    mRange = Number( mCode.match(/move([0-9])/)[1] );
                    mCode = mCode.replace("move" + mRange + '_', "");                
                    mValues = mCode.split("_");                    
                    for(ii = 0; ii < mValues.length; ii++){
                        tempVal = mValues[ii];
                        tempVals = tempVal.split('');
                        tempVal = 0;
                        for(iii = 0; iii < tempVals.length; iii++){
                            if(tempVals[iii] !== tempVals[iii].toUpperCase() && ii < 3){                                
                                mTemp = -getCodeValue(tempVals[iii].toUpperCase());
                            }else{
                                mTemp = getCodeValue(tempVals[iii]);
                            }                            
                            tempVal = tempVal + Number(mTemp);
                        }                        
                        mValues[ii] = tempVal;
                    }					
					UI.move.add({
						line: l, 
						slider: mRange,
						x: mValues[0], 
						y: mValues[1], 
						rotate: mValues[2], 
						scale: mValues[3], 
						origin: origin
					});
                }
			} 
		}
		if(temp.includes("fill-opacity=") || temp.includes("stroke-opacity=")){ //avoid stop-opacity
			UI.opacity.add( {line:l} );			
		}
		if(temp.includes("stroke-width=")){
			UI.strokeWidth.add( {line:l, multiple: strokeMultiple} );
		}
		if(temp.includes("dur=")){
			if(!UI.ignoredLines.includes(l)){
				UI.duration.add( {line:l} );
			}
		}
		if(temp.includes("repeatCount=")){
			if(!UI.ignoredLines.includes(l)){
				UI.loops.add( {line:l} );
			}
		}
		if(temp.includes("begin=")){
			UI.stagger.add( {line:l} );
		}
		if(temp.includes("%3ClinearGradient")){					
			UI.angle.add( {line:l, slider: counter.angle} );
			counter.angle++;
		}else if(temp.includes("%3CradialGradient")){		
			//fx="5%" fy="5%" r="65%" Radial touches r='65%'			
			UI.radial.add( {line:l, slider: counter.radial} );
			counter.radial++;
		}else if(temp.includes("patternTransform")){			
			var p_width = getAttrValue(l, 'width');
			var p_height = getAttrValue(l, 'height');
			if(ORIGINAL_WIDTH > 0){
				p_width = ORIGINAL_WIDTH;
			}if(ORIGINAL_HEIGHT > 0){
				p_height = ORIGINAL_HEIGHT;
			}
			var original_spin = 0;
			if(temp.includes("rotate")){
				original_spin = temp.match(/rotate\(([0-9.-\s]*)\)/)[1];
			}
            var original_span = temp.match(/scale\(([0-9.-]*)\)/)[1];		
			UI.pattern.span = original_span;			
			//if(!UI.code.includes("q")){
			if(!UI.code.includes("Span")){  //do we ever disable span for a pattern?
				UI.pattern.active = false;
			}
			var p_origin = getAttrValue(l, 'transform-origin');
			if(p_origin === null){
				p_origin = ['.5', '.5'];
			}else if(p_origin === 'center'){
				p_origin = ['.5', '.5'];			
			}else if(p_origin.includes(" ")){ 
				if(p_origin.includes('%25')){ /// contains %25	
					p_origin = p_origin.replace(/\%25/g, '').split(" ");				
					p_origin[0] = parseFloat( p_origin[0] ) / 100;
					p_origin[1] = parseFloat( p_origin[1] ) / 100;
				}else{ // has no %25
					p_origin = p_origin.split(" "); //convert x and y into percentage 	x/width and y/height 
					p_origin[0] = parseFloat((p_origin[0] / p_width).toFixed(2));
					p_origin[1] = parseFloat((p_origin[1] / p_height).toFixed(2));
				}			
			}else{ //default to rotate and scale around center
				p_origin = ['.5', '.5'];
			}
			UI.pattern.add({
				line: l, 
				width: p_width, 
				height: p_height, 
				spin: original_spin, 
				span: original_span, 
				origin: p_origin
			});
			BG_ARRAY[l] = BG_ARRAY[l].replace(/ transform-origin=\'[^']*\'/, "");			
        }		
		if(temp.includes("transform-origin")){
			var tempOrigin = getAttrValue(l, 'transform-origin');
			var FireFoxFix = "style='transform-origin:" + tempOrigin + "'";			
			BG_ARRAY[l] = BG_ARRAY[l].replace("transform-origin='" + tempOrigin + "'", FireFoxFix);
		}		
		l++;
	}    
}


function getOrigin(lineNumber){
    var temp = BG_ARRAY[lineNumber];  
    var x = 0;
    var y = 0;
    var width, height, tempX, tempY, tempCode, searchFor, numbers, rOrigin;
    var rProceed = false;
    var i = 1;
    
    if(ORIGINAL_WIDTH > 0){ //get default center if possible.
        x = ORIGINAL_WIDTH / 2;
    }
    if(ORIGINAL_HEIGHT > 0){
        y = ORIGINAL_HEIGHT/ 2;
    }
    
    while( temp.includes("%3Cg") ){
        temp = BG_ARRAY[lineNumber + i];
        i++;
    }
    rOrigin = getAttrValue(lineNumber, 'transform');    
    if(rOrigin !== null){
        if(rOrigin.includes("rotate")){            
            numbers = rOrigin.match(/rotate\(([0-9 .-]+)\)/)[1];
            numbers = numbers.replace(/[-]/g, ' -').replace(/ {1,}/g," ").split(' ').map(Number);
            if(numbers.length === 3){
                x = numbers[1];
                y = numbers[2];
                rProceed = true;
            }
        }
    }
    
    if(rProceed){
        //rOrgin worked and pulled numbers from rotate(0 x y);
    }else if( temp.includes("path") || temp.includes("polygon") ){
        searchFor = 'points';
        if(temp.includes("path")){
            searchFor = 'd';
        }
        tempCode = getAttrValue(lineNumber, searchFor);        
        if( tempCode !== null){
            numbers = tempCode.match(/[0-9 .-]+/g).join('');
            numbers = numbers.replace(/[-]/g, ' -').replace(/ {1,}/g," ").split(' ').map(Number);
            x = numbers[0];
            y = numbers[1];
        }
    }else if( temp.includes("circle") || temp.includes("ellipse") ){
        x = Number( getAttrValue(lineNumber, 'cx') );
        y = Number( getAttrValue(lineNumber, 'cy') );
    }else if( temp.includes("rect") ){
        width = getAttrValue(lineNumber, 'width');
        height = getAttrValue(lineNumber, 'height');
        tempX = getAttrValue(lineNumber, 'x');
        tempY = getAttrValue(lineNumber, 'y');        
        if( width !== null && tempX !== null){
            tempX = Math.round( Number(tempX) - Number(width/2) );
            x = tempX;
        }
        if( height !== null && tempY !== null){
            tempY = Math.round( Number(tempY) - Number(height/2) );
            y = tempY;
        }
    }
    return [ Math.round(x), Math.round(y)];
}

function setConstants(){
	UI.colorMode.name = ['lch', 'hsl', 'lab', 'rgb', 'lrgb'];
	UI.variance.colors = [
		['000','FFF'],['400','F00'],['F40','F90'],['A70','FF0'],
		['040','0F0'],['08F','004'],['90F','D0F'],'random'
	];
	UI.variance.names = [
		"GRAY TONES","RED TONES","ORANGE TONES","YELLOW TONES",
		"GREEN TONES","BLUE TONES","PURPLE TONES","RANDOM TONES"
	];
}
function setDefaults(){ //					{type		name		min 	max 	step 	val};
	UI.default.opacity	= new DefaultSetting('opacity', 'OPACITY',	0, 		1, 		0.01, 	1);
	UI.default.scale 	= new DefaultSetting('scale', 	'SCALE',	0, 		100, 	1, 		20);
	UI.default.size 	= new DefaultSetting('size', 	'SIZE',		0, 		100, 	1, 		20);
	UI.default.move 	= new DefaultSetting('move', 	'MOVE',		0, 		100, 	1, 		0);
	UI.default.duration	= new DefaultSetting('duration','DURATION',	.5, 	10, 	0.1, 	5);
	UI.default.loops	= new DefaultSetting('loops',	'LOOPS',	0, 		10, 	1, 		0);
	UI.default.stagger	= new DefaultSetting('stagger',	'STAGGER',	-2, 	2, 		0.05, 	0);
	UI.default.position	= new DefaultSetting('position','POSITION',	0, 		800, 	1, 		0);
	UI.default.spin		= new DefaultSetting('spin', 	'ROTATE',	0, 		360, 	1,	 	0);
	UI.default.span		= new DefaultSetting('span', 	'SCALE',	0.05,	5,		0.05, 	1);
	UI.default.width	= new DefaultSetting('width', 	'WIDTH',	10, 	1000, 	1, 		100);
	UI.default.height	= new DefaultSetting('height', 	'HEIGHT',	10, 	1000, 	1, 		100);
	UI.default.variance	= new DefaultSetting('variance','VARIANCE',	0, 		1, 		0.01, 	1);
	UI.default.stroke	= new DefaultSetting('strokeWidth','STROKE',1, 		20, 	0.1, 	1);
	UI.default.angle	= new DefaultSetting('angle', 	'ANGLE',	0, 		360, 	1, 		1);
	UI.default.radial	= new DefaultSetting('radial', 	'RADIAL',	0, 		100,	0.1, 	50);	
	UI.pattern.spin = 0;
	UI.pattern.span = 1;
	UI.pattern.active = true;
	UI.variance.strength = 0.5;
	UI.variance.current = 1;
	UI.variance.reset = true;
	UI.inheritColors = undefined;
	UI.ignoredLines = [];
	UI.colorList = [];
	//SET COLOR HISTORY defaults only once
	//UI.color.history = ['#fff', '#BBB', '#555', '#000', '#888', '#963', '#F52', '#FE3', '#8D2', '#2EC', '#29F', '#B1D'];
	//UI.color.history = ['#fff', '#BBB', '#555', '#B1D', '#F52', '#FE3', '#8D2', '#2EC', '#29F', '#B1D']; // 10 colors
	setColorLock();
}

function setControls(){
	UI.slider = [];
	document.getElementById('svgName').getElementsByTagName("H2")[0].innerHTML = UI.name; 
	var sliderParts = UI.code.split("|");
	var parts;
	var bgParts = sliderParts[0];	
	var counter = {};
	var varyRange = false;
	hideSliders(sliderParts.length);
	
	/*  
	var codeParts = UI.code.split("-");
	var numOfColors = codeParts[0];
	var counter = {size: 0};    
	hideSliders(codeParts.length);
	for(var i=1; i<codeParts.length; i++){
	*/		
	
	for(var i=1; i<sliderParts.length; i++){
		
		UI.slider[i] = new SliderSetting(i, sliderParts[i]); //id, code, type*, name*, min*, max*, step*, val*, version*
		parts = sliderParts[i].split("_");		
		
		var partType = parts[0].toLowerCase();
		parts.shift();
		Object.assign(UI.slider[i], UI.default[partType]);
		
		if(parts.length > 0){
			//if next array element is a word, it is a name label
			if( parts[0].toLowerCase() != parts[0].toUpperCase() ){
				UI.slider[i].name = parts[0].toUpperCase();
				parts.shift();
			}			
			if(parts.length === 4){
				UI.slider[i].min = Number(parts[0]);
				UI.slider[i].max = Number(parts[1]);
				UI.slider[i].step = Number(parts[2]);
				UI.slider[i].val = Number(parts[3]);
			}else if(parts.length === 3){
				UI.slider[i].min = Number(parts[0]);
				UI.slider[i].max = Number(parts[1]);
				UI.slider[i].val = Number(parts[2]);
			}else if(parts.length === 2){
				UI.slider[i].min = Number(parts[0]);
				UI.slider[i].max = Number(parts[1]);
			}else if(parts.length === 1){
				UI.slider[i].val = Number(parts[0]);
			}
		}
		
		//tests and other info...
			//scale: multiple
			//size: counter for version
			//size: multiple
			//position: set UI.position.val = 0;
			//span: if(UI.pattern.span !== undefined){rangeValue = UI.pattern.span;}
		//width: rangeValue = UI.width.get(0).value.replace('%25', ''); //set directly via code
		//height: rangeValue = UI.height.get(0).value.replace('%25', ''); //set directly via code
			//variation: varyRange = true;		
			//angle: UI.angle.val = 0; UI.angle.registerSlider(i);		
			//radial: UI.radial.val = 50; UI.radial.registerSlider(i);
		
		if(UI.slider[i].type === 'variance'){
			varyRange = true;
			UI.variance.strength = UI.slider[i].val;
		}		
		if(counter[partType] === undefined){
			counter[partType] = 0;
		}		
		UI.slider[i].version = ++counter[partType];
		if(UI[UI.slider[i].type] !== undefined){
			UI[UI.slider[i].type].registerSlider(i);
		}
		if(UI[UI.slider[i].type] === 'span' && UI.pattern.span !== undefined){
			UI.slider[i].val = UI.pattern.span;
		}
		//UI.slider[i].mulitple = (UI.slider[i].max - UI.slider[i].min) / 100;
		//multiple because multiple width/heights to scale?
			
		//setupRange(i, rangeName, rangeMin, rangeMax, rangeStep, rangeValue);
		setupRange(i);
        setupVariation(varyRange);
	}    
	
	UI.color.count = parseInt( bgParts.charAt(0), 10 );
	bgParts = bgParts.toLowerCase();
	
	if(bgParts.includes("fixed")){
		//bgParts = bgParts.replace("Fixed", "");
		BG.attachment = "fixed";
	}
    if(bgParts.includes("no-repeat")){
		//bgParts = bgParts.replace("NR", "");
        BG.repeat = 'no-repeat';
	}
    if(bgParts.includes("par")){
		//bgParts = bgParts.replace("PAR", "");
        //auto add "preserveAspectRatio='none'" to BG_ARR[1]?
        calcBackgroundSize();
        //PRESERVE_ASPECT_RATIO = false;
	}
    if(bgParts.includes("position")){
        var directions = bgParts.match(/(position)([tbrlc])([tbrlc])/);
        BG.position = CIPHER.position[directions[2]] + ' ' + CIPHER.position[directions[3]];
	}else{
        BG.position = 'center';
    }
    if(bgParts.includes("auto")){
		//bgParts = bgParts.replace("A", "");
		BG.size = 'auto';
	}
    if(bgParts.includes("mod")){
        MODIFICATION_VERSIONS = Number(bgParts.match(/mod([0-9])*/)[1]);
        //bgParts = bgParts.replace("M" + MODIFICATION_VERSIONS, "");
        if(document.getElementById('modify-mode').className === "hideSlider" || document.getElementById('modify-mode').className === "hiddenSliderInit"){
            document.getElementById('modify-mode').className = "showSlider";
        }
	}else{
		if(document.getElementById('modify-mode').className === "showSlider"){
			document.getElementById('modify-mode').className = "hideSlider";
		}
	}
	var blender = document.getElementById('blend-mode');
	if(bgParts.includes("blend")){		
		var blend_num = bgParts.match(/blend[0-4]*/);
		//bgParts = bgParts.replace(/B[0-4]*/, "");
		blend_num = String(blend_num).replace('blend', '');
		if(blend_num === ''){
			blend_num = 0;
		}
		UI.colorMode.val = Number(blend_num);
		document.getElementById('blendMode').innerHTML = UI.colorMode.name[UI.colorMode.val].toUpperCase() + " MODE";		
		if(blender.className === "hideSlider" || blender.className === "hiddenSliderInit"){
			blender.className = "showSlider";
		}
	}else{
		if(blender.className === "showSlider"){
			blender.className = "hideSlider";
		}
	}	
    
    if( isNaN(UI.color.count) ){
        UI.color.count = 1;
    }
	UI.color.count = constrainNumber(UI.color.count, 1, 9);

    for(i = 1; i < 10; i++){
        document.getElementById('color-' + i).jscolor.fromString(COLOR[i]);        
        if(i <= UI.color.count){
            document.getElementById('color-' + i).classList.remove('hiddenColor');
			updateColorInput(i, COLOR[i]);
        }else{
            document.getElementById('color-' + i).classList.add('hiddenColor');
        }
    }
	document.getElementById("custom-color").className = 'colr' + UI.color.count;
	loadColorHistory();
}

function updateRangeUI(id){
	var rangeSlider = document.getElementById(id);
	var percentage = (rangeSlider.value - rangeSlider.min)/(rangeSlider.max - rangeSlider.min) * 100;
	rangeSlider.style.setProperty("--webkitProgressPercent", constrainNumber(percentage, 0, 100) + "%");	
}

function calcBackgroundSize(){
    var temp = BG_ARRAY[1];
    if(temp.includes("preserveAspectRatio='none'")){               
        var w = temp.match(/width=\'([^']*)\'/)[1];
        var h = temp.match(/height=\'([^']*)\'/)[1];
        if(w.includes('%')){
            w = w.replace('%25', '%');
        }else{
            w = w + 'px';
        }
        if(h.includes('%')){
            h = h.replace('%25', '%');
        }else{
            h = h + 'px';
        }
        BG.size = w + ' ' + h;
    }
}

/*
function convertToMultiple(value, id){
	var min = UI.slider[id].min;
	var max = UI.slider[id].max;	
	var multiple = min + (value * ((max - min) / 100));
	return Math.round(multiple);
}*/

function hideSliders(num){	
	while (num < 6){		   
		if(document.getElementById('slider-' + num).className === "showSlider"){
			document.getElementById('slider-' + num).className = "hideSlider";		   
		}		   
		num++;
	}
}
//function setupRange(num, name, min, max, step, value){
function setupRange(num){
	var divRange = document.getElementById('slider-' + num);
	var bubble = document.getElementById('tt' + num);
	var inputRange = divRange.getElementsByTagName("input")[0];
	divRange.className = "showSlider";
	divRange.getElementsByTagName("label")[0].innerHTML = UI.slider[num].name; 
	inputRange.setAttribute('min', UI.slider[num].min);
	inputRange.setAttribute('max', UI.slider[num].max);
	inputRange.setAttribute('step', UI.slider[num].step);
	inputRange.setAttribute('value', UI.slider[num].val);
	inputRange.value = UI.slider[num].val;	
	updateRangeUI('slider'+num);
	UI.slider[num].tooltip = 0;
	resetTooltip(bubble, num);
}

function setupVariation(trueVar){
    if(trueVar){
        UI.variance.current = 0;
        setVariationType();		
        if(document.getElementById('variation-mode').className === "hideSlider" || document.getElementById('variation-mode').className === "hiddenSliderInit"){
           document.getElementById('variation-mode').className = "showSlider";		   
        }
    }else{
        if(document.getElementById('variation-mode').className === "showSlider"){
           document.getElementById('variation-mode').className = "hideSlider";
        }
    }
}

function updateRange(id, value){ //this triggers twice in FF Chrome ... might want to gaurd against that... 
//https://stackoverflow.com/questions/18544890/onchange-event-on-input-type-range-is-not-triggering-in-firefox-while-dragging

	if( isNaN(id) || isNaN(value) ){
       return;
    }
	value = Number(value);
	
	
	//var rType = document.getElementById("slider-" + id).getElementsByTagName("label")[0].innerHTML;
	var rType = UI.slider[id].type;
	if(rType === "size"){		
		updateSize(id, value);
	}else if (rType === "scale"){		
		updateScale(id, value);
	}else if (rType === "opacity"){
		UI.opacity.val = value;
		updateOpacity();
	}else if (rType === "strokeWidth"){
		UI.strokeWidth.val = value;
		updateStrokeWidth();	
	}else if (rType === "duration"){
		UI.duration.val = value;
		updateDuration();	
	}else if (rType === "loops"){
		UI.loops.val = value;
		updateRepeatCount();	
	}else if (rType === "stagger"){
		UI.stagger.val = value;
		updateStagger();	
	}else if (rType === "width"){
		updateWidth(id, value);
	}else if (rType === "height"){
        updateHeight(id, value);
    }else if (rType === "position"){
        UI.position.val = value;
        updatePosition();
    }else if (rType === "move"){
		updateMove();
	}else if (rType === "variance"){        
		UI.variance.strength = value;
        updateColor(1, COLOR[1]);
	}else if (rType === "angle"){
		UI.angle.val = constrainNumber(value, 0, 360);
		updateAngle(id);
	}else if (rType === "radial"){
		UI.radial.val = constrainNumber(value, 0, 100);
		updateRadial(id);
	}else if (rType === "spin"){
		UI.pattern.spin = value;
		updatePattern();
	}else if (rType === "span"){
		UI.pattern.span = value;
		updatePattern();
	}else{
		console.log('bad rType: ' + rType);
	}	
	updateRangeUI('slider'+id);
	//showTooltip(id, value);
	showTooltip(id);
	applyBackground();
}

function updateColorInput(id, color){
	var contrastColor = '0,0,0,';
	var contrastOpacity = '1';
	var contrastVal = chroma.contrast(color, '000');
	var contrastLevel = contrastVal - 10;
	if(contrastVal < 9){
		contrastColor = '255,255,255,';
		contrastLevel = 12 - contrastVal;
	}
	if(contrastLevel > 5){
		contrastOpacity = constrainNumber( 1.7 - (contrastLevel/11), 0, 1 );
	}
	document.getElementById('color-'+id).style.color = 'rgba(' + contrastColor + contrastOpacity + ')';
}

//function updateColor(id, color){
function updateColor(id, color, saveToHistory = false){
    if(isNaN(id)){return;}    
    if(!/([0-9A-F]{6}$)/i.test(color)){return;}
	
    COLOR[id] = color.replace('#', '');
	if(saveToHistory){
		updateColorHistory(COLOR[id]);
	}	
	updateColorInput(id, COLOR[id]);	
    var temp = '';
	var oldColor = '';
	var newColor = '';
    var colorNumber;
    var startColor;
    var endColor;
    var colorPercent;
    var colorMode = UI.colorMode.name[UI.colorMode.val];
	var varianceLine;
    if(UI.variance.reset){
		UI.variance.lines = [];
    }
    for(var i = 0; i < PALETTE.length; i++){		
		
        if(PALETTE[i].type === 'color'){
            PALETTE[i].color = COLOR[PALETTE[i].number];            
        }else if(PALETTE[i].type === 'steps'){
            colorNumber = PALETTE[i].number;
            startColor = Math.floor(colorNumber / 10);
            endColor = colorNumber - (startColor * 10);
            colorPercent = PALETTE[i].step / (STEP_COUNTER[colorNumber] + 1);
            PALETTE[i].color = String(chroma.mix(COLOR[startColor], COLOR[endColor], colorPercent, colorMode)).replace("#", '');
        }else if(PALETTE[i].type === 'blend'){
            colorNumber = PALETTE[i].number;
            startColor = Math.floor(colorNumber / 10);
            endColor = colorNumber - (startColor * 10);
            PALETTE[i].color = String(chroma.mix(COLOR[startColor], COLOR[endColor], 0.5, colorMode)).replace("#", '');
        }                
        if(PALETTE[i].type === 'copy'){
            PALETTE[i].color = COPIED_COLOR;
        }else{
            COPIED_COLOR = PALETTE[i].color;
        }
        if(PALETTE[i].vary === true){ //randomized fluctuating color from chosen color set
            var varied_color;
            var variation_set = UI.variance.colors[UI.variance.current];
            var variation_strength;    
            if(UI.variance.reset){
                if(variation_set === 'random'){
                    varied_color = String(chroma.random()).replace("#", '');
                }else if(variation_set.length !== 2){
                    varied_color = variation_set[randomArrayElement(variation_set.length)];
                }else{
                    varied_color = String(chroma.mix( variation_set[0], variation_set[1], Math.ceil( Math.random() * 100)/100)).replace("#", '');
                }
                UI.variance.add({
					line: i, 
					color: varied_color, 
					strength: Math.ceil( Math.random() * 100)/100
				});
            }
			varianceLine = UI.variance.getIndex(i);		
            varied_color = UI.variance.get(varianceLine).color;
            variation_strength = UI.variance.strength * UI.variance.get(varianceLine).strength;
            PALETTE[i].color = String(chroma.mix(PALETTE[i].color, varied_color, variation_strength)).replace("#", '');
        }		
        if(PALETTE[i].lightness !== 0){ //moved after copy - darken/lighten doesn't need to be copied
            var fade_percent = 0;
            if(PALETTE[i].lightness > 1){ //fade
                fade_percent = PALETTE[i].lightness - 1;
                PALETTE[i].color = 'FFF';
                if(chroma.contrast(COLOR[PALETTE[i].number], '000') > 11){
                    //PALETTE[i].color = PALETTE[i].color = '000';                
                    PALETTE[i].color = '000';
                }
                PALETTE[i].color = String(chroma.mix(COLOR[PALETTE[i].number], PALETTE[i].color, fade_percent)).replace("#", '');
            }else if(PALETTE[i].lightness < -1){ //boost
                fade_percent = PALETTE[i].lightness + 1;
                PALETTE[i].color = '000';
                if(chroma.contrast(COLOR[PALETTE[i].number], '000') > 11){
                    //PALETTE[i].color = PALETTE[i].color = 'FFF';                
                    PALETTE[i].color = 'FFF';                
                }
                PALETTE[i].color = String(chroma.mix(COLOR[PALETTE[i].number], PALETTE[i].color, fade_percent)).replace("#", '');
            }else{
                PALETTE[i].color = applyLightness(PALETTE[i].color, PALETTE[i].lightness);
            }
        }
        temp = BG_ARRAY[PALETTE[i].line];
		oldColor = temp.match(/(stop-color|fill|stroke)=(\'\%23[^']*\')/)[2];
        newColor = "'%23" + PALETTE[i].color + "'";
        temp = temp.replace(oldColor,  newColor);
        BG_ARRAY[PALETTE[i].line] = temp;
    }
    UI.variance.reset = false;
	updateColorList();
	applyBackground();
}

function updateColorList(){
	var colorDigits, colorArr, colorValues;
	for(var i = 0; i < UI.colorList.length; i++){		
		colorDigits = UI.colorList[i].colors;		
		colorArr = colorDigits.split('').map(Number);
		for(var ii = 0; ii < colorArr.length; ii++){
			if(ii === 0){
				colorValues = "";
			}else{
				colorValues += "%3B";
			}
			colorValues += "%23" + COLOR[colorArr[ii]];
		}
		//console.log(colorValues, UI.colorList[i].line, colorArr);
		updateAttrValue(UI.colorList[i].line, 'values', colorValues);
	}
}
function extractColorList(numbers, colors){
	var theColors = colors.split("%3B");
	var theNumbers = numbers.split('').map(Number);	
	for(var i = 0; i < theNumbers.length; i++){
		COLOR[theNumbers[i]] = chroma(theColors[i].replace('%23', '')).hex().replace('#', '');
		//console.log(theNumbers[i], theColors[i], chroma(theColors[i]).hex());
	}	
}

    
function randomNumber(num){  // between 0 and num
  return Math.floor(Math.random() * (num + 1));
}
function randomArrayElement(num){  // between 0 and num
  return Math.floor(Math.random() * num);
}
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

    
function updateBlendMode(val){
    if(isNaN(val)){return}
	UI.colorMode.val = loopNumber(UI.colorMode.val + val, 0, UI.colorMode.name.length - 1);
	document.getElementById('blendMode').innerHTML = UI.colorMode.name[UI.colorMode.val].toUpperCase() + " MODE";
    updateColor(1, COLOR[1]);
}
function updateVaryMode(val){
    if(isNaN(val)){return}
    UI.variance.reset = true;
	UI.variance.current = loopNumber(UI.variance.current + val, 0, UI.variance.colors.length - 1);		
    setVariationType(); 
    updateColor(1, COLOR[1]);
}
function setVariationType(){
    var mode = UI.variance.names[UI.variance.current];
    document.getElementById("varyMode").value = mode; 
}
function updateModMode(val){
    if(isNaN(val)){return}
    MODIFICATION_NUMBER += val;
    if(MODIFICATION_NUMBER < 1){
        MODIFICATION_NUMBER = MODIFICATION_VERSIONS;
    } else if (MODIFICATION_NUMBER > MODIFICATION_VERSIONS){
        MODIFICATION_NUMBER = 1;
    }
    var group_number = MODIFICATION_NUMBER;
    if(group_number === 1){
        group_number = '';
    }
		
	//HACK: These 5 lines seem like a hack... should need to changes names, just trigger selectBG
    var bg_name = UI.name.toLowerCase().replace(" ", "-");    
    var el = document.getElementById(bg_name).getElementsByTagName("a")[0];
    el.className = 'button bg-' + bg_name + group_number; //change class name 
    selectBG('#' + bg_name, group_number);    
    el.className = 'button bg-' + bg_name; //change class name back;
}

function applyLightness(color, percent){	
	var blendMode = UI.colorMode.name[UI.colorMode.val];
    if(percent === 0){
        return color;
    }else if (percent > 0){
        return String(chroma.mix(color, '#FFFFFF', percent, blendMode)).replace("#", '');
    }else if (percent < 0){
        return String(chroma.mix(color, '#000', -percent, blendMode)).replace("#", '');
    }
}

function updateStrokeWidth(){	
	var l = 0;
    var stroke_width;
    var stroke_multiple;    
	while(l < UI.strokeWidth.count()){
        stroke_multiple = UI.strokeWidth.get(l).multiple;
        stroke_width = UI.strokeWidth.val * stroke_multiple;
        updateAttrValue(UI.strokeWidth.getLine(l), 'stroke-width', stroke_width);
		l++;
	}
}
function updateDuration(){
	var l = 0;
	var dur = UI.duration.val;
	while(l < UI.duration.count()){        
        updateAttrValue(UI.duration.getLine(l), 'dur', dur + "s");
		l++;
	}
}
function updateRepeatCount(){
	var l = 0;
	var loops;
	var count = UI.loops.val;
	while(l < UI.loops.count()){  
		loops = count > 0 ? count : "indefinite";
        updateAttrValue(UI.loops.getLine(l), 'repeatCount', loops);
		l++;
	}
}
function updateStagger(){
	var l = 0;
	var stagger;
	var delay = UI.stagger.val;
	var elements = UI.stagger.count();
	while(l < elements){
		stagger = (delay > 0) ? -delay*l : delay*(elements-l);
        updateAttrValue(UI.stagger.getLine(l), 'begin', stagger + "s");
		l++;
	}
}
function updatePattern(){
    var updatedValue, PATT, oX, oY, spin_origin, span_origin;
    var l = 0;	
	while(l < UI.pattern.count()){
		updatedValue = '';
		PATT = UI.pattern.get(l);		
		spin_origin = '';
		span_origin = '';
		oX = parseFloat(PATT.origin[0]);
		oY = parseFloat(PATT.origin[1]);
		if(UI.pattern.spin > 0){
			if(oX + oY > 0){
				spin_origin = ' ' + (oX * PATT.width) + ' ' + (oY * PATT.height);
			}
			updatedValue += 'rotate(' + UI.pattern.spin + spin_origin + ')';
		}
		if(!UI.pattern.active){
			if(updatedValue !== ''){
				updatedValue += ' ';
			}
			updatedValue += 'scale(' + PATT.span + ')';
		}else if(UI.pattern.span > 1 || UI.pattern.span < 1){ //if span doesn't == 1?
			if(updatedValue !== ''){
				updatedValue += ' ';
			}
			updatedValue += 'scale(' + UI.pattern.span + ')';
			if(oX + oY > 0){
				span_origin = ' translate('
					span_origin += parseFloat((oX * (( PATT.width / UI.pattern.span) - PATT.width)).toFixed(2));
					span_origin += ' ';
					span_origin += parseFloat((oY * (( PATT.height / UI.pattern.span) - PATT.height)).toFixed(2));
				span_origin += ')';
			}
			updatedValue += span_origin;
		}
        updateAttrValue( PATT.line, 'patternTransform', updatedValue);
        l++;
    }
}

function updateAngle(num){ //0 - 360;	
	var center;
	var temp = BG_ARRAY[ UI.angle.getLineFromSlider(num) ];
    if(temp.includes("'100%25'")){
        center = "," + Math.floor(screenWidth()/2) + "," + Math.floor(screenHeight()/2);
    }else{
        center = "," + 0.5 + "," + 0.5;
    }
	var y2;
	if(temp.includes("gradientTransform")){
		
	}else{		
		y2 = temp.match(/y2=\'[0-9%]*\'/)[0];	
		temp = temp.replace(y2, y2 + " gradientTransform='rotate(0)'");
	}
	temp = temp.replace(/gradientTransform=\'rotate\([0-9,.]*\)\'/, "gradientTransform='rotate(" + UI.angle.val + center + ")'");
	BG_ARRAY[ UI.angle.getLineFromSlider(num) ] = temp;
	
}

function constrainNumber(num, min, max){
	if(num > max){
		return max;
	}else if(num < min){
		return min;
	}
	return num;
}
function loopNumber(num, min, max){	
	if(num > max){
		return min;
	}else if(num < min){
		return max;
	}
	return num;
}

function updateRadial(num){ //0 - 100;
	var temp = BG_ARRAY[ UI.radial.getLineFromSlider(num) ];
	temp = temp.replace(/ r=\'[0-9%.]*\'/, " r='" + UI.radial.val + "%25'");
	BG_ARRAY[ UI.radial.getLineFromSlider(num) ] = temp;
}

function updateScale(id, value){
	UI.scale.val = value;
	//var value = convertScale(UI.scale.val);
	//value = convertToMultiple(value, id);
	var wValue, hValue, w, h;
	wValue = hValue = w = h = value;
	var circle, cx, cy, cr;
	var l = 0;	
	while(l < UI.scale.count()){
		var temp = BG_ARRAY[UI.scale.getLine(l)];
		if(temp.includes("width")){
			w = Number(temp.match(/width=\'([^']*)\'/)[1]);
			h = Number(temp.match(/height=\'([^']*)\'/)[1]);
		}else{
			cx = Number(temp.match(/cx=\'([^']*)\'/)[1]);
			cy = Number(temp.match(/cy=\'([^']*)\'/)[1]);
			cr = Number(temp.match(/ r=\'([^']*)\'/)[1]);
		}
        if(ORIGINAL_WIDTH === 0){
           ORIGINAL_WIDTH = w;
           ORIGINAL_HEIGHT = h;
        }
		if(w > h){ //decide whether w or h is bigger            
			hValue = Math.round(ORIGINAL_HEIGHT/ORIGINAL_WIDTH * value * 10)/10;            
			circle = wValue/2;
		}else{
			wValue = Math.round(ORIGINAL_WIDTH/ORIGINAL_HEIGHT * value * 10)/10;
			circle = hValue/2;
		}
		if(temp.includes("width")){
			temp = temp.replace("width='" + w + "'", "width='" + wValue + "'");
			temp = temp.replace("height='" + h + "'", "height='" + hValue + "'");
		}else{
			temp = temp.replace("cx='" + cx + "'", "cx='" + circle + "'");
			temp = temp.replace("cy='" + cy + "'", "cy='" + circle + "'");
			temp = temp.replace(" r='" + cr + "'", " r='" + circle + "'");
		}
		BG_ARRAY[UI.scale.getLine(l)] = temp;
		l++;
	}    
}

function updateSize(sizeID, value){ 	
	UI.size.val = value;	
	//var value = convertSize(UI.size.val);
	//value = convertToMultiple(value, sizeID); //no multiple?	
	var wValue = value;
	var hValue = value;
	var l = 0;
	while(l < UI.size.count()){
		var temp = BG_ARRAY[UI.size.getLine(l)];
		if(temp.includes("width") && temp.includes("height")){
			var w = Number(temp.match(/width=[']([^']*)[']/)[1]);
			var h = Number(temp.match(/height=[']([^']*)[']/)[1]);
			if(w > h){ //decide whether w or h is bigger
				hValue = h/w * value;
			}else{
				wValue = w/h * value;
			}
			temp = temp.replace("width='" + w + "'", "width='" + wValue + "'");
			temp = temp.replace("height='" + h + "'", "height='" + hValue + "'");
		}
        if(temp.includes("viewBox")){
            var viewbox = temp.match(/viewBox=[']0 0 ([^']*)[']/)[1];
			temp = temp.replace("viewBox='0 0 " + viewbox + "'", "viewBox='0 0 " + wValue + ' ' + hValue + "'");            
        }
		if(temp.includes(" r='")){
			temp = temp.replace(/[ ]*r=\'[0-9.]*\'/, " r='" + value + "'");
		}
		if(UI.slider[sizeID].version === UI.size.get(l).slider){
			BG_ARRAY[UI.size.getLine(l)] = temp;
		}
		l++;
	}
}

function updateWidth(id, value){
    var temp;
    var w;
    var wValue;
    var line = 0;
    var l = 0;
    while(l < UI.width.count()){   
        UI.width.get(l).value = value;
        line = UI.width.getLine(l);
        temp = BG_ARRAY[line];
        w = temp.match(/width=[']([^']*)[']/)[1];
        wValue = value;   
        if(w.includes('%25')){
            wValue = value + '%25';
        }  
        temp = temp.replace("width='" + w + "'", "width='" + wValue + "'");        
        BG_ARRAY[line] = temp;
        if(line === 1){
            calcBackgroundSize();
        }
        l++;
    }
}

function updateHeight(id, value){	
    var temp;
    var h;
    var hValue;
    var line = 0;
    var l = 0; 
    while(l < UI.height.count()){
		UI.height.get(l).value = value;
        line = UI.height.getLine(l);        
        temp = BG_ARRAY[line];     
        h = temp.match(/height=[']([^']*)[']/)[1];
        hValue = value;        
        if(h.includes('%25')){
            hValue = value + '%25';
        }        
        temp = temp.replace("height='" + h + "'", "height='" + hValue + "'");        
        BG_ARRAY[line] = temp;        
        if(line === 1){
            calcBackgroundSize();
        }
        l++;
    }    
}

function updatePosition(){
	var l = 0;      
	while(l < UI.position.count()){
		
        var temp = BG_ARRAY[UI.position.getLine(l)];
        var tempType = UI.position.get(l).type;
        var tempValue = UI.position.get(l).val;
        var xValue = Number(tempValue.match(/[M]([0-9.-]*) [0-9.-]*/)[1]);
        var yValue = Number(tempValue.match(/[M][0-9.-]* ([0-9.-]*)/)[1]);
        var newX = xValue;
        var newY = yValue;
        var position = parseInt(UI.position.val);
        var newValue;
        var replaceValue = temp.match(/[M][0-9.-]* [0-9.-]*/)[0];
        
        if(tempType.toUpperCase() !== tempType){ //lowercase x or y means negative number
            position = -position;
        }        
        if(tempType.toUpperCase() === 'X'){
            newX = xValue + position;
        }else if (tempType.toUpperCase() === 'Y'){
            newY = yValue + position;
        }
        if(tempType.includes('U')){
            newY = parseInt(yValue - position/2.5);
        }else if (tempType.includes('D')){
            newY = parseInt(yValue + position/2.5);
        }
        if(tempType.includes('R')){
            newX = xValue + position;
        }else if (tempType.includes('L')){
            newX = xValue - position;
        }        
        newValue = "M" + newX + " " + newY;
        temp = temp.replace(replaceValue, newValue);
		BG_ARRAY[UI.position.getLine(l)] = temp;
		l++;
	}   
}

function updateMove(){    
    var l = 0;
    var mVals = [];    
    var updatedValue, updatedSpace, line, value, orX, orY, rotate_origin;
    var mX, mY, mRotation, mScale;  
    while(l < UI.move.count()){
        line = UI.move.getLine(l);
        if(mVals[line] === undefined){
           mVals[line] = [0, 0, 0, 1];
        }
        
		value = document.getElementById("slider" + UI.move.sliders[UI.move.get(l).slider - 1]).value;	
		
		mX = convertPercentage( 0, UI.move.get(l).x, parseInt(value, 10));
        mY = convertPercentage( 0, UI.move.get(l).y, parseInt(value, 10));
        mRotation = convertPercentage( 0, UI.move.get(l).rotate, parseInt(value, 10));
        mScale = convertPercentage( 1, UI.move.get(l).scale, parseInt(value, 10));
		
        mVals[line][0] += mX;
        mVals[line][1] += mY;
        mVals[line][2] += mRotation;
        mVals[line][3] *= mScale;
        
        updatedValue = '';
        updatedSpace = '';
        if( mVals[line][0] !== 0 ||  mVals[line][1] !== 0 ){
            updatedValue += 'translate(' + mVals[line][0] + ' ' + mVals[line][1] + ')';
            updatedSpace = ' ';
        }
        if( mVals[line][2] !== 0 ){
            rotate_origin = UI.move.get(l).origin;
            orX = rotate_origin[0];
            orY = rotate_origin[1];
            rotate_origin = ' ' + orX + ' ' + orY;
            updatedValue += updatedSpace + 'rotate(' + mVals[line][2] + rotate_origin + ')';
            updatedSpace = ' ';
        }
        if( mVals[line][3] !== 1 ){
            updatedValue += updatedSpace + 'scale(' + mVals[line][3] + ')';
        }
        updateAttrValue(line, 'transform', updatedValue);
        l++;
    }
}
function convertPercentage(min, max, percentage){    
    if(min === 0 && max === 0){
        return 0;
    }
    var scale_difference = max - min;
    var scale_multiple = scale_difference/100;
    var value = min + (scale_multiple * percentage);
    return Math.round(value * 1000) / 1000;
}

function updateOpacity(){ //need: avoid targeting stop-opacity    
	var l = 0;	
	while(l < UI.opacity.count()){		
        var temp = BG_ARRAY[UI.opacity.getLine(l)];		
        var oldOpacity = "opacity='" + temp.match(/opacity=\'([^']*)[']/)[1] + "'";
        var newOpacity = "opacity='" + UI.opacity.val + "'";
        temp = temp.replace(oldOpacity,  newOpacity);
        BG_ARRAY[UI.opacity.getLine(l)] = temp;
        l++;		
    }
}

function applyBackground(){	
	BG.image = BG_ARRAY.join("");
	//document.body.style.backgroundColor = "#" + COLOR[1];
	//document.body.style.backgroundImage = BG.image;
	//document.body.style.backgroundAttachment = BG.attachment;
	//document.body.style.backgroundSize = BG.size;
    //document.body.style.backgroundRepeat = BG.repeat;
    //document.body.style.backgroundPosition = BG.position;
	
	document.body.style.setProperty("--BG-image", BG.image);
	document.body.style.setProperty("--BG-size", BG.size);
	document.body.style.setProperty("--BG-color", "#" + COLOR[1]);
	document.body.style.setProperty("--BG-position", BG.position); //fixed?
	document.body.style.setProperty("--BG-repeat", BG.repeat);
	document.body.style.setProperty("--BG-attachment", BG.attachment);
	
	
}


function openExport(){
	var OVERLAY = document.getElementById('exportBox');
	var THUMB = document.getElementById('thumbIMG');
	var NAME = document.getElementById('thumbName');	
	THUMB.src = UI.thumb;
	THUMB.alt = UI.alt;
	NAME.innerHTML = UI.name;	
	OVERLAY.classList.toggle('active');	
	mixpanel.track('View Export Options', {"name": UI.slug});
}
function openInfo(){
	var OVERLAY = document.getElementById('infoBox');
	OVERLAY.classList.toggle('active');
	mixpanel.track('Info Button');
	
}
function previewBG(){
	var OVERLAY = document.getElementById('pitchBox');
	OVERLAY.classList.toggle('active');
	mixpanel.track('Preview Background', {"name": UI.slug});
}
function closeBox(e, type){
	e = e || window.event;
    var target = e.target || e.srcElement;	
	var OVERLAY = document.getElementById(type + 'Box');
	var CLOSE = document.getElementById('close' + titleCase(type) + 'Box');	
	if(target === OVERLAY || target === CLOSE){
		OVERLAY.classList.remove('active');
	}
}


function copyBG(type, target){	
	if(type === 'css'){
		copyToClipboard( exportCSS(), target );
	}else{
		//var SVG = URItoSVG(BG.image);
		var SVG = inlineSVG();		
		if(type === 'svg'){
			SVG = SVG.replace(/xlink:href/g, 'href');
			copyToClipboard(SVG, target);
		}else if(type === 'ill'){			
			SVG = SVG.replace(/href/g, 'xlink:href');			
			SVG = SVG.replace(/xlink:xlink/g, 'xlink');
			copyToClipboard(SVG, target);
		}else if(type === 'figma'){
			copyToClipboard(SVG, target);
		}else if(type === 'xd'){
			copyToClipboard(SVG, target);
		}
	}	
	mixpanel.track('Export Background', {"name": UI.slug, "type": "copy " + type});
	mixpanel.people.increment('bg_exports');
}

function copyToClipboard(msg, target) {	
	if(!navigator.clipboard){ //old technique
		var range = document.createRange();
		var msgHolder = document.getElementById("CLIPBOARD");	
		var contentToCopy = document.createTextNode(msg);
		msgHolder.innerHTML = '';
		msgHolder.appendChild(contentToCopy);
		range.selectNode(msgHolder);
		window.getSelection().removeAllRanges(); // clear current selection
		window.getSelection().addRange(range); // to select text
		document.execCommand("copy");
		window.getSelection().removeAllRanges();// to deselect			
	}else{ //modern approach
		navigator.clipboard.writeText(msg).then(
			function(){
			notifyBox(target, 'Copied', true);
		})
		.catch(
			function() {
			notifyBox(target, 'Error', true);
		});
	}	
} //https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard


function downloadBG(type, target){
	notifyBox(target, 'Saving', true);
	if(type === 'svg'){
		svgDownload();
	}else if(type === 'png'){
		pngDownload();
	}
	mixpanel.track('Export Background', {"name": UI.slug, "type": "download " + type});
	mixpanel.people.increment('bg_exports');
}

function pngDownload() {
	var CANVAS = document.getElementById('DOM_CANVAS');
	CANVAS.innerHTML = inlineSVG();
	var SVG = CANVAS.firstChild;
	var hasAttr = false;
	var isBigger = false;
	var w = getAttrValue(1, 'width');
	var h = getAttrValue(1, 'height');
	console.log(w, h);
	if(w === "100%25" || w === null || w === 0){
		w = ORIGINAL_WIDTH;
		h = ORIGINAL_HEIGHT;
	}else{
		hasAttr = true;
	}
	console.log(w, h);
	if(w === "100%25" || +w === 0){
		w = 1600;
		h = 1200;
	}
	w = +w;
	h = +h;
	var multipleW = w;
	var multipleH = h;
	console.log(w, h);
	if(w < 50){
		w = w * 10;
		multipleW = w * 10;
		h = h * 10;
		multipleH = h * 10;
	}	
	console.log(w, h);
	while(w < 1500){
		w+= multipleW;
		h+= multipleH;
		isBigger = true;
	}	
	console.log(w, h);	
	if(hasAttr && isBigger){
		SVG.setAttribute("width", w);
		SVG.setAttribute("height", h);
	}
	CANVAS.style.width = w + "px";
	CANVAS.style.height = h + "px";
	
	//https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f
	var clonedSvgElement = SVG.cloneNode(true);	
	let outerHTML = clonedSvgElement.outerHTML,
  	blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});
	let URL = window.URL || window.webkitURL || window;
	let blobURL = URL.createObjectURL(blob);
	let image = new Image();
	image.onload = () => {
		let canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		let context = canvas.getContext('2d'); 
		context.drawImage(image, 0, 0, w, h);
		let png = canvas.toDataURL(); // default png
		//let jpeg = canvas.toDataURL('image/jpg', .6);
		//let webp = canvas.toDataURL('image/webp');
		var download = function(href, name){
			var link = document.createElement('a');
			link.download = name;
			link.style.opacity = "0";
			document.body.append(link);
			link.href = href;
			link.click();
			link.remove();
		}
		download(png, UI.slug + '.png');		
	};
	image.src = blobURL;
	
	//biggest issues:
		//pattern tiles
		//Hide PNG for animations
		//BG.repeat; if pattern tile, treat special?	
}


function exportCSS(){
	var bgOutput = 'background-color: #' + COLOR[1] + ';';
	if(BG.image.length > 1){
		optimizeOutput();
		bgOutput += '\nbackground-image: ' + BG.image + ';';        
	}
	if(BG.attachment !== 'scroll'){
        bgOutput += '\nbackground-attachment: ' + BG.attachment + ';';
	}
    if(BG.repeat !== 'repeat'){
        bgOutput += '\nbackground-repeat: ' + BG.repeat + ';';
    }
	if(BG.size !== 'auto'){
        bgOutput += '\nbackground-size: ' + BG.size + ';';
        //bgOutput += '\nbackground-position: center;';
	}
    if(BG.position !== 'center'){ 
        bgOutput += '\nbackground-position: ' + BG.position + ';';
    }	
	//document.getElementById('codeOutput').innerHTML = bgOutput;
	return bgOutput;	
}
var REMOVE_EXCESS_CODE = ["gradientTransform='rotate(0)'", "gradientTransform='rotate(360)'", "fill-opacity='1'", "stroke-opacity='1'", " opacity='1'", " transform=''", " patternTransform=''"];
function optimizeOutput(){
	var l = 0;
	while(l < REMOVE_EXCESS_CODE.length){
		BG.image = BG.image.replace(REMOVE_EXCESS_CODE[l], '');
		l++;
	}
	BG.image = BG.image.replace(/  +/g, ' ');
}
function transformCode(){	//assistant
	var inputer = document.getElementById('codeInputer');
	var outputer = document.getElementById('codeOutputer');
	outputer.innerHTML = encodeOptimizedSVGDataUri_assistant(inputer.value);
}

function titleCase(str){
	return str.toLowerCase().split(' ').map(function(word) {
	    return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
}
//function encodeOptimizedSVGDataUri(svgString){ //https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
function SVGtoURI(svgString){ //https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
  var uriPayload = encodeURIComponent(svgString) // encode URL-unsafe characters
	.replace(/%0A/g, '') // remove newlines
	.replace(/%20/g, ' ') // put spaces back in
	.replace(/%3D/g, '=') // ditto equals signs
	.replace(/%3A/g, ':') // ditto colons
	.replace(/%2F/g, '/') // ditto slashes
	.replace(/%22/g, "'"); // replace quotes with apostrophes (may break certain SVGs)
  return 'data:image/svg+xml,' + uriPayload;
}
function URItoSVG(svgString){
	return svgString
    .replace('url("data:image/svg+xml,', '')
    .replace('")', '')
    .replace(/%3C/g, '<')
    .replace(/%3E/g, '>')
    .replace(/%25/g, '%')
    .replace(/%23/g, '#')
    .replace(/%2C/g, ',')
	.replace(/%3B/g, ';');
}
function inlineSVG(){
	var extraBackground = "><";
    if(ORIGINAL_WIDTH > 0){
        extraBackground = "><rect fill='#" + COLOR[1] + "' width='" + ORIGINAL_WIDTH + "' height='" + ORIGINAL_HEIGHT + "'/><";
    }    
    return BG.image
    .replace('url("data:image/svg+xml,', '')
    .replace('")', '')
    .replace(/%3C/g, '<')
    .replace(/%3E/g, '>')
    .replace(/%25/g, '%')
    .replace(/%23/g, '#')
    .replace(/%2C/g, ',')
    .replace(/%3B/g, ';')
    .replace('><', extraBackground);
}


function encodeOptimizedSVGDataUri_assistant(svgString){ //https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
    if(svgString.length > 20){    
        svgString = svgString.replace(/\r?\n|\r/g, '');
        svgString = svgString.replace(/ +(?= )/g, '');
        var uriPayload = encodeURIComponent(svgString) // encode URL-unsafe characters
        .replace(/%0A/g, '') // remove newlines
        .replace(/%20/g, ' ') // put spaces back in
        .replace(/%3D/g, '=') // ditto equals signs
        .replace(/%3A/g, ':') // ditto colons
        .replace(/%2F/g, '/') // ditto slashes
        .replace(/%2C/g, ' ') // replace commas with spaces
        // add this: replace spaces and tabs between attribute width='21 '
        .replace(/%22/g, "'"); // replace quotes with apostrophes (may break certain SVGs)
        
        uriPayload = uriPayload.replace(/\%3E \%3C/g,'%3E%3C')
			.replace(/\%09/g,'')
			.replace('xmlns:xlink="http://www.w3.org/1999/xlink"','');
		

        var viewBOX = uriPayload.match(/viewBox=\'[0-9 %.]*\'/)[0];  
        //var svgTAG = uriPayload.match(/%3Csvg(.*)xml\:space=\'preserve\'%3E/)[0];    
        //uriPayload = uriPayload.replace(svgTAG,'');
        
        //var svgDATA = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' ';
        //var svgDATA = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' ";
        var svgDATA = "data:image/svg+xml,";
        /*if(uriPayload.includes('use xlink:href')){
            svgDATA += "xmlns:xlink='http://www.w3.org/1999/xlink' ";
        }*/        
        if(false){ //eventually make radio box for scaling
            var viewBoxNumbers = viewBOX.replace("viewBox='",'');
            viewBoxNumbers = viewBoxNumbers.replace("'",'');
            viewBoxNumbers = viewBoxNumbers.split(' ');
            var dataWidth = viewBoxNumbers[2] - viewBoxNumbers[0];
            var dataHeight = viewBoxNumbers[3] - viewBoxNumbers[1];            
            svgDATA +=  "class='scale' width='"  + dataWidth +  "' height='"  + dataHeight +  "' ";
        }
		//return  'svgDATA:' + svgDATA + 'viewBox:' + viewBOX + '%3E' + 'uriPayload:' + uriPayload;	
		return  '.your-class{\n' + '	background-image: url("' + svgDATA + uriPayload + '");\n' + '}';
		//return  svgDATA + viewBOX + '%3E' + uriPayload;
    }
	return 'No results: invalid SVG code';
}

function svgDownload(){    
    var blob = new Blob([inlineSVG()], {type: "image/svg+xml;charset=utf-8"});
    saveAs(blob, UI.slug + ".svg");
}
jscolor.presets.default = {
	alphaChannel:false,
	previewSize:0,
	previewPadding: 0,
	padding: 10,
	borderRadius:0,
	backgroundColor: '#000',
	borderColor: '#000',
	borderWidth: 0,
	controlBorderWidth: 0,
	controlBorderColor:'#000',
	//format: 'hex',
	format: 'any',
	paletteCols:10,
	paletteHeight: 999,
	paletteSpacing: 5,
	//palette: '#fff #777 #333 #000 #808080 #996e36 #f55525 #ffe438 #88dd20 #22e0cd #269aff #bb1cd4',
	//pull users brand colors if active
	//palette: '#fff #777 #333 #000 #808080 #996e36 #f55525 #ffe438 #88dd20 #22e0cd',	
	palette: BRAND_COLORS.join(" "),
	width:400, 
	height:200, 
	//mode:'HVS',
	sliderSize:25,
	shadow:false	
};
jscolor.trigger('input');


function loadColorHistory(){
	if(!SHOW_COLOR_HISTORY){return}
	for(var i = 1; i <= UI.color.count; i++){
		document.querySelector('#color-'+ i).jscolor.option('palette', COLOR_HISTORY);
	}
}
function updateColorHistory(color){
	if(!SHOW_COLOR_HISTORY){return}	
	
	var index = COLOR_HISTORY.indexOf('#' + color);
	if(index !== -1){
		COLOR_HISTORY.splice(index, 1);			
	}else{
		COLOR_HISTORY.pop();
	}
	COLOR_HISTORY.unshift('#' + color);
	loadColorHistory();
	
	/* OLD WAY
	var index = UI.color.history.indexOf('#' + color);
	if(index !== -1){
		UI.color.history.splice(index, 1);			
	}else{
		UI.color.history.pop();
	}
	UI.color.history.unshift('#' + color);
	for(var i = 1; i <= UI.color.count; i++){
		document.querySelector('#color-'+ i).jscolor.option('palette', UI.color.history);
	} */
}

/* Util */
function elementPosition(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft, bottom: rect.bottom + scrollTop, right: rect.right + scrollLeft, width: rect.width, height: rect.bottom - rect.top}
}


function notifyBox(el, msg, rounded) {
	rounded = rounded || false;
	var CONTENT = document.getElementById("content-wrap");
	var nBOX = document.createElement('div');
	CONTENT.insertBefore(nBOX, CONTENT.firstChild);
	nBOX.classList.add("notifyBox");
	var msgToShow = document.createTextNode(msg);	
	nBOX.appendChild(msgToShow);
	var elPosition = elementPosition(el);	
	nBOX.style.left = (elPosition.left) + 'px';
	nBOX.style.top = (elPosition.top) + 'px';
	nBOX.style.width = (elPosition.width) + 'px';
	nBOX.style.height = (elPosition.height) + 'px'; //(elPosition.bottom - elPosition.top) + 'px';
	nBOX.style.lineHeight = (elPosition.bottom - elPosition.top) + 'px';
	if(rounded){
		nBOX.style.borderRadius  = '99px';
	}	
	setTimeout(() => nBOX.classList.add("fadeOut"), 500 );	
	setTimeout(() => CONTENT.removeChild(nBOX), 1500 );
}
