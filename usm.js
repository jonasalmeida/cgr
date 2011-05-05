// Universal Sequence Maps (hoding Object for CGR operations

console.log('CGR toolbox :-)');

// Overloading String and Array - watch out!

String.prototype.toArray = function(){ // creates an Array with each character of teh string as an element
	var y=[];
	for (var i=0;i<this.length;i++){
		y[i]=this[i];
	}
	return y;
}

String.prototype.sort=function(){ // sort characters of a string
	return this.toArray().sort().toString().replace(/,/g,'');
}

Array.prototype.max=function(){ // returns maximum value
	return this.reduce(function(x1,x2){if(x1>x2){return x1}else{return x2}});
}

Array.prototype.min=function(){ // returns maximum value
	return this.reduce(function(x1,x2){if(x1<x2){return x1}else{return x2}});
}

Array.prototype.sum=function(){ // returns sum of all values
	return this.reduce(function(x1,x2){return x1+x2});
}

Array.prototype.transpose=function(){ // written for arrays of arrays
	if (!Array.isArray(this[0])){
		M=this.map(function(x){return [x]})}
	else {M=this};
	var T=[];
	for (var i=0;i<M[0].length;i++){
		T[i]=[];
		for (var j=0;j<M.length;j++){T[i][j]=M[j][i]}
	}
	if ((Array.isArray(T[0]))&&(T[0].length==1)){T=T.map(function(x){return x[0]})}
	return T;
}

// Universal Sequence Mapping (USM)

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
				this.cube[j]=this.abc[j];
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
				this.cube[j]=abc;
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

	this.encode = function(seq,abc,pack){
		if (!seq){seq=this.seq}
		else {this.seq=seq}
		if (!this.seq){throw ('Sequence not provided')}
		if (abc){if(abc.length==0){var abc = undefined}} // in case abc=''
		if (abc){this.abc=abc}
		//if (!this.abc){this.abc=''}
		if (!this.abc){this.abc=this.alphabet()};
		var m = this.abc.length;var n = this.seq.length;
		this.cube=[];
		this.str2bin(pack);
		this.cgrForward = [];
		this.cgrBackward = [];
		for (var i=0;i<this.bin.length;i++){
			this.cgrForward[i]=this.cgr(this.bin[i]);
			this.cgrBackward[i]=this.cgr(this.bin[i].reverse()).reverse();
		}
		delete this.bin; // comment out if bin is of any use
		this.cgrForward=this.transpose(this.cgrForward);
		this.cgrBackward=this.transpose(this.cgrBackward);
	}

	this.decodeBin = function(x,n){// decompose single coordinate, x, into a binary array of length <= n
		if (!n){n=Infinity}
		var y = [];var i = 0;
		x=x*2;var z=[];
		y[0]=x; // just in case x is 0, 1 or even 1/2 (impossible) y is still populated
		while ((x!=Math.round(x))&(i<n)){
			if (x>1){y[i]=1;x=x-1}
			else{y[i]=0}
			x = x*2;i++;
		}
		return y
	}

	this.decodeBins = function(x,n){// decode sequence from coordinates
		if (this.cube.length!==x.length){throw('coordinate dimensions do not match, if should be an array with '+this.cube.length+' numbers')}
		var decodeBin=this.decodeBin;
		var y = x.map(function (x){return decodeBin(x,n)});
		if (!n){// trim dimensions
			n=y.map(function(x){return x.length}).min();
			y=y.map(function(x){return x.splice(0,n)});
		}
		return y;
	}

	// run USM map automatically is a sequence is provided
	
	this.L = function (a,b){ // distance between two coordinates
		var d=0;
		while((Math.pow(2,d)!=Infinity)&Math.round(a*Math.pow(2,d))==Math.round(b*Math.pow(2,d))){d++}
		return d;
	}

	this.distCGR = function (a,b){ // distance between two CGR positions, a and b
		//var ab=this.transpose([a,b]); // such that each position is an array of elements with two coordinates, one from each sequence
		var dist = this.L;
		return this.transpose([a,b]).map(function(x){return dist(x[0],x[1])}).min();
	}
	
	this.mapReduce = function (x,map,reduce){
		return reduce(x.map(map))
	}

	this.distProfile= function (s){// Distance to another sequence, s
		if (typeof(s)=='string'){
			s=new usm(s,this.abc,this.pack);
		}
		if (s.abc!==this.abc){throw('unequal alphabets')}
		if (s.pack!==this.pack){throw('unequal encode packing')}
		//var dist = this.distCGR;
		//var distCoord
		//var dist = function(a,b){return this.transpose([a,b]).map(function(x){return this.L(x[0],x[1])}).min()};
		var f = this.cgrForward.map(function(x){var x0=x; return s.cgrForward.map(function(x){return s.distCGR(x0,x)}).sum()});
		var b = this.cgrBackward.map(function(x){var x0=x; return s.cgrBackward.map(function(x){return s.distCGR(x0,x)}).sum()});

		return [f,b].transpose().sum();
	}

	if (seq){this.encode(seq,abc,pack)}

}
