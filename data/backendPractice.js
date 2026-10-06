const xhr = new XMLHttpRequest();

xhr.addEventListener('load' , () => {
  console.log(xhr.response);
}) //we do this because response takes time but our code doesnt wait so not to get undefined output we use this to wait for the response //load means response has loaded

xhr.open('GET' , 'https://supersimplebackend.dev/images/apple.jpg');
xhr.send();
