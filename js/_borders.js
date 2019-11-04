import flatten from 'lodash/flatten';

const SIDES = [
    [ 'tl', 'tr' ],
    [ 'rt', 'rb' ],
    [ 'br', 'bl' ],
    [ 'lb', 'lt' ],
]

const createSegment = modifier => {
    const segment = document.createElement('div');
    segment.className = `border__segment border__segment--${ modifier }`;
    return segment;
}

const findContact = ( rect1, rect2 ) => {
    if ( rect1.left < rect2.right && rect1.right > rect2.left ) {
        if ( rect1.top === rect2.bottom ) return 0;    
        if ( rect1.bottom === rect2.top ) return 2;
    }
    if ( rect1.top < rect2.bottom && rect1.bottom > rect2.top ) {
        if ( rect1.right === rect2.left ) return 1;
        if ( rect1.left === rect2.right ) return 3;    
    }
    return null
}

const findViewportEdges = rect => [
    rect.top === 0,
    rect.right === window.innerWidth,
    rect.bottom === window.innerHeight,
    rect.left === 0
]

const els = [ ...document.querySelectorAll( '.border' ) ].map( container => {
    const sides = SIDES.map( segments => segments.map( createSegment ) );
    flatten( sides ).forEach( el => container.appendChild( el ) );
    return { container, sides };
});

const opposite = i => ( i + 2 ) % 4;

const update = () => {
    debugger
    const rects = els.map( el => el.container.getBoundingClientRect() );
    const edges = els.map( _ => [ true, true, true, true ] );
    for ( let i1 = 0; i1 < els.length - 1; i1++ ) {
        const rect1 = rects[ i1 ];
        for ( let i2 = i1 + 1; i2 < els.length; i2++ ) {
            const rect2 = rects[ i2 ];
            let contact = findContact( rect1, rect2 );
            let target = i1;
            if ( contact === null ) continue;
            if ( contact % 2 === 0 ) { // top or bottom
                if ( rect2.width > rect1.width ) {
                    target = i2;
                    contact = opposite( contact );
                }
            } else { // left or right
                if ( rect2.height > rect1.height ) {
                    target = i2;
                    contact = opposite( contact );
                }
            }
            edges[ target ][ contact ] = false;
        }
    }
    // els.slice( 0, -1 ).forEach( ( el1, i1 ) => {
    //     const rect1 = rects[ i1 ];
    //     els.slice( i1 + 1 ).forEach( ( el2, i2 ) => {
    //         const rect2 = rects[ i2 ];
    //         let contact = findContact( rect1, rect2 );
    //         let target = i1;
    //         if ( contact === null ) return;
    //         if ( contact % 2 === 0 ) { // top or bottom
    //             if ( rect2.width < rect1.width ) {
    //                 target = i2;
    //                 contact = opposite( contact );
    //             }
    //         } else { // left or right
    //             if ( rect2.height < rect1.height ) {
    //                 target = i2;
    //                 contact = opposite( contact );
    //             }
    //         }
    //         edges[ target ][ contact ] = true;
    //     })
    //     findViewportEdges( rect1 ).forEach( ( viewportEdge, i ) => {
    //         visibleEdges[ i ] = visibleEdges[ i ] || viewportEdge;
    //     })
    //     visibleEdges.forEach( ( visible, i ) => {
    //         el1.sides[ i ].forEach( segment => {
    //             segment.style.display = visible ? 'block' : 'none';
    //         })
    //     })
    // })
    console.log( edges )
    els.forEach( ( el, elIndex ) => {
        el.sides.forEach( ( segments, sideIndex ) => {
            const visible = edges[ elIndex ][ sideIndex ];
            segments.forEach( segment => {
                segment.style.display = visible ? 'block' : 'none';
            })
        })
    })
}

update();