import { useState } from 'react';

import Header from './Header';
import Button from './Button';
import Statistics from './Statistics';

function App() {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const all = feedback.good + feedback.neutral + feedback.bad;

  const average =
    (feedback.good * 1 + feedback.neutral * 0 + feedback.bad * -1) / all;

  const positiveFeedback = (feedback.good / all) * 100;

  const handleGoodClick = () => {
    setFeedback({
      ...feedback,
      good: feedback.good + 1,
      average: feedback.good,
    });
  };

  const handleNeutralClick = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };

  const handleBadClick = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  };

  return (
    <div>
      <Header title="Give Feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header title="Statistics" />
      {all > 0 ? (
        <>
          <Statistics
            feedback={feedback}
            all={all}
            average={average}
            positiveFeedback={positiveFeedback}
          />
        </>
      ) : (
        'No Feedback Given'
      )}
    </div>
  );
}

export default App;
