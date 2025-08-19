// Static grid design, no JS required for layout.
// If you want to add interactivity, you can enhance here.
// Example: simple highlight card on click.
document.querySelectorAll('.testimonial-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.testimonial-card').forEach(c => c.classList.remove('highlight'));
    card.classList.add('highlight');
  });
});

// Add the following CSS for highlight effect (append to your CSS file):
// .testimonial-card.highlight {
//   box-shadow: 0 0 0 3px #48ad7a7e;
// }
