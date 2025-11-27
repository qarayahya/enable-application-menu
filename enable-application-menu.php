<?php
/**
 * Plugin Name:         Enable Application Menu
 * Plugin URI:          https://blocklayouts.com/plugins/enable-application-menu/
 * Description:         Adds an application menu dropdown to the WordPress block editor with quick access to dashboard, styles, templates, patterns, media, and plugins.
 * Version:             1.0.0
 * Requires at least:   6.3
 * Requires PHP:        7.4
 * Author:              blocklayouts
 * Author URI:          https://blocklayouts.com/
 * License:             GPL-2.0-or-later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         enable-application-menu
 *
 * @package enable-application-menu
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue block editor assets.
 */
function enable_application_menu_enqueue_editor_assets() {

	$current_screen = get_current_screen();
	if ( $current_screen->id === 'site-editor' || $current_screen->id === 'edit-site' ) {
		return;
	}

	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script(
		'enable-application-menu-editor-scripts',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	wp_enqueue_style(
		'enable-application-menu-editor-styles',
		plugins_url( '/build/index.css', __FILE__ ),
		array(),
		$asset_file['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'enable_application_menu_enqueue_editor_assets' );
