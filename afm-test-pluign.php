<?php
/**
* Plugin Name:        Albert Fernandez Test Plugin
* Description:        Albert's plugin test
* Version:            0.1
* Author:             Albert Fernandez Moles
* Requires at least:  6.1
* Requires PHP:       7.0
**/

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

require_once plugin_dir_path( __FILE__ ) . 'commands/dmg-read-more.php';

function afm_cli_register_commands() {
	WP_CLI::add_command( 'dmg-read-more', 'DMG_Read_More' );
}

add_action( 'cli_init', 'afm_cli_register_commands' );


register_block_type(__DIR__ . '/build/blocks/readmore');