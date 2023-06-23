import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";



const Slider = () => {
  
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // Fonction sort mal utilisée? Modification pour un affichage décroissant
    // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    new Date(evtB.date) - new Date(evtA.date)
  );
  
  const nextCard = () => {
    setTimeout(
      // Ajout du "-1" pour ne pas avoir une length de 3 comparée à un index commençant par 0
    
      () => setIndex(index < byDateDesc.length-1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={radioIdx.id}
                  value={radioIdx}
                  type="radio"
                  name="radio-button" 
                  // idx n'est pas paramétré
                  // checked={idx === radioIdx}
                   checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
