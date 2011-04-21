// Universal Sequence Maps (hoding Object for CGR operations

console.log('CGR toolbox :-)');

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

usm = function (seq,abc,pack){ // Universal Sequence Map

	this.alphabet=function(seqString){//extracts alphabet
		if (!seqString){seqString=this.seq} //uses own string if argument not provided
		var abc='';
		for (var i=0;i<seqString.length;i++){
			if (!abc.match(new RegExp(seqString[i]))){abc+=seqString[i]}
		}
		return abc.sort(); // using overloaded String.sort()
	}
	
	this.str2bin = function(pack){
		var m = this.abc.length;var n = this.seq.length;
		if (!pack){pack='compact'} // default packing method
		this.pack=pack;
		this.bin=[];
		switch (pack){
		case 'sparse':
			for (var j=0;j<m;j++){
				this.ABC[j]=this.abc[j];
				this.bin[j]=[];
				for (i=0;i<n;i++){
					if (this.seq[i]===this.abc[j]){this.bin[j][i]=1}
					else {this.bin[j][i]=0}
				}
			}
			break;
		case 'compact':
			var L = Math.ceil(Math.log(m)/Math.log(2)); // map dimension
		    var mm=Math.pow(2,L); // maximum length of this alphabet
			for (var j=0;j<L;j++){
				this.bin[j]=[];
				var abc='';mm=mm/2;
				for (var i=0;i<m;i=i+mm*2){
					abc+=this.abc.slice(i,i+mm);
				}
				this.ABC[j]=abc;
				//console.log(mm+'> '+abc);
				for (var i=0;i<n;i++){
					if (abc.match(new RegExp(this.seq[i]))){this.bin[j][i]=1}
					else {this.bin[j][i]=0}
				}
			}
			break;
		}
	}
		
	this.cgr = function(bin,y){ // CGR with recursive seed
		var n = bin.length;
		if (!y){y=[bin[bin.length-1]]}
		var x = y[y.length-1];
		//console.log(x); // seed
		if (n>100){var i=n-100}
		else {var i = 0}
		while (i<bin.length){
			x = x - (x-bin[i])/2;
			y[i] = x;
			i++;
		}
		if (y[0]!==x - (x-bin[0])/2){
			y=this.cgr(bin,y);
		}
		return y;
	}

	this.transpose = function(M){
		var T=[];
		for (var i=0;i<M[0].length;i++){
			T[i]=[];
			for (var j=0;j<M.length;j++){T[i][j]=M[j][i]}
		}
		return T;
	}

	this.map = function(seq,abc,pack){
		if (abc){if(abc.length==0){var abc = undefined}}
		if (!seq){seq=this.seq}
		else {this.seq=seq}
		if (!this.seq){throw ('Sequence not provided')}
		//if (seq){this.seq=seq}
		//else throw ('Sequence not provided')
		//if (!abc){this.abc=this.alphabet()}// extract alphabet		
		//else {this.abc=abc}
		if (abc){this.abc=abc};
		if (!this.abc){this.abc=''}
		this.abc=this.alphabet();
		var m = this.abc.length;var n = this.seq.length;
		this.ABC=[];
		this.str2bin(pack);
		this.mapForward = [];
		this.mapBackward = [];
		for (var i=0;i<this.bin.length;i++){
			this.mapForward[i]=this.cgr(this.bin[i]);
			this.mapBackward[i]=this.cgr(this.bin[i].reverse()).reverse();
		}
		delete this.bin; // comment out if bin is of any use
		this.mapForward=this.transpose(this.mapForward);
		this.mapBackward=this.transpose(this.mapBackward);
	}

	// run USM map automatically is a sequence is provided
	
	this.distCoord = function (a,b){ // distance between two coordinates
		var d=0;
		while((Math.pow(2,d)!=Infinity)&Math.round(a*Math.pow(2,d))==Math.round(b*Math.pow(2,d))){d++}
		return d;
	}

	this.distCGR = function (a,b){ // distance between two CGR positions, a and b are the CGR positions
		ab=u.transpose([a,b]); // such that each element is an array with two coordinates, one from each sequence
		var d = [];
		ab.forEach(function(x,i){d[i]=this.distCoord(x[0],x[1])});
		return d
	}

	this.mapReduce = function (x,map,reduce){
		return reduce(x.map(map))
	}

	if (seq){this.map(seq,abc,pack)}

}
