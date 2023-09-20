const chai = require('chai');
const assert = chai.assert;

class Investor {
  constructor() {
    this.balances = {
      balance1: 50000, // Initial balance for stream 1
      balance2: 50000, // Initial balance for stream 2
    };
    this.budgets = {
      budget1: 50000, // Initial budget for stream 1
      budget2: 50000, // Initial budget for stream 2
    };
  }

  // Rebalance the streams
  rebalanceStreams() {
    // Calculate the target budget for each stream when rebalancing
    const totalBudget = Object.values(this.balances).reduce((sum, budget) => sum + budget, 0);
    const targetBudgetPerStream = totalBudget / Object.keys(this.balances).length;

    Object.keys(this.balances).forEach((stream) => {
      // Update the new balance
      this.balances[stream] = targetBudgetPerStream;
    });
  }
}

// Initialize the investor
const investor = new Investor();

// Simulate the process
while (Object.values(investor.balances).every((balance) => balance > 0)) {
  Object.keys(investor.balances).forEach((stream) => {
    // Randomly consume between 2K and 5K
    const consumption = Math.random() * (5000 - 2000) + 2000;

    // Update the balance
    investor.balances[stream] -= consumption;
  });

  // Check if both streams have balance of 0 or less
  if (Object.values(investor.balances).every((balance) => balance <= 0)) {
    console.log('Both streams have exhausted their balance.');
    break;
  }  else if ((investor.balances.balance1 < 0.05 * investor.budgets.budget1) && (investor.balances.balance2 >= 0.05 * investor.budgets.budget2)) {
    // Rebalance budgets
    investor.rebalanceStreams();
    
    console.log('Stream 1 is close to 5%. Rebalancing budgets.');
  } else if ((investor.balances.balance2 < 0.05 * investor.budgets.budget2) && (investor.balances.balance1 >= 0.05 * investor.budgets.budget1)) {
    // Rebalance budgets
    investor.rebalanceStreams();
    
    console.log('Stream 2 is close to 5%. Rebalancing budgets.');
  }

  console.log('Current Stream Balances:', investor.balances);
}

// Unit Tests
describe('Investor', function () {
  it('Test program initialize with the correct budget', function () {
    const investor = new Investor();
    assert.equal(investor.budgets.budget1, 50000);
    assert.equal(investor.budgets.budget2, 50000);
  });

  it('Test program rebalance balances correctly', function () {
    const investor = new Investor();
    // Simulate some rebalancing
    investor.rebalanceStreams();
    assert.equal(investor.balances.balance1, 50000);
    assert.equal(investor.balances.balance2, 50000);
  });
});
