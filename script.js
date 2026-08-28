const revealBtn = document.getElementById('revealBtn');
const openCaseBtn = document.getElementById('openCaseBtn');
const toast = document.getElementById('toast');

function revealAnswer() {
  revealBtn.classList.add('revealed');
  setTimeout(() => {
    document.getElementById('afterReveal').style.fontWeight = '700';
  }, 450);
}

revealBtn.addEventListener('click', revealAnswer);

openCaseBtn.addEventListener('click', () => {
  revealAnswer();
  setTimeout(() => {
    document.getElementById('meaning').scrollIntoView({ behavior: 'smooth' });
  }, 420);
});

document.querySelectorAll('.evidence-card').forEach(card => {
  card.addEventListener('click', (event) => {
    if (event.target.classList.contains('choice-btn')) return;
    card.classList.toggle('open');
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      card.classList.toggle('open');
    }
  });
});

document.querySelectorAll('.choice-btn').forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const card = button.closest('.evidence-card');
    const title = card.querySelector('h3').textContent.trim();

    toast.querySelector('strong').textContent = `Выбрано: ${title}`;
    toast.classList.add('show');

    button.textContent = 'Дело выбрано ✓';
    button.disabled = true;

    setTimeout(() => toast.classList.remove('show'), 3200);
  });
});
