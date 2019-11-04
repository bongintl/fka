import createObserver from './utils/observer';
import 'intersection-observer';
import ResizeObserver from 'resize-observer-polyfill';
import picturefill from 'picturefill';

var resizeObserver = createObserver( ResizeObserver );
var intersectionObserver = createObserver( IntersectionObserver, { rootMargin: '100% 0% 100% 0%' } );

[ ...document.querySelectorAll('img[data-srcset]') ].forEach( img => {
    var update = width => img.setAttribute( 'sizes', width + 'px' );
    var onResize = entry => {
        update( entry.contentRect.width );
        picturefill({ reevaluate: true, elements: [ img ] })
    }
    var onIntersect = entry => {
        if ( entry.isIntersecting ) {
            update( img.getBoundingClientRect().width );
            img.setAttribute( 'srcset', img.dataset.srcset );
            resizeObserver.observe( img, onResize )
            picturefill({ reevaluate: true, elements: [ img ] })
        } else {
            resizeObserver.unobserve( img, onResize )
        }
    }
    intersectionObserver.observe( img, onIntersect );
})