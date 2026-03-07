export class RewardsPage {
  constructor(page) {
    this.page = page;
    this.rewardsLink = page
      .getByRole('link', { name: /Rewards/i })
      .or(page.getByRole('link', { name: /History|Transaction History/i }));
  }

  async open() {
    await this.rewardsLink.first().click();
  }
}
