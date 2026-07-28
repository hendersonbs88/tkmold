<?php
add_action('after_setup_theme', function () {
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_editor_style('assets/css/theme.css');
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('tk-theme', get_stylesheet_directory_uri() . '/assets/css/theme.css', [], '0.1.0');
});

// Case Study custom post type
add_action('init', function () {
    register_post_type('case_study', [
        'label' => 'Case Studies',
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-analytics',
        'rewrite' => ['slug' => 'proof'],
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
        'show_in_rest' => true,
        'taxonomies' => ['case_study_market'],
    ]);
    register_taxonomy('case_study_market', 'case_study', [
        'label' => 'Markets',
        'public' => true,
        'hierarchical' => true,
        'show_in_rest' => true,
    ]);
});

add_action('init', function () {
    register_block_pattern_category('tk', ['label' => 'TK Mold']);
});
