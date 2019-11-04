<?php

return [
    'fields' => [
        'modules' => [
            'groups' => [[
                'label' => 'Records',
                'types' => [ 'recordLargeLeft', 'recordLargeCenter', 'recordMedium', 'recordX2', 'recordX3' ]
            ],[
                'label' => 'Images',
                'types' => [ 'image', 'imageX2', 'backgroundReveal' ]
            ],[
                'label' => 'Videos',
                'types' => [ 'videoLarge', 'videoMedium', 'videoSmall' ]
            ],[
                'label' => 'Shop',
                'types' => [ 'shopLarge', 'shopMedium' ]
            ]]
        ]
        //     'groups' => [[
        //         'label' => 'Content',
        //         'types' => ['text', 'images', 'video'],
        //     ], [
        //         'label' => 'Listings',
        //         'types' => ['news', 'employees'],
        //     ]],
        //     'types' => [
        //         'text' => [
        //             'tabs' => [[
        //                 'label' => 'Text',
        //                 'fields' => ['heading', 'text'],
        //             ], [
        //                 'label' => 'Settings',
        //                 'fields' => ['columns'],
        //             ]],
        //             'hiddenFields' => ['backgroundColor', 'textColor'],
        //         ],
        //         'news' => [
        //             'maxLimit' => 1,
        //         ],
        //     ],
        // ],
        // 'anotherMatrixFieldHandle' => [
        //     ...
        // ],
    ]
];