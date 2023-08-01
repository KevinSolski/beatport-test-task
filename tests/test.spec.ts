import { test, expect } from '@playwright/test';
import { HomePage } from '../src/homePage';
import { ProductPage} from '../src/productPage';
import { PlayerPage } from '../src/playerPage';

test('test', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const playerPage = new PlayerPage(page);

  await homePage.goto();
  await homePage.selectRandomProduct();
  await expect(page).toHaveURL(new RegExp('^https://sounds.loopcloud.com/product/'));

  //select random number of files between 2 and 6
  const randomInteger = productPage.getRandomInteger(2, 6);
  for(let i=0; i<randomInteger; i++) {
    await productPage.selectFile(i);
  }

  await homePage.homeIcon.click();

  await homePage.searchBy('House');
  await homePage.waitForLoading();

  await productPage.freeFilter.click();
  await productPage.selectFile(0);

  await homePage.waitForLoading();
  await playerPage.playerVolume.hover();

  await playerPage.toggleSelectedItemsList();
  await playerPage.openPlaylistItems(2);
  await playerPage.toggleSelectedItemsList();
  await playerPage.clearPlaylistButton.click();

  await homePage.homeIcon.click();
});
