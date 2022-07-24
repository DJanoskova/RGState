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
export const PostsState = createGlobalState([]);

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

### See a demo in StackBlitz editor:

https://stackblitz.com/edit/react-ofmsdv?file=src/index.js

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
- `useGlobalSetter` to get the static setter only
- `useGlobalGetter` to get the reactive value only

### createGlobalState

- Initialize RGState like React's context, using `createGlobalState` and providing a default value

```js
import { createGlobalState } from 'rgstate';

export const PostsState = createGlobalState([]);
```
_state.js_

```typescript
import { createGlobalState } from 'rgstate';

export const PostsState = createGlobalState<{ id: number; name: string; }[]>([]);
```
_state.ts_

### useGlobalState

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
    - a function, which provides you with the current value and current state as parameters, very similar to React's useState API

```js
setPosts([{ id: 1, name: 'New Post' }])
```

```js
setPosts((previousPosts, previousGlobalState) => {
    const newPosts = [...previousPosts]
    newPosts.slice(0, 1)
    return newPosts
})
```

### useGlobalGetter

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

As you introduce global states, global setters and global getters throughout your App, the values are stored in the same place. The setter accepts a function as a parameter and this function exposes the current value related to the setter as a first parameter, and the global state value as a second parameter.

No matter how much you scale your app and how much global state properties you add, the implementation stays this simple.