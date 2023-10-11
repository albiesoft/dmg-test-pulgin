<?php
/**
* Plugin Name: Albert Fernandez Test Plugin
* Plugin URI: http://www.albert-fernandez.com
* Description: Albert's plugin test
* Version: 0.1
* Author: Albert Fernandez
* Author URI: http://www.albert-fernandez.com
**/

class DMG_Read_More {
  public function search( $args, $assoc_args ) {
    $before = date_create($assoc_args['date-before']);
    $after = date_create($assoc_args['date-after']);

    $queryArgs = array(
      'orderby' => 'date',
      'order' => 'DESC',
      'date_query' => array(
        array(
          'before' => $before->format('Y-m-d H:i:s'),
          'after' => $assoc_args['date-after'] ? $after->format('Y-m-d H:i:s') : $before->modify('-30 days')->format('Y-m-d H:i:s'),
          'inclusive' => true,
        ),
      ),
      'posts_per_page' => -1,
    );

    $the_query = new WP_Query( $queryArgs );

    if ( $the_query->have_posts() ) {
      while ( $the_query->have_posts() ) {
        $the_query->the_post();

        WP_CLI::success( get_the_ID() );
      }
      wp_reset_postdata();
    } else {
      WP_CLI::warning( 'Sorry, no posts matched your criteria.' );
    }
  }
}

function afm_cli_register_commands() {
	WP_CLI::add_command( 'dmg-read-more', 'DMG_Read_More' );
}

add_action( 'cli_init', 'afm_cli_register_commands' );
