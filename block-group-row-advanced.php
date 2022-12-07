<?php

/**
 * Plugin name: Block Group Row Advanced
 * Description: Permet de gérer les propriétés grow, shrink et flex-basis pour chaque élément
 * Author: Willy Bahuaud
 * Author URI: https://wabeo.fr
 */

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

function w_register_group_row_advanced_script() {
    wp_register_script(
        'group-row-advanced',
        plugin_dir_url( __FILE__ ) . 'build/index.js',
        [ 'wp-blocks', 'wp-dom', 'wp-dom-ready', 'wp-edit-post' ],
        filemtime(  plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );
    wp_enqueue_script( 'group-row-advanced' );
}
add_action( 'enqueue_block_editor_assets', 'w_register_group_row_advanced_script' );
