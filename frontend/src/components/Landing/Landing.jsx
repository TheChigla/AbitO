import React from 'react'
import './Landing.scss'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='landing'>
      <div className='landing-content'>
        <div className='landing-content__title'>AbitObshiaki - აბიტობშიაკი</div>
        <div className='landing-content__body'>
          AbitObshiaki არის პლატფორმა, რომლის მეშვეობითაც აბიტურიენტებს ეძლევათ
          საშუალება, რომ აკონტროლონ სააბიტურიენტო ფინანსები.
          <br />
          მომხმარებელს შეუძლია მიუთითოს საგანი რომელშიც ემზადება, ამ საგანში
          წლიურად გადასახდელი თანხა (თანხის მითითება შესაძლებელია როგორც ლარში
          ასევე დოლარში. დოლარში მითითებული თანხის ლარებში ნახვა კი მიმდინარე
          კურსის მიხედვით იქნება შესაძლებელი) რომელიც ავტომატურად გაიყოფა 10
          თვეზე, ასევე გადახდის თარიღი (თარიღი იქნება სტაბილური და პლატფორმა
          ყოველ თვეში მიუთითებს ამ რიცხვს, როგორც გადახდის თარიღად).
          <br />
          იმედია მოგეწონებათ პლატფორმა, რომლის მიზანია აბიტურიენტობის ეს პროცესი
          მეტად გაგიმარტივოთ. ყველას წარმატებულ, პროდუქტიულ და შესანიშნავ
          აბიტურიენტობას გისურვებთ :)
        </div>
        <div className='landing-content__buttons'>
          <div className='btn-outline'>
            <Link to='/register'>რეგისტრაცია</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
