import { test, expect } from '@playwright/test';
import { SignUpPage } from './pages/SignUpPage';
import { ProtectedPage } from './pages/ProtectedPage';
import { makeEmail } from './utils/data';

test('New User Signup - short', async ({ page }) => {
    const sitepass = new ProtectedPage(page);
    const signup = new SignUpPage(page);

    await sitepass.passwordProtectionSignup();
    await page.waitForTimeout(2000);

    await signup.helpCentre();

    const email = makeEmail();
    await signup.signupOptionInfo('Tim', email);
    
})