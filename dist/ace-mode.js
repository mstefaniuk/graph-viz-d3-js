define( 'ace/mode/pegjs', [

  'ace/lib/oop',
  'ace/mode/text_highlight_rules',
  'ace/mode/javascript_highlight_rules'

], function ( oop, textHighlightRules, javascriptHighlightRules ) {

  'use strict';

  var TextHighlightRules = textHighlightRules.TextHighlightRules;
  var JavaScriptHighlightRules = javascriptHighlightRules.JavaScriptHighlightRules;

  var pegjsHighlightRules = function ( ) {

    this.$rules = {

      'start' : [ {
        token : 'constant.language',
        regex : '[a-z][a-zA-Z]+'
      }, {
        token : 'keyword.operator',
        regex : '[=/]',
        next  : 'peg-rule'
      } ],

      'peg-rule' : [ {
        token : 'string',
        regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
      }, {
        token : 'string',
        regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
      }, {
        token : 'keyword.operator',
        regex : '^\\S*(?=[=/{(]|$)',
        next  : 'wait'
      }, {
        token : 'variable',
        regex : '[a-z][a-zA-Z]+:'
      }, {
        token : 'identifier',
        regex : '[a-z][a-zA-Z]+'
      }, {
        token : 'string',
        regex : '\\[(?:(?:\\\\.)|(?:[^\\]\\\\]))*?\\]'
      }, {
        token : 'keyword.operator',
        regex : '[+?*()/]'
      }, {
        token : 'keyword.operator',
        regex : '{',
        next  : 'js-start'
      } ]

    };

    for ( var i in this.$rules ) {
      this.$rules[ i ].unshift( {
        token : 'comment',
        regex : '/\\*',
        next  : 'comment'
      } );
    }

    this.$rules.comment = [ {
      token : 'comment',
      regex : '\\*/',
      next  : 'start'
    }, {
      token : 'comment',
      regex : '.'
    } ];

    this.embedRules( JavaScriptHighlightRules, 'js-', [
      { token : 'keyword', regex : '}', next : 'start' }
    ] );

  };

  oop.inherits( pegjsHighlightRules, TextHighlightRules );
  return { pegjsHighlightRules : pegjsHighlightRules };

} );
define("editor/mode/pegjs", function(){});

