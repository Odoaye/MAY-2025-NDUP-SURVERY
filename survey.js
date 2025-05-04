document.addEventListener("DOMContentLoaded", () => {
  fetch('ques.json')
    .then(response => response.json())
    .then(questions => {
      const container = document.getElementById('questions-container');
      questions.forEach((q, index) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
          <label for="answer${index}">${q}</label>
          <textarea id="answer${index}" name="answer${index}" rows="3" required></textarea>
        `;
        container.appendChild(wrapper);
      });
    });

  document.getElementById('survey-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const textareas = document.querySelectorAll('textarea');
    let emailContent = '';

    textareas.forEach((textarea) => {
      const question = document.querySelector(`label[for="${textarea.id}"]`).textContent;
      const answer = textarea.value.trim();
      emailContent += `${question}\n${answer}\n\n`;
    });

    emailjs.send('service_6gvvodg', 'template_kmrk82w', {
      message: emailContent
    }).then(() => {
      alert("Survey submitted successfully!");
      window.location.href = 'index.html'; // redirect to homepage
    }).catch((err) => {
      alert("Error sending survey: " + err.text);
    });
  });
});