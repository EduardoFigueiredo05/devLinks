import { test, expect } from '@playwright/test'

const STORAGE_KEY = 'devlinks:theme'

test.describe('DevLinks', () => {
  test('renderiza perfil, links, redes sociais e rodapé', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('img', { name: 'Foto de perfil' })).toBeVisible()
    await expect(page.getByTestId('username')).toHaveText('@seu.perfil')

    const links = page.getByRole('navigation', { name: 'Links principais' }).getByRole('link')
    await expect(links).toHaveCount(4)
    await expect(links.first()).toHaveText('Inscreva-se no meu Curso')

    for (const name of ['GitHub', 'Instagram', 'YouTube', 'LinkedIn']) {
      await expect(page.getByRole('link', { name })).toBeVisible()
    }

    await expect(page.locator('footer')).toContainText('Feito com')
  })

  test('links externos abrem em nova aba com segurança', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: 'Baixe meu e-book' })
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
  })

  test('usa o tema escuro quando o sistema prefere escuro', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page.getByTestId('theme-toggle')).toHaveAttribute('aria-checked', 'false')
  })

  test('alterna entre claro e escuro ao clicar no switch', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    const html = page.locator('html')
    const toggle = page.getByTestId('theme-toggle')

    await toggle.click()
    await expect(html).not.toHaveClass(/dark/)
    await expect(toggle).toHaveAttribute('aria-checked', 'true')

    await toggle.click()
    await expect(html).toHaveClass(/dark/)
    await expect(toggle).toHaveAttribute('aria-checked', 'false')
  })

  test('salva a preferência no localStorage e mantém após recarregar', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')

    await page.getByTestId('theme-toggle').click()
    const saved = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)
    expect(saved).toBe('"light"')

    await page.reload()
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    await expect(page.getByTestId('theme-toggle')).toHaveAttribute('aria-checked', 'true')
  })

  test('ignora valor inválido salvo no localStorage', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.addInitScript((key) => localStorage.setItem(key, '"roxo"'), STORAGE_KEY)
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('não gera rolagem horizontal (layout responsivo)', async ({ page }) => {
    await page.goto('/')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflow).toBe(false)
  })
})
