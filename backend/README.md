# run migration
    npx sequelize-cli migration:generate --name create-khmer-words
# run seeder
    npx sequelize-cli seed:generate --name seed-khmer-words

# inital tounch, run on local
    npm run install
    npm run migrate
    npm run dev