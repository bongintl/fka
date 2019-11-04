const wait = ms => new Promise( resolve => setTimeout( resolve, ms ) );

const createBackground = srcset => new Promise( resolve => {
    const img = new Image();
    img.className = 'psf t0 l0 w100p h100p ofcover';
    img.style.opacity = 0;
    img.style.transition = 'opacity .5s';
    img.onload = () => resolve( img );
    img.srcset = srcset;
});

[ ...document.querySelectorAll('.dynamic-background') ].forEach( container => {
    let background = null;
    const transition = element => {
        if ( background ) {
            const prev = background;
            wait( element ? 500 : 0 )
                .then( () => {
                    prev.style.opacity = 0;
                    return wait( 500 )
                }).then(() => {
                    container.removeChild( prev );
                })
        }
        if ( element ) {
            container.appendChild( element );
            wait( 0 ).then( () => element.style.opacity = 1 )
        }
        background = element;
    }
    [ ...container.querySelectorAll( '[data-dynamic-background]' ) ].forEach( el => {
        let hovered = false;
        el.addEventListener( 'mouseenter', () => {
            hovered = true;
            if ( el.dataset.dynamicBackground === 'none' ) {
                transition( null )
            } else {
                createBackground( el.dataset.dynamicBackground ).then( img => {
                    if ( !hovered ) return;
                    transition( img );
                })
            }
        })
        el.addEventListener( 'mouseleave', () => {
            hovered = false;
            // if ( background ) {
            //     container.removeChild( background );
            //     background = null;
            // }
        })
    })
})