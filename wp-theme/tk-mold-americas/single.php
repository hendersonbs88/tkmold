<?php get_header(); ?>
<section class="blog-head">
  <div class="wrap">
    <div class="kicker"><a href="<?php echo esc_url(home_url('/blog')); ?>" style="color:inherit">TK Mold USA Blog</a></div>
    <?php while (have_posts()) : the_post(); ?>
    <h1><?php the_title(); ?></h1>
    <p><?php echo esc_html(get_the_date('F j, Y')); ?></p>
  </div>
</section>
<article class="wrap" style="max-width:820px;padding-top:32px;padding-bottom:56px">
  <?php if (has_post_thumbnail()) : ?>
  <div style="border-radius:12px;overflow:hidden;margin-bottom:28px"><?php the_post_thumbnail('large'); ?></div>
  <?php endif; ?>
  <div class="post-content"><?php the_content(); ?></div>
  <?php endwhile; ?>
  <p style="margin-top:36px"><a class="btn btn-primary" href="<?php echo esc_url(home_url('/blog')); ?>">Back to blog</a></p>
</article>
<?php get_footer(); ?>
