import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Stats = (props) => {

  if (!props.good && !props.neutral && !props.bad) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
    <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good}></StatisticLine>
          <StatisticLine text='neutral' value={props.neutral}></StatisticLine>
          <StatisticLine text='bad' value={props.bad}></StatisticLine>
          <StatisticLine text='average' value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}></StatisticLine>
          <StatisticLine text='positive' value={(props.good)/(props.good+props.neutral+props.bad)}></StatisticLine>
        </tbody>
      </table>
      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackGood = () => {
    setGood(good + 1)
  }

  const feedbackNeutral = () => {
    setNeutral(neutral + 1)
  }

  const feedbackBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feeedback</h1>
      <Button handleClick={feedbackGood} text='good'></Button>
      <Button handleClick={feedbackNeutral} text='neutral'></Button>
      <Button handleClick={feedbackBad} text='bad'></Button>
      <Stats good={good} neutral={neutral} bad={bad}></Stats>
    </div>
  )
}

export default App;
