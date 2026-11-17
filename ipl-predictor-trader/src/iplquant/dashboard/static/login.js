(() => {
  const q = new URLSearchParams(location.search);
  const msg = document.getElementById('msg');
  if (q.get('locked')) {
    const s = Number(q.get('locked')) || 300;
    msg.textContent = `Too many attempts. Try again in ${Math.ceil(s / 60)} min.`;
  } else if (q.get('failed')) {
    msg.textContent = 'Wrong password.';
  }
})();
