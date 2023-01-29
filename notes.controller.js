const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
	// const notes = require("./db.json");
	// const notes = Buffer.from(buffer).toString("utf-8");
	const notes = await getNotes();
	console.log(notes);
	const note = {
		title,
		id: Date.now().toString(),
	};
	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes));
	console.log(chalk.green.inverse("Запись создана"));
}

async function removeNote(id) {
	const notes = await getNotes();
	const newArrayofNotes = notes.filter((note) => note.id !== id);

	await fs.writeFile(notesPath, JSON.stringify(newArrayofNotes));
	console.log(chalk.red("Запись удалена"));
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
	const notes = await getNotes();
	console.log(chalk.bgRedBright("here is the list of notes"));
	notes.forEach((note) =>
		console.log(chalk.blue(`{id: ${note.id} title: ${note.title}}`))
	);
}

module.exports = {
	addNote,
	printNotes,
	removeNote,
};
