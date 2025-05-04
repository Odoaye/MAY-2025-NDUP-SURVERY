// Initialize EmailJS with your public key
emailjs.init('nq37JzOjS7usHEZwv');

document.addEventListener("DOMContentLoaded", () => {
  fetch('ques.json')
    .then(response => response.json())
    .then(questions => {
      const container = document.getElementById('questions-container');
      questions.forEach((q, index) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('question-block'); // optional for spacing
        wrapper.innerHTML = `
          <label for="answer${index}">${q}</label>
          <textarea id="answer${index}" name="answer${index}" rows="3" required></textarea>
        `;
        container.appendChild(wrapper);
      });
    });

  document.getElementById('survey-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const textareas = document.querySelectorAll('textarea');
    let emailContent = '';

    textareas.forEach((textarea, index) => {
      const label = document.querySelector(`label[for="${textarea.id}"]`);
      const question = label ? label.textContent : `Question ${index + 1}`;
      const answer = textarea.value.trim();
      emailContent += `${question}\n${answer}\n\n`;
    });

    // Send the email using EmailJS
    emailjs.send('service_6gvvodg', 'template_kmrk82w', {
      message: emailContent
    }).then(() => {