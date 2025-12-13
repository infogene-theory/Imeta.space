<?php 
/**
 * themepark提供的常见问题区块样板
 * 此文件增加云端提供的图标/分类/优势/联系区块样板内容
 * @author url 	    http://www.themepark.com.cn
 * @author 		themepark
 * @package 	theme/patterns
 * @version     1.0
 */


function themepark_register_wright() {

for ($x=1; $x<=7; $x++) {		
	
	
register_block_pattern('themepark/wright-pattern-'.$x, array(
        'title'       => '常用文章写作样板'.$x,
	     'slug'          => 'wright'.$x,
        'description' => '常用文章写作样板'.$x,
		'categories'=> array('wright'),
        'content'     =>get_cloud_fie(get_stylesheet_directory_uri().'/patterns/patterns/post/post'.$x.'.json'),
	    'viewportWidth'=>1024,
    )
);

}

}
 
add_action( 'init', 'themepark_register_wright',200 );




