<?php

add_action(
	'enqueue_block_editor_assets',
	function () {
		$asset = include get_stylesheet_directory_uri() . '/patterns/recover/build/index.asset.php';
		wp_enqueue_script(
			'auto-block-recovery',
			get_stylesheet_directory_uri() . '/patterns/recover/build/recover.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}
);
