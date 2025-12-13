<?php
/*
Plugin Name:font-awesome 字体图标本地化插件
Plugin slug :font-awesome-themepark
Plugin URI:http://www.themepark.com.cn
Description:如果你的主题支持字体图标，并使用的是CDN，你想要让他们本地化加载，可以安装此插件实现本地化，此插件支持font-awesome4.70和font-awesome5.11.2版本，版本切换需要主题支持。
Version: 1.05
Author: WEB主题公园
Author URI: http://www.themepark.com.cn
*/

add_editor_style(plugins_url( '5.0/css/all.css' , __FILE__ ));

function font_awesome_ded() {  
$fontAwesomebb= get_option('fontAwesomebb');

	
  
	
	 wp_register_style( 'font-awesome5', plugins_url( '5.0/css/all.css' , __FILE__ ) ); 
     wp_enqueue_style( 'font-awesome5' );  

     
	  } 
add_action( 'init', 'font_awesome_ded' );
	
