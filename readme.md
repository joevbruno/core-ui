# Core UI
Core UI is a dead-simple wrapper around your (React) component library, which aims to provide two benefits: simple, flat paths for import statements and 'switchable' presentational components. By abstracting away and decoupling your controls or base React component library of choice (whether that is an in-house library of components or a vendor library like MaterialUI or React-Toolbox) from the 'higher order components,' which depend upon them, you create a cleaner separation between your logic and presentational view layers, allowing you to more easily switch component libraries without needing to modify paths or references within the import statements of your higher order components. This approach remains particularly useful for migrating or extending control suites within existing applications or moving between web-based libs and React Native libs.

On [npm](https://www.npmjs.com/package/core-ui)
On [github](https://github.com/joevbruno/core-ui)

# Usage 

### Step 1: Create Config

```
npm install --save core-ui

```

Imagine a file with a path of `utils/config.js` that look like this:

```
import { registerComponents } from 'core-ui';
import AppBar from 'react-toolbox/lib/app_bar';
import Autocomplete from 'some/other/place/or/the/same/place/locally/or/in/node_modules';

// ...
// other 'core' components
// ...

// now build an object with all your components
// you could imagine this being in an if block that is set dynamically based upon an ENV variable
// or more simply requiring a separate file
const appUI = {
  AppBar,
  Autocomplete,
};

// now register the components
registerComponents(appUI);
```


### Step #2: Require the file in your main 'app.js' or 'index.js' file

```
import AppComponents from './utils/config';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
...

```

### Step #3: Profit

Now we can easily require our components.

```
import React from 'react';
import { AppBar}  from 'core-ui';
import { NavMenu }  from 'core-ui';
import { Hamburger } from 'core-ui';

...

export default class Navigation extends React.Component {
  static propTypes = {
    navigationLinks: React.PropTypes.array
  };
  constructor(...args) {
    super(...args);
    this.state = {
      isHamburgerActive: false,
      isDrawerActive: false
    };
  }
  toggleOffCanvasNav = () => {
    this.setState({
      isHamburgerActive: !this.state.isHamburgerActive,
      isDrawerActive: !this.state.isDrawerActive
    });
  };
  render() {
    return (
      <AppBar className={style.appbar}>
        <NavMenu
          isDrawerActive={this.state.isDrawerActive}
          onOverlayClick={this.toggleOffCanvasNav}
          links={links} />
        <Hamburger
          isActive={this.state.isHamburgerActive}
          handleClick={this.toggleOffCanvasNav} />
      </AppBar>
    );
  }
}

```
### Step #4: Time Changes All Things

Once upon a time, a team decided to make a change. Someone wrote a killer new AppBar component (probably not, but you could imagine something like a table or multiselect control here), and it was decided that it was time to introduce this new control. 

Modify `utils/config.js`:

```
import AppBar from 'SOME/NEW/LOCATION';

// everything else is the same!
// if the new control has a different API, simply import a file that wraps the new control and provides a bridge to the new component by accepting new props, making modifications and passing those new props to the new component.

```

### Step #5: Repeat as Needed.
Sweet!


# TODO 
 + Add example
 + Add tests

# Contribute
Please contribute. If you can make this better, submit a PR.
