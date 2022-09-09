# RGState
 React Global State

```shell
npm install rgstate --save
yarn add rgstate
```

---

## The simplest implementation

```jsx
import React, { useEffect } from 'react';
import { createGlobalState, useGlobalState } from 'rgstate';

// inspired by React.createContext
export const PostsState = createGlobalState([], { name: 'posts' });

export default function App() {
  // inspired by React.useState
  const [posts, setPosts] = useGlobalState(PostsState);

  useEffect(() => {
    const handleFetch = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await result.json();
      setPosts(data);
    };
    handleFetch();
  }, [setPosts]);

  return (
    <div>
      Fetched posts: {posts.length}
    </div>
  );
}
```

And that's all you need!

---

## API

```js
import {
    createGlobalState,
    useGlobalState,
    useGlobalSetter,
    useGlobalGetter
} from 'rgstate';
```

- `createGlobalState` to initialize your global state
- `useGlobalState` to get the `[value, setter]` variables
- `useGlobalSetter` to get the static `setter` only
- `useGlobalGetter` to get the reactive `value` only

### createGlobalState

_createGlobalState&lt;T&gt;(defaultValue: any, params: { name?: string; persist?: boolean }) => GlobalState&lt;T&gt;_

- Initialize RGState like React's context, using `createGlobalState` and providing a default value

```js
import { createGlobalState } from 'rgstate';

export const PostsState = createGlobalState([]);
```

**Custom name** - Recommended 🚨

Provide an optional key name for the internal store. If you skip this, a new uuid will be generated when the global state initializes. This causes issues with application hot reload where you could lose your stored data during development if you don't provide a key name. 

```javascript
export const PostsState = createGlobalState([], { name: 'posts' });
```

**Sync with local storage**

If you want to store your last data shape in your browser storage, use the `persist: true` config option

```javascript
export const PostsState = createGlobalState([], { persist: true });
```

### useGlobalState

_useGlobalState(GlobalState) => [value: T, setter: (handler: GlobalStateSetType&lt;T&gt;) => void]_


- Use it like React's state
- the `useGlobalState` hook returns values provided by `useGlobalGetter` and `useGlobalSetter`

```jsx
import React from 'react';
import { useGlobalState } from 'rgstate';

import { PostsState } from './state';

const App = () => {
  const [posts, setPosts] = useGlobalState(PostsState);
}
```

### useGlobalSetter

_useGlobalSetter(GlobalState) => (handler: GlobalStateSetType&lt;T&gt;) => void_

- In case you only need the setter and don't need the reactivity of the current value, opt in for using `useGlobalSetter`
- The returned method doesn't re-create and therefore it's safe to use it as a `useEffect` or `useCallback` dependency

```jsx
import React from 'react';
import { useGlobalState } from 'rgstate';

import { PostsState } from './state';

const PostDelete = () => {
  const setPosts = useGlobalSetter(PostsState);
}
```

- The setter accepts
    - a value
    - a function, which provides you with the current value as a parameter, very similar to React's useState API

```js
setPosts([{ id: 1, name: 'New Post' }])
```

```js
setPosts((previousPosts) => {
    const newPosts = [...previousPosts]
    newPosts.slice(0, 1)
    return newPosts
})
```

### useGlobalGetter

_useGlobalGetter(GlobalState) => value: T_

- When you don't need the setter and are only concerned about the current reactive value, use `useGlobalGetter`
- The returned value re-creates only when the value is directly changed and it's not affected by other global values changing

```jsx
import React from 'react';
import { useGlobalGetter } from 'rgstate';

import { PostsState } from './state';

const PostDelete = () => {
  const posts = useGlobalGetter(PostsState);
}
```

---

As you introduce global states, global setters and global getters throughout your App, the values are stored in the same place. The setter accepts a function as a parameter and this function exposes the current value related to the setter as a parameter.

No matter how much you scale your app and how much global state properties you add, the implementation stays this simple.