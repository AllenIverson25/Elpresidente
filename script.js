// Array of Harry S. Truman quotes
const trumanQuotes = [
  "America was not built on fear. America was built on courage, on imagination and an unbeatable determination to do the job at hand.", // Quote about America's foundation
  "The buck stops here.", // Famous responsibility quote
  "It is amazing what you can accomplish if you do not care who gets the credit.", // Quote about teamwork and credit
  "Men make history and not the other way around.", // Quote about human agency in history
  "If you can't convince them, confuse them." // Humorous quote about persuasion
];

// Array of timeline events from Truman's life
const timelineEvents = [
  { 
    year: 1884, // Birth year
    event: "Born in Lamar, Missouri", 
    details: "Harry S. Truman was born on May 8, 1884, to John Anderson Truman and Martha Ellen Young Truman.", // Event details
    image: "imgs/birth.png" 
  },
  { 
    year: 1917, // WWI service year
    event: "Military Service in WWI", // Event title
    details: "Served with distinction in World War I as an artillery officer, leading Battery D of the 129th Field Artillery.", // Event details
    image: "imgs/ww1serve.png" // Image path
  },
  { 
    year: 1945, // Presidency start year
    event: "Became 33rd President", // Event title
    details: "Assumed the presidency following FDR's death, facing the challenges of ending World War II and establishing postwar order.", // Event details
    image: "imgs/president33.png" // Image path
  },
  { 
    year: 1947, // Truman Doctrine year
    event: "Truman Doctrine", // Event title
    details: "Established the Truman Doctrine, pledging American support to democratic nations under threat from authoritarian forces.", // Event details
    image: "imgs/trumandoctrine.png" // Image path
  },
  { 
    year: 1948, // Marshall Plan year
    event: "Marshall Plan", // Event title
    details: "Implemented the Marshall Plan, providing crucial economic aid to rebuild Western Europe after World War II.", // Event details
    image: "imgs/Marshallplan.png" // Image path
  }
];

// Array of quiz questions about Truman
const quizQuestions = [
  {
    question: "When did Truman become President?", // Quiz question
    options: ["1944", "1945", "1946", "1947"], // Answer options
    correct: 1, // Index of correct answer (1945)
    explanation: "Truman became President in 1945 following FDR's death." // Explanation for answer
  },
  {
    question: "What was Truman's famous saying about responsibility?", // Quiz question
    options: ["The buck stops here", "Actions speak louder", "Leadership is key", "Trust but verify"], // Answer options
    correct: 0, // Index of correct answer (The buck stops here)
    explanation: "This phrase emphasized his belief in presidential accountability." // Explanation for answer
  },
  {
    question: "Which plan did Truman implement to help rebuild Europe?", // Quiz question
    options: ["Nixon Plan", "Roosevelt Plan", "Marshall Plan", "Eisenhower Plan"], // Answer options
    correct: 2, // Index of correct answer (Marshall Plan)
    explanation: "The Marshall Plan was crucial for European recovery after WWII." // Explanation for answer
  },
  {
    question: "What major military decision did Truman make in 1945?", // Quiz question
    options: ["D-Day invasion", "Atomic bomb use", "Nazi surrender", "Pacific retreat"], // Answer options
    correct: 1, // Index of correct answer (Atomic bomb use)
    explanation: "Truman authorized the use of atomic bombs on Japan." // Explanation for answer
  },
  {
    question: "Which policy aimed to contain Soviet expansion?", // Quiz question
    options: ["Monroe Doctrine", "Truman Doctrine", "New Deal", "Good Neighbor Policy"], // Answer options
    correct: 1, // Index of correct answer (Truman Doctrine)
    explanation: "The Truman Doctrine was established in 1947 to counter Soviet influence." // Explanation for answer
  }
];

// Variable to track current quiz question index
let currentQuiz = 0;

// Function to display a random Truman quote
function showRandomQuote(elementId) {
  const quoteDisplay = document.getElementById(elementId); // Get the quote display element
  const randomIndex = Math.floor(Math.random() * trumanQuotes.length); // Generate random index
  quoteDisplay.textContent = `"${trumanQuotes[randomIndex]}"`; // Set quote text with quotation marks
  quoteDisplay.style.opacity = '0'; // Fade out initially
  setTimeout(() => {
    quoteDisplay.style.opacity = '1'; // Fade in after a brief delay
  }, 10); // 10ms delay for smooth transition
}

// Function to populate both horizontal and vertical timelines
function populateTimeline() {
  const timelineContainer = document.querySelector('.timeline-events'); // Horizontal timeline container
  const timelineVertical = document.querySelector('.timeline-events-vertical'); // Vertical timeline container
  if (!timelineContainer && !timelineVertical) return; // Exit if neither container exists
  
  timelineEvents.forEach(event => { // Loop through each timeline event
    // Horizontal timeline
    if (timelineContainer) {
      const eventElement = document.createElement('div'); // Create new div for event
      eventElement.className = 'timeline-item'; // Set class name
      eventElement.innerHTML = `
      <img src="${event.image}" alt="${event.event}"> 
      <span class="year-badge">${event.year}</span> 
      <div class="timeline-item-content"> 
        <h4>${event.event}</h4> 
        <div class="details">${event.details}</div> 
      </div>
    `;
    eventElement.addEventListener('click', function() { // Add click event listener
      const allDetails = document.querySelectorAll('.timeline-events .details, .timeline-events-vertical .details'); // Get all details elements
      const isCurrentlyActive = this.querySelector('.details').classList.contains('active'); // Check if currently active
      
      if (isCurrentlyActive) { // If active, collapse all
        allDetails.forEach(detail => detail.classList.remove('active'));
      } else { // If not active, expand all
        allDetails.forEach(detail => detail.classList.add('active'));
      }
    });
    timelineContainer.appendChild(eventElement); // Add event to horizontal timeline
    }
    
    // Vertical timeline
    if (timelineVertical) {
      const verticalElement = document.createElement('div'); // Create new div for event
      verticalElement.className = 'timeline-item'; // Set class name
      verticalElement.innerHTML = `
        <img src="${event.image}" alt="${event.event}"> 
        <span class="year-badge">${event.year}</span> 
        <div class="timeline-item-content">
          <h4>${event.event}</h4> 
          <div class="details">${event.details}</div> 
        </div>
      `;
      verticalElement.addEventListener('click', function() { // Add click event listener
        const details = this.querySelector('.details'); // Get details for this item
        details.classList.toggle('active'); // Toggle active class
      });
      timelineVertical.appendChild(verticalElement); // Add event to vertical timeline
    }
  });
}

// Function to load and display the current quiz question
function loadQuiz() {
  const quizContainer = document.getElementById('quiz-container'); // Get quiz container
  if (!quizContainer) return; // Exit if container doesn't exist

  const questionEl = document.getElementById('question'); // Get question element
  const optionsEl = document.getElementById('options'); // Get options container
  const resultEl = document.getElementById('result'); // Get result element
  const tryAgainButton = document.getElementById('tryAgain'); // Get try again button
  
  // Clear previous result
  if (resultEl) {
    resultEl.textContent = ''; // Clear text
    resultEl.className = ''; // Clear classes
  }
  
  if (currentQuiz >= quizQuestions.length) { // Check if quiz is complete
    // Show final score
    resultEl.textContent = `Quiz Complete! You finished the quiz!`; // Completion message
    tryAgainButton.style.display = 'block'; // Show try again button
    optionsEl.innerHTML = ''; // Clear options
    questionEl.textContent = ''; // Clear question
    return; // Exit function
  }

  // Hide try again button during quiz
  if (tryAgainButton) {
    tryAgainButton.style.display = 'none'; // Hide button
  }

  const currentQuestion = quizQuestions[currentQuiz]; // Get current question object
  questionEl.textContent = currentQuestion.question; // Set question text
  
  optionsEl.innerHTML = ''; // Clear previous options
  currentQuestion.options.forEach((option, index) => { // Loop through options
    const button = document.createElement('button'); // Create button for each option
    button.className = 'btn btn-outline-primary m-2 quiz-option'; // Set button classes
    button.textContent = option; // Set button text
    button.onclick = () => checkAnswer(index, button); // Add click handler
    optionsEl.appendChild(button); // Add button to options container
  });
}

// Function to check the selected quiz answer
function checkAnswer(selectedIndex, selectedButton) {
  const resultEl = document.getElementById('result'); // Get result element
  const correct = quizQuestions[currentQuiz].correct === selectedIndex; // Check if answer is correct
  
  // Disable all buttons
  const buttons = document.querySelectorAll('.quiz-option'); // Get all option buttons
  buttons.forEach(btn => btn.disabled = true); // Disable each button
  
  // Highlight correct and incorrect answers
  buttons.forEach((btn, index) => { // Loop through buttons
    if (index === quizQuestions[currentQuiz].correct) { // If correct answer
      btn.classList.add('correct-answer'); // Add correct class
    }
  });
  
  if (!correct) { // If selected answer is incorrect
    selectedButton.classList.add('incorrect-answer'); // Highlight selected button as wrong
  }
  
  resultEl.textContent = correct ? 'Correct!' : 'Incorrect! ' + quizQuestions[currentQuiz].explanation; // Set result message
  resultEl.className = `result-message ${correct ? 'text-success' : 'text-danger'}`; // Set result classes
  
  setTimeout(() => { // Delay before next question
    currentQuiz++; // Increment quiz index
    loadQuiz(); // Load next question
  }, 2000); // 2-second delay
}

// Function to reset quiz to beginning
function resetQuiz() {
  currentQuiz = 0; // Reset quiz index
  loadQuiz(); // Reload quiz
}

// Set up try again button event listener
const tryAgainButton = document.getElementById('tryAgain'); // Get try again button
if (tryAgainButton) { // If button exists
  tryAgainButton.addEventListener('click', () => { // Add click handler
      currentQuiz = 0; // Reset quiz index
      loadQuiz(); // Reload quiz
  });
}

// Initialize elements when page loads
document.addEventListener('DOMContentLoaded', function() { // Wait for DOM to load
  const quoteDisplay = document.getElementById('quoteDisplay'); // Get quote display element
  if (quoteDisplay) { // If element exists
    quoteDisplay.textContent = "Click the button above to see a Truman quote!"; // Set initial text
  }
  
  populateTimeline(); // Populate timeline
  loadQuiz(); // Load first quiz question

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar'); // Get navbar element
  window.addEventListener('scroll', () => { // Add scroll event listener
    if (window.scrollY > 50) { // If scrolled more than 50px
      navbar.classList.add('scrolled'); // Add scrolled class
    } else { // If near top
      navbar.classList.remove('scrolled'); // Remove scrolled class
    }
  });
});