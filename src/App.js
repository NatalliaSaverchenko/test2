import { useState } from 'react'
import Counter from './components/Counter/Counter'

import './App.css'
import { isEven } from './api/parity'

function App() {
  const [counters, setCounters] = useState([])

  console.log(counters)

 
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
  }

  const deleteCounter = (id) => {
    setCounters(counters.filter(item => item.counterId !== id))
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
                  counterValue={item.counterValue}
                  counterIsEven={item.counterIsEven}
                  deleteCounter={() => deleteCounter(item.counterId)}
                  counters={counters}
                  setCounters={setCounters}
                />
              </li>
            )
          })}
      </div>
      <div>Количество счетчиков: {counters.length}</div>
      <div>Сумма значений: {counters.reduce((prev, cur) => prev + +cur.counterValue, 0)}</div>
    </div>
  )
}

export default App
