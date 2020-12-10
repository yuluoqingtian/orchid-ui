interface Radio {
    switchRadio(): void
}

interface Battery {
    checkBatteryStatus(): void
}

interface RadioWithBattery extends Radio{
    checkBatteryStatus(): void
}

class Car implements Radio {
    switchRadio() {
        throw new Error("Method not implemented.");
    }

}

class CellPhone implements Radio ,Battery{
    checkBatteryStatus(): void {
        throw new Error("Method not implemented.");
    }
    switchRadio() {
        throw new Error("Method not implemented.");
    }
}

class TV implements RadioWithBattery{
    checkBatteryStatus(): void {
        throw new Error("Method not implemented.");
    }
    switchRadio(): void {
        throw new Error("Method not implemented.");
    }
    
}