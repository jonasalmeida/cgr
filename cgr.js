// Universal Sequence Maps (hoding Object for CGR operations

console.log('CGR');

// Overload types
"".__proto__.toArray = function(){ // creates an Array with each character of teh string as an element
	var y=[];
	for (var i=0;i<this.length;i++){
		y[i]=this[i];
	}
	return y;
}

"".__proto__.sort=function(){ // sort characters of a string
	var y =this.toArray().sort().toString().replace(/,/g,'');
	return y;
}


usm = function (seq,abc){ // Universal Sequence Map
	this.seq={};
	this.seq.alphabet=function(seqString){//extracts alphabet
		if (!seqString){seqString=this.string} //uses own string if argument not provided
		var abc='';
		for (var i=0;i<seqString.length;i++){
			if (!abc.match(new RegExp(seqString[i]))){abc+=seqString[i]}
		}
		return abc.sort(); // using overloaded String.sort()
	}
	if (seq){// if the sequence was submitted
		this.seq.string=seq;
		if (!abc){this.seq.abc=this.seq.alphabet()}// but the alphabet was not included		
		else {this.seq.abc=abc}
	}
}