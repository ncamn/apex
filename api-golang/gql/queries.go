package gql

import (
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/mongo"
)

// Root dummy
type Root struct {
	Query *graphql.Object
}

// NewRoot dummy
func NewRoot(db *mongo.Database) *Root {
	resolver := Resolver{db: db}

	root := Root{
		Query: graphql.NewObject(
			graphql.ObjectConfig{
				Name: "Query",
				Fields: graphql.Fields{
					"users": &graphql.Field{
						Type: graphql.NewList(UserTypeDef),
						Args: graphql.FieldConfigArgument{
							"firstName": &graphql.ArgumentConfig{
								Type: graphql.String,
							},
						},
						Resolve: resolver.UserResolver,
					},
					"banksAccount": &graphql.Field{
						Type:    graphql.NewList(BankAccountTypeDef),
						Args:    graphql.FieldConfigArgument{},
						Resolve: resolver.UserResolver,
					},
				},
			},
		),
	}

	return &root
}
