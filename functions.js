class Functions {
  constructor() {
    this.functions = {
      pickRandom: (...args) => args[Math.floor(Math.random() * args.length)],
      concatenate: (...args) => args.join(''),
      join: (...args) => this.join(...args)
    }
  }
  join(...args){
    const seperator=args[args.length-1];
    args.pop();
    return (args.join(seperator));
  }
  evaluate(expression) {
    // Match a string literal
    const stringLiteralRegex = /^'([^']*)'$/;
    const stringLiteralMatch = stringLiteralRegex.exec(expression);
    if (stringLiteralMatch) {
      console.log("entered string literal: "+stringLiteralMatch[1]);
      return stringLiteralMatch[1];
    }
    // Match a function invocation
    const functionInvocationRegex = /^(pickRandom|concatenate|join)\((.*)\)$/;
    const functionInvocationMatch = functionInvocationRegex.exec(expression);
    if (functionInvocationMatch) {
      const functionName = functionInvocationMatch[1];//the first part is taken as the function name.
      const argumentList = functionInvocationMatch[2];//the rest is taken as a single argument.

      // Split the argument list into an array of arguments
      const args = argumentList.split(',').map(arg => arg.trim());
      console.log("funtions: " + functionName);
      console.log("args: " + args);
      // Evaluate each argument recursively
      const evaluatedArgs = args.map(arg => this.evaluate(arg));

      // Call the function with the evaluated arguments
      if (functionName in this.functions) {
        return this.functions[functionName](...evaluatedArgs);
      } else {
        throw new Error(`Unknown function: ${functionName}`);
      }
    }
    return expression;
  }
}
module.exports = Functions;
// const functions = new Functions();

// // Test a string literal
// // const result1 = functions.evaluate("'hello! how are you?'");
// // console.log(result1);

// // Test a function invocation
// const result2 = functions.evaluate("concatenate('Hello', ' ', pickRandom('Kanchan', 'Ravi', 'Ramana'))");
// console.log(result2);