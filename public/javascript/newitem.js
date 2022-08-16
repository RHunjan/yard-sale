async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post_title"]').value;(trim)
    const post_description = document.querySelector('input[name="post_description"]').value;
    const post_price = document.querySelector('input[name="post_price"]').value;
    const  post_category = document.querySelector('input[name="post_category"]').value;

    const response = await fetch(`/api/post-routes`, {


      method: 'POST',
      body: JSON.stringify({
        title,
        post_description,
        post_price,
        post_category

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  