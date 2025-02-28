const trumanQuotes = [
    "America was not built on fear. America was built on courage, on imagination and an unbeatable determination to do the job at hand.",
    "The buck stops here.",
    "It is amazing what you can accomplish if you do not care who gets the credit.",
    "Men make history and not the other way around.",
    "If you can't convince them, confuse them."
  ];
  
  const timelineEvents = [
    { 
      year: 1884, 
      event: "Born in Lamar, Missouri", 
      details: "Harry S. Truman was born on May 8, 1884, to John Anderson Truman and Martha Ellen Young Truman.",
      image: "imgs/birth.png"
    },
    { 
      year: 1917, 
      event: "Military Service in WWI", 
      details: "Served with distinction in World War I as an artillery officer, leading Battery D of the 129th Field Artillery.",
      image: "imgs/ww1serve.png"
    },
    { 
      year: 1945, 
      event: "Became 33rd President", 
      details: "Assumed the presidency following FDR's death, facing the challenges of ending World War II and establishing postwar order.",
      image: "imgs/president33.png"
    },
    { 
      year: 1947, 
      event: "Truman Doctrine", 
      details: "Established the Truman Doctrine, pledging American support to democratic nations under threat from authoritarian forces.",
      image: "imgs/trumandoctrine.png"
    },
    { 
      year: 1948, 
      event: "Marshall Plan", 
      details: "Implemented the Marshall Plan, providing crucial economic aid to rebuild Western Europe after World War II.",
      image: "imgs/Marshallplan.png"
    }
  ];
  const quizQuestions = [
    {
      question: "When did Truman become President?",
      options: ["1944", "1945", "1946", "1947"],
      correct: 1,
      explanation: "Truman became President in 1945 following FDR's death."
    },
    {
      question: "What was Truman's famous saying about responsibility?",
      options: ["The buck stops here", "Actions speak louder", "Leadership is key", "Trust but verify"],
      correct: 0,
      explanation: "This phrase emphasized his belief in presidential accountability."
    },
    {
      question: "Which plan did Truman implement to help rebuild Europe?",
      options: ["Nixon Plan", "Roosevelt Plan", "Marshall Plan", "Eisenhower Plan"],
      correct: 2,
      explanation: "The Marshall Plan was crucial for European recovery after WWII."
    },
    {
      question: "What major military decision did Truman make in 1945?",
      options: ["D-Day invasion", "Atomic bomb use", "Nazi surrender", "Pacific retreat"],
      correct: 1,
      explanation: "Truman authorized the use of atomic bombs on Japan."
    },
    {
      question: "Which policy aimed to contain Soviet expansion?",
      options: ["Monroe Doctrine", "Truman Doctrine", "New Deal", "Good Neighbor Policy"],
      correct: 1,
      explanation: "The Truman Doctrine was established in 1947 to counter Soviet influence."
    }
  ];
  
  let currentQuiz = 0;
  
  function showRandomQuote(elementId) {
    const quoteDisplay = document.getElementById(elementId);
    const randomIndex = Math.floor(Math.random() * trumanQuotes.length);
    quoteDisplay.textContent = `"${trumanQuotes[randomIndex]}"`;
    quoteDisplay.style.opacity = '0';
    setTimeout(() => {
      quoteDisplay.style.opacity = '1';
    }, 10);
  }
  
  function populateTimeline() {
    const timelineContainer = document.querySelector('.timeline-events');
    const timelineVertical = document.querySelector('.timeline-events-vertical');
    if (!timelineContainer && !timelineVertical) return;
    
    timelineEvents.forEach(event => {
      // Horizontal timeline
      if (timelineContainer) {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-item';
        eventElement.innerHTML = `
        <img src="${event.image}" alt="${event.event}">
        <span class="year-badge">${event.year}</span>
        <div class="timeline-item-content">
          <h4>${event.event}</h4>
          <div class="details">${event.details}</div>
        </div>
      `;
      eventElement.addEventListener('click', function() {
        const allDetails = document.querySelectorAll('.timeline-events .details, .timeline-events-vertical .details');
        const isCurrentlyActive = this.querySelector('.details').classList.contains('active');
        
        if (isCurrentlyActive) {
          allDetails.forEach(detail => detail.classList.remove('active'));
        } else {
          allDetails.forEach(detail => detail.classList.add('active'));
        }
      });
      timelineContainer.appendChild(eventElement);
      }
      
      // Vertical timeline
      if (timelineVertical) {
        const verticalElement = document.createElement('div');
        verticalElement.className = 'timeline-item';
        verticalElement.innerHTML = `
          <img src="${event.image}" alt="${event.event}">
          <span class="year-badge">${event.year}</span>
          <div class="timeline-item-content">
            <h4>${event.event}</h4>
            <div class="details">${event.details}</div>
          </div>
        `;
        verticalElement.addEventListener('click', function() {
          const details = this.querySelector('.details');
          details.classList.toggle('active');
        });
        timelineVertical.appendChild(verticalElement);
      }
    });
  }
  
  function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
  
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const resultEl = document.getElementById('result');
    const tryAgainButton = document.getElementById('tryAgain');
    
    // Clear previous result
    if (resultEl) {
      resultEl.textContent = '';
      resultEl.className = '';
    }
    
    if (currentQuiz >= quizQuestions.length) {
      // Show final score
      resultEl.textContent = `Quiz Complete! You finished the quiz!`;
      tryAgainButton.style.display = 'block';
      optionsEl.innerHTML = ''; // Clear options
      questionEl.textContent = ''; // Clear question
      return;
    }
  
    // Hide try again button during quiz
    if (tryAgainButton) {
      tryAgainButton.style.display = 'none';
    }

    const currentQuestion = quizQuestions[currentQuiz];
    questionEl.textContent = currentQuestion.question;
    
    optionsEl.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'btn btn-outline-primary m-2 quiz-option';
      button.textContent = option;
      button.onclick = () => checkAnswer(index, button);
      optionsEl.appendChild(button);
    });
  }
  
  function checkAnswer(selectedIndex, selectedButton) {
    const resultEl = document.getElementById('result');
    const correct = quizQuestions[currentQuiz].correct === selectedIndex;
    
    // Disable all buttons
    const buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach(btn => btn.disabled = true);
    
    // Highlight correct and incorrect answers
    buttons.forEach((btn, index) => {
      if (index === quizQuestions[currentQuiz].correct) {
        btn.classList.add('correct-answer');
      }
    });
    
    if (!correct) {
      selectedButton.classList.add('incorrect-answer');
    }
    
    resultEl.textContent = correct ? 'Correct!' : 'Incorrect! ' + quizQuestions[currentQuiz].explanation;
    resultEl.className = `result-message ${correct ? 'text-success' : 'text-danger'}`;
    
    setTimeout(() => {
      currentQuiz++;
      loadQuiz();
    }, 2000);
  }
  
  function resetQuiz() {
    currentQuiz = 0;
    loadQuiz();
  }
  
  // Update the try again button event listener
  const tryAgainButton = document.getElementById('tryAgain');
  if (tryAgainButton) {
    tryAgainButton.addEventListener('click', () => {
        currentQuiz = 0;
        loadQuiz();
    });
  }
  
  // Initialize elements when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quoteDisplay) {
      quoteDisplay.textContent = "Click the button above to see a Truman quote!";
    }
    
    populateTimeline();
    loadQuiz();
  
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  });