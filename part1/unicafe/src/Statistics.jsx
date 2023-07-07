import StatisticLine from './StatisticLine';

const Statistics = ({ feedback, all, average, positiveFeedback }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={feedback.good} />
        <StatisticLine text="neutral" value={feedback.neutral} />
        <StatisticLine text="bad" value={feedback.bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positiveFeedback + ' %'} />
      </tbody>
    </table>
  );
};

export default Statistics;
