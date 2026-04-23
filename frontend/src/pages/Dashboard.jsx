import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
    });

    const fetchExpenses = async () => {
        try {
            const { data } = await API.get("/expenses");
            setExpenses(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const addExpense = async (e) => {
        e.preventDefault();

        try {
            await API.post("/expenses", form);
            fetchExpenses();
        } catch (err) {
            alert("Error adding expense");
        }
    };

    return (
        <div className="dashboard">
            <h2>Your Expenses</h2>

            <form onSubmit={addExpense} className="expense-form">
                <input
                    placeholder="Title"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
                <input
                    placeholder="Category"
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />

                <button>Add</button>
            </form>

            <div className="expense-list">
                {expenses.map((exp) => (
                    <div key={exp._id} className="expense-card">
                        <h4>{exp.title}</h4>
                        <p>₹{exp.amount}</p>
                        <span>{exp.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;