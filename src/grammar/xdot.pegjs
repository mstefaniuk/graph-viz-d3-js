dot = prolog? t:"digraph" _ i:identifier _ b:body {return {type:t,id:i,commands:b}}
prolog = ("#" [^\n]* CR)+ CR
body = "{" c:statement+ "}" WS? {return c}
statement= WS* cc:(skip /graph / node / relation / subgraph) {return cc}
skip = n:"node" a:attributes ";" WS+ {return {type:"skip", attributes:a}}
graph = n:"graph" a:attributes ";" WS+ {return {type:n, attributes:a}}
subgraph = t:"subgraph" _ i:identifier _ b:body {return {type:t, id:i, commands:b}}
relation = f:identifier _ "->" _ t:identifier a:attributes ";" WS+
    {return {type:"relation", id: [f,t].join('-'), from:f, to:t, attributes:a}}
node = i:identifier a:attributes ";" WS+ {return {type:"node",id:i,attributes:a}}

attributes = _ "[" a:attribute aa:("," WS+ a:attribute {return a})* "]" {return aa!=null ? [a].concat(aa) : [a];}
attribute =
 draw
 / a:(qattribute
 / cattribute) {a.type="skip"; return a}

qattribute = n:("label" / "width" / "height" / "bb" / "pos" / "xdotversion" / "size") "=" nqs {return {name: n}}
cattribute = n:("style" / "shape" / "color") "=" ncs {return {name: n}}

draw = s:("_draw_=" / "_ldraw_=" / "_hdraw_=") q d:drawing+ q {return {type: "draw", subtype:s, shapes: d}}
drawing = st:styling? _ sh:shapes _ {sh.style = st; return sh}
styling = s:styles ss:(_ s:styles {return s})* {return [].concat(s).concat(ss)}
styles = pen / font / style
shapes = polygon / polyline / ellipse / bspline / text

ellipse = [eE] c:coordinates _ rx:decimal _ ry:decimal {return {shape: 'ellipse', cx: c[0], cy:c[1], rx:rx, ry:ry}}
polygon = p:[pP] _ l:integer c:coordinates+ {return {shape: 'polygon', points:c}}
polyline = [L] _ integer c:coordinates+ {return {shape: 'polyline', points:c}}
bspline = [bB] _ integer c:coordinates+ {return {shape: 'path', points: c}}
text = [T] c:coordinates _ integer
           _ integer _ t:vardata {return {shape: 'text', p:c, text:t}}
pen = p:[Cc] _ c:vardata {return p=='C' ? {key: "fill", value: c} : {key: "stroke", value: c}}
font = f:[F] _ s:decimal _ t:vardata {return [{key:'font-name', value: t}, {key:'font-size', value:s}]}
style = [S] _ s:vardata {return {key:'style', value: s}}

vardata = s:varsize _ "-" v:varchar {counter=s; return v}
varsize = s:integer {counter=s}
varchar = &{return counter==0} / a:anysign s:varchar {return a+s}
anysign = c:. {counter--; return c}

coordinates = _ p1:decimal _ p2:decimal {return [p1,p2]}
identifier = f:[A-Za-z0-9]s:[A-Za-z0-9_]* {return f+s.join('')}
integer = "-"? i:[0-9]+ {return parseInt(i.join(''))}
decimal = "-"? f:[0-9]+ s:("." d:[0-9]+ {return "." + d.join('')})? {return f.join('')+s}

ncs = [^,\]]+
nqs = '"' nq '"' / "<<" ([^>] [^>]* ">")* ">"
nq = [^"]*
c = [,]
q = '"'

CR = [\n]
WS = [\n\t ]
_ = [ ] ([\\] CR)? / [\\] CR [ ]