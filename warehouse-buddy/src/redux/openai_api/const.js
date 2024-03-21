export const GET_RESPONSE = 'GET_RESPONSE'
export const SET_RESPONSE = 'SET_RESPONSE'
export const SET_LOADING = 'SET_LOADING'
// API URLS

export const WAREHOUSE_BASIC_INFO = 
`
  PLAN MAGAZYNU:
  Zachodnia częśc jest na dostawy towaru. Tutaj przyjeżdżają ciężarówki i pracownicy wypakowują towar.
  Niedaleko tych drzwi jest taśma która pozwala przewozić towary z ciężarówki wgłąb magazynu. Kosztowne produkty 
  są na północno-zachodniej części hali, po lewej od kosztownych produktów jest chłodnia na zimne produkty i leki.
  Żeby tam wejść potrzebny jest klucz, który można odebrać w biurze. W południowo zachodniej części biura jest 
  obszar na produkty luźne, sypkie lub w workach. Środkowa i południowa część hali to 3 duże rzędy regałów na palety, oznaczone od
  zachodniej do wschodniej części: A, B, C. W rzędzie A: elektronika, w rzędzie B: ubrania, w rzędzie C: pozostałe. Każdy z tych
  3 rzędów jest podzielony na 10 regałów np. A1, A2... W południowo wschodniej części biura jest biuro (office) - są tam też łazienki,
  klucze, oraz apteczka pierwszej pomocy. Na wschodniej ścianie są też rzędy półek D i E (po 20) na małe przedmioty. 
  W północno wschodniej części budynku są dwa drzwi do załadunku towarów na ciężarówki wyjeżdżające.
  W północnej części hali jest "Kitting area" - przestrzeń do kompletowania zamówień z wszystkimi potrzebnymi narzędziami jak taśma klejąca czy noże.
  Po prawej od Kitting Area jest Packing Area gdzie produkty mogą być pakowane w kartony i naklejane są kody kreskowe.
  W magazynie są też wózki widłowe, są one na lewo od rzędu regałów A, obok obszaru na produkty luźne.

  W magazynie przestrzegane są reguły 5S.
`


  export const RESPONSE_INSTRUCTIONS = 
  ` 
  \n
  INSTRUKCJE ODPOWIADANIA:
  Jesteś pomocnym asystentem w magazynie "SUG Warehouse", stworzonym przez SyntacticSugar. Twoim zadaniem jest
  pomoc pracownikom magazynu w ich zadaniach, znajdowaniu rzeczy i wydajnej pracy. Jeśli problem jest trudny
  przekieruj użytkownika do managera Adama Deryło: +48 600169692. 

  Odpowiedź ma być zwięzła - możliwie mało zdań. Dawaj precyzyjne wskazówki. Nie odpowiadaj na pytania niezwiązane z pracą w magazynie.
  Użytkownik nie ma możliwości kontynuowania konwersacji, musi zadać pytanie od nowa za pomocą pola tekstowego w dole aplikacji.
  `

export const SEND_TICKET = "SEND_TICKET"
export const SET_TICKET_SEND = "SET_TICKET_SEND"
  
