import { useEffect, useState, useStatue } from 'react'
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImages = [
  { "src": "/img/clock-1.jpg", matched: false },
  { "src": "/img/airplane-1.jpg",  matched: false},
  { "src": "/img/cup-1.jpg",  matched: false},
  { "src": "/img/goldbar-1.jpg" , matched: false},
  { "src": "/img/flowers-1.jpg",  matched: false},
  { "src": "/img/umbrellas-1.jpg" , matched: false},
  { "src": "/img/pen-1.jpg",  matched: false },
  { "src": "/img/penguin-1.jpg" , matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)

  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
// 2 select chesina cards ni compare dng ekkada
  useEffect(() => {  
    if(choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        
        resetTurn()
      } else {
       
        setTimeout(() => resetTurn(), 1000) 
      }
    }

  }, [choiceOne, choiceTwo])

  console.log(cards)
//ekkada reset gurinchi inka turns kosam evi use chesam
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

//new game ni automatic ga strt chydaniki
useEffect(() => {
   shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
