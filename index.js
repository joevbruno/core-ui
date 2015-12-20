var coreUI = {
  registerComponent: function(name, src) {
    if (coreUI[name]) {
      throw new Error('Component ' + name + ' already exists in coreUI. Use a different name.');
    }
    coreUI[name] = src;
    return coreUI;
  },
  registerComponents: function(obj) {
    Object.keys(obj).map(function(component) {
      coreUI.registerComponent(component, obj[component]);
    });
  },
  getComponents: function() {
    var components = coreUI;
    delete components.registerComponent;
    delete components.registerComponents;
    delete components.getComponents;
    return components;
  } 
};
module.exports = coreUI; 


