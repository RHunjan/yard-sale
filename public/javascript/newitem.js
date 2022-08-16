//sign up
async function newItemFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const post_description = document.querySelector('#post-description').value.trim();
  const post_price = document.querySelector('#post-price').value.trim();

  if (title && post_description && post_price) {
    const response = await fetch('/api/posts', {
      method: 'post',
      body: JSON.stringify({
        title,
        post_description,
        post_price,
       
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // check the response status
    if (response.ok) {
     document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.new-item-form').addEventListener('submit', newItemFormHandler);