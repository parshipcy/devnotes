## 1. Print in order

### Problem

You are given a class `Foo` with three methods: `first()`, `second()`, and `third()`.

The same instance of `Foo` will be used to call these methods asynchronously. The methods may be called in any order.

Implement a mechanism using JavaScript Promises and `async/await` to ensure that:

1. `second()` executes only after `first()` completes.
2. `third()` executes only after `second()` completes.

Note: We do not know the order in which the methods will be called. Regardless of the calling order, the output must always be:

```
first
second
third
```

### Solution:

```js
class Foo {
    constructor() {
        this.firstPromise = new Promise((resolve) => {
            this.firstDone = resolve;
        });

        this.secondPromise = new Promise((resolve) => {
            this.secondDone = resolve;
        });
    }

    async first(printFirst) {
        printFirst();

        this.firstDone();
    }

    async second(printSecond) {
        await this.firstPromise; // await does not execute the Promise. It waits for the Promise to settle.

        printSecond();

        this.secondDone();
    }

    async third(printThird) {
        await this.secondPromise;

        printThird();
    }
}
```

### Solution Summary

#### 1. Constructor

- `new Foo()` creates a new instance of the `Foo` class.
- The constructor runs automatically when an instance is created.
- `new Promise()` creates a Promise object.
- A Promise represents the completion of an asynchronous operation.
- Initially, a Promise is in the `pending` state.

#### 2. `resolve` function

```
this.firstDone = resolve;
```

- `resolve` is a function provided by the Promise constructor.
- We store it in `this.firstDone` for later use.
- `this.firstDone()` calls that function and changes `firstPromise` to `fulfilled`.
- Similarly, `this.secondDone()` resolves `secondPromise`.

#### 3. `this` keyword

- `this` refers to the current object instance.
- When calling `foo.first()`, `this` inside `first()` refers to `foo`.
- `this.firstPromise` accesses the `firstPromise` property of that instance.
- It does not refer to the `Foo` class itself.

#### 4. `async` keyword

- Declares an asynchronous function.
- An `async` function always returns a Promise.
- It allows us to use `await` inside the function.

#### 5. `await` keyword

- Waits for a Promise to settle.
- If the Promise is pending, only the current async function pauses.
- It does not stop the entire JavaScript program.
- Once the Promise is fulfilled, execution continues after `await`.
- `await` does not execute the Promise. It waits for its result.

#### 6. Execution order

| Method     | What happens                                                            |
| ---------- | ----------------------------------------------------------------------- |
| `first()`  | Prints first, then resolves `firstPromise`.                             |
| `second()` | Waits for `firstPromise`, prints second, then resolves `secondPromise`. |
| `third()`  | Waits for `secondPromise`, then prints third.                           |

#### 7. Important distinction

| Expression                | Meaning                                      |
| ------------------------- | -------------------------------------------- |
| `this.firstPromise`       | Accesses a Promise object.                   |
| `this.firstDone`          | Accesses the stored resolve function.        |
| `this.firstDone()`        | Calls the function and resolves the Promise. |
| `await this.firstPromise` | Waits until the Promise settles.             |
