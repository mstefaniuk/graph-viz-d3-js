dot = prolog? t:"digraph" i:(_ identifier)? _ b:body {return {type:t, id: i==null ? null : i[1], commands:b}}
prolog = ("#" [^\n]* CR)+ CR
body = "{" c:statement+ "}" WS* {return c}
statement= WS* cc:(skip /graph / node / relation / subgraph / struct) {return cc}
skip = n:"node" a:attributes ";" WS+ {return {type:"skip", attributes:a}}
struct = b:body {return {type:"struct", commands:b}}
graph = n:"graph" a:attributes ";" WS+ {return {type:n, attributes:a}}
subgraph = t:"subgraph" _ i:identifier _ b:body {return {type:t, id:i, commands:b}}
relation = f:identifier _ "->" _ t:identifier a:attributes ";" WS+
    {return {type:"relation", id: [f,t].join('-'), from:f, to:t, attributes:a}}
node = i:identifier a:attributes? ";" WS+ {return {type:"node",id:i,attributes:a}}

attributes = _+ "[" a:attribute aa:("," WS+ a:attribute {return a})* _* "]" {return aa!=null ? [a].concat(aa) : [a];}
attribute =
 draw
 / a:(qattribute
 / cattribute
 / anyattribute) {a.type="skip"; return a}

qattribute = n:("label" / "width" / "height" / "bb" / "pos" / "xdotversion" / "size") "=" nqs {return {name: n}}
cattribute = n:("style" / "shape" / "color") "=" ncs {return {name: n}}
anyattribute = nn:identifier "=" nqs {return {name: nn}}

draw = "_" s:("draw" / "ldraw" / "hdraw" / "tdraw" / "hldraw" / "tldraw") "_=" q d:drawing+ q {return {type: s, elements: d}}
drawing = st:styling? _ sh:shapes _ {sh.style = st; return sh}
styling = s:styles ss:(_ s:styles {return s})*
    {return [].concat(s).concat(ss);}
styles = pen / font / style / fontdecoration
shapes = polygon / polyline / ellipse / bspline / text

ellipse = [eE] c:coordinates _ rx:integer _ ry:integer {return {shape: 'ellipse', cx: c[0], cy:c[1], rx:rx, ry:ry}}
polygon = p:[pP] _ l:integer c:coordinates+ {return {shape: 'polygon', points:c}}
polyline = [L] _ integer c:coordinates+ {return {shape: 'polyline', points:c}}
bspline = [bB] _ integer c:coordinates+ {return {shape: 'path', points: c}}
text = [T] c:coordinates _ integer
           _ integer _ t:vardata {return {x:c[0], y:c[1], text:t}}
pen = p:[Cc] _ c:vardata
    {var colors = [parseInt(c.substr(1,2),16),parseInt(c.substr(3,2),16),parseInt(c.substr(5,2),16),c.length==8 ? parseInt(c.substr(7,2),16)/255 : '1'];
    var color = "rgba("+colors.join(',')+")";
    return p=='C' ? {key: "fill", value: color} : {key: "stroke", value: color}}
font = f:[F] _ s:decimal _ t:vardata {return [{key:'font-family', value: "'" + t + "',serif"}, {key:'font-size', value: s}]}
fontdecoration = [t] _ v:integer {return {key:"text-decoration", value: v}}
style = [S] _ s:vardata {return {key:'style', value: s}}

vardata = s:varsize _ "-" v:varchar {counter=s; return v}
varsize = s:integer {counter=s}
varchar = &{return counter==0} / a:anysign s:varchar {return a + (s||'')}
anysign = LC? c:. {counter--; return c}

coordinates = _ p1:integer _ p2:integer {return [p1,p2]}
identifier = s:$[A-Za-z0-9_]+ port? {return s} / '"' s:$nq '"' {return s}
port = ':' identifier
integer = "-"? i:$[0-9]+ {return parseInt(i)}
decimal = "-"? f:$[0-9]+ s:("." d:$[0-9]+ {return "." + d})? {return parseFloat(f + (s||''))}

ncs = [^,\]]+
nqs = '"' nq '"' / "<<" ([^>] [^>]* ">")* ">" / ncs
nq = [^"]*
c = [,]
q = '"'

CR = [\n\r]
WS = [\n\t\r ]
_ = WS LC? / LC? WS
LC = [\\] CR+