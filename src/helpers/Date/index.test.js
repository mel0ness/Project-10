/**
 * 
 */
import { getMonth } from ".";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const test = getMonth(new Date("2022-01-01T20:28:45.744Z"))

            expect(test).toBe("janvier")
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const test2 = getMonth(new Date("2022-07-08T20:28:45.744Z"))

            expect(test2).toBe("juillet")
        });
    });
})
