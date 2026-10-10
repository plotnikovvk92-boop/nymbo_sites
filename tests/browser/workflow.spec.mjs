import {test,expect} from '@playwright/test';
test('preferences → menu → single replacement → shopping → store → chef request → persistence',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('.hero')).toBeVisible();
 await page.locator('#nav [data-route="tastes"]').click();await page.locator('[data-id="dumplings"][data-value="like"]').click();await expect(page.locator('[data-id="dumplings"][data-value="like"]')).toHaveAttribute('aria-pressed','true');
 await page.locator('#main [data-action="generate"]').click();await expect(page.locator('[data-row]')).toHaveCount(3);
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('nymbo-v1')).menu);const row=before.find(r=>r.meal==='Обед');expect(row.dishId).toBe('dumplings');
 await page.locator(`[data-action="replacement"][data-id="${row.id}"]`).click();await page.locator('#modal [data-action="replace"]').first().click();
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('nymbo-v1')).menu);expect(after.find(r=>r.id===row.id).dishId).not.toBe(row.dishId);expect(after.filter(r=>r.id!==row.id)).toEqual(before.filter(r=>r.id!==row.id));
 await page.locator('[data-change="portions"]').first().fill('3');await page.locator('[data-change="portions"]').first().press('Tab');expect((await page.evaluate(()=>JSON.parse(localStorage.getItem('nymbo-v1')).menu))[0].portions).toBe(3);
 await page.locator('#nav [data-route="shopping"]').click();const homeId=await page.locator('[data-change="home"]').first().getAttribute('data-id');await page.locator('[data-change="home"]').first().check();
 await page.locator('#manual-form [name="name"]').fill('Питьевая вода');await page.locator('#manual-form [name="quantity"]').fill('2');await page.locator('#manual-form button').click();await expect(page.getByText('Питьевая вода',{exact:true})).toBeVisible();
 await page.locator('[data-change="store"][value="perekrestok"]').check();await page.locator('[data-action="order"]').click();await expect(page.locator('#modal')).toContainText('Ни один товар не сопоставлен');
 const homeName=await page.locator(`[data-change="home"][data-id="${homeId}"]`).locator('..').locator('.product strong').textContent();await expect(page.locator('#modal .order-item')).not.toContainText([homeName]);
 await page.locator('#modal [data-action="close-modal"]').click();
 const download=page.waitForEvent('download');await page.locator('#main [data-action="export"]').click();expect((await download).suggestedFilename()).toBe('Nymbo-покупки.txt');
 await page.locator('#nav [data-route="chefs"]').click();await page.locator('[data-action="book"]').first().click();await page.locator('#booking-form button').click();await expect(page.getByText('Сохранена в демо · бронирование не подтверждено',{exact:true})).toBeVisible();
 await page.reload();expect((await page.evaluate(()=>JSON.parse(localStorage.getItem('nymbo-v1')).requests)).length).toBe(1);
 await page.locator('#nav [data-route="chat"]').click();await page.locator('#chat-form input').fill('Меню на неделю для двоих');await page.locator('#chat-form button').click();expect((await page.evaluate(()=>JSON.parse(localStorage.getItem('nymbo-v1')).menu)).length).toBe(21);
 await page.locator('#chat-form input').fill('<img src=x onerror=alert(1)>');await page.locator('#chat-form button').click();await expect(page.locator('.message.user img')).toHaveCount(0);
 await page.locator('#settings-form [name="allergies"][value="яйца"]').check();await page.locator('#settings-form button[type="submit"]').click();await page.locator('#nav [data-route="shopping"]').click();await expect(page.locator('[data-action="order"]')).toBeDisabled();
 expect(errors).toEqual([]);
});
test('all routes and navigation fit mobile viewport; local photos load',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 for(const route of ['chat','tastes','menu','shopping','chefs','profile']){await page.locator(`#nav [data-route="${route}"]`).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.locator('#nav [data-route="tastes"]').click();
 for(const img of await page.locator('#main img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}
});
test('blocked generation preserves existing menu and explains the failure',async({page})=>{
 await page.goto('/#menu');await page.locator('#main [data-action="generate"]').click();await expect(page.locator('[data-row]')).toHaveCount(3);
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('nymbo-v1')).menu);
 await page.locator('#settings-form [name="budget"]').fill('50');await page.locator('#settings-form button[type="submit"]').click();await page.locator('#main [data-action="generate"]').click();await expect(page.locator('#main [role="alert"]')).toContainText('минимальная стоимость');expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('nymbo-v1')).menu)).toEqual(before);
});
