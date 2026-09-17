## Abstraction in JavaScript

### 1. What is Abstraction?

**Abstraction = expose WHAT an object can do and hide HOW it does it.**

Example:

```js
myCar.accelerate();
```

We only need to know that the car can accelerate. We don't need to know the internal implementation.

---

### 2. `Car` class

```js
class Car {
    startEngine() {
        throw new Error("startEngine() must be implemented");
    }

    accelerate() {
        throw new Error("accelerate() must be implemented");
    }
}
```

- `Car` acts as an **abstract/base class**.
- It defines the operations that a car should provide.
- It focuses on **WHAT** a car can do.
- JavaScript doesn't have true abstract classes, so throwing an error is a common pattern to force subclasses to implement methods.
- `Car` itself can technically still be instantiated in JavaScript.

---

### 3. `SportsCar` class

```js
class SportsCar extends Car {
```

- `SportsCar` inherits from `Car`.
- It provides the actual implementation of the methods.
- It defines **HOW** those operations work.

Example:

```js
accelerate() {
    this.currentSpeed += 20;
}
```

`Car` says:

```text
A car must be able to accelerate.
```

`SportsCar` says:

```text
This is how my sports car accelerates.
```

---

### 4. Object creation

```js
const myCar = new SportsCar("Ford", "Mustang");
```

Creates an actual `SportsCar` object.

Its state includes:

```text
brand = Ford
model = Mustang
isEngineOn = false
currentSpeed = 0
currentGear = 0
```

---

### 5. Using the object

```js
myCar.startEngine();
myCar.shiftGear(1);
myCar.accelerate();
myCar.brake();
myCar.stopEngine();
```

The outside code only calls simple methods.

It doesn't need to know their internal implementation.

---

### 6. Where is the abstraction?

```text
             WHAT
              ↓
        ┌─────────────┐
        │    Car      │
        ├─────────────┤
        │ startEngine │
        │ shiftGear   │
        │ accelerate  │
        │ brake       │
        │ stopEngine  │
        └──────┬──────┘
               │
               ↓
             HOW
               ↓
        ┌─────────────┐
        │ SportsCar   │
        ├─────────────┤
        │ actual      │
        │ implementation│
        └─────────────┘
```

**Remember:**

> `Car` defines **WHAT** a car can do.  
> `SportsCar` defines **HOW** it does it.

### Key takeaway

**Abstraction hides unnecessary implementation details from the code that uses an object and exposes only the operations that code needs.**
