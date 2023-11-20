let database = require("../database");

console.log(database.cindy.reminders[0])
let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id
    let completed = false
    if (req.body.completed == "true") {
      completed = true
    }
    let reminder = {
      id: reminderToFind,
      title: req.body.title,
      description: req.body.description,
      completed: completed
    }
    database.cindy.reminders[reminderToFind - 1] = reminder
    res.redirect("/reminder/" + reminderToFind)
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    database.cindy.reminders = database.cindy.reminders.filter(reminder => reminder != searchResult)
    for (let i = 1; i <= database.cindy.reminders.length; i++) {
      database.cindy.reminders[i-1].id = i
    }
    res.redirect("/reminders")
  },
};

module.exports = remindersController;
