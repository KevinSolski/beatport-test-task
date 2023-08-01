import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
    constructor() {
    }

    getRandomElementFromArray(array) {
        if (array.length === 0) {
            return undefined;
        }
        return array[Math.floor(Math.random() * array.length)];
    }

    getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
