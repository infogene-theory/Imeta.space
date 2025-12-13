<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'damon' );

/** Database username */
define( 'DB_USER', 'damon' );

/** Database password */
define( 'DB_PASSWORD', 'sh36xns7mBBGChMy' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'm*uU9;m|M -uEq%FQ.Z;?=_e0<L+h3<_G)_-c`H;P4k|X1]q%n/;BiEa(kKi+)v+' );
define( 'SECURE_AUTH_KEY',  '1b >5gs~]Xb9{&.kz5@J`x#@G!>9^juG9x8a+M2T+-2L^gc~/{w!->}ZDius7P{P' );
define( 'LOGGED_IN_KEY',    ' f@qWGB2s_?8<^?m.#B^oy!t$#PaT5tnI*v@4>{Cb]HL5,4S[ieI)${1kfvhibuS' );
define( 'NONCE_KEY',        'ODl397Gdc-N#TuW~JUc2#G9}N >pj3c1<c~VJUOxNAl|r9sapz({[wOEPOC9Hu$(' );
define( 'AUTH_SALT',        ' Wx@]s}z Wa.Q!J]ghH3pZ:XST&&%(h&JC;zGx~[1sWs*LO%79*e{206Sd-Q@}eE' );
define( 'SECURE_AUTH_SALT', 'TRZ!U5Y8zhi$XU7H9hW_kyY9xi5e%FABY%,`f|fzavWxGBgvQ8#-jIv,E`^Z]6.w' );
define( 'LOGGED_IN_SALT',   'T~yNJ/(]JuYE$(@CVw5Q*whU*:v7uY3^%4(XWN5ai4M`]29=Am:9=2dj!I&#kIWm' );
define( 'NONCE_SALT',       'hc,T&RsqC~ ;zJkgad+)DvFFe5UV~n(&AX:(fE&5m:1>~V[@jt0N*{.1>|EK).-0' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
