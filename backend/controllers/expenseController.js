const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;

    try {
        const expense = await Expense.create({
            user: req.user,
            title,
            amount,
            category,
            date,
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user });

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};