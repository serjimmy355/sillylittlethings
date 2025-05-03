// Display the current date and time and set the footer year
function displayDateTime() {
  const now = new Date();
  const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const timeOptions = { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit'
  };
  const formattedDate = now.toLocaleDateString('en-US', dateOptions);
  const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
  document.getElementById('current-date-time').innerHTML = `${formattedDate}, ${formattedTime}`;
  document.getElementById('year').textContent = now.getFullYear();
}
displayDateTime();

// Advice Slip API: Display advice in the standout box
fetch('https://api.adviceslip.com/advice')
  .then(response => response.json())
  .then(data => {
    const adviceBox = document.getElementById('advice-box');
    adviceBox.textContent = data.slip.advice;
  });

// Joke API (with two‑part check) for the first joke box (placed before the cat image)
fetch('https://v2.jokeapi.dev/joke/Any')
  .then(response => response.json())
  .then(data => {
    const jokeBox1 = document.getElementById('joke-box-1');
    if (data.type === 'twopart') {
      jokeBox1.textContent = `${data.setup} - ${data.delivery}`;
    } else {
      jokeBox1.textContent = data.joke;
    }
  });

// Cat Image API: Display cat picture with colorful border and fixed size
fetch('https://api.thecatapi.com/v1/images/search')
  .then(response => response.json())
  .then(data => {
    const catBox = document.getElementById('cat-box');
    const imageUrl = data[0].url;
    catBox.innerHTML = `<img src="${imageUrl}" alt="Random Cat Image">`;
  });

// Dad Joke API for the second joke box (placed after the cat image)
fetch('https://icanhazdadjoke.com/', {
  headers: {
    Accept: 'application/json',
  },
})
  .then(response => response.json())
  .then(data => {
    const jokeBox2 = document.getElementById('joke-box-2');
    jokeBox2.textContent = data.joke;
  });
