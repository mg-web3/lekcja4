# Programowanie Web3 - Fundamenty Blockchain i Solidity

Lekcja 4 kursu Programowanie Web3 - Fundamenty Blockchain i Solidity.

Stworzenie pełnej zdecentralizowanej aplikacji - DApp. Część 2: Frontend.

![dApp](../4-dapp.png)

## Instalacja i konfiguracja

1. Zainstaluj NodeJs: https://nodejs.org/en
2. Stwórz folder dla projektu i przejdź do niego: `mkdir nazwa-projektu` i `cd nazwa-projektu`
3. Zainicjalizuj projekt Reactowy: `npx create-react-app .`
4. Usuń niepotrzebne pliki z folderu `src`. Zostaw `App.js`, `index.js` (usuwając oczywiście importy plików, które usunęliśmy)
5. Zainstaluj bibliotekę web3js: `npm install web3`
6. Uzupełnij pliki źródłowe odpowiednim kodem

## Uruchomienie

1. Uruchom wersję na potrzeby testów: `npm start`
2. Zbuduj wersję produkcyjną / zoptymalizowaną: `npm build`

## Rozwiązania częstych problemów

W przypadku problemów z wywoływaniem transakcji z poziomu przeglądarki w zależności od źródła problemu pomóc może:

- zmiana przeglądarki z Firefox na inną
- w zaawansowanych ustawieniach Metamask (... -> Settings -> Advanced) zresetowanie danych co do aktywności: "Clear activity tab data"
- zmiana wersji biblioteki web3js z bieżącej na 1.10.2: `npm install web3@1.10.2`. Problem tymczasowy w wersjach 4.x zgodnie z opisem: https://github.com/web3/web3.js/issues/6183
