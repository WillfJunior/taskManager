const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const importTasksFromCSV = require('../utils/csvImporter');
const Task = require('../models/task');

const tasksFilePath = path.join(__dirname, '../../tasks.json');

// Função para ler as tarefas do arquivo JSON
function readTasksFromFile() {
  const data = fs.readFileSync(tasksFilePath, 'utf8');
  return JSON.parse(data);
}

// Função para escrever as tarefas no arquivo JSON
function writeTasksToFile(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

exports.importTasks = async (req, res) => {
    try {
      const filePath = req.file.path;
      const delimiter = req.body.delimiter || ',';
      const importedTasks = await importTasksFromCSV(filePath, delimiter);
      let tasks = readTasksFromFile();
      tasks = tasks.concat(importedTasks.map(task => ({ ...task, id: uuidv4() })));
      writeTasksToFile(tasks);
      res.status(200).send({ message: 'Tasks imported successfully', tasks });
    } catch (error) {
      res.status(500).send({ message: 'Error importing tasks', error });
    }
  };

exports.getTasks = (req, res) => {
  const tasks = readTasksFromFile();
  res.status(200).send(tasks);
};

exports.createTask = (req, res) => {
  const { id, title, description } = req.body;
  const newTask = new Task(uuidv4(), title, description, new Date(),null, null);
  const tasks = readTasksFromFile();
  tasks.push(newTask);
  writeTasksToFile(tasks);
  res.status(201).send(newTask);
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  let tasks = readTasksFromFile();
  tasks = tasks.filter(task => task.id !== id);
  writeTasksToFile(tasks);
  res.status(200).send({ message: 'Task deleted successfully' });
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const tasks = readTasksFromFile();
  const task = tasks.find(task => task.id === id);
  
  
  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.updated_at = new Date();
    writeTasksToFile(tasks);
    res.status(200).send(task);
  } else {
    res.status(404).send({ message: 'Task not found' });
  }
};

exports.completeTask = (req, res) => {
  const { id } = req.params;
  const tasks = readTasksFromFile();
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed_at = new Date();
    writeTasksToFile(tasks);
    res.status(200).send(task);
  } else {
    res.status(404).send({ message: 'Task not found' });
  }
};
