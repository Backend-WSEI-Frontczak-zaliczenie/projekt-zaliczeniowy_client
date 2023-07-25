# projekt-zaliczeniowy_client

## Pierwsze uruchomienie

### Potrzebne narzędzia

- npm

### Uruchomienie aplikacji

Aby uruchomić aplikację, należy zainstalować wymagane pakiety npm: `npm install`. Następnie można uruchomić wersję developerską aplikacji poprzez komendę `npm run dev`.

Aby można było się połączyć z backendem, trzeba ustawić proxy w taki sposób, żeby przekierowywało zapytania do api na odpowiedni adres. Na wersji produkcyjnej można to osiągnąć poprzez skonfigurowanie reverse proxy, natomiast developersko wystarczy odpowienio ustawić adres w pliku [vite.config.ts](vite.config.ts)
