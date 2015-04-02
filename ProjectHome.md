Javascript libraries and Apps for Chaos Game Representation (CGR) and related iterated mapping techniques such as Universal Sequence Maps (USM).

This consists of a usm Object coded in [cgr.js](http://cgr.googlecode.com/hg/cgr.js). The easiest way to try it is to point your browser to [cgr.html](http://cgr.googlecode.com/hg/cgr.html) which will automatically load it. Note this is just an empty html page with

```
<script src="cgr.js"></script>
```

in the document's head. For inspection of the code a more convenient interface can be fount at [http://code.google.com/p/cgr/source/browse/usm.js](http://code.google.com/p/cgr/source/browse/usm.js).

The next step is to open your browser's console (for example in Chrome goto Tools / Developer tools. To process a sequence you could load it as the single input argument of the instantiation of the `usm` object, for example `u=new usm('acggctgctatctgcgtacggtcgac')`:
```
> u=new usm('acggctgctatctgcgtacggtcgac')
usm
ABC: Array[2]
abc: "acgt"
alphabet: function (seqString){//extracts alphabet
cgr: function (bin,y){ // CGR with recursive seed
distCoord: function (a,b){ // distance between two coordinates
map: function (seq,abc,pack){
mapBackward: Array[2]
0: Array[26]
0: 0.786413368380269
1: 0.572826736760538
2: 0.14565347352107577
3: 0.29130694704215154
4: 0.5826138940843031
...
23: 0.4733016710475336
24: 0.9466033420950672
25: 0.8932066841901345
length: 26
__proto__: Array[0]
1: Array[26]
0: 0.696370701437752
1: 0.39274140287550396
2: 0.7854828057510079
3: 0.5709656115020157
4: 0.14193122300403152
...
23: 0.837046337679719
24: 0.6740926753594381
25: 0.348185350718876
length: 26
__proto__: Array[0]
length: 2
__proto__: Array[0]
mapForward: Array[2]
0: Array[26]
0: 0.909321932633548
1: 0.954660966316774
2: 0.477330483158387
3: 0.2386652415791935
4: 0.6193326207895968
...
23: 0.27457546106838376
24: 0.637287730534192
25: 0.818643865267096
length: 26
__proto__: Array[0]
1: Array[26]
0: 0.7005048796609772
1: 0.3502524398304886
2: 0.6751262199152444
3: 0.8375631099576222
4: 0.4187815549788111
...
23: 0.604039037287817
24: 0.8020195186439085
25: 0.40100975932195426
length: 26
__proto__: Array[0]
length: 2
__proto__: Array[0]
pack: "compact"
seq: "acggctgctatctgcgtacggtcgac"
str2bin: function (pack){
transpose: function (M){
__proto__: Object
```
Another possibility, which illustrates the advantages of defining the `usm` object as a function, is to call the algorithms first with `u=new usm` and then loading the sequence into it, say, `u.seq='acggctgctatctgcgtacggtcgac'`.

```
> u = new usm
usm
alphabet: function (seqString){//extracts alphabet
cgr: function (bin,y){ // CGR with recursive seed
distCoord: function (a,b){ // distance between two coordinates
map: function (seq,abc,pack){
str2bin: function (pack){
transpose: function (M){
__proto__: Object

> u.seq='acggctgctatctgcgtacggtcgac'
"acggctgctatctgcgtacggtcgac"
u.map()
undefined

> u
usm
ABC: Array[2]
abc: "acgt"
alphabet: function (seqString){//extracts alphabet
cgr: function (bin,y){ // CGR with recursive seed
distCoord: function (a,b){ // distance between two coordinates
map: function (seq,abc,pack){
mapBackward: Array[2]
mapForward: Array[2]
pack: "compact"
seq: "acggctgctatctgcgtacggtcgac"
str2bin: function (pack){
transpose: function (M){
__proto__: Object
```

which produces the exact same result. Inspection of the code or even the object structure will reveal how indivudual options can be set. For example note '.mapmap: function (seq,abc,pack)' with room to specify not just the sequence but also the alfabet and the type of CGR packing ("compact" or "sparse") etc.