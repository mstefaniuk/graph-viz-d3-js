{
    var errors=[];
    var nodes = [];
    var lint = options.pegace.mode=='lint';
}

dotsource = _* ("strict"? _+)? ("graph" / "digraph" / u_keyword) (_+ ID)? _* body _*
    {return {errors: errors, clean: errors.length==0};}
body = '{' stmt_list? _* '}' / &{return lint} b:'{' stmt_list? _* {errors.push({pos: offset(), type: "unterminated", string: b})}
stmt_list = (_* stmt eos?)+
stmt = subgraph 
	/ struct
	/ attr_stmt
	/ ID _* '=' _* (QS / ID)
	/ edge_stmt
	/ node_stmt
eos = _* (';' / CR)
struct = body
attr_stmt = ("graph" / "node" / "edge") _* attr_list
u_keyword = &{return lint} e:$[^ ]+ {errors.push({pos: offset(), type: "keyword", string: e})}
attr_list = '[' _* a_list? _* ']' attr_list?
    / &{return lint} '[' _* a_list? _* {errors.push({pos: offset(), type: "unterminated", string: "["})}
a_list    = a_name _* '=' _* (ID / QS) (a_sep a_list)*
    / &{return lint} e:$ID _* '=' _* (ID / QS) (a_sep a_list)* {errors.push({pos: offset(), type: "attribute", string: e})}
a_sep     = (',' / _) _*
edge_stmt = (node_id / subgraph) edgeRHS _* attr_list?
edgeRHS   = _* edgeop _* (node_id / subgraph) edgeRHS?
node_stmt = i:node_id _* attr_list? {nodes.push({id: i, pos: offset(), text: text})}
node_id   = ID _* port?
port 	  = ':' _* ID ( ':' _* compass_pt)?
	/ 	':' _* compass_pt
subgraph  = ("subgraph" _+ ID?)? _* body
compass_pt = "n" / "ne" / "e" / "se" / "s" / "sw" / "w" / "nw" / "c"
edgeop = "--" / "->"
comment "comment" = lcomment / bcomment / pcomment
lcomment = "//" [^\n]*
pcomment = CR "#" [^\n]*
bcomment = "/*" [^*]* "*"+ ([^/*] [^*]* "*"+)* "/"

a_name =
    "damping"
	/ "k"
	/ "url"
	/ "area"
	/ "arrowhead"
	/ "arrowsize"
	/ "arrowtail"
	/ "aspect"
	/ "bb"
	/ "bgcolor"
	/ "center"
	/ "charset"
	/ "clusterrank"
	/ "colorscheme"
	/ "color"
	/ "comment"
	/ "compound"
	/ "concentrate"
	/ "constraint"
	/ "decorate"
	/ "defaultdist"
	/ "dimen"
	/ "dim"
	/ "diredgeconstraints"
	/ "dir"
	/ "distortion"
	/ "dpi"
	/ "edgeurl"
	/ "edgehref"
	/ "edgetarget"
	/ "edgetooltip"
	/ "epsilon"
	/ "esep"
	/ "fillcolor"
	/ "fixedsize"
	/ "fontcolor"
	/ "fontname"
	/ "fontnames"
	/ "fontpath"
	/ "fontsize"
	/ "forcelabels"
	/ "gradientangle"
	/ "group"
	/ "headurl"
	/ "head_lp"
	/ "headclip"
	/ "headhref"
	/ "headlabel"
	/ "headport"
	/ "headtarget"
	/ "headtooltip"
	/ "height"
	/ "href"
	/ "id"
	/ "imagepath"
	/ "imagescale"
	/ "image"
	/ "labelurl"
	/ "label_scheme"
	/ "labelangle"
	/ "labeldistance"
	/ "labelfloat"
	/ "labelfontcolor"
	/ "labelfontname"
	/ "labelfontsize"
	/ "labelhref"
	/ "labeljust"
	/ "labelloc"
	/ "labeltarget"
	/ "labeltooltip"
	/ "landscape"
	/ "label"
	/ "layerlistsep"
	/ "layerselect"
	/ "layersep"
	/ "layers"
	/ "layer"
	/ "layout"
	/ "len"
	/ "levels"
	/ "levelsgap"
	/ "lhead"
	/ "lheight"
	/ "lp"
	/ "ltail"
	/ "lwidth"
	/ "margin"
	/ "maxiter"
	/ "mclimit"
	/ "mindist"
	/ "minlen"
	/ "model"
	/ "mode"
	/ "mosek"
	/ "nodesep"
	/ "nojustify"
	/ "normalize"
	/ "nslimit"
	/ "nslimit1"
	/ "ordering"
	/ "orientation"
	/ "outputorder"
	/ "overlap"
	/ "overlap_scaling"
	/ "pack"
	/ "packmode"
	/ "pad"
	/ "page"
	/ "pagedir"
	/ "pencolor"
	/ "penwidth"
	/ "peripheries"
	/ "pin"
	/ "pos"
	/ "quadtree"
	/ "quantum"
	/ "rankdir"
	/ "ranksep"
	/ "rank"
	/ "ratio"
	/ "rects"
	/ "regular"
	/ "remincross"
	/ "repulsiveforce"
	/ "resolution"
	/ "root"
	/ "rotate"
	/ "rotation"
	/ "samehead"
	/ "sametail"
	/ "samplepoints"
	/ "scale"
	/ "searchsize"
	/ "sep"
	/ "shape"
	/ "shapefile"
	/ "showboxes"
	/ "sides"
	/ "size"
	/ "skew"
	/ "smoothing"
	/ "sortv"
	/ "splines"
	/ "start"
	/ "style"
	/ "stylesheet"
	/ "tailurl"
	/ "tail_lp"
	/ "tailclip"
	/ "tailhref"
	/ "taillabel"
	/ "tailport"
	/ "tailtarget"
	/ "tailtooltip"
	/ "target"
	/ "tooltip"
	/ "truecolor"
	/ "vertices"
	/ "viewport"
	/ "voro_margin"
	/ "weight"
	/ "width"
	/ "xlabel"
	/ "xlp"
	/ "z"

ID = CHAR+ / '-'? [0-9]* '.'? [0-9] / QS
CHAR = [a-zA-Z0-9_\.\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]
QS = '"' [^"]* '"' / &{return lint} '"' [^"]* {errors.push({pos: offset(), type: "unterminated", string: '"'})}
    / "<<" ([^>] [^>]* ">")* ">" / &{return lint} "<<" ([^>] [^>]* ">")* {errors.push({pos: offset(), type: "unterminated", string: '<<'})}

CR = [\r]?[\n]?
_ "whitespace" = comment / [\n\r\t ]