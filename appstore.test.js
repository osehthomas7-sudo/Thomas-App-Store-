// appstore.test.js

describe("Advanced App Store - Basic Tests", () => {
    
    test("Math test to verify test runner works", () => {
        expect(2 + 2).toBe(4);
    });

    test("Sample API data test", () => {
        const sampleApp = {
            id: 1,
            name: "Sample App",
            downloads: 100
        };

        expect(sampleApp).toHaveProperty("name");
        expect(sampleApp.downloads).toBeGreaterThan(0);
