// Universal Sequence Maps (hoding Object for CGR operations

console.log('CGR');

// Overload String type, not sure it is a good idea, could interfere with other overloads
String.prototype.toArray = function(){ // creates an Array with each character of teh string as an element
	var y=[];
	for (var i=0;i<this.length;i++){
		y[i]=this[i];
	}
	return y;
}

String.prototype.sort=function(){ // sort characters of a string
	var y =this.toArray().sort().toString().replace(/,/g,'');
	return y;
}

usm = function (seq,abc){ // Universal Sequence Map
	this.alphabet=function(seqString){//extracts alphabet
		if (!seqString){seqString=this.str} //uses own string if argument not provided
		var abc='';
		for (var i=0;i<seqString.length;i++){
			if (!abc.match(new RegExp(seqString[i]))){abc+=seqString[i]}
		}
		return abc.sort(); // using overloaded String.sort()
	}
	
	if (seq){this.str=seq}
	if (!abc){this.abc=this.alphabet()}// extract alphabet		
	else {this.abc=abc}
	
	var m = this.abc.length;var n = this.str.length;
	this.str2bin = function(map){
		if (!map){map='sparce'}
		this.bin=[];
		switch (map){
		case 'sparce':
			for (var j=0;j<m;j++){
				this.bin[j]=[];
				for (i=0;i<n;i++){
					if (this.str[i]===this.abc[j]){this.bin[j][i]=1}
					else {this.bin[j][i]=0}
				}
			}
			break;
		case 'compact':
			for (var j=0;j<Math.ceil(Math.log(8)/Math.log(2));j++){
				this.bin[j]=[];
			}


		}
		
		//console.log('Size: [',n,',',m,']');
	}

	this.str2bin();
}