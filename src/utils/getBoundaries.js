import getOffsetParent from './getOffsetParent';
import getScrollParent from './getScrollParent';
import getOffsetRect from './getOffsetRect';

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper
 * @access private
 * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
 * @param {Number} padding - Boundaries padding
 * @param {Element} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
export default function getBoundaries(popper, data, padding, boundariesElement) {
    // NOTE: 1 DOM access here
    var boundaries = {};
    var width, height;
    if (boundariesElement === 'window') {
        var body = window.document.body,
            html = window.document.documentElement;

        height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );

        boundaries = {
            top: 0,
            right: width,
            bottom: height,
            left: 0
        };
    } else if (boundariesElement === 'viewport') {
        var offsetParent = getOffsetParent(popper);
        var scrollParent = getScrollParent(popper);
        var offsetParentRect = getOffsetRect(offsetParent);

        // if the popper is fixed we don't have to substract scrolling from the boundaries
        var scrollTop = data.offsets.popper.position === 'fixed' ? 0 : scrollParent.scrollTop;
        var scrollLeft = data.offsets.popper.position === 'fixed' ? 0 : scrollParent.scrollLeft;

        boundaries = {
            top: 0 - (offsetParentRect.top - scrollTop),
            right: window.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
            bottom: window.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
            left: 0 - (offsetParentRect.left - scrollLeft)
        };
    } else {
        if (getOffsetParent(popper) === boundariesElement) {
            boundaries = {
                top: 0,
                left: 0,
                right: boundariesElement.clientWidth,
                bottom: boundariesElement.clientHeight
            };
        } else {
            boundaries = getOffsetRect(boundariesElement);
        }
    }
    boundaries.left += padding;
    boundaries.right -= padding;
    boundaries.top = boundaries.top + padding;
    boundaries.bottom = boundaries.bottom - padding;
    return boundaries;
}
