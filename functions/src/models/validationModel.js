module.exports = function() {
  this.add = (field, type, message) => {
    return { field: field, type: type, message: message };
  };
  this.addRequired = field => {
    return this.add(field, "RequiredField", `Field ${field} is required`);
  };
};
