import { useState } from 'react'
import Counter from './components/Counter/Counter'

import './App.css'

const App = () => {
  const [counters, setCounters] = useState([])
  const [countersSum, setCountersSum] = useState(0)
  console.log('mycounters',counters)
  

  const addNewCounter = () => {
    const counter = {
      counterId: counters.length !== 0 ? counters.length : 0,
      counterValue: 0,
      counterIsEven: true,
    }

    const updatedCounters = [...counters].concat(counter)
    increaseEvenCounters(updatedCounters)
  }

  const deleteCounter = (id) => {
    const updatedCounters = [...counters].filter(
      (item) => item.counterId !== id
    )
    decreaseOddCounters(updatedCounters)
  }

  const deleteAllCounters = () => {
    setCounters([])
    setCountersSum(0)
  }

  const increaseEvenCounters = (updatedCounters) => {
    const updatedCountersEven = updatedCounters.map((counter) => {
      const counterCopy = { ...counter }
      if (counterCopy.counterIsEven) {
        counterCopy.counterValue += 1
        counterCopy.counterIsEven = false
        console.log('2 ', counterCopy)
      }
      console.log('counterCopy ', counterCopy)
      return { ...counterCopy }
    })
    setCounters(updatedCounters);

    console.log('updatedCountersEven ', updatedCountersEven)

  }

  const decreaseOddCounters = (updatedCounters) => {
    const updatedCountersOdd = updatedCounters.map((counter) => {
      const counterCopy = { ...counter }
      if (!counterCopy.counterIsEven) {
        counterCopy.counterValue -= 1
        counterCopy.counterIsEven = true
        console.log('2 ', counterCopy)
      }
      console.log('counterCopy ', counterCopy)
      return { ...counterCopy }
    })
    setCounters(updatedCounters);

    console.log('updatedCountersOdd ', updatedCountersOdd)

  }

  return (
    <div className="App">
      <button onClick={addNewCounter}>Add Counter</button>
      <button onClick={deleteAllCounters}>Reset Counters</button>
      <div>
        {counters &&
          counters.map((item) => {
            return (
              <li key={item.counterId}>
                <Counter
                  counterId={item.counterId}
                  deleteCounter={() => deleteCounter(item.counterId)}
                  counters={counters}
                  setCounters={setCounters}
                  setCountersSum={setCountersSum}
                />
              </li>
            )
          })}
      </div>
      <div>Количество счетчиков: {counters.length}</div>
      <div>Сумма значений:{countersSum}</div>
    </div>
  )
}

export default App
