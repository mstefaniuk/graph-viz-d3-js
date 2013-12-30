graph = ("strict"? _+)? ("graph" / "digraph") (_+ ID)? _* '{' stmt_list? _* '}'
stmt_list = (_* stmt ';'?)+
stmt = subgraph 
	/ ID _* '=' _* (ID / QS)
	/ edge_stmt
	/ attr_stmt
	/ node_stmt
attr_stmt = ("graph" / "node" / "edge") _+ attr_list
attr_list = '[' _* a_list? _* ']' attr_list?
a_list    = ID _* '=' _* ID (_* ',' _* a_list)*
edge_stmt = (node_id / subgraph) edgeRHS _* attr_list?
edgeRHS   = _* edgeop _* (node_id / subgraph) edgeRHS?
node_stmt = node_id _* attr_list?
node_id   = ID _* port?
port 	  = ':' _* ID ( ':' _* compass_pt)?
	/ 	':' _* compass_pt
subgraph  = ("subgraph" _+ ID?)? _* '{' stmt_list _* '}'
compass_pt = "n" / "ne" / "e" / "se" / "s" / "sw" / "w" / "nw" / "c"
edgeop = "--" / "->"

ID = [a-zA-Z0-9_]+
QS = '"' [^"]* '"'

CR = [\n]
_ = [\n\t ]