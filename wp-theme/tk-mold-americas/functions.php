<?php
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','gallery','caption','style','script']);
});

// The real site CSS lives at the web root: /assets/styles.css (deployed alongside the theme).
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('tk-site', '/assets/styles.css', [], '1.0.0');
});

add_action('pre_get_posts', function ($q) {
    if (!is_admin() && $q->is_main_query() && ($q->is_home() || $q->is_archive())) {
        $q->set('posts_per_page', 12);
    }
});
