import { useState } from 'react'
import Counter from './components/Counter/Counter'

import './App.css'

function App() {
  const [counters, setCounters] = useState([])
  const [countersSum, setCountersSum] = useState(0)
  
  console.log(countersSum)
  const addNewCounter = () => {
    let counter = {
      counterId: counters.length !== 0 ? counters.length : 0,
      counterValue: 0,
      counterIsEven: true,
    }

    setCounters(counters.concat(counter))
  }
  const deleteAllCounters = () => {
    setCounters([])
    setCountersSum(0)

  }

  const deleteCounter = (id) => {
    setCounters(counters.filter((item) => item.counterId !== id))
    setCountersSum(0)
  }

  return (
    <div className="App">
      <button onClick={addNewCounter}>Add Counter</button>
      <button onClick={deleteAllCounters}>Reset</button>
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
