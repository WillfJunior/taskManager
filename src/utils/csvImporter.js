const fs = require('fs');
const csv = require('csv-parser');
const Task = require('../models/task');
const { delimiter } = require('path');

function importTasksFromCSV(filePath, delimiter = ',') {
  return new Promise((resolve, reject) => {
    const tasks = [];
    fs.createReadStream(filePath)
      .pipe(csv({separator: delimiter}))
      .on('data', (row) => {
        console.log(row)
        const task = new Task(row.title, row.description);
        task.created_at = new Date();
        task.completed_at = null;
        task.updated_at = null;
        tasks.push(task);
      })
      .on('end', () => {
        resolve(tasks);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = importTasksFromCSV;
