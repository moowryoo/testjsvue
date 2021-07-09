import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import th from 'vee-validate/dist/locale/th';


// loop over all rules
for (let rule in rules) {
    var data  = {
        ...rules[rule], // add the rule
        message: th.messages[rule] // add its message
    }

    extend(rule, data);
}
