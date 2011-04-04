console.log('CGR')

usm = function (seq,abc){ // Universal Sequence Map
	this.seq={};
	this.seq.alphabet=function(seqString){//extracts alphabet
		if (!seqString){seqString=this.string} //uses own string if argument not provided
		return seqString;
	}

	if (seq){// if the sequence was submitted
		this.seq.string=seq;
		if (!abc){this.seq.abc=this.seq.alphabet()}// but the alphabet was not provided		
		else {this.seq.abc=abc}
	}
}