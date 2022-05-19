import React, { useState, useEffect } from "react";
import "./App.css";
import PiriForm from "./components/PiriForm";
import PiriList from "./components/PiriList";
import axios from "axios";

function App() {
	const [todos, setTodos] = useState([]);

	const getTodos = async () => {
		const { data } = await axios.get("http://localhost:5000/todos");
		setTodos(data);
		console.log(data);
	};

	const addTodo = async (input) => {
		const respons = await axios.post("http://localhost:5000/todos", {
			text: input,
		});
		console.log(respons);
		if (respons.status === 201) {
			getTodos();
		}
	};

	const removeTodos = async (e) => {
		const id = e.currentTarget.value;
		const index = todos.findIndex((item) => {
			return item.id === id;
		});
		if (index < 0) return;
		await axios.delete(`http://localhost:5000/todos/${id}`);
		todos.splice(index, 1);
		setTodos([...todos]);
	};

	const checkTodo = async (e) => {
		const id = e.currentTarget.value;
		const item = todos.find((item) => {
			return item.id === id;
		});
		if (!item) return;
		const isCompleted = !item.isCompleted;
		const completedAt = isCompleted ? Date.now() : 0;
		await axios.patch(`http://localhost:5000/todos/${id}`, {
			isCompleted,
			completedAt,
		});
		item.isCompleted = isCompleted;
		item.completedAt = completedAt;
		setTodos([...todos]);
		console.log(item);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="App">
			<h1 className="title">Piri Todo List</h1>
			<PiriForm onSubmit={addTodo} />
			<PiriList
				items={todos}
				removeListItem={removeTodos}
				checkListItem={checkTodo}
			/>
		</div>
	);
}

export default App;
