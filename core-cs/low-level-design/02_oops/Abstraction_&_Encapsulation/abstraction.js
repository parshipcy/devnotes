class Car {
    startEngine() {
        throw new Error("startEngine() must be implemented");
    }

    shiftGear(gear) {
        throw new Error("shiftGear() must be implemented");
    }

    accelerate() {
        throw new Error("accelerate() must be implemented");
    }

    brake() {
        throw new Error("brake() must be implemented");
    }

    stopEngine() {
        throw new Error("stopEngine() must be implemented");
    }
}


class SportsCar extends Car {
    constructor(brand, model) {
        super();

        this.brand = brand;
        this.model = model;
        this.isEngineOn = false;
        this.currentSpeed = 0;
        this.currentGear = 0;
    }

    startEngine() {
        this.isEngineOn = true;
        console.log(
            `${this.brand} ${this.model} : Engine starts with a roar!`
        );
    }

    shiftGear(gear) {
        if (!this.isEngineOn) {
            console.log(
                `${this.brand} ${this.model} : Engine is off! Cannot Shift Gear.`
            );
            return;
        }

        this.currentGear = gear;

        console.log(
            `${this.brand} ${this.model} : Shifted to gear ${this.currentGear}`
        );
    }

    accelerate() {
        if (!this.isEngineOn) {
            console.log(
                `${this.brand} ${this.model} : Engine is off! Cannot accelerate.`
            );
            return;
        }

        this.currentSpeed += 20;

        console.log(
            `${this.brand} ${this.model} : Accelerating to ${this.currentSpeed} km/h`
        );
    }

    brake() {
        this.currentSpeed -= 20;

        if (this.currentSpeed < 0) {
            this.currentSpeed = 0;
        }

        console.log(
            `${this.brand} ${this.model} : Braking! Speed is now ${this.currentSpeed} km/h`
        );
    }

    stopEngine() {
        this.isEngineOn = false;
        this.currentGear = 0;
        this.currentSpeed = 0;

        console.log(
            `${this.brand} ${this.model} : Engine turned off.`
        );
    }
}


// Main
const myCar = new SportsCar("Ford", "Mustang");

myCar.startEngine();
myCar.shiftGear(1);
myCar.accelerate();
myCar.shiftGear(2);
myCar.accelerate();
myCar.brake();
myCar.stopEngine();
