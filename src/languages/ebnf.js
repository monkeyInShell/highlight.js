/*
Language: Extended Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
Website: https://en.wikipedia.org/wiki/Extended_Backus–Naur_form
*/

/** @type LanguageFn */
export default function(hljs) {
  const commentMode = hljs.COMMENT(/\(\*/, /\*\)/);

  const nonTerminalMode = {
    className: "attribute",
    begin: /^[ ]*[a-zA-Z][a-zA-Z_-]*([\s_-]+[a-zA-Z][a-zA-Z]*)*/
  };

  const specialSequenceMode = {
    className: "meta",
    begin: /\?.*\?/
  };

  const ruleBodyMode = {
    begin: /=/,
    end: /[.;]/,
    contains: [
      commentMode,
      specialSequenceMode,
      {
        // terminals
        className: 'string',
        variants: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          {
            begin: '`',
            end: '`'
          }
        ]
      }
    ]
  };

  return {
    name: 'Extended Backus-Naur Form',
    illegal: /\S/,
    contains: [
      commentMode,
      nonTerminalMode,
      ruleBodyMode
    ]
  };
}
