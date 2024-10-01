export const enableSelection = () => {
  const a = document.body;
  const b = a.parentNode;
  if (b) {
    b.removeChild(a), b.appendChild(a.cloneNode(!0));
  }
};
