{
    function lengthInUtf8Bytes(str) {
        var c = str.charCodeAt(0);
        if (c < 128) {
          return 1;
        } else if (c < 2048) {
          return 2;
        } else {
          return 3;
        }
    }

    var counter;
}

dot = prolog? t:("digraph" / "graph") i:(_ identifier)? _ b:body {return {type:"digraph", id: i==null ? null : i[1], commands:b}}
prolog = ("#" [^\n]* CR)+ CR
body = "{" c:statement+ "}" WS* {return c}
statement= WS* cc:(skip /graph / node / relation / subgraph / struct) {return cc}
skip = n:"node" a:attributes ";" WS+ {return {type:"skip", attributes:a}}
struct = b:body {return {type:"struct", commands:b}}
graph = n:"graph" a:attributes ";" WS+ {return {type:n, attributes:a}}
subgraph = t:"subgraph" _ i:identifier _ b:body {return {type:t, id:i, commands:b}}
relation = f:identifier _ ("->" / "--") _ t:identifier a:attributes? ";" WS+
    {return {type:"relation", id: [f,t].join('-'), from:f, to:t, attributes:a}}
node = i:identifier a:attributes? ";" WS+ {return {type:"node",id:i,attributes:a}}

attributes = _+ "[" a:attribute aa:("," WS+ a:attribute {return a})* _* "]" {return aa!=null ? [a].concat(aa) : [a];}
attribute =
 draw
 / size
 / image
 / URL
 / tooltip
 / a:(anyattribute) {a.type="skip"; return a}

image = "image" "=" q url:nq q {return {type: 'image', value: url.join('')}}
URL = "URL" "=" q url:nq q {return {type: 'url', value: url.join('')}}
tooltip = "tooltip" "=" q tt:nq q {return {type: 'tooltip', value: tt.join('')}}
size = "size" "=" q w:decimal "," h:decimal q {return {type: "size", value: [w,h]}}
anyattribute = nn:identifier "=" nqs {return {name: nn}}

draw = "_" s:("draw" / "ldraw" / "hdraw" / "tdraw" / "hldraw" / "tldraw") "_=" q d:drawing+ q {return {type: s, elements: d}}
drawing = st:styling? _ sh:shapes _ {sh.style = st; return sh}
styling = s:styles ss:(_ s:styles {return s})*
    {return [].concat(s).concat(ss);}
styles = pen / font / style / fontdecoration
shapes = polygon / polyline / ellipse / bspline / text

ellipse = [eE] c:coordinates _ rx:decimal _ ry:decimal {return {shape: 'ellipse', cx: c[0], cy:c[1], rx:rx, ry:ry}}
polygon = p:[pP] _ l:integer c:coordinates+ {return {shape: 'polygon', points:c}}
polyline = [L] _ integer c:coordinates+ {return {shape: 'polyline', points:c}}
bspline = [bB] _ integer c:coordinates+ {return {shape: 'bspline', points: c}}
text = [T] c:coordinates _ decimal _ decimal _ t:vardata {return {x:c[0], y:c[1], text:t}}
pen = p:[Cc] _ c:vardata {return p=='C' ? {key: "fill", value: c} : {key: "stroke", value: c}}
font = f:[F] _ s:decimal _ t:vardata {return [{key:'font-family', value: "'" + t + "',serif"}, {key:'font-size', value: s}]}
fontdecoration = [t] _ v:integer {return {key:"text-decoration", value: v}}
style = [S] _ s:vardata {return {key:'style', value: s}}

vardata = s:varsize _ "-" v:varchar {return v}
varsize = s:integer {counter=s}
varchar = &{return counter==0} / a:anysign s:varchar {return a + (s||'')}
anysign = LC? c:. { if (c=="\\") {return ""} else {counter -= lengthInUtf8Bytes(c); return c}}

coordinates = _ p1:decimal _ p2:decimal {return [p1,p2]}
identifier = s:$CHAR+ port? {return s} / '"' s:$nq '"' {return s}
port = ':' identifier
integer = s:"-"? i:$[0-9]+ {return parseInt((s||'') + i)}
decimal = s:"-"? f:$[0-9]+ r:("." d:$[0-9]+ {return "." + d})? {return parseFloat((s||'') + f + (r||''))}

ncs = [^,\]]+
nqs = '"' nq '"' / "<<" ([^>] [^>]* ">")* ">" / ncs
nq = ('\\"' / [^"])*
c = [,]
q = '"'

CHAR = [a-zA-Z0-9_\.\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]
CR = [\n\r]
WS = [\n\t\r ]
_ = WS LC? / LC? WS
LC = [\\] CR+