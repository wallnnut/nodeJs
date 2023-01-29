const yargs = require("yargs");
const { printNotes, addNote, removeNote } = require("./notes.controller");

yargs.command({
	command: "add",
	describe: "Add new note to list",
	builder: {
		title: {
			type: "string",
			describe: "Note title",
			demandOption: true,
		},
	},

	handler({ title }) {
		addNote(title);
	},
});
yargs.command({
	command: "remove",
	describe: "remove task by Id",
	builder: {
		id: {
			type: "string",
			describe: "note id",
			demandOption: true,
		},
	},
	handler({ id }) {
		removeNote(id);
	},
});

yargs.command({
	command: "list",
	describe: "Print all notes",
	async handler() {
		printNotes();
	},
});

yargs.parse();
