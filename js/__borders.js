import flatten from 'lodash/flatten';

const els = [ ...document.querySelectorAll( '.border' ) ];

const flipEdge = edge => [
    [ edge[ 0 ][ 1 ], edge[ 0 ][ 0 ] ],
    [ edge[ 1 ][ 1 ], edge[ 1 ][ 0 ] ]
]

const forEachPair = ( arr, fn ) => {
    for ( let i1 = 0; i1 < els.length - 1; i1++ ) {
        for ( let i2 = i1 + 1; i2 < els.length; i2++ ) {
            fn( arr[ i1 ], arr[ i2 ], i1, i2 );
        }
    }
}

const dedupeHorizontal = edges => {
    const ys = {};
    edges.forEach( edge => {
        const y = edge[ 0 ][ 1 ];
        if ( !ys[ y ] ) ys[ y ] = [];
        const xs = [ edge[ 0 ][ 0 ], edge[ 1 ][ 0 ] ];
        ys[ y ].push( xs );
    })
    
}

const update = () => {
    const horizontalEdges = [];
    const verticalEdges = [];
    els.forEach( el => {
        let { left, top, right, bottom } = el.getBoundingClientRect();
        top += window.pageYOffset;
        bottom += window.pageYOffset;
        horizontalEdges.push(
            [ [ left, top ], [ right, top ] ],
            [ [ left, bottom ], [ right, bottom ] ]
        );
        verticalEdges.push(
            [ [ right, top ], [ right, bottom ] ],
            [ [ left, top ], [ left, bottom ] ]
        );
    })
    render([ ...horizontalEdges, ...verticalEdges ]);
}

const render = edges => {
    edges.forEach( ([ from, to ]) => {
        const el = document.createElement('div');
        Object.assign( el.style, {
            position: 'absolute',
            background: 'var(--text-color)',
            left: from[ 0 ] + 'px',
            top: from[ 1 ] + 'px'
        })
        if ( from[ 0 ] === to[ 0 ] ) {
            Object.assign( el.style, {
                width: '1px',
                height: to[ 1 ] - from[ 1 ] + 'px'
            })
        } else {
            Object.assign( el.style, {
                height: '1px',
                width: to[ 0 ] - from[ 0 ] + 'px'
            })
        }
        document.body.appendChild( el );
    })
}

update();