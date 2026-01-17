import { useState } from "react";
import { finishGame } from "../services/game-service";

import Button from "./button";

const GameSession = ({ questions, onResetGame, gameSessionId }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showScore, setShowScore] = useState(false);

  if (!questions || questions.length === 0) {
    return <div>Keine Fragen verfügbar</div>;
  }

  console.log("Aktueller questionIndex:", questionIndex);
  console.log("Anzahl Fragen:", questions.length);
  console.log("Fragen-Array:", questions);

  const currentQuestion = questions[questionIndex];
  console.log(`Aktuelle Frage: ${currentQuestion.question}`);

  const handleAnswerClick = (answer) => {
    if (isAnswered) {
      // If the question has already been answered, do nothing
      return;
    }

    setIsAnswered(true);
    if (answer === currentQuestion.correctAnswer) {
      setFeedback("Richtig!");
      setScore(score + 1);
    } else {
      setFeedback("Falsch! Richtig wäre: " + currentQuestion.correctAnswer);
    }
  };

  // Define what happens when the next question button is clicked
  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    setFeedback(null);
    setIsAnswered(false);
  };

  /**
   * Beendet das Game und speichert es im Backend
   */
  const handleGameEnd = async () => {
    console.log("🏁 Game wird beendet...");

    // 1. Score anzeigen (wie vorher)
    setShowScore(true);
    setFeedback(null);

    // 2. Backend über Game-Ende informieren
    if (gameSessionId) {
      try {
        console.log("💾 Speichere Resultat im Backend...");
        const result = await finishGame(gameSessionId, score);

        console.log("✅ Game gespeichert!", result);
        console.log("🏆 Finaler Score:", result.totalScore);

        // Optional: Erfolgsmeldung anzeigen
        // setFeedback("✅ Dein Score wurde gespeichert!");
      } catch (error) {
        console.error("❌ Fehler beim Speichern:", error);
        // Optional: Fehlermeldung anzeigen
        // setFeedback("⚠️ Score konnte nicht gespeichert werden");
      }
    } else {
      console.warn("⚠️ Keine Game Session ID - Score wird nicht gespeichert!");
    }
  };

  // Define what happens when the game is reset
  // This function resets the games states to their initial values
  const resetGame = () => {
    setQuestionIndex(0);
    setFeedback(null);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);

    // Call the onResetGame function passed from the parent component
    if (onResetGame) {
      onResetGame();
    }
  };

  return (
    <>
      <h2>{currentQuestion.question}</h2>
      <div className="answer-buttons-container">
        {currentQuestion.answers.map((answer, index) => (
          <Button
            key={index}
            text={answer}
            disabled={isAnswered} // Disable buttons after an answer is selected
            onAnswerClick={() => {
              handleAnswerClick(answer);
            }}
          />
        ))}
      </div>
      <div className="feedback">{feedback}</div>

      {/**
       * Show the next question button only if the question has been answered
       * and the current question is not the last question
       * If it's the last question, show the end game button
       *
       * The () after the feedback && is important otherwise the "Nächste Frage"
       * or "Spiel beenden" button would always be rendered
       * */}
      {feedback &&
        (questionIndex < questions.length - 1 ? (
          <Button
            text="Nächste Frage"
            onAnswerClick={handleNextQuestion}
            disabled={feedback === null} // Disable button until an answer is selected
          />
        ) : (
          <Button text="Spiel beenden" onAnswerClick={handleGameEnd} />
        ))}

      {/** Show the score only if the game is finished and the showScore state is true */}
      {showScore && (
        <div>
          <h2>
            Dein Ergebnis: {score} von {questions.length}
          </h2>
          <Button text="Neues Spiel" onAnswerClick={resetGame} />
        </div>
      )}
    </>
  );
};

export default GameSession;
