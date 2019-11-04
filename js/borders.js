import flatten from 'lodash/flatten';
import createObserver from './utils/observer';
import 'intersection-observer-polyfill';
const { observe } = createObserver( IntersectionObserver );

const createSegments = container => {
    const delays = Array( 4 ).fill( 0 ).map( _ => Math.random() * .5 + 's' );
    [ 'tl', 'tr', 'rt', 'rb', 'br', 'bl', 'lb', 'lt' ].forEach( ( modifier, i ) => {
        const segment = document.createElement('div');
        segment.className = `border__segment border__segment--${ modifier }`;
        segment.style.transitionDelay = delays[ Math.floor( i / 2 ) ];
        container.appendChild( segment );
    })
}

const els = [ ...document.querySelectorAll( '.border' ) ];
els.forEach( createSegments );

const onIntersect = entry => {
    entry.target.classList.toggle( 'border--visible', entry.isIntersecting );
}

const update = () => {
    els.forEach( el => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty( '--border-container-width', rect.width );
        el.style.setProperty( '--border-container-height', rect.height );
        if ( !el.classList.contains( 'border--measured' ) ) {
            el.classList.add( 'border--measured' );
            observe( el, onIntersect );
        }
    })
}

update();
window.addEventListener( 'resize', update );