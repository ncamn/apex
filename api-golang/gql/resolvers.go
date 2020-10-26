package gql

import (
	"context"
	"log"

	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Resolver struct holds a connection to our database
type Resolver struct {
	db *mongo.Database
}

// UserResolver resolves through a call to MongoDB
func (r *Resolver) UserResolver(p graphql.ResolveParams) (interface{}, error) {
	// Strip the name from arguments and assert that it's a string
	firstName, ok := p.Args["firstName"].(string)

	if ok {
		var users []*User

		filter := bson.D{
			{Key: "firstName", Value: firstName},
		}

		cur, _ := r.db.Collection("users").Find(context.TODO(), filter)

		for cur.Next(context.TODO()) {

			// Create a value into which the single document can be decoded
			var user User
			err := cur.Decode(&user)
			if err != nil {
				log.Fatal(err)
			}

			users = append(users, &user)
		}

		if err := cur.Err(); err != nil {
			log.Fatal(err)
		}

		return users, nil
	}

	return nil, nil
}

// BankAccountResolver resolves through a call to MongoDB
func (r *Resolver) BankAccountResolver(p graphql.ResolveParams) (interface{}, error) {
	var bankAccounts []*BankAccount

	filter := bson.D{}

	cur, _ := r.db.Collection("bankAccounts").Find(context.TODO(), filter)

	for cur.Next(context.TODO()) {

		// Create a value into which the single document can be decoded
		var bankAccount BankAccount
		err := cur.Decode(&bankAccount)
		if err != nil {
			log.Fatal(err)
		}

		bankAccounts = append(bankAccounts, &bankAccount)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	return bankAccounts, nil
}

// ExpenseResolver resolves through a call to MongoDB
func (r *Resolver) ExpenseResolver(p graphql.ResolveParams) (interface{}, error) {
	var expenses []*Expense

	filter := bson.D{}

	cur, _ := r.db.Collection("expenses").Find(context.TODO(), filter)

	for cur.Next(context.TODO()) {

		// Create a value into which the single document can be decoded
		var expense Expense
		err := cur.Decode(&expense)
		if err != nil {
			log.Fatal(err)
		}

		expenses = append(expenses, &expense)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	return expenses, nil
}
