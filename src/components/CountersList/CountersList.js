import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Counter from '../Counter/Counter'
import { isEven } from '../../api/parity'

const CountersList = () => {
  const [counters, setCounters] = useState([])
  const [countersSum, setCountersSum] = useState(0)
  console.log('mycounters', counters)

  const addNewCounter = () => {
    const counter = {
      counterId: uuidv4(),
      counterValue: 0,
      counterIsEven: true,
    }

    const countersCopy = [...counters]
    countersCopy.push(counter)
    increaseEvenCounters(countersCopy)
  }

  const deleteCounter = (id) => {
    const countersCopy = [...counters]
    const counterIndex = countersCopy.findIndex(
      (counter) => counter.counterId === id
    )
    const firstDiff = [...counters][counterIndex].counterValue
    countersCopy.splice(counterIndex, 1)
    decreaseOddCounters(countersCopy, firstDiff)
  }

  const deleteAllCounters = () => {
    setCounters([])
    setCountersSum(0)
  }

  const increaseEvenCounters = (updatedCounters) => {
    let diff = 0
    let lastIndex = updatedCounters.length - 1
    const updatedCountersEven = updatedCounters.map((counter, index) => {
      const counterCopy = { ...counter }
      if (counterCopy.counterIsEven && index !== lastIndex) {
        counterCopy.counterValue += 1
        counterCopy.counterIsEven = false
        diff += 1
      }
      return counterCopy
    })

    changeCountersSum(diff)
    setCounters(updatedCountersEven)
  }

  const decreaseOddCounters = (updatedCounters, firstDiff) => {
    let diff = -firstDiff
    const updatedCountersOdd = updatedCounters.map((counter) => {
      const counterCopy = { ...counter }
      if (!counterCopy.counterIsEven) {
        counterCopy.counterValue -= 1
        counterCopy.counterIsEven = true
        diff -= 1
      }
      return counterCopy
    })

    changeCountersSum(diff)
    setCounters(updatedCountersOdd)
  }
  const changeCounter = (id, value, diff) => {
    const counterIndex = counters.findIndex(
      (counter) => counter.counterId === id
    )
    changeCountersSum(diff)
    setCounters((prevstate) => {
      prevstate[counterIndex].counterValue = value
      prevstate[counterIndex].counterIsEven = isEven(value)
      return prevstate
    })
  }

  const changeCountersSum = (diff) => {
    setCountersSum((prevstate) => {
      prevstate += diff
      return prevstate
    })
  }

  return (
    <div className="App">
      <button onClick={addNewCounter}>Add Counter</button>
      <button onClick={deleteAllCounters}>Reset Counters</button>
      <div>
        {counters &&
          counters.map((counter) => {
            const { counterId } = counter
            return (
              <li key={counterId}>
                <Counter
                  counter={counter}
                  deleteCounter={deleteCounter}
                  changeCounter={changeCounter}
                />
              </li>
            )
          })}
      </div>
      <div>Количество счетчиков: {counters.length}</div>
      <div>Сумма значений: {countersSum}</div>
    </div>
  )
}
export default CountersList
