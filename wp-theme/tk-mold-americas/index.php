<?php get_header(); ?>
<section class="blog-head">
  <div class="wrap">
    <div class="kicker">TK Mold USA Blog</div>
    <h1>Offshore tooling, explained</h1>
    <p>Practical insights on injection molds, offshore sourcing, and getting quality tooling built with US based support.</p>
  </div>
</section>
<div class="wrap">
  <?php if (have_posts()) : ?>
  <div class="post-grid">
    <?php while (have_posts()) : the_post(); ?>
    <a class="post-card" href="<?php the_permalink(); ?>">
      <?php if (has_post_thumbnail()) : ?>
      <div class="thumb"><?php the_post_thumbnail('large', ['loading'=>'lazy','alt'=>esc_attr(get_the_title())]); ?></div>
      <?php endif; ?>
      <div class="pc-body">
        <div class="pc-date"><?php echo esc_html(get_the_date('M j, Y')); ?></div>
        <h3><?php the_title(); ?></h3>
        <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 24, '')); ?></p>
        <span class="pc-read">Read more</span>
      </div>
    </a>
    <?php endwhile; ?>
  </div>
  <?php else : ?>
  <div class="blog-empty"><h3>Posts are on the way</h3><p>New articles will appear here soon.</p></div>
  <?php endif; ?>
</div>
<?php get_footer(); ?>
