class Task {
    constructor(id, title, description,created_at, completed_at,updated_at) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.created_at = created_at;
      this.completed_at = completed_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = Task;