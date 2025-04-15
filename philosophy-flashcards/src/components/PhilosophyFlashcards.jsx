import React, { useState, useEffect } from 'react';

const PhilosophyFlashcards = () => {
  // Evidence types data
  const evidenceTypes = [
    {
      type: "History",
      description: "The insights of historical philosophers, sages, natural philosophers, and religious thinkers can help us understand contemporary philosophical questions.",
      example: "The question \"What is a good life?\" is a perennial philosophical concern; attempts at answers from the past continue to have relevance for contemporary people."
    },
    {
      type: "Intuition",
      description: "The philosophical meaning of intuition can best be traced back to Plato, for whom intuition involved a kind of insight into the very nature of things.",
      example: "The truth of a mathematical sentence like \"2+2=4\" is so clear that if it turned out to be wrong, you would have to give up core beliefs about the nature of numbers, addition, and equality."
    },
    {
      type: "Common sense",
      description: "When philosophers talk about common sense, they mean specific claims based on direct sense perception.",
      example: "Someone who is holding their hand in front of their face can rightly claim \"this is my hand\" without having to resort to any further proofs."
    },
    {
      type: "Experimental philosophy",
      description: "The basic idea motivating experimental philosophy is that philosophers use terms and concepts that can be tested in a laboratory.",
      example: "A philosopher might pose scenarios to research subjects and ask them whether they believe an absence of free choice would remove moral responsibility in these scenarios, in order to test a philosophical claim about moral responsibility and free will."
    },
    {
      type: "Results from other disciplines",
      description: "Evidence from other disciplines can help philosophers better understand portions of philosophical inquiries.",
      example: "Information provided by other social scientists (e.g., sociologists, historians, anthropologists) can be used to inform philosophical claims about human nature."
    },
    {
      type: "Predicates",
      description: "Predicates are descriptive terms, like \"yellow\" or \"six feet tall\". The role of conceptual analysis is to identify the right predicates for analysis and to clarify the relationship between them.",
      example: "Predicates can help us clarify statements. For any sentence, we can ask, what is being predicated, and how is it being predicated?"
    },
    {
      type: "Descriptions",
      description: "A definite description is a way of analyzing names and object terms for the purpose of making them more like predicates. This way we can clarify what we are talking about without resorting to gestures, context, or direct experience.",
      example: "Understanding that language is composed of definite descriptions and predicates can help us remove some of the ambiguity and vagueness that is a natural part of speech."
    },
    {
      type: "Enumeration",
      description: "The process of enumeration can help us specify the nature of the thing we are talking about. In effect, we are identifying the parts that make up a whole.",
      example: "Since claims about the whole can be analyzed as claims about its parts and claims about how the parts pertain to the whole, it is helpful to enumerate the parts and consider how claims about the whole relate to claims about the parts."
    },
    {
      type: "Thought experiments",
      description: "Thought experiments are hypothetical scenarios meant to isolate one or more features of a concept and place it in the appropriate relationship with other concepts.",
      example: "Thought experiments allow us to test or compare concepts to better understand their connections and logical consequences."
    }
  ];

  // App states
  const [mode, setMode] = useState('menu'); // menu, flashcard, trivia
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [triviaQuestions, setTriviaQuestions] = useState([]);

  // Generate trivia questions based on evidence types
  const generateQuestions = () => {
    const questions = [
      {
        question: "Which type of philosophical evidence involves insights from historical thinkers?",
        options: ["Intuition", "History", "Common sense", "Experimental philosophy"],
        correctAnswer: "History"
      },
      {
        question: "Which philosophical evidence type can be traced back to Plato?",
        options: ["Common sense", "Results from other disciplines", "Intuition", "Experimental philosophy"],
        correctAnswer: "Intuition"
      },
      {
        question: "Which type of evidence is based on direct sense perception?",
        options: ["Common sense", "History", "Results from other disciplines", "Experimental philosophy"],
        correctAnswer: "Common sense"
      },
      {
        question: "Which philosophical approach involves testing concepts in a laboratory?",
        options: ["History", "Intuition", "Common sense", "Experimental philosophy"],
        correctAnswer: "Experimental philosophy"
      },
      {
        question: "Which type of evidence uses information from sociologists, historians, and anthropologists?",
        options: ["Results from other disciplines", "History", "Intuition", "Common sense"],
        correctAnswer: "Results from other disciplines"
      },
      {
        question: "Which conceptual analysis method involves descriptive terms like 'yellow' or 'six feet tall'?",
        options: ["Descriptions", "Predicates", "Enumeration", "Thought experiments"],
        correctAnswer: "Predicates"
      },
      {
        question: "What helps us clarify what we are talking about without resorting to gestures or context?",
        options: ["Predicates", "Descriptions", "Enumeration", "Thought experiments"],
        correctAnswer: "Descriptions"
      },
      {
        question: "Which method identifies the parts that make up a whole?",
        options: ["Enumeration", "Descriptions", "Predicates", "Thought experiments"],
        correctAnswer: "Enumeration"
      },
      {
        question: "What conceptual analysis method uses hypothetical scenarios to isolate features of a concept?",
        options: ["Predicates", "Descriptions", "Enumeration", "Thought experiments"],
        correctAnswer: "Thought experiments"
      }
    ];
    return questions;
  };

  // Shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Randomize option order for each question
  const randomizeOptions = (questions) => {
    return questions.map(q => {
      const shuffledOptions = shuffleArray(q.options);
      return {
        ...q,
        options: shuffledOptions
      };
    });
  };

  // Initialize trivia questions with randomization
  useEffect(() => {
    const questions = generateQuestions();
    const shuffledQuestions = shuffleArray(questions);
    const randomizedQuestions = randomizeOptions(shuffledQuestions);
    setTriviaQuestions(randomizedQuestions);
  }, []);

  // Handle clicking on the "Visit Textbook" button
  const visitTextbook = () => {
    window.open('https://openstax.org/books/introduction-philosophy/pages/1-introduction', '_blank');
  };

  // Functions for flashcard mode
  const nextCard = () => {
    setFlipped(false);
    setShowExample(false);
    setCurrentCard((prev) => (prev + 1) % evidenceTypes.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setShowExample(false);
    setCurrentCard((prev) => (prev - 1 + evidenceTypes.length) % evidenceTypes.length);
  };

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const toggleExample = () => {
    setShowExample(!showExample);
  };

  // Functions for trivia mode
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === triviaQuestions[currentQuestion].correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setGameCompleted(true);
    }
  };

  const restartTrivia = () => {
    // Re-shuffle questions and options when restarting
    const questions = generateQuestions();
    const shuffledQuestions = shuffleArray(questions);
    const randomizedQuestions = randomizeOptions(shuffledQuestions);
    setTriviaQuestions(randomizedQuestions);
    
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameCompleted(false);
  };

  const returnToMenu = () => {
    setMode('menu');
    restartTrivia();
  };

  // CSS styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: 'white',
      color: '#333',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      background: 'linear-gradient(to right, #2e8b57, #daa520)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      padding: '10px',
    },
    citation: {
      fontSize: '14px',
      marginBottom: '15px',
      textAlign: 'center',
      fontStyle: 'italic',
      maxWidth: '400px',
    },
    visitButton: {
      padding: '8px 15px',
      fontSize: '14px',
      borderRadius: '6px',
      background: '#4a6fa5',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 0 8px rgba(74, 111, 165, 0.4)',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    menu: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '300px',
    },
    button: {
      padding: '12px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(to right, #2e8b57, #daa520)',
      color: 'white',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 0 10px rgba(46, 139, 87, 0.5)',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 0 15px rgba(218, 165, 32, 0.8)',
    },
    flashcard: {
      position: 'relative',
      width: '100%',
      maxWidth: '350px',
      height: '300px',
      perspective: '1000px',
      marginBottom: '20px',
    },
    flashcardInner: {
      position: 'relative',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      transition: 'transform 0.6s',
      transformStyle: 'preserve-3d',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    flashcardFlipped: {
      transform: 'rotateY(180deg)',
    },
    flashcardFace: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
      border: '1px solid #eaeaea',
    },
    flashcardBack: {
      transform: 'rotateY(180deg)',
      background: 'linear-gradient(145deg, #f9f9f9, #ffffff)',
    },
    flashcardTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2e8b57',
    },
    flashcardContent: {
      fontSize: '16px',
      lineHeight: '1.5',
      overflow: 'auto',
      maxHeight: '200px',
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '350px',
      gap: '10px',
    },
    navButton: {
      flex: '1',
      padding: '10px',
      fontSize: '14px',
      borderRadius: '8px',
      background: 'linear-gradient(to right, #2e8b57, #daa520)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 0 8px rgba(46, 139, 87, 0.4)',
    },
    exampleButton: {
      marginTop: '10px',
      padding: '8px 15px',
      fontSize: '14px',
      borderRadius: '6px',
      background: 'linear-gradient(to right, #daa520, #2e8b57)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 0 8px rgba(218, 165, 32, 0.4)',
    },
    example: {
      marginTop: '15px',
      padding: '10px',
      background: 'rgba(218, 165, 32, 0.1)',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.4',
      border: '1px dashed #daa520',
    },
    triviaContainer: {
      width: '100%',
      maxWidth: '400px',
    },
    question: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      lineHeight: '1.4',
    },
    options: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px',
    },
    option: {
      padding: '12px 15px',
      borderRadius: '8px',
      background: 'white',
      border: '1px solid #ddd',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '15px',
    },
    selectedOption: {
      background: 'linear-gradient(to right, #2e8b57, #daa520)',
      color: 'white',
      border: '1px solid transparent',
      boxShadow: '0 0 10px rgba(46, 139, 87, 0.5)',
    },
    correctOption: {
      background: '#4caf50',
      color: 'white',
      border: '1px solid transparent',
    },
    incorrectOption: {
      background: '#f44336',
      color: 'white',
      border: '1px solid transparent',
    },
    feedback: {
      textAlign: 'center',
      marginBottom: '20px',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    correctFeedback: {
      color: '#4caf50',
    },
    incorrectFeedback: {
      color: '#f44336',
    },
    score: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    counter: {
      fontSize: '14px',
      marginBottom: '15px',
      textAlign: 'center',
      color: '#666',
    },
    gameCompletedContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
    },
    finalScore: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#2e8b57',
      marginBottom: '10px',
    },
    scorePercentage: {
      fontSize: '18px',
      marginBottom: '20px',
    },
  };

  // State for button hover effects
  const [hoveredButtons, setHoveredButtons] = useState({
    flashcards: false,
    trivia: false,
    menu: false,
    restart: false,
    next: false,
    textbook: false
  });

  const handleMouseEnter = (button) => {
    setHoveredButtons(prev => ({ ...prev, [button]: true }));
  };

  const handleMouseLeave = (button) => {
    setHoveredButtons(prev => ({ ...prev, [button]: false }));
  };

  // JSX rendering
  return (
    <div style={styles.container}>
      {mode === 'menu' && (
        <>
          <h1 style={styles.header}>Philosophical Evidence Study Tool</h1>
          <div style={styles.citation}>
            Smith, Nathan. <em>Introduction to Philosophy</em>. OpenStax, 2022.
          </div>
          <button 
            style={{
              ...styles.visitButton,
              ...(hoveredButtons.textbook ? styles.buttonHover : {})
            }}
            onMouseEnter={() => handleMouseEnter('textbook')}
            onMouseLeave={() => handleMouseLeave('textbook')}
            onClick={visitTextbook}
          >
            Visit Textbook
          </button>
          <div style={styles.menu}>
            <button 
              style={{
                ...styles.button,
                ...(hoveredButtons.flashcards ? styles.buttonHover : {})
              }}
              onMouseEnter={() => handleMouseEnter('flashcards')}
              onMouseLeave={() => handleMouseLeave('flashcards')}
              onClick={() => setMode('flashcard')}
            >
              Study Flashcards
            </button>
            <button 
              style={{
                ...styles.button,
                ...(hoveredButtons.trivia ? styles.buttonHover : {})
              }}
              onMouseEnter={() => handleMouseEnter('trivia')}
              onMouseLeave={() => handleMouseLeave('trivia')}
              onClick={() => setMode('trivia')}
            >
              Play Trivia Game
            </button>
          </div>
        </>
      )}

      {mode === 'flashcard' && (
        <>
          <h1 style={styles.header}>Philosophical Evidence Flashcards</h1>
          <div style={styles.citation}>
            Smith, Nathan. <em>Introduction to Philosophy</em>. OpenStax, 2022.
          </div>
          <button 
            style={{
              ...styles.visitButton,
              ...(hoveredButtons.textbook ? styles.buttonHover : {})
            }}
            onMouseEnter={() => handleMouseEnter('textbook')}
            onMouseLeave={() => handleMouseLeave('textbook')}
            onClick={visitTextbook}
          >
            Visit Textbook
          </button>
          <div style={styles.counter}>Card {currentCard + 1} of {evidenceTypes.length}</div>
          <div style={styles.flashcard} onClick={flipCard}>
            <div style={{
              ...styles.flashcardInner,
              ...(flipped ? styles.flashcardFlipped : {})
            }}>
              <div style={styles.flashcardFace}>
                <div style={styles.flashcardTitle}>{evidenceTypes[currentCard].type}</div>
                <div style={styles.flashcardContent}>
                  Tap to see the description
                </div>
              </div>
              <div style={{...styles.flashcardFace, ...styles.flashcardBack}}>
                <div style={styles.flashcardTitle}>{evidenceTypes[currentCard].type}</div>
                <div style={styles.flashcardContent}>
                  {evidenceTypes[currentCard].description}
                  
                  {showExample && (
                    <div style={styles.example}>
                      <strong>Example:</strong> {evidenceTypes[currentCard].example}
                    </div>
                  )}
                </div>
                <button 
                  style={styles.exampleButton} 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExample();
                  }}
                >
                  {showExample ? 'Hide Example' : 'Show Example'}
                </button>
              </div>
            </div>
          </div>
          <div style={styles.navigation}>
            <button style={styles.navButton} onClick={prevCard}>Previous</button>
            <button 
              style={{
                ...styles.navButton,
                ...(hoveredButtons.menu ? styles.buttonHover : {})
              }}
              onMouseEnter={() => handleMouseEnter('menu')}
              onMouseLeave={() => handleMouseLeave('menu')}
              onClick={returnToMenu}
            >
              Menu
            </button>
            <button style={styles.navButton} onClick={nextCard}>Next</button>
          </div>
        </>
      )}

      {mode === 'trivia' && !gameCompleted && triviaQuestions.length > 0 && (
        <>
          <h1 style={styles.header}>Philosophy Evidence Trivia</h1>
          <div style={styles.citation}>
            Smith, Nathan. <em>Introduction to Philosophy</em>. OpenStax, 2022.
          </div>
          <button 
            style={{
              ...styles.visitButton,
              ...(hoveredButtons.textbook ? styles.buttonHover : {})
            }}
            onMouseEnter={() => handleMouseEnter('textbook')}
            onMouseLeave={() => handleMouseLeave('textbook')}
            onClick={visitTextbook}
          >
            Visit Textbook
          </button>
          <div style={styles.counter}>Question {currentQuestion + 1} of {triviaQuestions.length}</div>
          <div style={styles.triviaContainer}>
            <div style={styles.question}>{triviaQuestions[currentQuestion].question}</div>
            <div style={styles.options}>
              {triviaQuestions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.option,
                    ...(selectedAnswer === option ? styles.selectedOption : {}),
                    ...(isCorrect !== null && option === triviaQuestions[currentQuestion].correctAnswer ? styles.correctOption : {}),
                    ...(isCorrect === false && selectedAnswer === option ? styles.incorrectOption : {})
                  }}
                  onClick={() => selectedAnswer === null && handleAnswerSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            {isCorrect !== null && (
              <div style={{
                ...styles.feedback,
                ...(isCorrect ? styles.correctFeedback : styles.incorrectFeedback)
              }}>
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </div>
            )}
            <div style={styles.navigation}>
              <button 
                style={{
                  ...styles.navButton,
                  ...(hoveredButtons.menu ? styles.buttonHover : {})
                }}
                onMouseEnter={() => handleMouseEnter('menu')}
                onMouseLeave={() => handleMouseLeave('menu')}
                onClick={returnToMenu}
              >
                Menu
              </button>
              {selectedAnswer !== null && (
                <button 
                  style={{
                    ...styles.navButton,
                    ...(hoveredButtons.next ? styles.buttonHover : {})
                  }}
                  onMouseEnter={() => handleMouseEnter('next')}
                  onMouseLeave={() => handleMouseLeave('next')}
                  onClick={nextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {mode === 'trivia' && gameCompleted && (
        <>
          <h1 style={styles.header}>Game Completed!</h1>
          <div style={styles.citation}>
            Smith, Nathan. <em>Introduction to Philosophy</em>. OpenStax, 2022.
          </div>
          <button 
            style={{
              ...styles.visitButton,
              ...(hoveredButtons.textbook ? styles.buttonHover : {})
            }}
            onMouseEnter={() => handleMouseEnter('textbook')}
            onMouseLeave={() => handleMouseLeave('textbook')}
            onClick={visitTextbook}
          >
            Visit Textbook
          </button>
          <div style={styles.gameCompletedContainer}>
            <div style={styles.finalScore}>Your Score</div>
            <div style={styles.score}>{score} out of {triviaQuestions.length}</div>
            <div style={styles.scorePercentage}>
              {Math.round((score / triviaQuestions.length) * 100)}% Correct
            </div>
            <div style={styles.navigation}>
              <button 
                style={{
                  ...styles.navButton,
                  ...(hoveredButtons.restart ? styles.buttonHover : {})
                }}
                onMouseEnter={() => handleMouseEnter('restart')}
                onMouseLeave={() => handleMouseLeave('restart')}
                onClick={restartTrivia}
              >
                Play Again
              </button>
              <button 
                style={{
                  ...styles.navButton,
                  ...(hoveredButtons.menu ? styles.buttonHover : {})
                }}
                onMouseEnter={() => handleMouseEnter('menu')}
                onMouseLeave={() => handleMouseLeave('menu')}
                onClick={returnToMenu}
              >
                Menu
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PhilosophyFlashcards;