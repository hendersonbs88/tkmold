<?php get_header(); ?>
<article class="wrap" style="max-width:820px;padding-top:40px;padding-bottom:56px">
  <?php while (have_posts()) : the_post(); ?>
  <h1 style="margin-bottom:20px"><?php the_title(); ?></h1>
  <div class="post-content"><?php the_content(); ?></div>
  <?php endwhile; ?>
</article>
<?php get_footer(); ?>
