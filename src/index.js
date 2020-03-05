/*
*
*** STACK CALCULATOR ***
*
*/
function eval() {
    // Do not use eval!!!
    return;
}
const signs = {
    '+' : (a, b) => a + b,
    '-' : (a, b) => a - b,
    '*' : (a, b) => a * b,
    '/' : (a, b) => a / b
}
function errors(expr) {
    let openBracket = closeBracket = 0;

    expr.split('').forEach(elem => {
        switch (elem) {
        case '(':
            openBracket++;
            break;

        case ')':
            closeBracket++;
            break;
        }
    })

    if (openBracket !== closeBracket) throw new Error('ExpressionError: Brackets must be paired')
    if (expr.split(' ').filter(elem => elem != '').join('').includes('/0')) throw new Error('TypeError: Division by zero.')

}
function calculate(expr) {
    let elem = expr.split(' ')

    function actions(operator_1, operator_2){
        for(let i = 0; i < elem.length; i++) {
            if(elem[i] === operator_1 || elem[i] === operator_2) {
                elem[i] = signs[elem[i]](Number(elem[i - 1]), Number(elem[i + 1]))
                elem.splice(i - 1, 3, elem[i])
                i--
            }
        }
    }
    // operators with same priority
    actions('*', '/')
    actions('+', '-')

    return Number(elem[0])
}

function expressionCalculator(expr) {
    errors(expr)

    // let expr_nums = expr.replace(/[^0-9]/g, ' ').trim().split(' ').filter(elem => elem !== '').map(elem => Number(elem))
    // let expr_signs = expr.replace(/[0-9]/g, ' ').trim().split(' ').filter(elem => elem !== '')

    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ')
    //calc inner brackets brackets 
    if (expr.match(/\(/g) != null ) {
        for (let i = expr.match(/\(/g).length; i != 0; i--) {
            let calculation = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)[0]
            let expression = calculation.slice(1, calculation.length - 1)
            
            expr = expr.replace(calculation, calculate(expression))
        }
    }
    
    return calculate(expr)
}
module.exports = {
    expressionCalculator
}