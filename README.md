# supermatch
Idiomatic pattern matching in es6+

# What and why?
Everyone that has been writing javascript in the last few years has probably noticed that his/her code became much more FP oriented.  

JS have pretty good and flexible functions building blocks (espcially with ES2015 arrow functions), and higher-order functions
fit quite naturally in most code. Unfortunally, the same cannot be said to if/switch cases blocks which feels quite cumbersome.
While the language still got the ?: operator, it's not powerfull enough for many cases
and it can be quite diffcult to understand when being abused.

supermatch attempt to solve this problem by providing pattern-matching capabilites inspired from other programming languages (mainly OCaml).  
Supermatch is implemented in a library-level and not language-level

-Some examples

# Main benifets
- Switch-cases as experession
- Easier to read
- Quite flexible
- Simple integration
- Idiomatic syntax

# Other considerations
In supermatch, we're trading performance for expressiveness and convinence,
since supermatch is implemented in a library-level.
(at least until javascript will get these capabilites natively, or we switch to macro-based approach)
