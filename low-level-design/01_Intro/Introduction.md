# LLD, DSA & HLD

## 1. What is LLD?

**LLD (Low-Level Design)** means designing the **internal structure of an application**.

It answers:

* What **classes/objects** do we need?
* What are their **responsibilities**?
* How do they **interact**?
* Where do algorithms/DSA fit?

> **LLD = Skeleton of the application**

---

## 2. DSA vs LLD

### DSA

DSA solves a **specific computational problem**.

Example:

> "Find the shortest route between two locations."

We might use **Dijkstra's algorithm**.

### LLD

LLD decides **where and how that algorithm belongs inside the application**.

For a ride-booking app:

```text
Ride
 ├── Rider
 ├── Driver
 ├── Location
 ├── Payment
 └── NotificationService
```

Then:

```text
Location → RouteService → Dijkstra's Algorithm
Driver   → MatchingService → Min Heap
```

So:

> **DSA solves the problem.**
> **LLD organizes the application around the problem.**

---

## 3. Example: Ride Booking App

Suppose we are building an Uber-like app.

### DSA-first thinking

We immediately think:

* City → Graph
* Shortest route → Dijkstra
* Closest driver → Min Heap

This solves individual problems, but doesn't define the application structure.

### LLD-first thinking

First identify the objects:

```text
User
Rider
Driver
Location
Ride
PaymentGateway
NotificationService
```

Then define how they interact:

```text
Rider
  ↓
Ride
  ↓
Driver

Ride → PaymentGateway
Ride → NotificationService
Location → RouteService
```

Then use DSA where needed:

```text
RouteService → Dijkstra
MatchingService → Min Heap
```

---

## 4. Main Goals of LLD

### Scalability

The code should be easy to extend as the application grows.

Example:

```text
PaymentGateway
      ↓
Stripe
Razorpay
PayPal
```

Adding another payment provider should not require rewriting the whole application.

### Maintainability

Changes and bug fixes should be easy.

```text
NotificationService
        ↓
Email / SMS / Push
```

Changing SMS logic should not break payment logic.

### Reusability

Components should be reusable in different applications.

Example:

```text
NotificationService
```

can potentially be reused in:

* Uber
* Zomato
* Amazon
* Swiggy

---

## 5. LLD vs HLD

|                        | LLD                         | HLD                        |
| ---------------------- | --------------------------- | -------------------------- |
| Focus                  | Code structure              | System architecture        |
| Main concern           | Classes & objects           | Services & infrastructure  |
| Example                | `Ride`, `Driver`, `Payment` | Servers, DB, Load Balancer |
| DSA                    | Used inside components      | Usually not the focus      |
| Database choice        | Usually not the main focus  | Important                  |
| Scaling infrastructure | Not the main focus          | Important                  |

### Simple example

**LLD:**

```text
Ride
 ├── Rider
 ├── Driver
 └── Payment
```

**HLD:**

```text
Users
  ↓
Load Balancer
  ↓
API Servers
  ↓
Database
  ↓
Redis / Message Queue
```

---

## 6. Easy Way to Remember

Think of an application as a human body:

```text
DSA → Brain
LLD → Skeleton
HLD → Entire body + infrastructure
```

### In one line:

> **DSA = How to solve a specific problem**
> **LLD = How to organize the code/classes to solve the problem**
> **HLD = How to build and run the entire system at scale**
