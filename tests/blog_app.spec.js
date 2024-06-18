const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' })
  })

  describe('Login', () => {
    test.only('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('kolibri0509')
      await page.getByTestId('password').fill('kolibri0509')
      await page.getByRole('button', { name: 'log in' }).click()
      await expect(page.getByText('kolibri0509 logged in')).toBeVisible()
    })

    test.only('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('wrong')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'log in' }).click()
    
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    
      await expect(page.getByText('kolibri0509 logged in')).not.toBeVisible()
    })
  })
})