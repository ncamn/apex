package gql

import (
	"time"
)

// User struct
type User struct {
	ID        int
	Email     string
	FirstName string
	Password  string
}

// BankAccount type
type BankAccount struct {
	ID   int
	name string
}

// Expense struct
type Expense struct {
	ID    int
	label string
	value float64
	date  time.Time
}

// RecurringExpense struct
type RecurringExpense struct {
	ID    int
	label string
	value float64
	start time.Time
	end   time.Time
}

// Income struct
type Income struct {
	ID    int
	label string
	value float64
	date  time.Time
}

// RecurringIncome struct
type RecurringIncome struct {
	ID    int
	label string
	value float64
	start time.Time
	end   time.Time
}
