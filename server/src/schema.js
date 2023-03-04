import { gql } from 'apollo-server-express'
import find  from 'lodash.find'
import remove from 'lodash.remove'


const peopleArray = [
    {
      id: '1',
      firstName: 'Bill',
      lastName: 'Gates'
    },
    {
      id: '2',
      firstName: 'Steve',
      lastName: 'Jobs'
    },
    {
      id: '3',
      firstName: 'Linux',
      lastName: 'Torvalds'
    }
  ]
  
  const carsArray = [
    {
      id: '1',
      year: '2019',
      make: 'Toyota',
      model: 'Corolla',
      price: '40000',
      personId: '1'
    },
    {
      id: '2',
      year: '2018',
      make: 'Lexus',
      model: 'LX 600',
      price: '13000',
      personId: '1'
    },
    {
      id: '3',
      year: '2017',
      make: 'Honda',
      model: 'Civic',
      price: '20000',
      personId: '1'
    },
    {
      id: '4',
      year: '2019',
      make: 'Acura ',
      model: 'MDX',
      price: '60000',
      personId: '2'
    },
    {
      id: '5',
      year: '2018',
      make: 'Ford',
      model: 'Focus',
      price: '35000',
      personId: '2'
    },
    {
      id: '6',
      year: '2017',
      make: 'Honda',
      model: 'Pilot',
      price: '45000',
      personId: '2'
    },
    {
      id: '7',
      year: '2019',
      make: 'Volkswagen',
      model: 'Golf',
      price: '40000',
      personId: '3'
    },
    {
      id: '8',
      year: '2018',
      make: 'Kia',
      model: 'Sorento',
      price: '45000',
      personId: '3'
    },
    {
      id: '9',
      year: '2017',
      make: 'Volvo',
      model: 'XC40',
      price: '55000',
      personId: '3'
    }
  ]

  const typeDefs = gql`
    type People {
        id: String
        firstName: String
        lastName: String
    }

    type Car {
        id: String
      year: Int
      make: String
      model: String
      price: Float
      personId: String
    }

    type Query {
        people(id: String!): People
        peoples:[People]
         car(id: String!): Car
         cars:[Car]
         personWithCars(personId: String!): [Car]
    }

    type Mutation {
        addPeople( id: String!, firstName: String!, lastName: String!): People
        updatePeople(id: String!, firstName: String, lastName: String): People
        removePeople(id: String!): People

         addCar(id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
         updateCar(id: String!, year: Int, make: String, model: String, price: Float, personId: String): Car
         removeCar(id: String!): Car
    }
  `

  const resolvers = {
    Query: {
        peoples: () => peopleArray,
        people: (root, args) => {
            const people = find(peopleArray, { id: args.id })
            return people
        },
        cars: () => carsArray,
        car: (root, args) => {
            const car = find(carsArray, { id: args.id })
            return car
        },
        personWithCars: (root, args) => {
          return carsArray.filter(car => car.personId == args.personId)
        } 
    },
    Mutation: {
        addPeople: (root, args) => {
            const newPeople = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
              }
              peopleArray.push(newPeople)

              return newPeople
        },
        updatePeople: (root, args) => {
            const people = find(peopleArray, { id: args.id })
            if (!people) throw new Error(`There is not such person id: ${args.id}`)

            people.firstName = args.firstName
            people.lastName = args.lastName

            return people
        },

        removePeople: (root, args) => {
            const removedPeople = find(peopleArray, { id: args.id })
      
            if (!removedPeople) throw new Error(`There is no such person by id: ${args.id}`)
      
            remove(peopleArray, c => {
              return c.id === removedPeople.id
            })
      
            return removedPeople
          },

        addCar: (root, args) => {
            const newCar = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId
              }
              carsArray.push(newCar)

              return newCar
        },
        updateCar: (root, args) => {
            const car = find(carsArray, { id: args.id })
            if (!car) throw new Error(`There is not such car id: ${args.id}`)

            car.year = args.year,
            car.make = args.make,
            car.model = args.model,
            car.price = args.price,
            car.personId = args.personId

            return car
        },
        removeCar: (root, args) => {
            const removedCar = find(carsArray, { id: args.id })
      
            if (!removedCar) throw new Error(`There is no such car by id ${args.id}`)
      
            remove(carsArray, c => {
              return c.id === removedCar.id
            })

            return removedCar
          },
    }
  }
  export { typeDefs, resolvers }
  