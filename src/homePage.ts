import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
    readonly page: Page;
    readonly productCarouselsSelector: String;
    readonly productSelector: String;
    readonly searchBar: Locator;
    readonly searchIcon: Locator;
    readonly homeIcon: Locator;
    readonly loadingIcon: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.productCarouselsSelector = 'css=.carousel';
        this.productSelector = 'css=._ItemTile';
        this.searchBar = this.page.locator('#SearchInput');
        this.searchIcon = this.page.locator('#loupe');
        this.homeIcon = this.page.locator('.desktop-only > a > img');
        this.loadingIcon = this.page.locator('.item-loader');
    }

    async goto() {
        await this.page.goto('https://sounds.loopcloud.com');
        await this.page.waitForLoadState('networkidle', { timeout: 50000 });
    }

    async selectRandomProduct(){
        const allElements = await this.page.locator(this.productSelector).all();
        const randomElement = await this.getRandomElementFromArray(allElements.slice(0,5));
        await randomElement.click();
    }

    async searchBy(searchText) {
        await this.searchBar.first().fill(searchText);
        await this.searchIcon.first().click();
    }

    async waitForLoading(){
        await expect(this.loadingIcon).not.toBeVisible({timeout: 30000});
    }
}
