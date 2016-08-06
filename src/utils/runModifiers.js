import isFunction from './isFunction';
import findIndex from './findIndex';

/**
 * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
 * @method
 * @memberof Popper
 * @access public
 * @param {Object} data
 * @param {Array} modifiers
 * @param {Function} ends
 */
export default function runModifiers(options, data, modifiers, ends) {
    var modifiersToRun = options.modifiers.slice();
    if (ends !== undefined) {
        modifiersToRun = options.modifiers.slice(0, findIndex(options.modifiers, 'name', ends));
    }

    modifiersToRun.forEach((modifier) => {
        if (isFunction(modifiers[modifier.name])) {
            data = modifiers[modifier.name].call(this, data);
        }
    });

    return data;
}
