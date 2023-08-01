import { type Locator, type Page } from '@playwright/test';
import { BasePage } from "./basePage";

export class PlayerPage extends BasePage {
    readonly page: Page;
    readonly playerVolume: Locator;
    readonly expandElements: Locator;
    readonly playlistItem: Locator;
    readonly clearPlaylistButton: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.playerVolume = this.page.locator('.player-container * img.volume-icon');
        this.expandElements = this.page.locator('.player * .expand');
        this.playlistItem = this.page.locator('.playlist-item');
        this.clearPlaylistButton = this.page.locator('.action-button > img')
    }

    async toggleSelectedItemsList(){
        await this.expandElements.first().click();
    }

    async openPlaylistItems(count){
        const playlistItems = await this.playlistItem.all();
        for(let i=0; i<count; i++){
            await playlistItems[i].click();
        }
    }
}
