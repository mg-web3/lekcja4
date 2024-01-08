# Programowanie Web3 - Fundamenty Blockchain i Solidity

Lekcja 4 kursu Programowanie Web3 - Fundamenty Blockchain i Solidity.

Stworzenie pełnej zdecentralizowanej aplikacji - DApp. Część 1: Smartcontract.

![dApp](../4-dapp.png)

## Instalacja i konfiguracja

1. Zainstaluj VS Code: https://code.visualstudio.com/download
2. Stwórz folder dla projektu i przejdź do niego: `mkdir nazwa-projektu` i `cd nazwa-projektu`
3. Zainstaluj Foundry: `curl -L https://foundry.paradigm.xyz | bash`
4. Stwórz nowy projekt Foundry: `forge init`
5. Zainstaluj biblioteki od OpenZeppelin: `forge install Openzeppelin/openzeppelin-contracts`
6. Do pliku `foundry.toml` dodaj linijkę, która pozwoli kompilatorowi na poprawne mapowanie zależności: `remappings = ["@openzeppelin/=lib/openzeppelin-contracts/"]`
7. Zmień nazwę pliku : `mv src/Counter.sol src/PierwszyToken.sol` i `mv test/Counter.t.sol test/PierwszyToken.t.sol` kolejno `mv script/Counter.s.sol script/PierwszyToken.s.sol`
8. Uzupełnij pliki źródłowe odpowiednim kodem

## Uruchomienie

1. Skompiluj kod: `forge build`
2. Uruchom testy: `forge test -vvvv` (czym więcej 'v' tym bardziej szczegółowe logowanie)
3. Uruchom lokalne środowisko blockchain (w drugim terminalu). Opcja 'state' pozwala na zapamiętanie stanu sieci pomiędzy kolejnymi uruchomieniami: `anvil --state test-network-state`
4. Stwórz instancję smarcontractu na środowisku lokalnym. Klucz prywatny uzyskasz z terminala po uruchomieniu środowiska lokalnego: `forge create PierwszyToken --private-key <KLUCZ PRYWATNY>`
