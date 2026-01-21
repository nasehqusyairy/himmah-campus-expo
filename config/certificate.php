<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Certificate Default Configuration
    |--------------------------------------------------------------------------
    */

    'backgroundUrl' => env(
        'CERTIFICATE_BACKGROUND_URL',
        '/assets/images/cert.jpg'
    ),

    'certificateNumber' => [
        'color' => env(
            'CERTIFICATE_NUMBER_COLOR',
            'white'
        ),

        'width' => env(
            'CERTIFICATE_NUMBER_WIDTH',
            500
        ),

        'y' => env(
            'CERTIFICATE_NUMBER_Y',
            260
        ),

        'fontSize' => env(
            'CERTIFICATE_NUMBER_FONT_SIZE',
            21
        ),

        'fontFamily' => env(
            'CERTIFICATE_NUMBER_FONT_FAMILY',
            'Heading Now'
        ),

        'format' => env(
            'CERTIFICATE_NUMBER_FORMAT',
            '/STF-HCE/HIMMAH/I/2026'
        ),
    ],

    'participantName' => [
        'color' => env(
            'CERTIFICATE_PARTICIPANT_COLOR',
            'white'
        ),

        'width' => env(
            'CERTIFICATE_PARTICIPANT_WIDTH',
            1000
        ),

        'y' => env(
            'CERTIFICATE_PARTICIPANT_Y',
            345
        ),

        'fontSize' => env(
            'CERTIFICATE_PARTICIPANT_FONT_SIZE',
            50
        ),

        'fontFamily' => env(
            'CERTIFICATE_PARTICIPANT_FONT_FAMILY',
            'Formula1 Display-Regular'
        ),
    ],

];
