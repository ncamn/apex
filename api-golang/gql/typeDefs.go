package gql

import "github.com/graphql-go/graphql"

// Date scalar
var Date = graphql.NewScalar(
	graphql.ScalarConfig{
		Name: "Date",
	},
)

// UserTypeDef type definition
var UserTypeDef = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "User",
		Fields: graphql.Fields{
			"_id": &graphql.Field{
				Type: graphql.ID,
			},
			"firstName": &graphql.Field{
				Type: graphql.String,
			},
			"email": &graphql.Field{
				Type: graphql.String,
			},
			"password": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)

// BankAccountTypeDef type definition
var BankAccountTypeDef = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "BankAccount",
		Fields: graphql.Fields{
			"_id": &graphql.Field{
				Type: graphql.ID,
			},
			"name": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)

// ExpenseTypeDef type definition
var ExpenseTypeDef = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Expense",
		Fields: graphql.Fields{
			"_id": &graphql.Field{
				Type: graphql.ID,
			},
			"label": &graphql.Field{
				Type: graphql.String,
			},
			"value": &graphql.Field{
				Type: graphql.Float,
			},
			"date": &graphql.Field{
				Type: Date,
			},
		},
	},
)

// RecurringExpenseTypeDef type definition
var RecurringExpenseTypeDef = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "RecurringExpense",
		Fields: graphql.Fields{
			"_id": &graphql.Field{
				Type: graphql.ID,
			},
			"label": &graphql.Field{
				Type: graphql.String,
			},
			"value": &graphql.Field{
				Type: graphql.Float,
			},
			"start": &graphql.Field{
				Type: Date,
			},
			"end": &graphql.Field{
				Type: Date,
			},
		},
	},
)

// IncomeTypeDef type definition
var IncomeTypeDef = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Income",
		Fields: graphql.Fields{
			"_id": &graphql.Field{
				Type: graphql.ID,
			},
			"label": &graphql.Field{
				Type: graphql.String,
			},
			"value": &graphql.Field{
				Type: graphql.Float,
			},
			"date": &graphql.Field{
				Type: Date,
			},
		},
	},
)

// RecurringIncomeTypeDef type definition
var RecurringIncomeTypeDef = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "RecurringIncome",
		Fields: graphql.Fields{
			"_id": &graphql.Field{
				Type: graphql.ID,
			},
			"label": &graphql.Field{
				Type: graphql.String,
			},
			"value": &graphql.Field{
				Type: graphql.Float,
			},
			"start": &graphql.Field{
				Type: Date,
			},
			"end": &graphql.Field{
				Type: Date,
			},
		},
	},
)
