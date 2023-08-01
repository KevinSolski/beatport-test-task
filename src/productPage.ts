import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from "./basePage";

export class ProductPage extends BasePage {
    readonly page: Page;
    readonly filesSelector: String;
    readonly addFileSelector: String;
    readonly freeFilter: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.filesSelector = 'css=.productItem';
        this.addFileSelector = 'css=div[title="Click to add to selection"]';
        this.freeFilter = this.page.locator('//div[text()="FREE"]');
    }

    async selectFile(index) {
        await this.page.waitForSelector(this.filesSelector);
        const allFiles = await this.page.locator(this.filesSelector).all();
        await allFiles[index].locator(this.addFileSelector).click();

        await expect(allFiles[index]).toHaveClass(/productChecked/);
    }
}
